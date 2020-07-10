<template>
    <div style="width:100%;height: 100%;">
      <!--首页布局 start-->
      <el-container style="height: 100%" direction="vertical">
        <!--顶部菜单 start-->
        <el-header>
          <span style="font-size:25px;margin-right:80%;">
            北斗星
            <el-tooltip ref="tip" class="item" effect="dark" placement="top-start" v-bind:content="mycontent">
              <i class="el-icon-menu" @click="openParentClose()"></i>
            </el-tooltip>
          </span>

        </el-header>
        <!--顶部菜单 end-->

        <el-container>
          <!--左侧的菜单 start-->
          <keep-alive>
            <leftMenu ref="iiii" v-on:ee="updatePro"></leftMenu>
          </keep-alive>
          <!--左侧的菜单 end-->

          <!--右侧的主显示区域 start-->
          <keep-alive>
            <router-view style="width: 100%;height: 100%"></router-view>
          </keep-alive>
          <!--右侧的主显示区域 end-->
        </el-container>
      </el-container>
      <!--首页布局 end-->

      <!--<h1>当前用户：{{userInfo.userName}}</h1>
       <div style="width: auto;height: 100%;float: left">
         <keep-alive>
           <leftMenu></leftMenu>
         </keep-alive>
       </div>
       <div style="width: auto;height: 100%;float: left;margin-left: 5px">
         <keep-alive>
           <router-view style="width: 100%;height: 100%"></router-view>
         </keep-alive>
       </div>-->
    </div>
</template>

<script>
    import leftMenu from '@/view/menu/left-menu'
    export default {
        components:{leftMenu},
        name: "home",
        data(){
          return{
            userInfo: "",
            mycontent: "点击打开菜单",
          }
        },
        methods:{
          getUserInfo(){

          },
          openParentClose() {
            //调用子组件menu中的openClose()
            this.$refs.iiii.openClose();
          },
          updatePro(uu) {
            if (uu) {
              this.$data.mycontent = "点击打开菜单";
            } else {
              this.$data.mycontent = "点击关闭菜单";
            }
          }
        },
        activated() {
          if(window.localStorage.getItem("userInfo")==null){
            this.$data.userInfo=JSON.parse(window.localStorage.getItem("userInfo")==null?"":window.localStorage.getItem("userInfo"))
          }else if(window.localStorage.getItem("userInfo")=="undefined"){
            this.$data.userInfo=parse(window.localStorage.getItem("userInfo")=="undefined"?"":window.localStorage.getItem("userInfo"))
          }
        }
    }
</script>

<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
  }

  .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
