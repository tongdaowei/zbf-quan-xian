import Vue from 'vue'
import Router from 'vue-router'


//引入登录的组件
import login from '@/view/login/login'
import home from '@/view/home/home'

//左侧菜单页面
import leftMenu from '@/view/menu/left-menu'

//注册页面
import register from '@/view/register/register'
import testTel from '@/view/register/test-tel'
import registerInfo from '@/view/register/register-info'
import registerOk from '@/view/register/register-ok'

//忘记密码
import forgetPass from '@/view/forgetPass/forgetPass'

//业务页面
import test1 from '@/view/test/test1'
import test2 from '@/view/test/test2'
import userList from '@/view/yewupage/user/userList'
import noAuth from '@/view/error/auth/no-auth'
import menuManger from '@/view/yewupage/menu/menu-manger'
//集中菜单crud操作
import menuMangerCrud from '@/view/yewupage/menu/menu-manger-crud-tab'
import addMenu from '@/view/yewupage/menu/add-menu'
import updateMenu from '@/view/yewupage/menu/update-menu'
import deleteMenu from '@/view/yewupage/menu/delete-menu'

import roleManger from '@/view/yewupage/role/roleManger'

Vue.use(Router)

/**
 * 重写路由的push方法
 */
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error=> error)
}

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: login
    },
    {
      path: '/home',
      name: 'home',
      component: home,
      children:[
         {path:"/leftMenu",name:"leftMenu",component:leftMenu},
         {path:"/test1",name:"test1",component:test1},
         {path:"/test2",name:"test2",component:test2},
         {path:"/userList",name:"userList",component:userList},
         {path:"/noAuth",name:"noAuth",component:noAuth},
         {path:"/menuManger",name:"menuManger",component:menuManger},
         {path:"/menuMangerCrud",name:"menuMangerCrud",component:menuMangerCrud},
         {path:"/addMenu",name:"addMenu",component:addMenu},
         {path:"/updateMenu",name:"updateMenu",component:updateMenu},
         {path:"/deleteMenu",name:"deleteMenu",component:deleteMenu},
         {path:"/roleManger",name:"roleManger",component:roleManger},
      ]
    },
    {path:"/register",name:"register",component:register},
    {path:"/registerOk",name:"registerOk",component:registerOk},
    {path:"/registerInfo",name:"registerInfo",component:registerInfo},
    {path:"/testTel",name:"testTel",component:testTel},
    {path:"/forgetPass",name:"forgetPass",component:forgetPass}
  ]
})
