<template>
  <div>
    <el-form ref="form" :model="form" label-width="80px" :rules="rules">

      <el-form-item label="新 密 码" prop="passWord">
        <el-input type="password" v-model="form.passWord" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="checkPass">
        <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
      </el-form-item>

      <el-form-item>
        <el-button @click="toNext" type="primary">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "updatePass",
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
                    passWord:"",
                    checkPass:"",
                    tel:"123123"
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
                /*this.form.tel=this.$store.state.tel*/
                this.$axios.post(this.$gloableData.serverPath+"user/auth/upPas",this.form).then((rnpmesponse)=>{
                    if(response)
                    {
                        alert("修改成功");
                        this.$emit("YY")
                    }
                    else {
                        alert("修改失败")
                    }


                })



            }
        }
    }
</script>

<style scoped>

</style>
