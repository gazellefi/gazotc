(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-52afc91a"],{"4b55":function(t,e,r){},8231:function(t,e,r){"use strict";r.r(e);var c=function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"f c_b"},[r("el-breadcrumb",{attrs:{id:"breadcrumb",separator:">"}},t._l(t.breadcrumbList,(function(e,c){return r("el-breadcrumb-item",{attrs:{to:{path:0==c?e.path=e.redirect:e.path}}},[t._v(t._s(t.$t(e.meta.name)))])})),1),t._m(0)],1)},a=[function(){var t=this,e=t.$createElement,r=t._self._c||e;return r("div",{staticClass:"fc a_e c_a fz14",staticStyle:{"padding-right":"15px"}},[r("div",{staticClass:"f a_c"},[r("i",{staticClass:"el-icon-s-promotion",staticStyle:{color:"#333","font-size":"16px","margin-top":"-4px","margin-right":"5px"}}),r("span",[t._v("联系客服")])]),r("span",[t._v(" 电报群：+447536334816")])])}],i=(r("fb6a"),{name:"app",data:function(){return{}},mounted:function(){this.$store.commit("breadcrumb",this.$route)},watch:{$route:function(){this.$store.commit("breadcrumb",this.$route)}},computed:{breadcrumbList:function(){return this.$store.state.breadcrumb.matched&&this.$store.state.breadcrumb.matched.slice(1)}},methods:{},components:{},props:[]}),n=i,s=(r("ce10"),r("2877")),o=Object(s["a"])(n,c,a,!1,null,"db26b006",null);e["default"]=o.exports},8418:function(t,e,r){"use strict";var c=r("c04e"),a=r("9bf2"),i=r("5c6c");t.exports=function(t,e,r){var n=c(e);n in t?a.f(t,n,i(0,r)):t[n]=r}},ce10:function(t,e,r){"use strict";r("4b55")},fb6a:function(t,e,r){"use strict";var c=r("23e7"),a=r("861d"),i=r("e8b5"),n=r("23cb"),s=r("50c4"),o=r("fc6a"),u=r("8418"),d=r("b622"),f=r("1dde"),b=r("ae40"),l=f("slice"),p=b("slice",{ACCESSORS:!0,0:0,1:2}),m=d("species"),h=[].slice,v=Math.max;c({target:"Array",proto:!0,forced:!l||!p},{slice:function(t,e){var r,c,d,f=o(this),b=s(f.length),l=n(t,b),p=n(void 0===e?b:e,b);if(i(f)&&(r=f.constructor,"function"!=typeof r||r!==Array&&!i(r.prototype)?a(r)&&(r=r[m],null===r&&(r=void 0)):r=void 0,r===Array||void 0===r))return h.call(f,l,p);for(c=new(void 0===r?Array:r)(v(p-l,0)),d=0;l<p;l++,d++)l in f&&u(c,d,f[l]);return c.length=d,c}})}}]);