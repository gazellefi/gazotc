(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d60e7748"],{"01eb":function(e,t){e.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAAAAXNSR0IArs4c6QAAAzRJREFUSEvFllvI5WMUh59HkkMxhUYSUcKFC0IZpORCMk4zNQ6lGdGgxnliGjmU80hhMGiYUaRhkENEyo0bLpQLKZGzXCAuhmL8tPR+X3v/v334f+Ni1t3e77veZ53+ay3ZSeJO4tIbnGQ34GzgdOBY4EhgF+Bz4GPgXeBN9fc+zkwFJ9kHuAO4pj24DfgC+Ar4BzgEOAzYu51vBm5Sf5pkwERwksXAa+2Bp4B1ank4R5IcDFw/YOAKddM4+FhwkvLyVqA8uEL9s08I606Sx0sH2KSuGKU3Epzk3goXsEpd3xc4eC/JUuBF4Am1jBiSOeAkZwGvA1erj+wIdEYnybnAK8BVakVhVobASXYF/gKeVy/+P9AB+AZgJbCv+svM/13wo826qdXecrkQWKh+MsnIJAHeUs+cAx7wdrO6vI+3SRYBHwCr1QfG6SRZDdwP7Kf+XPdmPUuyBHipG5JpBiRZC9wJLFfrCxgpzetZAwfBzwAXqHtMg3XPk9wNrAEWq2+M0k/yQ3U59dSux5Wn7eox8wW3fN8O3AacrFb4hyRJNaIT1AO64D9aAZw/qJGkInBU68tVJKPkb6Ba5DvA0Q3wUeedx4CL1AVdcHWmavKV61lJchrwXs8ofANU6/ytFVIZ9J8kGQv+FNimHtcB717hA2o6jZPtwPfA08DxlevmxGyEkrwKnKTu3/X4WWCJuldP77o5nOlSI6s7ybc10dRTuuBlwAvAArVC1VuSXApsBK5VHxql2D6nNWrNgaHvuEJaBbZeXdWXmuQcoMJ4n3rzGGgNierVB6mVkuENJMlzrfL6tswjgM8KrJ43ztgkVQMfqifO3On26hmvN6qXTfM6SX2Ti9SXJ0Crld4AHKj+OBLcyv6SNvyXqVumwSedJ6ku9T5wi3rX4N1xi0AVShXMUnXrjsAHoFvVWgqGZNLq83BtIMAG9cr5wJOsA26clPtpy97lwJMNWhPoQfXXMZW7ZzO0enbVylq1hsdImVq9SWp9vQe4sL3wHVBdrqZNSS0DtWMf2n6/DVynVrWPlangGc0kBagmcwZweDWadlYL/JdtQGxRv+6Tlt7gPo/N585OA/8LME1BLrSqaAoAAAAASUVORK5CYII="},1794:function(e,t,a){},"1b60":function(e,t,a){"use strict";t["a"]={Transactionrules:{mid:["When a merchant issues a sales order, it needs not only sufficient assets, but also sufficient margin;","When a merchant issues a purchase order, it does not need to have assets, but it needs sufficient margin; ","The contract automatically calculates and pays the deposit according to the number of orders issued;","The amount of margin is related to the value of assets and the value of margin; ","In the case of no user taking orders, the deposit and assets are free and can be withdrawn at any time; ","When users take orders, the assets and deposits taken are frozen;","Assets and deposits that have not been taken away are still free;","The merchant can add or remove assets and deposits separately, but after adding or removing, the assets in the order need to meet the minimum deposit requirements;","Whether the user needs to pay a deposit and the quantity when making an order are customized by the merchant when issuing an order;","If the merchant issues a sales order, when the user takes the order, the contract will automatically calculate and pay the deposit according to the number of orders taken and the definition of the merchant;","If the merchant issues a purchase order, the contract will automatically add the user's assets to the contract when the user takes the order, and automatically calculate and pay the deposit according to the number of orders taken and the definition of the merchant;","After the user makes an order, the assets and deposits of both parties are locked into the contract","Assets and margin can only be transferred between the two parties to the transaction;","Cancellation can only be triggered by the payer, and there is no service charge for cancellation contract;","Currency release can only be triggered by the payee, and the handling fee will be deducted during currency release;","The deposit shall be released 3 days after the currency is released;","Both parties reach an agreement to release the deposit in advance;","Before the release of the deposit, either party can trigger the suspension of release","The user triggers the suspension, and the deposit needs to be more than 10%;","If both parties cannot reach an agreement, they may apply for arbitration."]},Coremechanism:[{img:a("e416"),title:"How to be safe",cont:["Ensuring asset security is the common mission of all defi, and gazotc also ensures asset security through smart contracts. ","When the seller transfers the assets into the smart contract, the assets are free and the seller can retrieve the assets at any time without the buyer taking an order.","If the payer cancels the purchase, the cancellation can only be triggered by the payer; If the seller receives legal currency, the release can only be triggered by the payee. ","Neither the platform party nor any third party has the right to use or lock this asset. "]},{img:a("8924"),title:"How to be safe",cont:["Ensuring asset security is the common mission of all defi, and gazotc also ensures asset security through smart contracts. ","When the seller transfers the assets into the smart contract, the assets are free and the seller can retrieve the assets at any time without the buyer taking an order.","If the payer cancels the purchase, the cancellation can only be triggered by the payer; If the seller receives legal currency, the release can only be triggered by the payee. ","Neither the platform party nor any third party has the right to use or lock this asset. "]},{img:a("b030"),title:"How to be safe",cont:["Ensuring asset security is the common mission of all defi, and gazotc also ensures asset security through smart contracts. ","When the seller transfers the assets into the smart contract, the assets are free and the seller can retrieve the assets at any time without the buyer taking an order.","If the payer cancels the purchase, the cancellation can only be triggered by the payer; If the seller receives legal currency, the release can only be triggered by the payee. ","Neither the platform party nor any third party has the right to use or lock this asset. "]},{img:a("9bf2f"),title:"How to be safe",cont:["Ensuring asset security is the common mission of all defi, and gazotc also ensures asset security through smart contracts. ","When the seller transfers the assets into the smart contract, the assets are free and the seller can retrieve the assets at any time without the buyer taking an order.","If the payer cancels the purchase, the cancellation can only be triggered by the payer; If the seller receives legal currency, the release can only be triggered by the payee. ","Neither the platform party nor any third party has the right to use or lock this asset. "]},{img:a("dde1"),title:"How to be safe",cont:["Ensuring asset security is the common mission of all defi, and gazotc also ensures asset security through smart contracts. ","When the seller transfers the assets into the smart contract, the assets are free and the seller can retrieve the assets at any time without the buyer taking an order.","If the payer cancels the purchase, the cancellation can only be triggered by the payer; If the seller receives legal currency, the release can only be triggered by the payee. ","Neither the platform party nor any third party has the right to use or lock this asset. "]}],Securityrules:["1.Platform token gaz cannot be directly used as security deposit collateral;","2.Gaz has different forms and lock cycle;","3. Margin contract is to package all equivalent different forms of gaz into a unified margin token;","4.The equivalent gaz from recharging to the margin contract can only be returned in the same way;","5.The margin generated by profit can only be withdrawn through profit contract; "],arbitrationrules:[{id:"qqq",title:"Qualification of arbitrators",cont:["1.Arbitrators need to register first and mortgage the contract with a deposit not lower than the minimum requirements of the system.","2.After successful registration, the contract will return a number in order","3.An address can only have one number at the same time.","4.The deposit may be withdrawn in part or in whole when it does not participate in the case under arbitration","5.Deposit cannot be added.","6.After the deposit is lower than the minimum requirement, the system will withdraw the address number.","7.The vacancy number is filled by the address after the number + 100.","8.If the corresponding address after + 100 bits is empty, it is filled by the last address.","9.If an arbitrator does evil, the community can propose to remove the qualification of the arbitrator."]},{id:"www",title:"First round arbitration",cont:["1.The subject matter of the first round of arbitration may be assets or security deposit.","2.Both parties to the transaction invite arbitrators respectively.","3.The arbitration fee must be paid in proportion when inviting","4.Each arbitrator can only be invited by one party of the same order.","5.Each person can invite up to 10 arbitrators.","6.A party only needs one arbitrator to vote in favor to end its arbitration.","7.The arbitrator can only make an affirmative vote of the invited party.","8.No need to vote.","9.When voting, the arbitrator shall meet four conditions at the same time.","1).Invited by one of the order participants","2).The number of arbitrators shall be within 100 digits","3).The margin balance is greater than the balance required by the arbitration order","4).For cases that did not participate in the second round of arbitration, the deposit was not frozen","10.At the time of voting, the corresponding deposit will be deducted from the balance of the arbitrator's deposit","11.After one party makes a positive arbitration, the other party shall make the arbitration result within the specified time","12.After the expiration, if only one party makes affirmative arbitration, that party will win","13.The arbitrator of the winning party may receive the arbitration fee paid by the invited party","14.If the losing party also pays the arbitration fee, it will be made up to the winning party","15.If it is sent back for retrial, the original arbitration panel will be dissolved and the second round of arbitration will be restarted"]},{id:"eee",title:"Second round of arbitration",cont:["1.The subject matter of the second round of arbitration may be assets + margin, or margin alone.","2.The second round of arbitration shall also arbitrate the acts of the first round of arbitration.","3.The registration system shall be adopted for the second round of arbitration, and the following conditions shall be met at the same time.","1).The number of arbitrators shall be within 100 digits.","2).The balance of the deposit is greater than the balance required by the arbitration order;","3).There were no other cases in the second round of arbitration, and the deposit was not frozen.","4.Up to 50 people can sign up.","5.After registration, 5 arbitrators shall be selected randomly to enter the arbitration panel.","6.The same order can only be registered once at one address","7.The deposit balance of the applicants will be temporarily frozen until the end of arbitration.","8.The arbitration panel shall jointly discuss and vote on the arbitration scheme.","9.The scheme with voting weight greater than or equal to 3 is adopted.","10.The adopted scheme shall be adopted by one of the transaction parties.","11.Otherwise, the arbitration panel will be dissolved and the second round of arbitration will be restarted after the specified time.","12.After the restart, the deposit of the original arbitrator is unfrozen.","13.After the scheme is adopted by one party, within the specified time, if the other party has objections, it can request the community to cancel the scheme.","14.The community voted to uphold the original sentence or send it back for retrial.","15.If the original judgment is maintained, the scheme is final and the chain governance ends.","16.If it is sent back for retrial, the original arbitration panel will be dissolved and the second round of arbitration will be restarted"]}]}},"4b9a":function(e,t,a){"use strict";a("1794")},8924:function(e,t,a){e.exports=a.p+"img/13.ede568f3.png"},"9bf2f":function(e,t,a){e.exports=a.p+"img/15.3409580a.png"},b030:function(e,t,a){e.exports=a.p+"img/14.6540d82d.png"},dde1:function(e,t,a){e.exports=a.p+"img/16.5d8edb27.png"},e416:function(e,t,a){e.exports=a.p+"img/12.a2c12031.png"},f0b9:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"Securityrules"},[r("div",{staticClass:"content"},[r("img",{attrs:{src:a("e416"),alt:""}}),r("div",{staticClass:"info"},[r("div",{staticClass:"top"},[e._v("Margin rules")]),e._l(e.Securityrules,(function(t){return r("li",[e._v(e._s(t))])})),e._m(0)],2)])])},n=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"btn"},[r("div",[e._v("Management deposit ")]),r("img",{attrs:{src:a("01eb"),alt:""}})])}],s=a("1b60"),i=s["a"].Securityrules,o={name:"Securityrules",data:function(){return{Securityrules:i}},mounted:function(){},watch:{},computed:{},methods:{},components:{},props:[]},h=o,c=(a("4b9a"),a("2877")),l=Object(c["a"])(h,r,n,!1,null,"148a4831",null);t["default"]=l.exports}}]);