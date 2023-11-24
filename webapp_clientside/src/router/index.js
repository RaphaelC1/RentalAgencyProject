import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import About_us from '@/components/About_us'
import Login from '@/components/Login'
import Registration from '@/components/Registration'
import Properties from '@/components/Properties'
import Terms_conditions from '@/components/Terms_conditions'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/About',
      name: 'About_us',
      component: About_us
    },
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Registration',
      name: 'Registration',
      component: Registration
    },
    {
      path: '/Properties',
      name: 'Properties',
      component: Properties
    },
    {
      path: '/Terms_conditions',
      name: 'Terms_conditions',
      component: Terms_conditions
    },


  ]
})
