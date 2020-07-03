<template>
   <div :style="{height:clientHeight}">
     <div ref="treeDiv" style="float: left;width: 60%">
       <el-tree
         :data="data"
         show-checkbox
         default-expand-all
         node-key="id"
         ref="tree"
         highlight-current
         :default-checked-keys="defaultChecked"
         :props="defaultProps" style="float: left">
       </el-tree>
     </div>
     <div style="float: left;width: 40%;">
       <el-button >取 消</el-button>
       <el-button type="primary">保存</el-button>
     </div>
   </div>
</template>

<script>
    export default {
        name: "roleEdit",
        data(){
          return{
            clientHeight:200+'px',
            data:[],
            defaultChecked:[],
            defaultProps: {
              children: "listMenu",
              label: 'menuName'
            }
          }
        },
        methods:{
          getRoleData(roleId){
            //初始化数据
            this.$axios.post(this.$gloableData.serverPath+"user/service/menu/getRoleMenuList?roleId="+roleId).then((response)=>{
              //获取菜单数据
              this.data=response.data.result.allMenus;
              this.defaultChecked=response.data.result.roleMenuId;
            }).catch((error)=>{
              console.log("role=manger=>"+error.toString())
            })
          },
          getTreeHeight(){
            //获取tree的div的高度
            let clientHeight=document.getElementsByClassName("el-tree--highlight-current")[0].clientHeight+100;
            this.clientHeight=clientHeight+'px';
          }
        },
        activated() {

        },
        mounted() {

        }
    }
</script>

<style scoped>

</style>
