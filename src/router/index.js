import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children:[
      {
        path: '/',
        name: 'index',
        component: ()=> import('../views/home/Index'),
      },
      {
        path: '/ddguanli',
        name: 'ddguanli',
        component: ()=> import('../views/home/Ddgl'),
      },
      {
        path: '/zhongcai',
        name: 'zhongcai',
        component: ()=> import('../views/home/Zhongcai'),
      },
      {
        path: '/ccdotc',
        name: 'ccdotc',
        component: ()=> import('../views/ccdotc/Index')
      }
    ]
  },
  {
    path: '/ccuser',
    name: 'ccuser',
    component: ()=> import('../views/ccdotc/Ccuser'),
    children:[
      {
        path: '/ccuser',
        name: 'ccuser',
        component: ()=> import('../views/ccdotc/ccuser/Qianbao')
      },
      {
        path: '/ccuser/chongzhi',
        name: 'chongzhi',
        component: ()=> import('../views/ccdotc/ccuser/Chongzhi')
      },
      {
        path: '/ccuser/tixian',
        name: 'tixian',
        component: ()=> import('../views/ccdotc/ccuser/Tixian')
      }
    ]
  },
  {
    path: '/ddinfow',
    name: 'ddinfow',
    component: ()=> import('../views/page/ddgl/Ddinfow')
  },
  {
    path: '/demo',
    name: 'demo',
    component: ()=> import('../components/Demo')
  },
  {
    path: '/fabu',
    name: 'Fabu',
    component: ()=> import('../views/page/Fabu')
  },
  {
    path: '/error',
    name: 'error',
    component: ()=> import('../components/Errer')
  },
  {
    path: '/beizhu',
    name: 'beizhu',
    component: ()=> import('../views/page/Beizhu')
  },
  {
    path: '/mairu',
    name: 'mairu',
    component: ()=> import('../views/page/Mairu')
  },
  {
    path: '/jiaoyi',
    name: 'jiaoyi',
    component: ()=> import('../views/page/Jiaoyib')
  },
  {
    path: '/Ddlist',
    name: 'ddlist',
    component: ()=> import('../views/page/Ddlist')
  },
  {
    path: '/qianbao',
    name: 'qianbao',
    component: ()=> import('../views/user/Qianbao')
  },
  {
    path: '/chongzhi',
    name: 'chongzhi',
    component: ()=> import('../views/user/Chongzhi')
  },
  {
    path: '/tixian',
    name: 'tixian',
    component: ()=> import('../views/user/Tixian')
  }
  ,
  {
    path: '/baozhengjin',
    name: 'baozhengjin',
    component: ()=> import('../views/user/Bzjadd')
  },
  {
    path: '/lqcsb',
    name: 'lqcsb',
    component: ()=> import('../views/user/Lqcsb')
  },
  {
    path: '/guize',
    name: 'guize',
    component: ()=> import('../views/page/Guize'),
    children:[
      {
        path: '/guize/jygz',
        name: 'guize_jygz',
        component: ()=> import('../views/page/guize/Jygz.vue')
      },
      {
        path: '/guize/bzjgz',
        name: 'guize_bzjgz',
        component: ()=> import('../views/page/guize/Bzjgz.vue')
      },
      {
        path: '/guize/zcygz',
        name: 'guize_zcygz',
        component: ()=> import('../views/page/guize/Zcygz.vue')
      },
      {
        path: '/guize/dylgz',
        name: 'guize_dylgz',
        component: ()=> import('../views/page/guize/Dylgz.vue')
      },
      {
        path: '/guize/derlgz',
        name: 'guize_derlgz',
        component: ()=> import('../views/page/guize/Derlgz.vue')
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
