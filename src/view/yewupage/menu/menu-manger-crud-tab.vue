<template>

  <el-tabs v-model="activeName" type="card" @tab-click="handleClick">
    <el-tab-pane label="修改当前权限" name="first" >
      <span slot="label"><i class="el-icon-edit-outline"></i> 修改当前权限</span>
      <updateMenu ref="update"></updateMenu>
    </el-tab-pane>
    <el-tab-pane label="添加权限" name="second">
      <span slot="label"><i class="el-icon-circle-plus"></i> 添加权限</span>
      <addMenu ref="add"></addMenu>
    </el-tab-pane>
    <el-tab-pane label="删除当前权限" name="third">
      <span slot="label"><i class="el-icon-delete-solid"></i> 删除当前权限</span>
      <deleteMenu ref="delete"></deleteMenu>
    </el-tab-pane>
  </el-tabs>

</template>

<script>

  import addMenu from '@/view/yewupage/menu/add-menu'
  import updateMenu from '@/view/yewupage/menu/update-menu'
  import deleteMenu from '@/view/yewupage/menu/delete-menu'

    export default {
        components:{addMenu,updateMenu,deleteMenu},
        name: "menu-manger-crud",
        data(){
          return{
            activeName: 'first'
          }
        },
        methods:{
          handleClick(tab, event) {

          },
          updateDataTab(){
            //刷新数据
            this.$refs.update.changeUpdateTab()
            this.$refs.add.changeAddTab()
            this.$refs.delete.changeDeleteTab()

          }
        }
    }
</script>

<style scoped>

</style>
