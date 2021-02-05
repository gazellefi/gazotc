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
import etfcshiarr from "./abi/etfcshi";

//以太坊测试网ABI资产地址
import usdtabi from "./abi/etfcshi/proabi/usdtabi.json";
import wethabi from "./abi/etfcshi/proabi/wethabi.json";

//火币资产ABI地址
import usdtabihb from "./abi/huobi/proabi/usdtabi.json";
import whtabi from "./abi/huobi/proabi/whtabi.json";
import testabi from "./abi/huobi/proabi/testabi.json";

var mr_key = !localStorage.morenkey ? 'etfcshi':localStorage.morenkey; 
/*
    hbi - deling是否需要清零
    hbi - show是否需要显示
*/
// var mr_key = 'huobi';

var config = {
    key:mr_key,
    hyue:{
        huobi:huobi,
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
            }
            ,RUB:{
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
            }
            ,RUB:{
                show:true,
                key:"0x7275620000000000000000000000000000000000000000000000000000000000",
                id:"RUB"
            }
        }
    }
};

export default config;