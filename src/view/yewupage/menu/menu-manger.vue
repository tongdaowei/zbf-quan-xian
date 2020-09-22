<template>
    <div>

      <el-table
        @row-click=rowContextmenu
        :highlight-current-row="heighLight"
        :stripe= "stripe"
        :data="tableData"
        style="width: 100%;margin-bottom: 30px;"
        row-key="id"
        border
        :tree-props="{children: 'list'}">


        <el-table-column
          prop="id"
          label="菜单ID"
          width="220px"
          sortable>
        </el-table-column>
        <el-table-column
          prop="leval"
          label="菜单等级">
        </el-table-column>
        <el-table-column
          prop="menuName"
          label="菜单名称">
        </el-table-column>
        <el-table-column
          prop="url"
          label="权限URL">
        </el-table-column>
        <el-table-column
          prop="imagePath"
          label="菜单图片ICON">
        </el-table-column>
        <el-table-column
          prop="code"
          label="当前CODE"
          width="180px">
        </el-table-column>
        <el-table-column
          prop="parentCode"
          label="父菜单CODE">
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

      methods:{
        list(){
            this.$axios.get("http://localhost:10002/menu/selectMenu").then(res=>{
                this.tableData=res.data;
            })
        },
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
      },
      created() {
           this.list();
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>
