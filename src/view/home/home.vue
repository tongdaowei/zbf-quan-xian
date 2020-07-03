<template>
    <div>
      <h1>当前用户：{{userInfo.userName}}</h1>
       <div style="width: auto;height: 100%;float: left">
         <keep-alive>
           <leftMenu></leftMenu>
         </keep-alive>
       </div>
       <div style="width: auto;height: 100%;float: left;margin-left: 5px">
         <keep-alive>
           <router-view style="width: 100%;height: 100%"></router-view>
         </keep-alive>
       </div>
    </div>
</template>

<script>
    import leftMenu from '@/view/menu/left-menu'
    export default {
        components:{leftMenu},
        name: "home",
        data(){
          return{
            userInfo: ""
          }
        },
        methods:{
          getUserInfo(){

          }
        },
        activated() {
          if(window.localStorage.getItem("userInfo")==null){
            this.$data.userInfo=JSON.parse(window.localStorage.getItem("userInfo")==null?"":window.localStorage.getItem("userInfo"))
          }else if(window.localStorage.getItem("userInfo")=="undefined"){
            this.$data.userInfo=parse(window.localStorage.getItem("userInfo")=="undefined"?"":window.localStorage.getItem("userInfo"))
          }

        }
    }
</script>

<style scoped>

</style>
