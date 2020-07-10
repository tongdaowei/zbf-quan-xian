<template>

  <!--<div style="padding-top: 10%;width: 100%;height: 100%;" >-->
  <div :style="divimg">

    <!--登录start-->
    <div>
      <p class="p-title">RATTLESNAKE北斗星</p>
    </div>
    <div class="ms-login">
      <div style="">
        <el-tabs v-model="activeName" style="width: 85%;margin-left: 25px;margin-top: 18px">
          <el-tab-pane label="账户登录" name="first">
            <el-form ref="form" :model="form" label-width="60px" style="width: 100%">
              <el-form-item label="用户名">
                <el-input placeholder="请输入登录名" v-model="form.loginName"></el-input>
              </el-form-item>
              <el-form-item label="密码">
                <el-input placeholder="请输入密码" v-model="form.passWord" show-password></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmit" style="width: 100%">登录</el-button>
              </el-form-item>
            </el-form>
          </el-tab-pane>
          <el-tab-pane label="短信登录" name="second">

            <el-form ref="form" :model="form" label-width="60px" style="width: 100%">
              <el-form-item label="手机号">
                <el-input placeholder="请输入手机号" v-model="form.tel"></el-input>
              </el-form-item>
              <el-form-item label="验证码">
                <el-input placeholder="请输入内容" v-model="form.code" >
                  <el-button slot="append"  @click="getMessageCode">点击获取验证码</el-button>
                </el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="onSubmitMessage" style="width: 100%">登录</el-button>
              </el-form-item>
            </el-form>

          </el-tab-pane>
        </el-tabs>
      </div>

      <!--<el-breadcrumb separator="|" style="margin-left:20%;margin-top: 50px">-->
      <el-breadcrumb separator="|" style="margin:0px 0px 20px 120px">
        <el-breadcrumb-item >
          <el-link @click="toRegister">立即注册</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-link @click="forgetPassword">忘记密码</el-link>
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <!--登录end-->

  </div>

</template>

<script>
    export default {
        name: "login",
        data() {
          return {
            divimg:{//背景图片的使用
              backgroundImage:"url(" + require('../../assets/yun.jpg') + ")",
              backgroundRepeat: "no-repeat",
              height:"100%",
              width:"100%",
              overflow:"hidden",
              backgroundSize:"cover"
            },
            activeName: 'second',
            form: {
              loginName: '',
              passWord: '',
              tel:"",
              code:""
            }
          }
        },
       methods:{
         onSubmit(){
            this.$axios.post(this.$gloableData.serverPath+"sso/auth/login",this.$data.form).then((response)=>{
                if(response.data.code==0){
                  //存储Token到本地
                  window.localStorage.removeItem("token")
                  window.localStorage.setItem("token",response.data.token)
                  //跳转到home界面
                  this.$router.push("/home")
                  //存储用户信息
                  let uuid=""+response.data.userInfo.userId;
                  this.$store.state.userId=uuid;
                  window.localStorage.setItem("userInfo",JSON.stringify(response.data.userInfo))
                  window.localStorage.setItem("userId",response.data.userInfo.id)
                }else{
                  this.$message.error('登录失败，用户名或密码错误！');
                }
            }).catch((error=>{
                //加个注释
                console.log(error.data)
            }))
         },
         onSubmitMessage(){

         },
         getMessageCode(){
           alert("==改版一下===")
         },
         toRegister(){
           this.$router.push("/register")
         },
         forgetPassword(){
           this.$router.push("/forgetPass")
         }
       }
    }
</script>

<style scoped>
  .p-title{
    color: white;
    font-size: 16px;
    text-align: left;
    padding-left: 20px;
    font-style:italic
  }
  .ms-login{
    position: absolute;
    left:70%;
    top:52%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
  .ms-logchild{
    position: absolute;
    left:70%;
    top:50%;
    width:350px;
    margin:-190px 0 0 -175px;
    border-radius: 5px;
    background: rgba(255,255,255, 0.3);
    overflow: hidden;
  }
</style>
