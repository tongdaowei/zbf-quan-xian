<template>
  <div>

    <el-row class="tac">
      <!--顶层-->
      <el-container>
        <!--标题名称-->
        <el-header>
          <span>农业银行</span>
<!--          <span class="el-dropdown-link" style="margin-left: 1100px;">-->
<!--          <el-image style="width: 60px; height: 60px;float: right" :src="this.image"></el-image>-->
<!--          <i class="el-icon-user-solid"></i>&nbsp;<font>当前用户</font>：<font color="#6495ed">{{this.$route.params.id}}</font>-->
<!--	        </span>-->
          <div style="float: right;width: 350px">
            <!--用户头像-->
            <div style="float: left;margin-top: 10px;margin-left: 20px ">
              <el-avatar  :size="40"  :src="this.image"></el-avatar>
            </div>

            <!--当前用户-->
            <div style="margin-right: 20px">
              <i class="el-icon-user-solid" style="margin-right: 10px;"></i>
              当前用户：{{this.userName}}
              <span class="el-dropdown-link"></span>

              <!--下来菜单的组件@command="handleCommand"事件-->
              <el-dropdown @command="handleCommand" >
              <span class="el-dropdown-link">
                {{this.$route.params.loginName}}<i class="el-icon-arrow-down el-icon&#45;&#45;right">更多功能</i>
              </span>
                <el-dropdown-menu slot="dropdown">
                  <el-dropdown-item command="a">个人信息</el-dropdown-item>
                  <el-dropdown-item command="b">修改密码</el-dropdown-item>
                  <el-dropdown-item command="c">退出系统</el-dropdown-item>
                </el-dropdown-menu>
              </el-dropdown>
            </div>

          </div>
        </el-header>

<!--        <div style="width:1410px;height: 100%;float: left">-->
<!--          <leftMenu></leftMenu>-->
<!--        </div>-->
      </el-container>
    </el-row>

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
    // import leftMenu from '@/view/home/left-menu'
    export default {
        // components:{
        //     leftMenu
        // },
        name: "home",

        data() {
            return {
                isCollapse: true,
                // divimg: {
                //     //背景图片的使用
                //     backgroundImage: "url(" + require('../../assets/2000372.jpg') + ")",
                //     backgroundRepeat: "no-repeat",
                //     height: "100%",
                //     width: "100%",
                //     overflow: "hidden",
                //     backgroundSize: "cover"
                // },
                listMenu:[],
                isCollapse: true,
                image:'',
                userName:""
            };
        },
        methods: {
            initData(){
               this.userName= window.localStorage.getItem("userInfo");
               // this.$axios.get("http://localhost:10002/user/getName",{
               //      params:{
               //          loginName:this.userName
               //      }
               //  }).then(res=>{
               //      this.listMenu=res.data;
               //      this.image = res.data.image;
               //  })
            },
            list(){
                this.$axios.get("http://localhost:10002/menu/listMenu",{
                    params:{
                        id:1
                    }
                }).then(res=>{
                    this.listMenu=res.data;
                    this.image = res.data.image;
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
            },
            //退出
            handleCommand(command) {
                if (command == 'a') {
                    this.$message('click on item 个人信息');
                    this.detailUserDialog = true;
                } else if (command == 'b') {
                    this.$message('click on item 修改密码');
                    this.PasswordDialog = true;
                    this.Ypassword = this.$store.state.user.password;
                    this.ruleForm.id = this.$store.state.user.id;
                } else if (command == 'c') {
                    this.$confirm('你是否要退出此系统尼?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        //数据还原
                        this.$store.commit('login', {});
                        //退出到登录界面
                        this.$router.replace({
                            path: '/'
                        });
                        this.$message({
                            type: 'success',
                            message: '退出成功!'
                        });

                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '取消退出'
                        });
                    });
                }
            },
        },
        created(){
            this.list();
            this.initData();
        },
    }
</script>


<style>
  .el-header,

  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: left;
    line-height: 60px;
  }

  .el-menu-vertical-demo:not(.el-menu--collapse) {
    width: 300px;
    min-height: 550px;
  }

</style>

