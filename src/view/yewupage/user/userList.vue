<template>
    <div>

      <el-table
        :data="userList"
        stripe
        style="width: 100%">
        <el-table-column
          prop="id"
          label="用户ID"
          width="180">
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="日期"
          width="180">
        </el-table-column>
        <el-table-column
          prop="userName"
          label="姓名"
          width="180">
        </el-table-column>
        <el-table-column
          prop="loginName"
          label="登录名">
        </el-table-column>
        <el-table-column
          width="360"
          prop="id"
          label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="roBindRole(scope.row)">编辑绑定角色</el-button>
          </template>

        </el-table-column>
      </el-table>

      <el-dialog
        title="为用户绑定角色"
        :visible.sync="dialogVisible"
        width="40%">
        <div style="text-align: left">
          <span>当前用户是：{{userName}}</span>
          <span>&nbsp用户ID是：{{userId}}</span>
        </div>
        <br>
        <div style="text-align: left;">

          <el-select
            style="width: 80%"
            v-model="value"
            multiple
            filterable
            remote
            reserve-keyword
            placeholder="请输入角色名称关键字"
            :remote-method="remoteMethod"
            :loading="loading">
            <el-option
              v-for="item in options"
              :key="item.id"
              :label="item.roleName"
              :value="item.id">
            </el-option>
          </el-select>

          <el-button style="margin-left: 20px" type="primary" @click="getSelectedRole">确 定</el-button>
        </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
         </span>

      </el-dialog>

    </div>
</template>

<script>
    export default {
        name: "userList",
        data(){
           return{
             dialogVisible: false,
             userList:[],
             userName:"",
             userId:"",
             options: [],
             value: [],
             list: [],
             loading: false,
             states:[],

           }
        },
        methods:{
          roBindRole(row){
             this.userName=row.userName;
             this.userId=row.id;
             //打开对话窗
             this.dialogVisible=true
          },
          remoteMethod(query) {
            if (query !== '') {
              this.loading = true;
              setTimeout(() => {
                this.$axios.post(this.$gloableData.serverPath+"user/service/role/getRoleList",{roleName:query}).then((response)=>{
                  this.options= response.data.result
                  this.loading = false;
                }).catch((error)=>{
                  this.loading = false;
                })
              }, 200);
            } else {
              this.options = [];
            }
          },
          getSelectedRole(){
             //给用户绑定角色信息
            this.$axios.post(this.$gloableData.serverPath+"user/service/user/bindRoleForUser",
              {userId:this.userId,roleIds:this.value}).then((response)=>{
              //获取数据
              if(response.data.code==0){
                this.$message({
                  message: '操作成功！',
                  type: 'success'
                });
                //
                this.value=[];
                this.list=[];
                this.states=[];
                this.options=[];
                //
                this.dialogVisible=false;
              }

            }).catch((error)=>{

            })
          }
        },
        activated() {
            this.$axios.post(this.$gloableData.serverPath+"user/service/user/getUserList","").then((response)=>{
               //获取数据
               this.$data.userList=response.data.result.list;
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
