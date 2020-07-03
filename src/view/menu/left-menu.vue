<template>
    <div style="width: 100%;height: 100%">
      <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
        <el-radio-button :label="false">展开</el-radio-button>
        <el-radio-button :label="true">收起</el-radio-button>
      </el-radio-group>

      <el-menu class="el-menu-vertical-demo"
               @open="handleOpen"
               @close="handleClose"
               :collapse="isCollapse"
               background-color="#545c64"
               text-color="#fff"
               active-text-color="#ffd04b"
      >

        <el-submenu :title="m1.menuName" v-for="(m1,mindex) in listMenu" :key="mindex" :index="getIndex(m1.code)">
          <template slot="title">
            <i v-if="" :class="m1.imagePath"></i>
            <span slot="title">{{m1.menuName}}</span>
          </template>

          <el-submenu v-for="(m2,m2Index) in m1.listMenu" :key="m2Index" :index="getIndex(m2.code)">
            <span slot="title">{{m2.menuName}}</span>
            <el-menu-item v-for="(m3,m3Index) in m2.listMenu" :key="m3Index" :index="getIndex(m3.code)" @click="topush(m3.url)">{{m3.menuName}}</el-menu-item>
          </el-submenu>
        </el-submenu>

      </el-menu>
    </div>
</template>

<script>
    export default {
        name: "left-menu",
        data() {
          return {
            isCollapse: true,
            listMenu: [],
            userId: this.$store.state.userId
          };
        },
        methods: {
          handleOpen(key, keyPath) {
            console.log(key, keyPath);
          },
          handleClose(key, keyPath) {
            console.log(key, keyPath);
          },
          topush(path){
            //跳转路由
            this.$router.push(path)
          },
          getIndex(index){
             return ""+index.toString();
          }
        },
        mounted() {

        },
        activated() {
          let userId=JSON.parse(window.localStorage.getItem("userInfo")).userId;
          this.$axios.post(this.$gloableData.serverPath+"sso/auth/auth/getAuthMenu",{userId:userId}).then((response)=>{
            //存储菜单信息
            this.$data.listMenu=response.data.result;
          }).catch((error)=>{
            console.log("菜单错误=》"+JSON.stringify(error))
          })
        }
    }
</script>

<style scoped>
  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;

  }
</style>
