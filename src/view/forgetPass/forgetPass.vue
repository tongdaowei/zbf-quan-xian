<template>

   <div style="width: 100%">

     <div style="float: left;width: 20%;height: 300px">
       <el-steps direction="vertical" :active="active" finish-status="success">
         <el-step title="步骤 1" description="验证手机号/邮箱"></el-step>
         <el-step title="步骤 2" description="修改密码"></el-step>
         <el-step title="步骤 3" description="修改成功"></el-step>
       </el-steps>
     </div>
     <div style="float: left;width: 50%">

         <getPass v-show="active==1" v-on:YY="nextStep"></getPass>
         <updatePass v-show="active==2" v-on:YY="nextStep"></updatePass>
         <updateOk v-show="active==3" v-on:YY="nextStep"></updateOk>

     </div>

   </div>

</template>

<script>
    import getPass from '@/view/forgetPass/getPassword'
    import updatePass from '@/view/forgetPass/updatePass'
    import updateOk from '@/view/forgetPass/updatePassOk'

    export default {
        name: "forgetPass",
        components:{getPass,updatePass,updateOk},
        data(){
          return{
            active: 1
          }
        },
        methods:{
          nextStep(){
            if(this.active++ > 3){
              this.active=3;
            }
          }
        }
    }
</script>

<style scoped>

</style>
