// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'

//vue的样式配置start
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI)

//引入store.js文件
import stores from './store.js'
Vue.prototype.$store=stores.store

//一些配置的全局数据
import gloableData from './gloable-data.js'
Vue.prototype.$gloableData=gloableData

//引入axios组件
import axios from 'axios'
Vue.prototype.$axios=axios

Vue.config.productionTip = false

  //路由拦截器
  router.beforeEach((to, from, next) => {
    // 逻辑操作
    next()
  })


  //添加请求拦截器
  axios.interceptors.request.use((config)=>{
    let token=window.localStorage.getItem("token");
    config.headers['token']=token
    return config;
  },(error)=>{
    return Promise.reject(error)
  })

  //添加响应拦截器
  axios.interceptors.response.use((response)=>{

    let yy=response.headers['newtoken'];

    if(yy!=undefined){
      //重新设置localStorge中的token的值，用来刷新tocken
      window.localStorage.setItem("token",yy)
    }
    //无权限
    if(response.data.code==1000){
       //跳转到无权限页面
       router.push("/noAuth")
    }
    //没有登录或者是过期
    if(response.data.code==1001||response.data.code==1002){
      //跳转到登录页面
      router.push("/")
    }

    return response;
  },(error)=>{
    //失败跳转到登录界面
    router.replace({
      path: '/',
      query: {redirect: router.currentRoute.fullPath}
    })
  })

  /* eslint-disable no-new */
  new Vue({
    el: '#app',
    router,
    components: { App },
    template: '<App/>'
  })
