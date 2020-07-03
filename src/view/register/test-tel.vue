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
            this.$emit("TT")
          },
          getMessageCode(){

          }
        }
    }
</script>

<style scoped>

</style>
