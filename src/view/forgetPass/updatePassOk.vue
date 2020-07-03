<template>
  <div style="text-align: center;width: 70%">
    <div style="margin-bottom: 20%;margin-top: 10%">
      <span style="font-size: x-large;color: #42b983">密码修改成功！</span>
      <br>
      <br>
      <br>
      <span style="font-size: larger;color: darkgrey">密码已经修改成功，赶紧用新密码登录吧 ^_^</span>

    </div>
    <div>
      <el-tooltip class="item" effect="light" content="点击 立即登录 跳转登录界面进行登录" placement="bottom">
        <el-button @click="toLOGIN" type="primary">立即登录</el-button>
      </el-tooltip>
    </div>

  </div>
</template>

<script>
    export default {
        name: "updatePassOk",
        methods:{
          toLOGIN(){
             this.$router.push("/")
          }
        }
    }
</script>

<style scoped>

</style>
