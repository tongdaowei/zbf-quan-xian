<template>


  <div style="width: 100%;height: 100%">

    <div style="width: 20%;height:500px;float: left;margin-left: 10%">
        <el-steps direction="vertical" :active="active" finish-status="success">
          <el-step title="步骤 1" description="手机号验证"></el-step>
          <el-step title="步骤 2" description="填写账号信息"></el-step>
          <el-step title="步骤 3" description="注册成功，邮箱激活"></el-step>
        </el-steps>
    </div>
    <div style="width: 60%;float: left">
      <test-tel v-show="active==1" v-on:TT="next"></test-tel>
      <register-info v-show="active==2"  v-on:TT="next" v-on:PP="pre"></register-info>
      <register-ok v-show="active==3"  v-on:TT="next" v-on:PP="pre"></register-ok>
    </div>

  </div>


</template>

<script>
    import testTel from '@/view/register/test-tel';
    import registerInfo from '@/view/register/register-info';
    import registerOk from '@/view/register/register-ok'
    export default {
        components:{testTel,registerInfo,registerOk},
        name: "register",
        data(){
          return{
            active: 1
          }
        },
        methods:{
          next() {
            if (this.active++ > 3) {
              this.active = 3;
            }
          },
          pre(){
            this.active=this.active-1;
          }
        }
    }
</script>

<style scoped>

</style>
