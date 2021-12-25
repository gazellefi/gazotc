import ArbOne from "./huobi/ArbOne.json";
import arbTwo from "./huobi/arbTwo.json";
import gaz from "./huobi/gaz.json";
import dotc from "./huobi/dotc.json";
import Ccdotc from "./huobi/Ccdotc.json";
import Arbdate from "./huobi/Arbdate.json";
import Pripla from "./huobi/Pripla.json";
import test from "./huobi/proabi/testabi.json";
var huobi = {
    Url:'https://http-mainnet.hecochain.com',
    Bzj:{
        num:18,
        id:'baozhengjin'
    },
    ArbOne:{
        heyue:"0x15d4A5B1F3458D138921f8B298983b67f1dB340C",
        abi:ArbOne
    },
    arbTwo:{
        heyue:"0xf8935Cc258B1906a238b4Ef9343E453Efda094b9",
        abi:arbTwo
    },
    dotc:{
        heyue:"0x23D58bd73136888ffAa3fDE672FC41870E928AA3",
        abi:dotc
    },
    gaz:{
        heyue:"0x1f7c94c8834070330D59E8dA410704dc4f36444b",
        abi:gaz
    },
    Ccdotc:{
        heyue:"0x0f1aA3D6cB39f60ceC5b1346eA1Ad44AaF0A0D53",
        abi:Ccdotc
    },
    Pripla:{
        heyue:"0xbce3877eC499efAC4e5a32fcFb1066CB6Be69A37",
        abi:Pripla
    },
    test:{
        heyue:"0x489B639BC2D68bB6D6f21d8Ee0f3bdbf41fE1C88",
        abi:test
    },
    Arbdate:{
        heyue:"0xb18AFC1Abf1D6B4bc14027bb0B69333192f8C6C1",
        abi:Arbdate
    }
};

export default huobi;