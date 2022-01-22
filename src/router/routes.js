export default [
    {
        path: '/GAZ',
        name: 'GAZ',
        component: () =>
            import('@/components/Gaz/App'),
    },
    {
        path: '/suc',
        name: 'suc',
        component: () =>
            import('@/components/Gaz/suc'),
    },

    // 1 默认路由 /Homepage
    {
        path: '/',
        name: 'Index',
        component: () =>
            import('@/views/index/layout'),
        redirect: '/Homepage',
        children: [
            {
                path: '/Homepage',
                name: 'Homepage',
                component: () =>
                    import('@/views/index/Homepage'),
            },
            {
                path: '/about',
                name: 'about',
                component: () =>
                    import('@/views/index/about'),
            },
            {
                path: '/rule',
                name: 'rule',
                component: () =>
                    import('@/views/index/rule'),
            },
            {
                path: '/contact',
                name: 'contact',
                component: () =>
                    import('@/views/index/contact'),
            },
            {
                path: '/GazOTC',
                name: 'GazOTC',
                component: () =>
                    import('@/views/index/GazOTC'),
            },
            {
                path: '/file',
                name: 'file',
                component: () =>
                    import('@/views/index/file'),
            },
            {
                path: '/news',
                name: 'news',
                component: () =>
                    import('@/views/index/news'),
            },
            {
                path: '/Coremechanism',
                name: 'Coremechanism',
                component: () =>
                    import('@/views/index/Coremechanism'),
            },
            {
                path: '/Securityrules',
                name: 'Securityrules',
                component: () =>
                    import('@/views/index/Securityrules'),
            },
            {
                path: '/Transactionrules',
                name: 'Transactionrules',
                component: () =>
                    import('@/views/index/Transactionrules'),
            },
            {
                path: '/Publicsale',
                name: 'Publicsale',
                component: () =>
                    import('@/views/index/Publicsale'),
            },
            {
                path: '/Arbitrationrules',
                name: 'Arbitrationrules',
                component: () =>
                    import('@/views/index/Arbitrationrules'),
            },
            {
                path: '/Exchange',
                name: 'Exchange',
                component: () =>
                    import('@/views/index/Exchange'),
            }
        ]
    },
    // 2 活动空头页面
    {
        path: '/Activities',
        name: 'Activities',
        component: () =>
            import('@/views/index/activities'),
    },
    // 3 一键注册页面

    {
        path: '/yjzhuce',
        name: 'yjzhuce',
        component: () =>
            import('@/components/yjzhuce'),
    },

    {
        path: '/verifyIdentity',
        name: 'verifyIdentity',
        component: () => import('@/views/home/verifyIdentity'),
    },
	{
        path: '/verifyIdentity/camera',
        name: 'camera',
        component: () => import('@/views/home/verifyIdentity/camera'),
    },
    // 3 home 页面 dapp页面
    {
        path: '/home',
        name: 'Home',
        redirect: '/home/frienchOtc',
        component: () => import('@/views/home/layout'),
        children: [
			{
			    path: '/home/free',
			    name: 'index',
			    component: () => import('@/views/home/freeGuarantee'),
			    meta: {
			        name: "message.dapp.FreeGuarantee",
			        icon: require('@/assets/dappImg/1.png')
			    },
			    redirect: '/home/freeGuarantee/list',
			    children: [
			        {
			            path: "/home/freeGuarantee/list",
			            meta: {name: 'message.dapp.tradeList'},
			            component: () => import("@/views/home/freeGuarantee/list.vue"),
			        },
			        {
			            path: "/home/freeGuarantee/fabu",
			            meta: {name: 'message.dapp.ReleaseOrder'},
			            component: () => import("@/views/home/freeGuarantee/fabu.vue"),
			
			        },
					{
					    path: '/home/freeGuarantee/detail',
					    meta: {name: 'message.details', isHideChild: true},
					    name: 'detail',
					    component: () =>
					        import('@/views/home/freeGuarantee/detail.vue')
					},
			    ]
			},
            {
                path: '/home/frienchOtc',
                name: 'index',
                component: () => import('@/views/home/frienchOtc'),
                meta: {
                    name: "message.dapp.CurrencyOTC",
                    icon: require('@/assets/dappImg/1.png')
                },
                redirect: '/home/frienchOtc/list',
                children: [
                    {
                        path: "/home/frienchOtc/list",
                        meta: {name: 'message.dapp.tradeList'},
                        component: () => import("@/views/home/frienchOtc/list.vue"),
                    },
                    {
                        path: "/home/frienchOtc/fabu",
                        meta: {name: 'message.dapp.ReleaseOrder'},
                        component: () => import("@/views/home/frienchOtc/fabu.vue"),

                    },
                ]
            },
            {
                path: '/home/currencyOtc',
                name: 'currencyOtc',
                component: () => import('@/views/home/currencyOtc'),
                meta: {
                    name: 'message.dapp.CoinOTC',
                    icon: require('@/assets/dappImg/7.png')
                },
                children: [
                    {
                        path: "/home/currencyOtc/list",
                        meta: {name: 'message.dapp.tradeList'},
                        component: () => import("@/views/home/currencyOtc/list.vue"),
                    },
                    {
                        path: "/home/currencyOtc/fabu",
                        meta: {name: 'message.dapp.ReleaseOrder'},
                        component: () => import("@/views/home/currencyOtc/fabu.vue"),

                    },
                ]
            },
            {
                path: '/home/wallet',
                name: 'wallet',
                component: () => import('@/views/home/wallet'),
                meta: {
                    name: 'message.dapp.wallet',
                    icon: require('@/assets/dappImg/2.png')
                },
                children: [
                    {
                        path: "/home/wallet/legalCoinWallet",
                        meta: {name: 'message.dapp.legalWallet'},
                        component: () => import("@/views/home/wallet/legalCoinWallet/Qianbao.vue"),
                    },
                    {
                        path: "/home/wallet/ccuser",
                        meta: {name: 'message.dapp.CoinWallet'},
                        component: () => import("@/views/home/wallet/ccuser/Qianbao.vue"),
                    },
                    {
                        path: "/home/wallet/simu",
                        meta: {name: 'message.dapp.LockWallet'},
                        component: () => import("@/views/home/wallet/simu/Qianbao.vue"),
                    },
                ]

            },
            {
                path: '/home/orderCenter',
                name: 'orderCenter',
                component: () => import('@/views/home/ddgl/index.vue'),
                meta: {
                    name: 'message.dapp.OrderCenter',
                    icon: require('@/assets/dappImg/4.png')
                },
                redirect: '/home/orderCenter/LCRelease',
                children: [
                    {
                        path: "/home/orderCenter/LCRelease",
                        meta: {name: 'message.dapp.legalIssue'},
                        component: () => import('@/views/home/ddgl/LCRelease'),
                    },
                    {
                        path: "/home/orderCenter/LCTransaction",
                        meta: {name: 'message.dapp.LegalTransaction'},
                        component: () => import('@/views/home/ddgl/LCTransaction'),
                    },
                    {
                        path: '/home/orderCenter/LCRelease/Ddinfow',
                        meta: {name: 'message.details', isHideChild: true},
                        name: 'Ddinfow',
                        component: () =>
                            import('@/views/home/ddgl/LCTransaction/Ddinfow')
                    },
                    {
                        path: "/home/orderCenter/CCRelease",
                        meta: {name: 'message.dapp.CurrencyIssue'},
                        component: () => import('@/views/home/ddgl/CCRelease'),
                    },
                    {
                        path: "/home/orderCenter/CCTransaction",
                        meta: {name: 'message.dapp.CurrencyTransaction'},
                        component: () => import('@/views/home/ddgl/CCTransaction'),
                    },
                ]
            }
            ,
            {
                path: '/home/user',
                name: 'user',
                component: () => import('@/views/home/user/index.vue'),
                meta: {
                    name: 'message.dapp.PersonalCenter',
                    icon: require('@/assets/dappImg/5.png')
                }
            }
            ,
            {
                path: '/home/Arbitration',
                name: 'Arbitration',
                component: () => import('@/views/home/arbitration/index'),
                meta: {
                    name: 'message.dapp.Arbitration',
                    icon: require('@/assets/dappImg/6.png')
                },
                redirect: '/home/arbitration/arbitration',
                children: [
                    {
                        path: '/home/arbitration/arbitration',
                        meta: {name: 'message.dapp.arbitratorsLister'},
                        name: 'arbitrationRoll',
                        component: () => import('@/views/home/arbitration/arbitrationList')
                    },
                    {
                        path: '/home/arbitration/firstOrder',
                        meta: {name: 'message.dapp.firstOrdersList'},
                        component: () => import('@/views/home/arbitration/firstOrder/index'),
                        children: [
                            {
                                path: '/home/arbitration/firstOrder',
                                meta: {name: 'message.dapp.firstOrders'},
                                component: () => import('@/views/home/arbitration/firstOrder/firstOrder')
                            },
                            {
                                path: '/home/arbitration/firstOrder/myPart',
                                meta: {name: 'message.dapp.myPart1'},
                                component: () => import('@/views/home/arbitration/firstOrder/myPart')
                            }
                        ]

                    },
                    {
                        path: '/home/arbitration/twoOrder',
                        meta: {name: 'message.dapp.secondOrderList'},
                        component: () => import('@/views/home/arbitration/twoOrder/index'),
                        children: [
                            {
                                path: '/home/arbitration/twoOrder',
                                meta: {name: 'message.dapp.secondOrder'},
                                component: () => import('@/views/home/arbitration/twoOrder/twoOrder')
                            },
                            {
                                path: '/home/arbitration/twoOrder/myPart',
                                meta: {name: 'message.dapp.myPart2'},
                                component: () => import('@/views/home/arbitration/twoOrder/myPart')
                            }
                        ]

                    },
                    {
                        path: '/home/arbitration/myPart',
                        meta: {name: 'message.dapp.myPart'},
                        component: () => import('@/views/home/arbitration/firstOrder/index'),
                        children: [
                            {
                                path: '/home/arbitration/myOrder',
                                meta: {name: 'message.dapp.myOrder'},
                                component: () => import('@/views/home/arbitration/myPart/order')
                            },
                            {
                                path: '/home/arbitration/firstOrder/succeedOrder',
                                meta: {name: 'message.dapp.succeedOrderL'},
                                component: () => import('@/views/home/arbitration/myPart/succeedOrder')
                            }
                        ]

                    },

                ]
            },
            {
                path: '/home/nft',
                name: 'rule',
                component: () => import('@/views/home/vipNft/index'),
                meta: {
                    name: 'message.dapp.ntf',
                    icon: require('@/assets/dappImg/3.png')
                    // isHideChild: true
                },
                redirect: '/home/vipNft/compose/index',
                children: [
                    {
                        path: "/home/vipNft/compose/index",
                        meta: {name: 'message.dapp.ntfMinting'},
                        component: () => import('@/views/home/vipNft/compose/index'),
                    },
                    {
                        path: "/home/vipNft/turn/index",
                        meta: {name: 'message.dapp.ntfTransfer'},
                        component: () => import('@/views/home/vipNft/turn/index'),
                    },
                    {
                        path: "/home/vipNft/my/index",
                        meta: {name: 'message.dapp.myNtf'},
                        component: () => import('@/views/home/vipNft/my/index'),
                    },
                ]
            },
            {
                path: '/home/Mining',
                name: 'rule',
                component: () => import('@/views/home/mining/index'),
                meta: {
                    name: 'message.dapp.mining',
                    icon: require('@/assets/dappImg/3.png')
                    // isHideChild: true
                },
                redirect: '/home/mining/abrMine/index',
                children: [
                    {
                        path: "/home/mining/abrMine/index",
                        meta: {name: 'message.dapp.arbitrationMining'},
                        component: () => import('@/views/home/mining/abrMine/index'),
                    },
                    {
                        path: "/home/mining/orederMine/index",
                        meta: {name: 'message.dapp.orderMining'},
                        component: () => import('@/views/home/mining/orederMine/index'),
                    },
                    {
                        path: "/home/mining/traMine/index",
                        meta: {name: 'message.dapp.transactionMining'},
                        component: () => import('@/views/home/mining/traMine/index'),
                    },
                    {
                        path: "/home/mining/safeMine/index",
                        meta: {name: 'message.dapp.insuranceMining'},
                        component: () => import('@/views/home/mining/safeMine/index'),
                    },
                    {
                        path: "/home/mining/runMine/index",
                        meta: {name: 'message.dapp.liquidityMining'},
                        component: () => import('@/views/home/mining/runMine/index'),
                    },
                    {
                        path: "/home/mining/extend/index",
                        meta: {name: 'message.dapp.promoteMining'},
                        component: () => import('@/views/home/mining/extend/index'),
                    },
                ]
            },
            {
                path: '/home/rule',
                name: 'rule',
                component: () => import('@/views/home/rule/index'),
                meta: {
                    name: 'message.dapp.rule',
                    icon: require('@/assets/dappImg/3.png')
                    // isHideChild: true
                },
                redirect: '/home/rule/transactionRules',
                children: [
                    {
                        path: "/home/rule/transactionRules",
                        meta: {name: 'message.dapp.TransactionRules'},
                        component: () => import('@/views/home/rule/transactionRules'),
                    },
                    {
                        path: "/home/rule/marginRules",
                        meta: {name: 'message.dapp.MarginRules'},
                        component: () => import('@/views/home/rule/marginRules'),
                    },
                    {
                        path: "/home/rule/rulesOfArbitrators",
                        meta: {name: 'message.dapp.ArbitratorsRules'},
                        component: () => import('@/views/home/rule/rulesOfArbitrators'),
                    },
                ]
            },
        ]
    },
    // {
    //   path: '/ccuser',
    //   name: 'ccuser',
    //   component: () =>
    //     import('@/views/ccdotc/Ccuser'),
    //   children: [{
    //     path: '/ccuser',
    //     name: 'ccuser',
    //     component: () =>
    //       import('@/views/ccdotc/ccuser/Qianbao')
    //   },
    //   {
    //     path: '/ccuser/chongzhi',
    //     name: 'chongzhi',
    //     component: () =>
    //       import('@/views/ccdotc/ccuser/Chongzhi')
    //   },
    //   {
    //     path: '/ccuser/tixian',
    //     name: 'tixian',
    //     component: () =>
    //       import('@/views/ccdotc/ccuser/Tixian')
    //   }
    //   ]
    // },
    // {
    //   path: '/simu',
    //   name: 'simu',
    //   component: () =>
    //     import('@/views/ccdotc/Simu'),
    //   children: [{
    //     path: '/simu',
    //     name: 'simu',
    //     component: () =>
    //       import('@/views/ccdotc/simu/Qianbao')
    //   },
    //   {
    //     path: '/simu/chongzhi',
    //     name: 'chongzhi',
    //     component: () =>
    //       import('@/views/ccdotc/simu/Chongzhi')
    //   },
    //   {
    //     path: '/simu/tixian',
    //     name: 'tixian',
    //     component: () =>
    //       import('@/views/ccdotc/simu/Tixian')
    //   }
    //   ]
    // },
    // {
    //   path: '/ddinfow',
    //   name: 'ddinfow',
    //   component: () =>
    //     import('@/views/page/ddgl/Ddinfow')
    // },
    {
        path: '/RealName',
        name: 'RealName',
        component: () =>
            import('@/views/index/RealName')
    },
    {
        path: '/error',
        name: 'error',
        component: () =>
            import('@/views/index/error')
    },
    {
        path: '/callback',
        name: 'callback',
        component: () =>
            import('@/views/index/callback')
    },
    // {
    //   path: '/fabu',
    //   name: 'Fabu',
    //   component: () =>
    //     import('@/views/page/Fabu')
    // },
    {
        path: '/error',
        name: 'error',
        component: () =>
            import('@/components/Errer')
    },
    // {
    //   path: '/beizhu',
    //   name: 'beizhu',
    //   component: () =>
    //     import('@/views/page/Beizhu')
    // },
    {
        path: '/mairu',
        name: 'mairu',
        component: () =>
            import('@/views/home/frienchOtc/Mairu')
    },
    // {
    //   path: '/jiaoyi',
    //   name: 'jiaoyi',
    //   component: () =>
    //     import('@/views/page/Jiaoyib')
    // },
    // {
    //   path: '/Ddlist',
    //   name: 'ddlist',
    //   component: () =>
    //     import('@/views/page/Ddlist')
    // },
    // {
    //   path: '/qianbao',
    //   name: 'qianbao',
    //   component: () =>
    //     import('@/views/user/Qianbao')
    // },
    {
        path: '/chongzhi',
        name: 'chongzhi',
        component: () =>
            import('@/views/user/Chongzhi')
    },
    {
        path: '/tixian',
        name: 'tixian',
        component: () =>
            import('@/views/user/Tixian')
    },
    {
        path: '/baozhengjin',
        name: 'baozhengjin',
        component: () =>
            import('@/views/user/Bzjadd')
    },
    {
        path: '/lqcsb',
        name: 'lqcsb',
        component: () =>
            import('@/views/user/Lqcsb')
    },
    // 刷新页面 必须保留
    {
        path: 'refresh',
        name: 'refresh',
        hidden: true,
        component: {
            beforeRouteEnter(to, from, next) {
                next(vm => vm.$router.replace(from.fullPath))
            },
            render: h => h()
        }
    },
    // 页面重定向 必须保留
    {
        path: 'redirect/:route*',
        name: 'redirect',
        hidden: true,
        component: {
            beforeRouteEnter(to, from, next) {
                next(vm => vm.$router.replace(JSON.parse(from.params.route)))
            },
            render: h => h()
        }
    }
    // {
    //   path: '/guize',
    //   name: 'guize',
    //   component: () =>
    //     import('@/views/page/Guize'),
    //   children: [{
    //     path: '/guize/jygz',
    //     name: 'guize_jygz',
    //     component: () =>
    //       import('@/views/page/guize/Jygz.vue')
    //   },
    //   {
    //     path: '/guize/bzjgz',
    //     name: 'guize_bzjgz',
    //     component: () =>
    //       import('@/views/page/guize/Bzjgz.vue')
    //   },
    //   {
    //     path: '/guize/zcygz',
    //     name: 'guize_zcygz',
    //     component: () =>
    //       import('@/views/page/guize/Zcygz.vue')
    //   },
    //   {
    //     path: '/guize/dylgz',
    //     name: 'guize_dylgz',
    //     component: () =>
    //       import('@/views/page/guize/Dylgz.vue')
    //   },
    //   {
    //     path: '/guize/derlgz',
    //     name: 'guize_derlgz',
    //     component: () =>
    //       import('@/views/page/guize/Derlgz.vue')
    //   }
    //   ]
    // }

]