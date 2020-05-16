import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/components/homePage'
import LoginPage from '@/components/loginPage'

Vue.use(Router)

export default new Router({
  routes: [
    // {
    //   path: '/',
    //   name: 'login',
    //   component: Login
    // },
    {
        path: '/',
        name: 'loginPage',
        component: LoginPage,
        beforeEnter: (to, from, next) => {
            console.log(to);
            console.log(from);
            next();
            // console.log(next)
        }
    },
    {
        path: '/homepage',
        name: 'homepage',
        component: HomePage,
        beforeEnter: (to, from, next) => {
            // ...
            console.log(to);
            console.log(from);
            next();
            // console.log(next)
        }
    }
  ]
})
