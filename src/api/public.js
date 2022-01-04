import Web3 from "web3";
import Web3Modal from "web3modal";
import config from "@/config";
import WalletConnectProvider from "@walletconnect/web3-provider";
import QRCodeModal from "@walletconnect/qrcode-modal";





/*
*初始化 钱包
*/
var webinit = (use_metamask)=>{
	return new Promise((resolve,reject)=>{
		const providerOptions = {
		  /* See Provider Options Section */
		};
		const web3Modal = new Web3Modal({
		  network: use_metamask ? "mainnet" : null,
		  cacheProvider: false,
		  providerOptions: use_metamask
		    ? {}
		    : {
		      walletconnect: {
		        package: WalletConnectProvider,
		        options: {
		          rpc: {
		            56: "https://bsc-dataseed.binance.org/",
		          },
		          network: "binance",
		          qrcodeModal: QRCodeModal,
		        },
		      },
		    },
		});
		try{
			console.log('初始化web3');
			let data =  web3Modal.connect().then(res=>{
				let web3 = new Web3(res);
				let address = res.selectedAddress || res.accounts[0];
				resolve({
					web:web3,id:address
				})
			}).catch((err)=>{
				reject('初始化失败')
			})
		}catch(e){
			reject('初始化失败')
		}
	})
} 
export default{
	/**
	 * 检测钱包
	 */
	testMASK(){
		return new Promise((resolve,reject)=>{
			if (typeof ethereum === 'undefined') {
			  webinit(false).then(res=>{
				  console.log('初始化成功');
				  resolve(res)
			  }).catch((err)=>{
				  // console.log(err);
				  reject(err)
			  })
			} else {
			  webinit(true).then(res=>{
				  console.log('初始化成功');
				  resolve(res)
			  }).catch((err)=>{
				  // console.log(err);
				  reject(err)
			  })
			}
		})
	},
	/* 
	* 数值E转换
	*/
   getnume(num_str) {
     num_str = num_str.toString();
     if (num_str.indexOf("+") != -1) {
       num_str = num_str.replace("+", "");
     }
     if (num_str.indexOf("E") != -1 || num_str.indexOf("e") != -1) {
       var resValue = "",
         power = "",
         result = null,
         dotIndex = 0,
         resArr = [],
         sym = "";
       var numStr = num_str.toString();
       if (numStr[0] == "-") {
         // 如果为负数，转成正数处理，先去掉‘-’号，并保存‘-’.
         numStr = numStr.substr(1);
         sym = "-";
       }
       if (numStr.indexOf("E") != -1 || numStr.indexOf("e") != -1) {
         var regExp = new RegExp(
           "^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$",
           "ig"
         );
         result = regExp.exec(numStr);
         if (result != null) {
           resValue = result[2];
           power = result[5];
           result = null;
         }
         if (!resValue && !power) {
           return false;
         }
         dotIndex = resValue.indexOf(".") == -1 ? 0 : resValue.indexOf(".");
         resValue = resValue.replace(".", "");
         resArr = resValue.split("");
         if (Number(power) >= 0) {
           var subres = resValue.substr(dotIndex);
           var length = dotIndex == 0 ? 0 : subres.length;
           power = Number(power);
           //幂数大于小数点后面的数字位数时，后面加0
           for (var i = 0; i < power - length; i++) {
             resArr.push("0");
           }
           if (power - subres.length < 0) {
             resArr.splice(dotIndex + power, 0, ".");
           }
         } else {
           power = power.replace("-", "");
           power = Number(power);
           //幂数大于等于 小数点的index位置, 前面加0
           for (let i = 0; i < power - dotIndex; i++) {
             resArr.unshift("0");
           }
           var n = power - dotIndex >= 0 ? 1 : -(power - dotIndex);
           resArr.splice(n, 0, ".");
         }
       }
       resValue = resArr.join("");
   
       return sym + resValue;
     } else {
       return num_str;
     }
   },
}