<template>
  <div>
    <el-table
      :data="tableData"
      border>
      <el-table-column
        fixed
        prop="id"
        label="菜单ID"
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
        prop="address"
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
        prop="address"
        label="父级CODE">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
    export default {
        name: "test",
        data(){
            return{
                tableData:[],
            }
        },
        methods:{
            list(){
                this.$axios.get("http://localhost:10002/menu/listMenu",{params:{id:1}}).then(res=>{
                    this.tableData=res.data;
                })
            }
        },
        created() {
            this.list();
        }
    }
</script>

<style scoped>

</style>
