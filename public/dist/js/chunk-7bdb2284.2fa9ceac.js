(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7bdb2284"],{"0c3df":function(e,t,a){"use strict";a("458f")},1148:function(e,t,a){"use strict";var i=a("a691"),r=a("1d80");e.exports="".repeat||function(e){var t=String(r(this)),a="",s=i(e);if(s<0||s==1/0)throw RangeError("Wrong number of repetitions");for(;s>0;(s>>>=1)&&(t+=t))1&s&&(a+=t);return a}},"408a":function(e,t,a){var i=a("c6b6");e.exports=function(e){if("number"!=typeof e&&"Number"!=i(e))throw TypeError("Incorrect invocation");return+e}},"458f":function(e,t,a){},b45c:function(e,t,a){e.exports=a.p+"img/empty.6c900d96.png"},b680:function(e,t,a){"use strict";var i=a("23e7"),r=a("a691"),s=a("408a"),n=a("1148"),o=a("d039"),l=1..toFixed,c=Math.floor,u=function(e,t,a){return 0===t?a:t%2===1?u(e,t-1,a*e):u(e*e,t/2,a)},d=function(e){var t=0,a=e;while(a>=4096)t+=12,a/=4096;while(a>=2)t+=1,a/=2;return t},m=l&&("0.000"!==8e-5.toFixed(3)||"1"!==.9.toFixed(0)||"1.25"!==1.255.toFixed(2)||"1000000000000000128"!==(0xde0b6b3a7640080).toFixed(0))||!o((function(){l.call({})}));i({target:"Number",proto:!0,forced:m},{toFixed:function(e){var t,a,i,o,l=s(this),m=r(e),f=[0,0,0,0,0,0],p="",b="0",h=function(e,t){var a=-1,i=t;while(++a<6)i+=e*f[a],f[a]=i%1e7,i=c(i/1e7)},_=function(e){var t=6,a=0;while(--t>=0)a+=f[t],f[t]=c(a/e),a=a%e*1e7},v=function(){var e=6,t="";while(--e>=0)if(""!==t||0===e||0!==f[e]){var a=String(f[e]);t=""===t?a:t+n.call("0",7-a.length)+a}return t};if(m<0||m>20)throw RangeError("Incorrect fraction digits");if(l!=l)return"NaN";if(l<=-1e21||l>=1e21)return String(l);if(l<0&&(p="-",l=-l),l>1e-21)if(t=d(l*u(2,69,1))-69,a=t<0?l*u(2,-t,1):l/u(2,t,1),a*=4503599627370496,t=52-t,t>0){h(0,a),i=m;while(i>=7)h(1e7,0),i-=7;h(u(10,i,1),0),i=t-1;while(i>=23)_(1<<23),i-=23;_(1<<i),h(1,1),_(2),b=v()}else h(0,a),h(1<<-t,0),b=v()+n.call("0",m);return m>0?(o=b.length,b=p+(o<=m?"0."+n.call("0",m-o)+b:b.slice(0,o-m)+"."+b.slice(o-m))):b=p+b,b}})},fbe0:function(e,t,a){"use strict";a.r(t);var i,r,s,n=function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"bblist"},[i("div",{staticClass:"hidden-xs-only"},[i("div",{staticClass:"bblist_table"},[i("div",{staticClass:"bblist_table_left"},[i("span",{staticClass:"typeSelect"},[e._v(e._s(e.$t("message.dapp.currency"))+"：")]),i("el-select",{attrs:{size:"mini",placeholder:"Please select"},on:{change:e.changeH},model:{value:e.huobi,callback:function(t){e.huobi=t},expression:"huobi"}},e._l(e.hbarr,(function(e){return i("el-option",{key:e.key,attrs:{label:e.id,value:e.key}})})),1),i("span",{staticClass:"typeSelect"},[e._v(e._s(e.$t("message.dapp.unit"))+"：")]),i("el-select",{attrs:{size:"mini",placeholder:"Please select"},on:{change:e.changeH},model:{value:e.fabi,callback:function(t){e.fabi=t},expression:"fabi"}},e._l(e.hbarr,(function(e){return i("el-option",{key:e.key,attrs:{label:e.id,value:e.key}})})),1),i("el-button",{staticStyle:{"margin-left":"15px"},attrs:{size:"mini",type:"primary",icon:"el-icon-search",circle:""},on:{click:e.listajax}})],1),i("el-table",{directives:[{name:"loading",rawName:"v-loading",value:e.jiazai,expression:"jiazai"}],attrs:{data:e.list}},[i("el-table-column",{attrs:{align:"center",prop:"iorder",label:e.$t("message.arbitration.order")}}),i("el-table-column",{attrs:{align:"center",prop:"moa",label:e.$t("message.dapp.amount")}}),i("el-table-column",{attrs:{align:"center",prop:"uni",label:e.$t("message.dapp.unitPrice")}}),i("el-table-column",{attrs:{label:e.$t("message.operation")},scopedSlots:e._u([{key:"default",fn:function(t){return[i("el-button",{attrs:{type:"text",size:"small"},on:{click:function(a){return e.opengoumai(t.row)}}},[e._v(" "+e._s(e.$t("message.dapp.buy")))])]}}])}),i("div",{attrs:{slot:"empty"},slot:"empty"},[i("div",{staticClass:"f a_c c_c",staticStyle:{"padding-top":"20px"}},[i("img",{attrs:{src:a("b45c"),alt:"",width:"130",height:"85"}})]),i("p",[e._v(e._s(e.$t("message.NoData")))])])],1)],1)]),i("div",{staticClass:"hidden-sm-and-up"},[i("el-row",{staticStyle:{"border-bottom":"1px solid #EEEEEE"}},[i("el-col",{attrs:{span:12}},[i("span",{staticClass:"typeSelect"},[e._v(e._s(e.$t("message.dapp.currency"))+"：")]),i("el-select",{staticStyle:{width:"50%"},attrs:{size:"mini",placeholder:"Please select"},model:{value:e.huobi,callback:function(t){e.huobi=t},expression:"huobi"}},e._l(e.hbarr,(function(e){return i("el-option",{key:e.key,attrs:{label:e.id,value:e.key}})})),1)],1),i("el-col",{attrs:{span:12}},[i("span",{staticClass:"typeSelect"},[e._v(e._s(e.$t("message.dapp.unit"))+"：")]),i("el-select",{staticStyle:{"margin-left":"15px",width:"50%"},attrs:{size:"mini",placeholder:"Please select"},model:{value:e.fabi,callback:function(t){e.fabi=t},expression:"fabi"}},e._l(e.hbarr,(function(e){return i("el-option",{key:e.key,attrs:{label:e.id,value:e.key}})})),1)],1),i("el-col",{staticStyle:{"margin-top":"20px","padding-bottom":"10px"},attrs:{span:12}},[i("div",{staticClass:"ddgl_fabu_p_head_sxan_i"})])],1),i("div",{staticClass:"list_nav"},[e.list.length<1?i("div",{staticClass:"fc a_c"},[e._m(0),i("p",{staticStyle:{"margin-top":"20px",color:"#DCDCDC"}},[e._v(e._s(e.$t("message.NoData")))])]):e._e(),e._l(e.list,(function(t,a){return i("div",{key:a,staticClass:"list_item f a_e c_b"},[i("div",{staticClass:"fc"},[i("div",{staticClass:"mart-10 f a_c"},[i("span",{staticClass:"fwb"},[e._v(e._s(e.$t("message.arbitration.order"))+" : ")]),i("span",{staticClass:"fwb fz18"},[e._v(e._s(" "+t.iorder))])]),i("div",{staticClass:"mart-10"},[i("span",[e._v(e._s(e.$t("message.dapp.unitPrice")))]),i("span",[e._v(e._s(" "+t.uni))])]),i("div",{staticClass:"mart-10"},[i("span",[e._v(e._s(e.$t("message.dapp.amount")))]),i("span",[e._v(e._s(" "+t.moa))])]),i("div",{staticClass:"mart-10"},[i("span",[e._v(e._s(e.$t("message.dapp.minAmount")))]),i("span",[e._v(e._s(" "+t.zer))])])]),i("div",[i("el-button",{staticStyle:{"border-color":"#FDC500",color:"#FDC500"},attrs:{plain:"",size:"mini"},on:{click:function(a){return e.opengoumai(t)}}},[e._v(" "+e._s(e.$t("message.dapp.buy"))+" ")])],1)])}))],2)],1),i("el-dialog",{attrs:{title:e.$t("message.dapp.buy"),visible:e.mairucode,width:"350px"},on:{"update:visible":function(t){e.mairucode=t}}},[i("el-form",{attrs:{model:e.mr_form,"label-width":"80px"}},[i("el-form-item",{attrs:{label:e.$t("message.arbitration.order")}},[i("el-input",{attrs:{disabled:""},model:{value:e.mr_form.ddinfo["iorder"],callback:function(t){e.$set(e.mr_form.ddinfo,"iorder",t)},expression:"mr_form.ddinfo['iorder']"}})],1),i("el-form-item",{attrs:{label:e.$t("message.dapp.unitPrice")}},[i("el-input",{attrs:{disabled:""},model:{value:e.mr_form.ddinfo["uni"],callback:function(t){e.$set(e.mr_form.ddinfo,"uni",t)},expression:"mr_form.ddinfo['uni']"}})],1),i("el-form-item",{attrs:{label:e.$t("message.dapp.amount")}},[i("el-input",{model:{value:e.mr_form.num,callback:function(t){e.$set(e.mr_form,"num",t)},expression:"mr_form.num"}}),i("div",[e._v("最大购买数为："+e._s(e.mr_form.ddinfo.moa))])],1)],1),i("span",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("el-button",{on:{click:function(t){e.mairucode=!1}}},[e._v(e._s(e.$t("message.cancel")))]),i("el-button",{attrs:{loading:e.isLoading,type:"primary"},on:{click:e.mairuajax}},[e._v(e._s(e.$t("message.dapp.buy")))])],1)],1)],1)},o=[function(){var e=this,t=e.$createElement,i=e._self._c||t;return i("div",{staticClass:"f a_c c_c",staticStyle:{"padding-top":"20px"}},[i("img",{attrs:{src:a("b45c"),alt:"",width:"130",height:"85"}})])}],l=(a("c975"),a("a15b"),a("a434"),a("a9e3"),a("b680"),a("d3b7"),a("4d63"),a("ac1f"),a("25f0"),a("5319"),a("1276"),a("96cf"),a("1da1")),c=a("db49"),u=a("6314"),d=a.n(u),m=a("5aac"),f=a.n(m),p=c["a"]["hyue"][c["a"]["key"]]["Ccdotc"]["abi"],b=c["a"]["hyue"][c["a"]["key"]]["Ccdotc"]["heyue"],h=c["a"]["hbi"][c["a"]["key"]],_={created:function(){document.body.clientWidth>=1e3?this.type="pc":this.type="wap";var e=this;for(var t in h)e.hbarr.push(h[t]);function a(){return n.apply(this,arguments)}function n(){return n=Object(l["a"])(regeneratorRuntime.mark((function t(){var a,n,o;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return a={},n=new f.a({network:"mainnet",cacheProvider:!0,providerOptions:a}),t.next=4,n.connect();case 4:return o=t.sent,t.next=7,new d.a(o);case 7:r=t.sent,r&&o&&(s=o.selectedAddress,i=new r.eth.Contract(p,b),e.listajax());case 9:case"end":return t.stop()}}),t)}))),n.apply(this,arguments)}e.fabi=e.hbarr[0]["key"],e.huobi=e.hbarr.length>=1?e.hbarr[3]["key"]:e.hbarr[0]["key"],"undefined"===typeof ethereum?(r=new d.a(c["a"]["hyue"][c["a"]["key"]]["Url"]),i=new r.eth.Contract(p,b)):a()},data:function(){return{type:"pc",list:[],huobi:"",fabi:"",mairucode:!1,isLoading:!1,hbarr:[],fbarr:[],mr_form:{ddinfo:{},num:null},form:{type:"",type_b:"",zdnum:0},jiazai:!1}},watch:{},methods:{changeH:function(e){this.listajax()},getFNum:function(e){if(e=e.toString(),-1!=e.indexOf("+")&&(e=e.replace("+","")),-1!=e.indexOf("E")||-1!=e.indexOf("e")){var t="",a="",i=null,r=0,s=[],n="",o=e.toString();if("-"==o[0]&&(o=o.substr(1),n="-"),-1!=o.indexOf("E")||-1!=o.indexOf("e")){var l=new RegExp("^(((\\d+.?\\d+)|(\\d+))[Ee]{1}((-(\\d+))|(\\d+)))$","ig");if(i=l.exec(o),null!=i&&(t=i[2],a=i[5],i=null),!t&&!a)return!1;if(r=-1==t.indexOf(".")?0:t.indexOf("."),t=t.replace(".",""),s=t.split(""),Number(a)>=0){var c=t.substr(r),u=0==r?0:c.length;a=Number(a);for(var d=0;d<a-u;d++)s.push("0");a-c.length<0&&s.splice(r+a,0,".")}else{a=a.replace("-",""),a=Number(a);for(var m=0;m<a-r;m++)s.unshift("0");var f=a-r>=0?1:-(a-r);s.splice(f,0,".")}}return t=s.join(""),n+t}return e},listajax:function(){var e=this;e.jiazai=!0;for(var t=0,a=0;a<e.hbarr.length;a++)if(e.huobi==e.hbarr[a]["key"]){t=Number(e.hbarr[a]["num"]);break}var r="000000";e.form["zdnum"]&&(r=e.getFNum(e.form["zdnum"]*Math.pow(10,t))),i.methods.sort(e.huobi,e.fabi,30,30,r+"").call((function(a,i){if(e.jiazai=!1,i){for(var r=[],s=i[0],n=i[1],o=0;o<s.length;o++){var l={pro_num:t,iorder:Number(s[o][0]),moa:(Number(s[o][1])/Math.pow(10,t)).toFixed(2),zer:(Number(s[o][2])/Math.pow(10,t)).toFixed(2),uni:e.getFNum(Number(s[o][3])/Math.pow(10,6)),order:n[o]};r.push(l)}e.list=r}}))},opengoumai:function(e){this.mr_form["ddinfo"]=e,this.mairucode=!0},mairuajax:function(){var e=this;if(this.mr_form["num"])if(this.mr_form["num"]<Number(this.mr_form["ddinfo"]["zer"]))alert(this.$t("message.NotMinNum"));else if(this.mr_form["num"]>Number(this.mr_form["ddinfo"]["moa"]))alert(this.$t("message.NotMaxNum"));else{var t=Number(this.mr_form["num"])*Math.pow(10,this.mr_form["ddinfo"]["pro_num"]),a=this.getFNum(Number(this.mr_form["ddinfo"]["uni"])*Math.pow(10,6));e.isLoading=!0,i.methods.cctaker(this.mr_form["ddinfo"]["iorder"],e.getFNum(t)+"",a+"").send({from:s},(function(t,a){a?(e.mairucode=!1,e.isLoading=!1,e.$message.success("Buy successfully!")):e.isLoading=!1}))}else alert("Please enter quantity")}}},v=_,g=(a("0c3df"),a("2877")),y=Object(g["a"])(v,n,o,!1,null,"c7a2e322",null);t["default"]=y.exports}}]);