import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
// import Index from '../views/Index.vue'
// function foo() {

// }

// const foo = () => {

// }

Vue.use(VueRouter)

const routes = [{
        path: '/GAZ',
        name: 'GAZ',
        component: () =>
            import ('../components/Gaz/App'),
    },
    {
        path: '/suc',
        name: 'suc',
        component: () =>
            import ('../components/Gaz/suc'),
    },
    {
        path: '/',
        name: 'Index',
        component: () =>
            import ('../views/index/layout'),
        redirect: '/Homepage',
        children: [{
                path: '/Homepage',
                name: 'Homepage',
                component: () =>
                    import ('../views/index/Homepage'),
            },
            {
                path: '/Coremechanism',
                name: 'Coremechanism',
                component: () =>
                    import ('../views/index/Coremechanism'),
            },
            {
                path: '/Securityrules',
                name: 'Securityrules',
                component: () =>
                    import ('../views/index/Securityrules'),
            },
            {
                path: '/Transactionrules',
                name: 'Transactionrules',
                component: () =>
                    import ('../views/index/Transactionrules'),
            },
            {
                path: '/Publicsale',
                name: 'Publicsale',
                component: () =>
                    import ('../views/index/Publicsale'),
            },
            {
                path: '/Arbitrationrules',
                name: 'Arbitrationrules',
                component: () =>
                    import ('../views/index/Arbitrationrules'),
            },
            {
                path: '/Exchange',
                name: 'Exchange',
                component: () =>
                    import ('../views/index/Exchange'),
            }
        ]
    },
    {
        path: '/Activities',
        name: 'Activities',
        component: () =>
            import ('../views/index/activities'),
    },
    {
        path: '/home',
        name: 'Home',
        component: Home,
        children: [{
                path: '/',
                name: 'index',
                component: () =>
                    import ('../views/home/Index'),
            },
            {
                path: '/ddguanli',
                name: 'ddguanli',
                component: () =>
                    import ('../views/home/Ddgl'),
            },
            {
                path: '/zhongcai',
                name: 'zhongcai',
                component: () =>
                    import ('../views/home/Zhongcai'),
            },
            {
                path: '/ccdotc',
                name: 'ccdotc',
                component: () =>
                    import ('../views/ccdotc/Index')
            }
        ]
    },
    {
        path: '/ccuser',
        name: 'ccuser',
        component: () =>
            import ('../views/ccdotc/Ccuser'),
        children: [{
                path: '/ccuser',
                name: 'ccuser',
                component: () =>
                    import ('../views/ccdotc/ccuser/Qianbao')
            },
            {
                path: '/ccuser/chongzhi',
                name: 'chongzhi',
                component: () =>
                    import ('../views/ccdotc/ccuser/Chongzhi')
            },
            {
                path: '/ccuser/tixian',
                name: 'tixian',
                component: () =>
                    import ('../views/ccdotc/ccuser/Tixian')
            }
        ]
    },
    {
        path: '/simu',
        name: 'simu',
        component: () =>
            import ('../views/ccdotc/Simu'),
        children: [{
                path: '/simu',
                name: 'simu',
                component: () =>
                    import ('../views/ccdotc/simu/Qianbao')
            },
            {
                path: '/simu/chongzhi',
                name: 'chongzhi',
                component: () =>
                    import ('../views/ccdotc/simu/Chongzhi')
            },
            {
                path: '/simu/tixian',
                name: 'tixian',
                component: () =>
                    import ('../views/ccdotc/simu/Tixian')
            }
        ]
    },
    {
        path: '/ddinfow',
        name: 'ddinfow',
        component: () =>
            import ('../views/page/ddgl/Ddinfow')
    },
    {
        path: '/demo',
        name: 'demo',
        component: () =>
            import ('../components/Demo')
    },
    {
        path: '/fabu',
        name: 'Fabu',
        component: () =>
            import ('../views/page/Fabu')
    },
    {
        path: '/error',
        name: 'error',
        component: () =>
            import ('../components/Errer')
    },
    {
        path: '/beizhu',
        name: 'beizhu',
        component: () =>
            import ('../views/page/Beizhu')
    },
    {
        path: '/mairu',
        name: 'mairu',
        component: () =>
            import ('../views/page/Mairu')
    },
    {
        path: '/jiaoyi',
        name: 'jiaoyi',
        component: () =>
            import ('../views/page/Jiaoyib')
    },
    {
        path: '/Ddlist',
        name: 'ddlist',
        component: () =>
            import ('../views/page/Ddlist')
    },
    {
        path: '/qianbao',
        name: 'qianbao',
        component: () =>
            import ('../views/user/Qianbao')
    },
    {
        path: '/chongzhi',
        name: 'chongzhi',
        component: () =>
            import ('../views/user/Chongzhi')
    },
    {
        path: '/tixian',
        name: 'tixian',
        component: () =>
            import ('../views/user/Tixian')
    },
    {
        path: '/baozhengjin',
        name: 'baozhengjin',
        component: () =>
            import ('../views/user/Bzjadd')
    },
    {
        path: '/lqcsb',
        name: 'lqcsb',
        component: () =>
            import ('../views/user/Lqcsb')
    },
    {
        path: '/guize',
        name: 'guize',
        component: () =>
            import ('../views/page/Guize'),
        children: [{
                path: '/guize/jygz',
                name: 'guize_jygz',
                component: () =>
                    import ('../views/page/guize/Jygz.vue')
            },
            {
                path: '/guize/bzjgz',
                name: 'guize_bzjgz',
                component: () =>
                    import ('../views/page/guize/Bzjgz.vue')
            },
            {
                path: '/guize/zcygz',
                name: 'guize_zcygz',
                component: () =>
                    import ('../views/page/guize/Zcygz.vue')
            },
            {
                path: '/guize/dylgz',
                name: 'guize_dylgz',
                component: () =>
                    import ('../views/page/guize/Dylgz.vue')
            },
            {
                path: '/guize/derlgz',
                name: 'guize_derlgz',
                component: () =>
                    import ('../views/page/guize/Derlgz.vue')
            }
        ]
    }
]

const router = new VueRouter({
    mode: 'hash',
    routes
})

export default router