<template>

  <div style="padding-top: 10%;width: 100%;height: 100%;" >

    <div style="margin-left: 35%">
      <el-tabs v-model="activeName" style="width: 45%">
        <el-tab-pane label="账户登录" name="first">
          <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
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

          <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
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


      <el-breadcrumb separator="|" style="margin-left:20%;margin-top: 50px">
        <el-breadcrumb-item >
          <el-link @click="toRegister">立即注册</el-link>
        </el-breadcrumb-item>
        <el-breadcrumb-item>
          <el-link @click="forgetPassword">忘记密码</el-link>
        </el-breadcrumb-item>
      </el-breadcrumb>

    </div>

<!--    <img src="http://148.70.46.222:9000/test/013.png"/>-->

  </div>

</template>

<script>
    export default {
        name: "login",
        data() {
          return {
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
            this.$axios.post("http://localhost:10000/sso/auth/login",this.$data.form).then((response)=>{
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

            }))
         },
         onSubmitMessage(){

         },
         getMessageCode(){
           alert("=====")
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

</style>
