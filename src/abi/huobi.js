import ArbOne from "./huobi/ArbOne.json";
import arbTwo from "./huobi/arbTwo.json";
import gaz from "./huobi/gaz.json";
import dotc from "./huobi/dotc.json";

var huobi = {
    Url:'https://http-mainnet-node.huobichain.com',
    Bzj:{
        num:18,
        id:'baozhengjin'
    },
    ArbOne:{
        heyue:"0x5bd0DbE405C52aEc551B3780ad9D94057603e153",
        abi:ArbOne
    },
    arbTwo:{
        heyue:"0x6673d3b6bcd49F2d6f6981f09d4b6D4f3DFd03af",
        abi:arbTwo
    },
    dotc:{
        heyue:"0x41539D9bA88F2E63d3c0250eAa816fb6053D1F03",
        abi:dotc
    },
    gaz:{
        heyue:"0x1f7c94c8834070330D59E8dA410704dc4f36444b",
        abi:gaz
    },
    Ccdotc:{
        heyue:"",
        abi:""
    },
    Arbdate:{
        heyue:"",
        abi:""
    }
};

export default huobi;