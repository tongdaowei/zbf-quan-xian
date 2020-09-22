<template>

  <div :style="divimg">
  <div style="width: 100%;height: 100%">

    <div style="width: 20%;height:500px;float: left;margin-left: 10%">
      <!--注册页面的步骤条-->
      <el-steps direction="vertical" :active="active" finish-status="success">
        <el-step title="步骤 1" description="手机号验证"></el-step>
        <el-step title="步骤 2" description="填写账号信息"></el-step>
        <el-step title="步骤 3" description="注册成功，邮箱激活"></el-step>
      </el-steps>
    </div>
    <div style="width: 60%;float: left">
      <!--跳转页面-->
      <test-tel v-show="active==1" v-on:TT="next"></test-tel>
      <register-info v-show="active==2"  v-on:TT="next" v-on:PP="pre"></register-info>
      <register-ok v-show="active==3"  v-on:TT="next" v-on:PP="pre"></register-ok>
    </div>

  </div>
  </div>

</template>

<script>
    //跳转页面
    import testTel from '@/view/register/test-tel';
    import registerInfo from '@/view/register/register-info';
    import registerOk from '@/view/register/register-ok'
    export default {
        //跳转页面
        components:{testTel,registerInfo,registerOk},
        name: "register",
        data(){
            return{
                active: 1,
                divimg: {
                    //背景图片的使用
                    backgroundImage: "url(" + require('../../assets/2005691.jpg') + ")",
                    backgroundRepeat: "no-repeat",
                    height: "100%",
                    width: "100%",
                    overflow: "hidden",
                    backgroundSize: "cover"
                },
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
