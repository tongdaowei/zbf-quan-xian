<template>
    <div style="width: 70%">
      <el-form ref="form" :model="form" label-width="80px">
        <el-form-item label="权限ID">
          <el-input :disabled=disabled v-model="form.id"></el-input>
        </el-form-item>

        <el-form-item label="权限名称">
          <el-input  v-model="form.menuName"></el-input>
        </el-form-item>
        <el-form-item label="权限URL">
          <el-input  v-model="form.url"></el-input>
        </el-form-item>
        <el-form-item label="父级编码">
          <el-input :disabled=disabled v-model="form.parentCode"></el-input>
        </el-form-item>

        <el-form-item label="当前编码">
          <el-input :disabled=disabled  v-model="form.code"></el-input>
        </el-form-item>

        <el-form-item label="权限图标">
          <el-input  v-model="form.imagePath"></el-input>
        </el-form-item>

        <el-form-item label="权限等级">
          <el-select :disabled=disabled v-model="form.leval" placeholder="请选择权限等级">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button icon="el-icon-edit" type="primary" @click="submitUpdate">提交修改</el-button>
          <el-button icon="el-icon-close" >取消</el-button>
        </el-form-item>

      </el-form>
    </div>
</template>

<script>
    export default {
        name: "update-menu.vue",
        data(){
          return{
            form: this.$store.state.menuInfo,
            disabled:true,
            options: this.$gloableData.quanXianLeval
          }
        },
        methods:{
          changeUpdateTab(){
            this.$data.form=this.$store.state.menuInfo;
          },
          submitUpdate(){

          }
        },
        activated() {

        }
    }
</script>

<style scoped>

</style>
