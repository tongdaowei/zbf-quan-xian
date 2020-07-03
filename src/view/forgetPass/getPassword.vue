<template>

    <div >

      <el-form ref="form" :model="form" label-width="80px" style="width: 100%">
        <el-form-item label="联系方式">
          <el-input placeholder="请输入手机号/邮箱地址" v-model="form.telMail"></el-input>
        </el-form-item>
        <el-form-item label="验证码">
          <el-input placeholder="请输入内容" v-model="form.code" >
            <el-button slot="append"  @click="getMessageCode">点击获取验证码</el-button>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="toNext" style="width: 100%">下一步</el-button>
        </el-form-item>
      </el-form>

    </div>

</template>

<script>
    export default {
        name: "getPassword",
        data(){
          return{
             form:{
               telMail:"",
               code:""
             }
          }
        },
        methods:{
          toNext(){
            this.$emit("YY")
          }
        }
    }
</script>

<style scoped>

</style>
