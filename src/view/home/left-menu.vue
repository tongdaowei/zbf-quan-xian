<template>
  <div>


    <el-container>
    <el-menu
      default-active="2"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
      :collapse="isCollapse">

      <el-button type="info" icon="el-icon-setting" circle @click="dd"></el-button>
        <!--一级-->
        <el-submenu :index="getIndex(m1.menuId)" :title="m1.menuName" v-for="(m1,mindex) in listMenu" :key="mindex" @click="butt(m1.url)">

        <!--一级显示名称-->

          <!--图标-->
          <template slot="title">
            <i :class=m1.imagePath></i>
            <span>{{m1.menuName}}</span>
          </template>

        <!--二级-->
        <el-submenu :index="getIndex(m2.menuId)" v-for="(m2,m2Index) in m1.listMenu" :key="m2Index" @click="butt(m2.url)">

          <!--二级显示名称-->
          <template slot="title">{{m2.menuName}}</template>

          <!--三级显示名称-->
          <el-menu-item :index="getIndex(m3.menuId)" v-for="(m3,m3Index) in m2.listMenu" :key="m3Index" @click="butt(m3.url)">
            {{m3.menuName}}
          </el-menu-item>

        </el-submenu>

      </el-submenu>

    </el-menu>

      <div>
        <router-view style="width: 1200px;height: 100%"></router-view>
      </div>

    </el-container>
  </div>
</template>

<script>
    // import yyy from '@/view/home/yyy'
    export default {
        name: "left-menu",
        data(){
            return{
                listMenu:[],
                isCollapse: true,
            }
        },
        created(){
            this.list();
        },
        methods: {
            list(){
                this.$axios.get("http://localhost:10002/menu/listMenu",{params:{id:1}}).then(res=>{
                    this.listMenu=res.data;
                })
            },
            handleOpen(key, keyPath) {
                console.log(key, keyPath);
            },
            handleClose(key, keyPath) {
                console.log(key, keyPath);
            },
            dd(){
                if(this.$data.isCollapse){
                    this.$data.isCollapse=false
                }else{
                    this.$data.isCollapse=true
                }
            },
            test01(){
                this.$router.push("/test1")
            },
            getIndex(code){
                return ""+code.toString();
            },
            butt(url){
                this.$router.push(url)
            }
        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
