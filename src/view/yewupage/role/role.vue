<template>
  <div>
    <!----------查询---------->
    <div style="margin-top: 20px;float: left" >
      <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-form-item label="角色名称">
          <el-input v-model="formInline.roleName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!------------列表-------------->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="角色ID">
      </el-table-column>
      <el-table-column
        prop="name"
        label="角色名称">
      </el-table-column>
      <el-table-column
        prop="roleCode"
        label="角色编码">
      </el-table-column>
      <el-table-column
        prop="miaoshu"
        label="描述">
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="bd(scope.row)">绑定权限</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!----------分页---------->
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="current"
      :page-sizes="sizes"
      :page-size="size"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      style="float: left">
    </el-pagination>

    <!---------------绑定权限对话框---------------->
    <el-dialog
      title="绑定权限"
      :visible.sync="dialogVisible"
      width="40%"
      :before-close="handleClose">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
    <el-button @click="dialogVisible = false">取 消</el-button>
    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
  </span>
    </el-dialog>
  </div>
</template>

<script>
    export default {
        name: "role",
        data(){
            return{
                //列表
                tableData:[],
                //查询
                formInline:{
                    roleName:'',
                },
                //分页
                current:1,
                sizes:[4,8,12],
                size:4,
                total:0,
                //对话框
                dialogVisible: false,
            }
        },
        methods:{
            //列表查询
            list(){
                this.$axios.get("http://localhost:10002/role/selallrole",{
                    params:{
                        roleName:this.formInline.roleName,
                    }
                }).then(res=>{
                    this.tableData = res.data.result;
                    this.current=res.data.result.current;
                    this.size=res.data.result.size;
                    this.total=res.data.result.totals;
                })
            },
            //查询按钮
            onSubmit(){
                this.list();
            },
            //分页
            handleSizeChange(val) {
                this.size=val;
                this.list();
            },
            handleCurrentChange(val) {
                this.current=val;
                this.list();
            },
            //关闭对话框
            handleClose(done) {
                this.dialogVisible=false;
            },
            //进入对话款
            bd(){
                this.dialogVisible=true;
            },
        },
        created() {
            //列表展示
            this.list();
        }
    }
</script>

<style scoped>

</style>
