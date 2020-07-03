<template>
    <div >

      <el-table
        :data="roleData"
        height="250"
        border
        style="width: 100%">
        <el-table-column
          prop="id"
          label="角色ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          width="180"
          prop="address"
          label="操作">

          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="toEditRole(scope.row)">编辑绑定权限</el-button>
          </template>

        </el-table-column>
      </el-table>



      <!-- 弹出层列表 -->
      <el-dialog @opened="dialogOpened" title="编辑角色绑定权限" style="height: auto" :visible.sync="dialogTableVisible">

        <roleEdit ref="role"></roleEdit>
        <el-backtop target=".el-dialog__wrapper" :right="200">
          <el-tooltip class="item" effect="light" content="点击回到顶部" placement="bottom">
            <i class="el-icon-caret-top"></i>
          </el-tooltip>
        </el-backtop>


      </el-dialog>


    </div>
</template>

<script>
    import roleEdit from '@/view/yewupage/role/roleEdit'
    export default {
        components:{roleEdit},
        name: "roleManger",
        data(){
          return{
            dialogTableVisible: false,
            roleData:[],
            queryData:{
              pageNo: 0,
              pageSize: 10
            }
          }
        },
        methods:{
          dialogOpened(){
            //设置Dialog中的高度
            this.$refs.role.getTreeHeight();
          },
          toEditRole(row){//编辑绑定角色
             //打开弹出层
             this.dialogTableVisible=true
             //赋值
             this.$store.state.roleId=row.id;
             //调用子组件的方法
             try {
                 this.$refs.role.getRoleData(row.id);
              }catch (e) {
                setTimeout(()=>{
                  this.$refs.role.getRoleData(row.id);
                })
              }
          },
          toCancel(){//对话框取消按钮
            //获取列表数据
            this.dialogTableVisible=false
          }
        },
        activated() {
          //获取列表数据
          this.$axios.post(this.$gloableData.serverPath+"user/service/role/getPageRole",this.queryData).then((response)=>{
              this.roleData=response.data.result.list
          }).catch((error)=>{

          })
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
