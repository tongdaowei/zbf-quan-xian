<template>
  <div style="text-align: center;width: 70%">
    <el-form ref="form" :model="form" label-width="80px" >
      <el-form-item label="手机号">
        <el-input placeholder="请输入手机号" v-model="form.tel"></el-input>
      </el-form-item>
      <el-form-item label="验证码">
        <el-input placeholder="请输入内容" v-model="form.code" >
          <el-button slot="append"  @click="getMessageCode">点击获取验证码</el-button>
        </el-input>
      </el-form-item>
      <el-form-item>
        <el-button @click="toNext" type="primary">下一步</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
    export default {
        name: "test-tel",
        data(){
            return{
                form:{
                    tel:"",
                    code:""
                }
            }
        },
        methods:{
            toNext(){
                this.$store.state.tel=this.form.tel
                //this.$emit("TT")
                //下一步
                this.$emit("TT");
                /*this.$axios.post(this.$gloableData.serverPath + "user/forLogin", this.$data.form).then((response) => {

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
                }));*/


            },
            getMessageCode(){
                // 发送验证码
                this.$axios.get(this.$gloableData.serverPath+"auth/yan",{
                    params:{
                        tel:this.$data.form.tel
                    }}).then(res=>{
                    console.log(res);
                    console.log("赋值----",this.yz);
                });
                this.$notify({
                    title: '成功',
                    message: '验证码发送成功，请您注意查看！！',
                    type: 'success'
                });
            },
        }
    }
</script>

<style scoped>

</style>
