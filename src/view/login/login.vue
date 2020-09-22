<template>
  <div :style="divimg">
    <div>
      <p class="p-title">BELIVE</p>
    </div>
    <div class="ms-login" >

      <div style="">
        <el-tabs v-model="activeName" style="width: 85%;margin-left: 25px;margin-top: 18px">
          <el-tab-pane label="账户登录" name="first">
            <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
              <el-form-item label="用户名">
                <el-input placeholder="请输入登录名" v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短信登录/邮箱登录" name="second">

            <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
              <el-form-item label="手机/邮箱">
                <el-input placeholder="请输入手机号/邮箱" v-model="form.userName"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input placeholder="请输入内容" v-model="form.password">
<!--                  <el-button slot="append" @click="getMessageCode">点击获取验证码</el-button>-->
                  <el-button slot="append" v-show="show"   @click="getMessageCode">获取验证码</el-button>
                                                                        <!--点击后规定时间没有获取到在重新获取-->
                  <el-button slot="append" v-show="!show" class="count">再次获取{{count}}秒后</el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitMessage" style="width: 100%">登录</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
        </el-tabs>


        <el-breadcrumb separator="|" style="margin-left:20%;margin-top: 50px">
          <el-breadcrumb-item>
            <el-link @click="toRegister">立即注册</el-link>
          </el-breadcrumb-item>
          <el-breadcrumb-item>
            <el-link @click="forgetPassword">忘记密码</el-link>
          </el-breadcrumb-item>
        </el-breadcrumb>

      </div>

      <!--    <img src="http://148.70.46.222:9000/test/013.png"/>-->

    </div>
  </div>
</template>

<script>

    export default {
        name: "login",
        data() {
            return {
                divimg: {
                    //背景图片的使用
                    backgroundImage: "url(" + require('../../assets/2020741.jpg') + ")",
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    backgroundSize: "cover"
                },
                activeName: 'first',
                form: {
                    userName: '',
                    password: '',
                    tel: "",
                    code: ""
                },
                show: true,
                //再次获取的秒数
                count: '',
                timer: null,
                yz:''
            }
        },
        methods: {
            onSubmit() {
                //与后台的连接地址
                this.$axios.post(this.$gloableData.serverPath + "auth/forLogin", this.$data.form).then((response) => {
                    if (response.data.code == 1006) {
                        alert("1111111111111111111111111111111111")
                        //存储Token到本地
                        window.localStorage.removeItem("token")
                        window.localStorage.setItem("token", response.headers["token"])
                        window.localStorage.setItem("userInfo",this.form.userName)
                        let name = response.data.userInfo;
                        console.log(name);
                        //跳转到home界面
                        this.$router.push({
                            name: "home",
                            params: {
                                name: name
                            }
                        });
                        //存储用户信息，这是一个用户的登录名
                        let loginName = "" + response.data.userInfo;
                        this.$store.state.userId = uuid;
                        window.localStorage.setItem("userInfo", userName)
                    } else {
                        this.$message.error('登录失败，用户名或密码错误11111111111！');
                    }
                }).catch((error => {
                    this.$message.error(JSON.stringify(error.data));
                }));
            },
            onSubmitMessage() {
                // alert("2222222222222222222222222222222")
                // alert(this.$data.form.userName);
                // console.log("pass"+this.form.password)
                // console.log("yz"+this.yz)
                //与后台的连接地址
                this.$axios.post(this.$gloableData.serverPath + "auth/forLogin", this.$data.form).then((response) => {

                    if (response.data.code == 1006) {
                        //存储Token到本地
                        window.localStorage.removeItem("token")
                        window.localStorage.setItem("token", response.headers["token"])
                        let name = response.data.userInfo;
                        console.log(name);
                        //跳转到home界面
                        this.$router.push({
                            name: "home",
                            params: {
                                name: name
                            }
                        });
                        //存储用户信息，这是一个用户的登录名
                        let loginName = "" + response.data.userInfo;
                        this.$store.state.userId = uuid;
                        window.localStorage.setItem("userInfo", userName)
                    } else {
                        this.$message.error('登录失败，用户名或密码错误！');
                    }
                }).catch((error => {
                    this.$message.error(JSON.stringify(error.data));
                }));


            },
            getMessageCode() {
                // 发送验证码
                this.$axios.get(this.$gloableData.serverPath+"auth/yan",{params:{
                        tel:this.$data.form.userName
                    }}).then(res=>{
                    console.log(res);
                    this.yz = res.data.verificationCode;
                    console.log("赋值----",this.yz);
                });
                this.$notify({
                    title: '成功',
                    message: '验证码发送成功，请您注意查看！！',
                    type: 'success'
                });
                //秒数
                const TIME_COUNT = 60;
                if (!this.timer) {
                    this.count = TIME_COUNT;
                    this.show = false;
                    this.timer = setInterval(() => {
                        if (this.count > 0 && this.count <= TIME_COUNT) {
                            this.count--;
                        } else {
                            this.yz = '';
                            console.log("倒计时结束----",this.yz);
                            this.$notify.error({
                                title: '提示',
                                message: '您的验证码已过期，请重新获取！！！'
                            });
                            this.show = true;
                            clearInterval(this.timer);
                            this.timer = null;
                        }
                    }, 1000)
                }
            },
            toRegister() {
                //跳转到注册页面
                this.$router.push("/register")
            },
            forgetPassword() {
                //跳转到忘记密码页面
                this.$router.push("/forgetPass")
            }
        }
    }
</script>
<style scoped>
  .p-title {
    color: white;
    font-size: 16px;
    text-align: left;
    padding-left: 20px;
    font-style: italic
  }

  .ms-login {
    position: absolute;
    left: 70%;
    top: 52%;
    width: 450px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }

  .ms-logchild {
    position: absolute;
    left: 70%;
    top: 50%;
    width: 350px;
    margin: -190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255, 255, 255, 0.3);
    overflow: hidden;
  }
</style>
