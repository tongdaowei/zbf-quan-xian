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
          <el-radio-button label="0">男</el-radio-button>
          <el-radio-button label="1">女</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="邮  箱">
        <el-input v-model="form.email"></el-input>
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
            //输入密码
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
            //判断两次密码是否相同
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
                    //form表单
                    loginName:"",
                    userName:"",
                    tel:"",
                    email:'',
                    sex:"",
                    passWord:"",

                },
                rules: {
                    //判断两次密码是否相同
                    passWord: [
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
                this.$axios.post(this.$gloableData.serverPath+"user/auth/toRegister",this.form).then((response)=>{
                    if(response.data) {
                        this.$store.state.registerInfo=this.form
                        //下一步
                        this.$emit("TT");
                        alert("注册成功")
                    }
                    else {
                        alert("注册失败");
                    }
                }).catch((error)=>{

                })

            },
            toPre(){
                //上一步
                this.$emit("PP")
            }
        }
    }
</script>

<style scoped>

</style>
