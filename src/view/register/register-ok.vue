<template>
    <div style="text-align: center;width: 70%">
      <div style="margin-bottom: 20%;margin-top: 10%">
        <span style="font-size: x-large;color: #42b983">恭喜您，注册成功！</span>
        <br>
        <br>
        <br>
        <span style="font-size: larger;color: darkgrey">账号已经注册请到邮箱中进行激活，开启你的体验之旅吧 ^_^</span>

      </div>
      <div>
        <el-tooltip class="item" effect="light" content="如果点击 立即激活 不会跳转的话请自行登录邮箱进行激活操作" placement="bottom">
          <el-button @click="toMailBox" type="primary">立即激活</el-button>
        </el-tooltip>
      </div>

    </div>
</template>

<script>
    export default {
        name: "register-ok",
        methods:{
          toNext(){
              //下一步
            this.$emit("TT")
          },
          toMailBox(){
             //进入邮箱
             let from=this.$store.state.registerInfo
             let mailes=this.$gloableData.mailBox;
             //转小写
             let yyy=from.email.toLowerCase().split("@")[1]
             let href=mailes[yyy]
             //打开邮箱连接
             window.open(href)
          }
        }
    }
</script>

<style scoped>

</style>
