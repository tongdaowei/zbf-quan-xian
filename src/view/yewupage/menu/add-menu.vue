<template>
  <div style="width: 70%">
    <el-form ref="form" :model="form" label-width="80px">
      <el-form-item v-show="isShow"  label="父级名称">
        <el-input :disabled=disabled v-model="form.parentName"></el-input>
      </el-form-item>
      <el-form-item v-show="isShow" label="父级ID">
        <el-input :disabled=disabled v-model="form.parentId"></el-input>
      </el-form-item>
      <el-form-item v-show="isShow" label="父级编码">
        <el-input :disabled=disabled v-model="form.parentCode"></el-input>
      </el-form-item>
      <el-form-item label="权限名称">
        <el-input  v-model="form.menuName"></el-input>
      </el-form-item>
      <el-form-item label="权限URL">
        <el-input  v-model="form.url"></el-input>
      </el-form-item>
      <el-form-item label="权限图标">
        <el-input  v-model="form.imagePath"></el-input>
      </el-form-item>
      <el-form-item  label="权限等级">
        <el-select @change="seleChange" v-model="form.leval" placeholder="请选择权限等级">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value">
          </el-option>
        </el-select>
      </el-form-item>

      <el-form-item>
        <el-button icon="el-icon-circle-plus" type="primary">添加保存</el-button>
        <el-button icon="el-icon-close" >取消</el-button>
      </el-form-item>

    </el-form>
  </div>
</template>

<script>
    export default {
        name: "add-menu.vue",
        data(){
          return{
            form:{
              parentCode:this.$store.state.menuInfo.code,
              parentName:this.$store.state.menuInfo.menuName,
              parentId:this.$store.state.menuInfo.id,
              leval:this.$store.state.menuInfo.leval+1,
              imagePath:""
            },
            disabled:true,
            options: this.$gloableData.quanXianLeval,
            isShow: true
          }
        },
        activated() {

        },
        methods:{
          seleChange(){
             if(this.$data.form.leval==1){
               this.$data.isShow=false
             }else{
               this.$data.isShow=true
             }
          },
          changeAddTab(){//用来刷新缓存的数据
            this.$data.form.parentCode=this.$store.state.menuInfo.code
            this.$data.form.parentName=this.$store.state.menuInfo.menuName
            this.$data.form.parentId=this.$store.state.menuInfo.id
            this.$data.form.leval=this.$store.state.menuInfo.leval+1
          }
        }
    }
</script>

<style scoped>

</style>
