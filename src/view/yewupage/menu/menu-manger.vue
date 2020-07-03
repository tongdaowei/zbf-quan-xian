<template>
    <div>

      <el-table
        @row-click=rowContextmenu
        :highlight-current-row="heighLight"
        :stripe= "stripe"
        :data="tableData"
        style="width: 100%;margin-bottom: 20px;"
        row-key="id"
        border
        :tree-props="{children: 'listMenu'}"
         ref="treeTab"
        >

        <el-table-column
          prop="id"
          label="菜单ID"
          sortable
          width="220">
        </el-table-column>
        <el-table-column
          prop="leval"
          label="菜单等级"
          width="80">
        </el-table-column>
        <el-table-column
          prop="menuName"
          label="菜单名称"
          width="160">
        </el-table-column>
        <el-table-column
          prop="url"
          label="权限URL"
          width="180" >
        </el-table-column>
        <el-table-column
          prop="imagePath"
          label="菜单图片ICON"
          width="160" >
        </el-table-column>
        <el-table-column
          prop="code"
          label="当前CODE"
          width="160" >
        </el-table-column>
        <el-table-column
          prop="parentCode"
          label="父菜单CODE"
          width="160" >
        </el-table-column>
      </el-table>


      <!-- 弹出层代码 -->
      <el-dialog title="权限操作" :visible.sync="dialogVisible">
          <menuMangerTab ref="menuManger"></menuMangerTab>
      </el-dialog>

    </div>
</template>

<script>
    import menuMangerTab from '@/view/yewupage/menu/menu-manger-crud-tab'
    export default {
        components:{menuMangerTab},
        name: "menu-manger",
        data(){
          return{
            stripe:true,
            heighLight:true,
            tableData:[],
            dialogVisible: false,
            filterText:""
          }
        },
      activated() {
          //初始化数据
          this.$axios.post("http://localhost:10000/user/service/menu/getMenuList").then((response)=>{
            //获取菜单数据
            this.tableData=response.data.result;
          }).catch((error)=>{
            console.log("menu-manger=>"+error.toString())
          })
      },
      methods:{
        handleClose(done) {
          this.$confirm('确认关闭？')
            .then(_ => {
              done();
            })
            .catch(_ => {});
        },
        rowContextmenu(row, column, event){
           //打开弹出层
           this.$data.dialogVisible=true
           //赋值到store
           this.$store.state.menuInfo=row
           //调用刷新tab页
           this.$refs.menuManger.updateDataTab()
        }
      }
    }
</script>

<style>
  .el-dialog__title {
    line-height: 24px;
    font-size: 18px;
    color: #303133;
    float: left;
  }
</style>
