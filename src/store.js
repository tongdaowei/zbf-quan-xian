import VUE from 'vue'
import Vuex from 'vuex'
VUE.use(Vuex)
//引入VUEX
const store=new Vuex.Store({
  state:{
    userId:"",
    userInfo: {},
    menuInfo:{},
    roleId:0,
    registerInfo:{},
    tel:""
  },
  mutations:{
    getUserId(state){
      return state.userId;
    },
    getUserInfo(state){
      return state.userInfo;
    },
    getMenuInfo(state){
      return state.menuInfo;
    },
    getRoleId(state){
      return state.roleId;
    }
  }
})

export default {
  store
}
