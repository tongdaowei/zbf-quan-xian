<template>
  <div style="width: 70%">
      <el-form ref="form" :model="form" label-width="80px" :rules="rules">
        <el-form-item label="用户名">
          <el-input v-model="form.userName"></el-input>
        </el-form-item>
        <el-form-item label="登录名">
          <el-input v-model="form.loginName"></el-input>
        </el-form-item>
        <el-form-item label="性  别">
          <el-radio-group v-model="form.sex">
            <el-radio-button label="男"></el-radio-button>
            <el-radio-button label="女"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="邮  箱">
          <el-input v-model="form.mail"></el-input>
        </el-form-item>


        <el-form-item label="密码" prop="passWord">
          <el-input type="password" v-model="form.passWord" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="确认密码" prop="checkPass">
          <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button @click="toPre">上一步</el-button>
          <el-button @click="toNext" type="primary">下一步</el-button>
        </el-form-item>
      </el-form>
    </div>
</template>

<script>
    export default {
        name: "register-info",
        data(){
          var validatePass = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请输入密码'));
            } else {
              if (this.form.checkPass !== '') {
                this.$refs.form.validateField('checkPass');
              }
              callback();
            }
          };
          var validatePass2 = (rule, value, callback) => {
            if (value === '') {
              callback(new Error('请再次输入密码'));
            } else if (value !== this.form.passWord) {
              callback(new Error('两次输入密码不一致!'));
            } else {
              callback();
            }
          };
          return{
            form:{
              loginName:"",
              userName:"",
              tel:"",
              mail:"",
              sex:"",
              passWord:"",
              checkPass:""
            },
            rules: {
              password: [
                { validator: validatePass, trigger: 'blur' }
              ],
              checkPass: [
                { validator: validatePass2, trigger: 'blur' }
              ]
            }
          }
        },
        methods:{
          toNext(){
            //注册信息
            this.form.tel=this.$store.state.tel
            this.$axios.post(this.$gloableData.serverPath+"sso/auth/toRegister",this.form).then((response)=>{

                this.$store.state.registerInfo=this.form
                this.$emit("TT")

            }).catch((error)=>{

            })

          },
          toPre(){
            this.$emit("PP")
          }
        }
    }
</script>

<style scoped>

</style>
