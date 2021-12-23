import ArbOne from "./etfcshi/ArbOne.json";
import arbTwo from "./etfcshi/arbTwo.json";
import gaz from "./etfcshi/gaz.json";
import dotc from "./etfcshi/dotc.json";
import Ccdotc from "./etfcshi/Ccdotc.json";
import Arbdate from "./etfcshi/Arbdate.json";

var etfcshiarr = {
    Url:'https://rinkeby.infura.io/v3/eae681441c2243b3969a2e663290ffc4',
    Bzj:{
        num:6,
        id:'baozhengjin'
    },
    ArbOne:{
        heyue:"0x77F4c8a2910e7A51095e9A4b9699223F9B392Eb1",
        abi:ArbOne
    },
    arbTwo:{
        heyue:"0xa6769f48f91e93b96A2c51Bca66de35843abC05f",
        abi:arbTwo
    },
    dotc:{
        heyue:"0xc25eFa9c0052856e4e4B713a180649b8c088a913",
        abi:dotc
    },
    gaz:{
        heyue:"0x429E01aC4534682a5f3dDc186334d9160460348E",
        abi:gaz
    },
    Ccdotc:{
        heyue:"0xa671E685b24C008369fDd7B1623d7456430d8A0c",
        abi:Ccdotc
    },
    Arbdate:{
        heyue:"0x455BB6118aeC9370A5050399b8C2c6fF5A81AA4C",
        abi:Arbdate
    }
};

export default etfcshiarr;