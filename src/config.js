/*
    全局配置  节点切换
    key 当前使用节点
    config.abi[key][xxx] key 节点 xxx是合约名称
    config.hbi[key][xxx] key 节点 xxx是资产名称


    === huobi
    show:是否显示资产选择中
    key:合约变量,
    num:资产数量单位,
    heyue:"合约地址",
    id:"资产名称"
*/

import huobi from "./abi/huobi";
import bian from "./abi/bian";
import etfcshiarr from "./abi/etfcshi";

//以太坊测试网ABI资产地址
import usdtabi from "./abi/etfcshi/proabi/usdtabi.json";
import wethabi from "./abi/etfcshi/proabi/wethabi.json";

//火币资产ABI地址
import usdtabihb from "./abi/huobi/proabi/usdtabi.json";
import whtabi from "./abi/huobi/proabi/whtabi.json";
import testabi from "./abi/huobi/proabi/testabi.json";
import gazabi from "./abi/huobi/gaz.json";

//币安资产ABI地址
import usdtabib from "./abi/bian/proabi/usdtabi.json";
import btcabi from "./abi/bian/proabi/btcabi.json";
import ethabi from "./abi/bian/proabi/ethabi.json";
import gazabib from "./abi/bian/gaz.json";

var mr_key = !localStorage.morenkey ? 'huobi':localStorage.morenkey; 
/*
    hbi - deling是否需要清零
    hbi - show是否需要显示
*/
// var mr_key = 'huobi';

var config = {
    key:mr_key,
    hyue:{
        huobi:huobi,
        bian:bian,
        etfcshi:etfcshiarr
    },
    hbi:{
        etfcshi:{
            USDT:{
                show:true,
                key:"0x7573647400000000000000000000000000000000000000000000000000000000",
                num:6,
                heyue:"0xEc8053A77D432A08b2C59363D98eCA903a12df5a",
                abi:usdtabi,
                id:"USDT",
                deling:true
            },
            WETH:{
                show:true,
                id:"WETH",
                key:"0x7765746800000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0xf537270EdB6B5792c20D204bdc9Eb9735c6A790F",
                abi:wethabi,
                deling:false
            }
        },
        bian:{
            USDT:{
                show:true,
                key:"0x7573647400000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0x55d398326f99059ff775485246999027b3197955",
                abi:usdtabib,
                id:"USDT",
                deling:false
            },
            BTC:{
                show:true,
                id:"BTC",
                key:"0x6274630000000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0x7130d2A12B9BCbFAe4f2634d864A1Ee1Ce3Ead9c",
                abi:btcabi,
                deling:false
            },
            ETH:{
                show:true,
                id:"ETH",
                key:"0x6574680000000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0x2170ed0880ac9a755fd29b2688956bd959f933f8",
                abi:ethabi,
                deling:false
            },
            Gaz:{
                show:true,
                id:"Gaz",
                key:"0x67617a0000000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0xCE5C72a775A3e4D032Fbb08C66c8BdfA9A5d216F",
                abi:gazabib,
                deling:false
            }           
        },
        huobi:{
            USDT:{
                show:true,
                key:"0x7573647400000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0xa71edc38d189767582c38a3145b5873052c3e47a",
                abi:usdtabihb,
                id:"USDT",
                deling:true
            },
            WHT:{
                show:true,
                id:"WHT",
                key:"0x5748540000000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0x5545153ccfca01fbd7dd11c0b23ba694d9509a6f",
                abi:whtabi,
                deling:false
            },
            Gaz:{
                show:true,
                id:"Gaz",
                key:"0x67617a0000000000000000000000000000000000000000000000000000000000",
                num:18,
                heyue:"0x1f7c94c8834070330D59E8dA410704dc4f36444b",
                abi:gazabi,
                deling:false
            },
            Test:{
                show:true,
                id:"Test",
                key:"0x7465737400000000000000000000000000000000000000000000000000000000",
                num:6,
                heyue:"0x489B639BC2D68bB6D6f21d8Ee0f3bdbf41fE1C88",
                abi:testabi,
                deling:false
            }
        }
    },
    fabi:{
        etfcshi:{
            CNY:{
                show:true,
                key:"0x636e790000000000000000000000000000000000000000000000000000000000",
                id:"CNY"
            },
            USD:{
                show:true,
                key:"0x7573640000000000000000000000000000000000000000000000000000000000",
                id:"USD"
            },
            HKD:{
                show:true,
                key:"0x686b640000000000000000000000000000000000000000000000000000000000",
                id:"HKD"
            },
            THB:{
                show:true,
                key:"0x7468620000000000000000000000000000000000000000000000000000000000",
                id:"THB"
            },
            JPY:{
                show:true,
                key:"0x6a70790000000000000000000000000000000000000000000000000000000000",
                id:"JPY"
            },
            EUR:{
                show:true,
                key:"0x6575720000000000000000000000000000000000000000000000000000000000",
                id:"EUR"
            },
            RUB:{
                show:true,
                key:"0x7275620000000000000000000000000000000000000000000000000000000000",
                id:"RUB"
            }
        },
        huobi:{
            CNY:{
                show:true,
                key:"0x636e790000000000000000000000000000000000000000000000000000000000",
                id:"CNY"
            },
            USD:{
                show:true,
                key:"0x7573640000000000000000000000000000000000000000000000000000000000",
                id:"USD"
            },
            HKD:{
                show:true,
                key:"0x686b640000000000000000000000000000000000000000000000000000000000",
                id:"HKD"
            },
            THB:{
                show:true,
                key:"0x7468620000000000000000000000000000000000000000000000000000000000",
                id:"THB"
            },
            JPY:{
                show:true,
                key:"0x6a70790000000000000000000000000000000000000000000000000000000000",
                id:"JPY"
            },
            EUR:{
                show:true,
                key:"0x6575720000000000000000000000000000000000000000000000000000000000",
                id:"EUR"
            },
            RUB:{
                show:true,
                key:"0x7275620000000000000000000000000000000000000000000000000000000000",
                id:"RUB"
            },
        },
        bian:{
            CNY:{
                show:true,
                key:"0x636e790000000000000000000000000000000000000000000000000000000000",
                id:"CNY"
            },
            USD:{
                show:true,
                key:"0x7573640000000000000000000000000000000000000000000000000000000000",
                id:"USD"
            },
            HKD:{
                show:true,
                key:"0x686b640000000000000000000000000000000000000000000000000000000000",
                id:"HKD"
            },
            THB:{
                show:true,
                key:"0x7468620000000000000000000000000000000000000000000000000000000000",
                id:"THB"
            },
            JPY:{
                show:true,
                key:"0x6a70790000000000000000000000000000000000000000000000000000000000",
                id:"JPY"
            },
            EUR:{
                show:true,
                key:"0x6575720000000000000000000000000000000000000000000000000000000000",
                id:"EUR"
            },
            RUB:{
                show:true,
                key:"0x7275620000000000000000000000000000000000000000000000000000000000",
                id:"RUB"
            }
        }
    }
};

export default config;