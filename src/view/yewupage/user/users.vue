<template>
  <div>
    <!----------查询---------->
    <div style="margin-top: 20px">
      <el-form :inline="true" :model="formInline" class="demo-form-inline">

        <el-form-item label="用户名">
          <el-input v-model="formInline.userName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="登录名">
          <el-input v-model="formInline.loginName" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="formInline.tel" placeholder="请输入内容"></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="onSubmit">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!----------按钮---------->
    <div style="float: left">
      <el-button type="primary" @click="toAdd">添加用户</el-button>
      <el-button type="primary" @click="dc">导出用户数据</el-button>&nbsp;&nbsp;
      <el-upload
        style="float: right;margin-right: 20px"
        class="avatar-uploader"
        :show-file-list="false"
        :on-success="excelAvatarSuccess"
        :headers="headers"
        accept="['.xls','.xlsx']"
        action="http://localhost:10002/user/excelToja">
        <el-button type="primary"  size="small"  icon="el-icon-upload2" >导入Excel<i class="el-icon-upload el-icon--right"></i></el-button>
      </el-upload>
    </div>
    <!----------列表---------->
    <el-table
      :data="tableData"
      style="width: 100%">
      <el-table-column
        fixed
        prop="id"
        label="ID">
      </el-table-column>
      <el-table-column
        label="用户名称"
        width="180">
        <!--自定义列-->
        <template slot-scope="scope">
          <el-popover trigger="hover" placement="top">
            <div>
              <img :src="scope.row.image" width="100px" height="70px" />
            </div>
            <p>用户名称: {{ scope.row.userName }}</p>
            <p>登录名: {{ scope.row.loginName }}</p>
            <p>密码: {{ scope.row.passWord }}</p>
            <p>电话: {{ scope.row.tel }}</p>
            <p>活动状态:
              <span v-if="scope.row.zt=='1'">激活</span>
              <span v-if="scope.row.zt=='0'">冻结</span>
            </p>
            角色:<span v-for="role in scope.row.baseRoles">{{role.name}}、</span>
            <div slot="reference" class="name-wrapper">
              <el-tag size="medium">{{ scope.row.userName }}</el-tag>
            </div>
          </el-popover>
        </template>
      </el-table-column>
      <el-table-column
        prop="loginName"
        label="登录名">
      </el-table-column>
      <el-table-column
        prop="tel"
        label="电话">
      </el-table-column>
      <el-table-column
        label="拥有角色">
        <!--拥有角色-->
        <template v-slot="scope">
          <span v-for="role in scope.row.baseRoles">{{role.name}}、</span>
        </template>
      </el-table-column>
      <el-table-column
        label="活动状态">
        <!--状态按钮的转换-->
          <template slot-scope="scope">
            <el-button size="mini" type="danger" plain v-if="scope.row.zt==0" @click="ChangeUserZt(scope.row)">冻结</el-button>
            <el-button size="mini" type="primary" plain v-if="scope.row.zt==1" @click="ChangeUserZt(scope.row)">激活</el-button>
          </template>
      </el-table-column>
      <el-table-column
        fixed="right"
        label="操作"
        width="350">
        <template slot-scope="scope">
          <el-button type="primary" @click="bd(scope.row)">绑定角色</el-button>
          <el-button type="primary" @click="toWord(scope.row)">导出DOC</el-button>
          <el-button type="primary" @click="toUpdate(scope.row)">修改</el-button>
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

    <!----------添加用户对话框---------->
    <el-dialog
      title="添加用户"
      :visible.sync="dialogVisible1"
      width="30%"
      :before-close="handleClose1">

      <el-form ref="form1" :model="form1" label-width="80px">

        <el-form-item label="用户名称">
          <el-input v-model="form1.userName"></el-input>
        </el-form-item>

        <el-form-item label="登录名">
          <el-input v-model="form1.loginName"></el-input>
        </el-form-item>

        <el-form-item label="密码">
          <el-input v-model="form1.passWord"></el-input>
        </el-form-item>

        <el-form-item label="电话">
          <el-input v-model="form1.tel"></el-input>
        </el-form-item>

        <el-form-item label="性别">
          <el-radio-group v-model="form1.sex">
            <el-radio :label="1">男</el-radio>
            <el-radio :label="0">女</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="活动状态">
          <el-radio-group v-model="form1.zt">
            <el-radio :label="1">激活</el-radio>
            <el-radio :label="0">冻结</el-radio>
          </el-radio-group>
      </el-form-item>

        <!--图片上传-->
        <el-form-item label="头像">
          <el-upload
            class="avatar-uploader"
            action="http://localhost:10002/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess">
            <img v-if="imageUrl" :src="imageUrl" class="avatar" style="width: 100px;height: 100px;">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>

      </el-form>

      <span slot="footer" class="dialog-footer">
      <el-button @click="dialogVisible1 = false">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
      </span>
    </el-dialog>

    <!----------导出用户数据对话框---------->
    <el-dialog
      title="导出用户数据"
      :visible.sync="dialogVisible2"
      width="40%"
      :before-close="handleClose2">

      <el-form ref="excleForm" :model="excleForm" label-width="80px">
        <el-form-item label="文件名" prop="excleName">
          <el-input v-model="excleForm.excleName"></el-input>
        </el-form-item>
        <el-form-item label="导出数量" prop="total">
          <el-input v-model="excleForm.total"></el-input>
        </el-form-item>
        <el-form-item label="导出字段" prop="type">
          <el-checkbox-group v-model="excleForm.type">
            <el-checkbox label="u.loginName" name="type">登录名</el-checkbox>
            <el-checkbox label="u.tel" name="type">手机号</el-checkbox>
            <el-checkbox label="GROUP_CONCAT(r.`name`)" name="type">拥有角色</el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="排序方式" prop="order">
          <el-radio-group v-model="excleForm.order">
            <el-radio label="asc">升序</el-radio>
            <el-radio label="desc">降序</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="排序字段" prop="orderType">
          <el-checkbox-group v-model="excleForm.orderType">
            <el-checkbox label="u.id" name="type">ID</el-checkbox>
            <el-checkbox label="u.createTime" name="type">创建时间</el-checkbox>
          </el-checkbox-group>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="adexcel">导出</el-button>
          <el-button>取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <!----------绑定角色对话框---------->
    <el-dialog
      title="为用户绑定角色"
      :visible.sync="dialogVisible3"
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
            :label="item.name"
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
        name: "users",
        data(){
            return{
                //列表
                tableData:[],
                //分页
                current:1,
                sizes:[4,8,12],
                size:4,
                total:0,
                //查询
                formInline:{
                    userName:'',
                    loginName:'',
                    tel:'',
                },
                //对话框
                dialogVisible1: false,
                dialogVisible2: false,
                dialogVisible3: false,
                //form表单
                form1:{
                    userName:'',
                    loginName:'',
                    tel:'',
                    zt:'',
                    image:'',
                    passWord:'',
                    sex:'',
                },
                form2:{},
                form3:{},
                //绑定
                userName:"",
                userId:"",
                options: [],
                value: [],
                lists: [],
                loading: false,
                states:[],
                //图片
                imageUrl:'',
                //导出
                excleForm:{
                    total:'',
                    type:[],
                    order:'',
                    orderType:[],
                    excleName:''
                },
            }
        },
        methods:{
            //列表查询
            list(){
                this.$axios.get("http://localhost:10002/user/listUser",{
                    params:{
                        //分页
                        current:this.current,
                        size:this.size,
                        //查询
                        userName:this.formInline.userName,
                        loginName:this.formInline.loginName,
                        tel:this.formInline.tel,
                    }
                }).then(res=>{
                    this.tableData = res.data.result.dat;
                    this.current=res.data.result.current;
                    this.size=res.data.result.size;
                    this.total=res.data.result.totals;
                })
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
            //查询按钮
            onSubmit(){
                this.list();
            },
            //关闭对话框
            handleClose1() {
                this.dialogVisible1=false;
            },
            handleClose2() {
                this.dialogVisible2=false;
            },
            handleClose3() {
                this.dialogVisible3=false;
            },
            //点击按钮进入添加对话框
            toAdd(){
                this.form1={};
                this.dialogVisible1=true;
            },
            //点击按钮进入导出用户数据页面
            dc(){
                this.dialogVisible2=true;
            },
            //点击按钮进入绑定数据页面
            bd(row){
                this.dialogVisible3=true;
                console.log(row)

                this.userName=row.userName;
                this.userId=row.id;
                row.baseRoles.forEach((b,i)=>{
                    this.value.push(b.id);
                })
            },
            //获取用户对应角色
            remoteMethod(query) {
                this.loading = true;
                setTimeout(() => {
                    this.$axios.get("http://localhost:10002/role/selallrole",{params:{roleName:query}}).then((response)=>{
                        console.log(response)
                        this.options= response.data.result
                        this.loading = false;
                    }).catch((error)=>{
                        this.loading = false;
                    })
                }, 200);
            },
            //绑定权限
            getSelectedRole(){
                //给用户绑定角色信息
                this.$axios.get("http://localhost:10002/user/bindRoleForUser",
                    {params:{id:this.userId,ids:this.value.toString()}}).then((response)=>{
                    //获取数据
                    if(response.data.code==0){
                        this.$message({
                            message: '操作成功！',
                            type: 'success'
                        });
                        //
                        this.value=[];
                        this.lists=[];
                        this.states=[];
                        this.options=[];
                        //关闭对话框
                        this.dialogVisible3=false;
                        this.list();
                    }

                }).catch((error)=>{

                })
            },
            //添加用户
            save(){
                this.$axios.post("http://localhost:10002/user/add",this.form1).then((response)=>{
                    if(response.data) {
                        alert("添加成功")
                        this.dialogVisible1=false;
                    }
                    else {
                        alert("添加失败");
                    }
                }).catch((error)=>{

                })
            },
            //图片
            handleAvatarSuccess(res,file){
                this.imageUrl = URL.createObjectURL(file.raw);
                this.form1.image=res;
            },
            //改变状态 激活冻结
            ChangeUserZt(row){
                this.$axios.get("http://localhost:10002/user/ChangeUserZt",{params:{
                        id:row.id,
                        zt:row.zt
                    }}).then((res)=>{
                    if(res.data){
                        this.list();
                        this.$message({
                            message:"修改状态成功",
                            type:'success'
                        });
                    }else{
                        this.$message({
                            message:"修改状态失败",
                            type:'warning'
                        });
                    }
                })
            },
            //导出excel
            adexcel(){
                this.$axios.post("http://localhost:10002/user/toExcel",this.excleForm).then((response)=>{
                    this.$message({
                        message: '导出数据成功！！！',
                        type: 'success'
                    });
                    this.dialogVisible2=false;
                }).catch((error)=>{
                    this.$message({
                        message: '导出数据失败！！！',
                        type: 'warning'
                    });
                    this.$message.error(JSON.stringify(error.data));
                })

            },
            //修改
            toUpdate(row){

                this.dialogVisible1=true;
                //回显
                this.form1=row;
                //图片回显
                this.imageUrl=row.image;
            },
            //导出word
            toWord(row){
                this.$axios.post("http://localhost:10002/user/toWord",row).then(res=>{
                    if(res.data.code==200){
                        this.list();
                        this.$message({
                            message: '恭喜你，导出数据成功！！！',
                            type: 'success'
                        });
                    }else{
                        this.$message({
                            message: '警告哦，导出数据失败！！！',
                            type: 'warning'
                        });
                    }
                });
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
