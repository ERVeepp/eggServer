!function(t){var e={};function n(i){if(e[i])return e[i].exports;var o=e[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,n),o.l=!0,o.exports}n.m=t,n.c=e,n.d=function(t,e,i){n.o(t,e)||Object.defineProperty(t,e,{configurable:!1,enumerable:!0,get:i})},n.n=function(t){var e=t&&t.__esModule?function(){return t.default}:function(){return t};return n.d(e,"a",e),e},n.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},n.p="",n(n.s=2)}([function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(5);var o=window.common,r=o.heritance.Comp,a=(o.Gdata,o.Util,window.standard.Store,window.common.Util),s=a.loadVideoBack,c=(a.onRewardBack,a.loadRewardVideo),u=a.showRewardVideo,l=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.richman=t.richman,n.addMoney=t.addMoney||null,n.selector=t.selector,n.records=t.records,n.nowMoney=t.records.playerGetPacketNum,n.width=n.nowMoney/80,n.config={},n.status=t.status,n.init(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r),i(e,[{key:"init",value:function(){if(this.setConfig(),null===this.addMoney)if(4==this.status){for(var t=Math.random().toFixed(2);t<.1;)t=Math.random().toFixed(2);this.addMoney=t}else 1==this.status&&(this.addMoney=this.records.playerGetPacketNum.toFixed(2));$("body").append(this.html()),4==this.status?$(".btn").attr("statis-name","Video_001"):$(".btn").attr("statis-name",""),this.setBtnBg(),this.watchs();var e=$(".popup_bg");e.addClass("animated bounceInUp"),setTimeout(function(){e.removeClass("animated bounceInUp")},1e3)}},{key:"loadVideo",value:function(){c(),s(function(){})}},{key:"videoPlayEnd",value:function(){this.remove(),this.richman.coinAnimate(2*this.addMoney,this.selector)}},{key:"setConfig",value:function(){1==this.status?(this.config.title="账户金额",this.config.btnText="知道了"):2==this.status?(this.config.title="赚到了！",this.config.btnText="开心收下"):4==this.status&&(this.config.title="红包来了！",this.config.btnText="翻2倍领取")}},{key:"setBtnBg",value:function(){1==this.status?$(".btn").removeClass("videoBtn").addClass("redBtn"):2==this.status?$(".btn").removeClass("videoBtn").addClass("redBtn"):4==this.status&&$(".btn").removeClass("redBtn").addClass("videoBtn")}},{key:"html",value:function(){return'\n        <div id="Popup" class="Popup"> \n            <div class="popup_bg">\n\t\t\t\t<div class="title">'+this.config.title+'</div>\n\t\t\t\t<div class="money">\n\t\t\t\t\t<span class="amount">'+this.addMoney+'</span>\n\t\t\t\t\t<span class="yuan">元</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="progress-box">\n\t\t\t\t\t<div class="withdrawal-amount">\n\t\t\t\t\t\t剩'+(80-this.nowMoney).toFixed(2)+'元可提现\n\t\t\t\t\t</div>\n\t\t\t\t\t<div class="progress-bg">\n\t\t\t\t\t\t<div class="three" style="left: '+100*this.width+'%"></div>\n\t\t\t\t\t\t<div class="progress" style="width: '+100*this.width+'%"></div>\n\t\t\t\t\t</div>\n\t\t\t\t</div>\n\t\t\t\t<div class="btn">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t'+this.config.btnText+'\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n\t\t\t\t<div class="closeBtn"></div>\n            </div>\n        </div>'}},{key:"watchs",value:function(){var t=this;$(".closeBtn").off("click").on("click",function(){t.remove()}),$(".btn").click(function(){1==t.status?t.remove():2==t.status?(t.remove(),t.richman.coinAnimate(t.addMoney,t.selector)):4==t.status&&u(function(){t.videoPlayEnd()},1)})}},{key:"remove",value:function(){$("#Popup").remove()}}]),e}();e.default=l},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(12);var o=window.common,r=o.heritance.Comp,a=(o.Gdata,o.Util,window.standard.Store,function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.config={},n.status=t.status,n.init(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r),i(e,[{key:"init",value:function(){this.setConfig(),$("body").append(this.html()),this.watchs();var t=$(".fail_popup_bg");t.addClass("animated bounceInUp"),setTimeout(function(){t.removeClass("animated bounceInUp")},1e3)}},{key:"setConfig",value:function(){1==this.status?(this.config.title="诶呀就差一点点！",this.config.btnText="继续赚钱"):2==this.status&&(this.config.title="谢谢参与！",this.config.btnText="再来一次")}},{key:"html",value:function(){return'\n        <div id="FailPopup" class="FailPopup"> \n            <div class="fail_popup_bg">\n\t\t\t\t<div class="title">'+this.config.title+'</div>\n\t\t\t\t<div class="btn">\n\t\t\t\t\t'+this.config.btnText+'\n\t\t\t\t</div>\n\t\t\t\t<div class="closeBtn"></div>\n            </div>\n        </div>'}},{key:"watchs",value:function(){var t=this;$(".closeBtn").off("click").on("click",function(){t.remove()}),$(".btn").click(function(){t.remove()})}},{key:"remove",value:function(){$("#FailPopup").remove()}}]),e}());e.default=a},function(t,e,n){"use strict";var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(3);var o=n(4),r=p(n(0)),a=p(n(6)),s=p(n(8)),c=p(n(10)),u=p(n(1)),l=p(n(13)),d=p(n(15)),f=p(n(17));function p(t){return t&&t.__esModule?t:{default:t}}function v(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function m(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}function y(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}var h=window.common,b=h.onload,w=h.heritance.Alice,g=h.Util,k=(h.Adax,window.standard),_=k.Store,T=(k.Loca,k.Matics,window.common.Util),x=T.loadVideoBack,O=(T.onRewardBack,T.loadRewardVideo,T.showRewardVideo),P=void 0,N=[[4,2,4,1,5,4,2,2,5,6],[4,2,5,6,5,2,3,2,5,3],[6,5,4,1,6,2,3,2,6,5],[2,4,5,5,6,2,4,1,6,5],[5,1,3,2,6,5,2,5,5,6],[4,5,2,5,6,2,5,6,4,3]],S=(0,o.getQueryString)("ivideoappid"),C=g.initStoreKey("TV013index"+(S||""),{model:"4"}),j={isClick:!0,playtime:0,remark:[{label:""},{label:""},{label:"10"},{label:""},{label:"bag"},{label:""},{label:"box"},{label:""},{label:""},{label:"20"},{label:""},{label:"plate"},{label:""},{label:""},{label:""},{label:""},{label:"obstacles"},{label:""}],distance:[]},G=function(t){function e(t){return v(this,e),m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t))}return y(e,w),i(e,[{key:"message",value:function(t){(0,f.default)({str:t,time:800,position:"middle"})}}]),e}();new(function(t){function e(t){v(this,e);var n=m(this,(e.__proto__||Object.getPrototypeOf(e)).call(this,t));return n.flag=1,n.diceGroup=N[0],n.records={isTV013:!0,isNewUser:!0,playerGetStepNum:0,playerGetPacketNum:0,playerGetLimitNum:3,nextWeekTime:(0,o.getNextWeekTime)(),isPlayerFreeNumZero:!1,viewVideoLockNum:7,tomorrowTime:(0,o.getTomorrowTime)(),diceGroup:n.encryption(n.diceGroup),cashDiceIndex:0},n.CnewUser=null,n.attr.activityremark="",n.attr.otherremark="",n.getData(),n}return y(e,G),i(e,[{key:"getData",value:function(){var t=this;_.get(C)?(this.records=JSON.parse(_.get(C)),this.diceGroup=this.decryption(this.records.diceGroup),this.initData()):this.adax.storageGet().then(function(e){JSON.parse(e.value).isPlayerFreeNumZero&&(t.records=JSON.parse(e.value),t.diceGroup=t.decryption(t.records.diceGroup)),t.initData()},function(){t.initData()})}},{key:"initData",value:function(){this.records.isNewUser&&(this.CnewUser=new l.default({richman:this}));var t=(0,o.getCurrTime)();t>this.records.tomorrowTime&&(this.diceGroup=N[this.randomNum(0,5)],this.records.playerGetStepNum=0,this.records.playerGetLimitNum=3,this.records.isPlayerFreeNumZero=!1,this.records.viewVideoLockNum=7,this.records.tomorrowTime=(0,o.getTomorrowTime)(),this.records.diceGroup=this.encryption(this.diceGroup),this.records.cashDiceIndex=0,this.saveToStore()),t>this.records.nextWeekTime&&(this.records.playerGetPacketNum=0,this.records.nextWeekTime=(0,o.getNextWeekTime)(),this.saveToStore()),this.init(),this.calculateDistance(),this.showPlayerGetMoneyTotal(),this.getAwardTime(),this.records.isPlayerFreeNumZero?this.records.viewVideoLockNum>0?$(".begin").attr("statis-name","Video_004"):$(".begin").attr("statis-name",""):$(".begin").attr("statis-name","Video_actPlay"),this.bind()}},{key:"init",value:function(){b({ctype:"G",noClipBody:!0,nodeten:!0}),this.increase(),this.getActivityInfo()}},{key:"saveToStore",value:function(){try{_.set(C,JSON.stringify(this.records))}catch(t){console.log("报错了")}this.adax.storageSave({value:JSON.stringify(this.records)})}},{key:"encryption",value:function(t){return t.map(function(t){switch(t){case 1:return 6;case 2:return 9;case 3:return 14;case 4:return 21;case 5:return 30;case 6:return 41;default:return 6}})}},{key:"decryption",value:function(t){return t.map(function(t){switch(t){case 6:return 1;case 9:return 2;case 14:return 3;case 21:return 4;case 30:return 5;case 41:return 6;default:return 1}})}},{key:"bind",value:function(){var t=this;$(document).on("touchend",".rule",function(t){t.preventDefault(),new d.default}),$(".withdraw_button").on("click",function(){t.message("您还未到提现门槛，请继续赚钱吧！")}),$(".begin").on("click",function(){if(t.records.isPlayerFreeNumZero&&t.records.viewVideoLockNum<=0)t.message("今日机会已用完，请明天再来~");else if(j.isClick)if(j.isClick=!1,t.records.isPlayerFreeNumZero){if(t.records.viewVideoLockNum<=0)return void t.message("今日机会已用完，请明天再来~");O(function(){t.videoPlayEnd()},1)}else 1==t.records.playerGetLimitNum?(t.records.isPlayerFreeNumZero=!0,t.records.playerGetLimitNum=0):t.records.playerGetLimitNum--,t.saveToStore(),t.getAwardTime(),t.showStepDiv()})}},{key:"loadVideo",value:function(){x(function(){O()})}},{key:"videoPlayEnd",value:function(){this.records.viewVideoLockNum--,this.saveToStore(),this.getAwardTime(),this.showStepDiv()}},{key:"showStepDiv",value:function(){2==this.records.playerGetStepNum?$(".red_packet10").find(".packet10").css("display","block"):4==this.records.playerGetStepNum?$(".bag").find(".bag_bg").css("display","block"):6==this.records.playerGetStepNum?$(".box").find(".box_bg").css("display","block"):9==this.records.playerGetStepNum?$(".red_packet20").find(".packet20").css("display","block"):13==this.records.playerGetStepNum?$(".gift").css("display","block"):11==this.records.playerGetStepNum?$(".plate").find(".plate_bg").css("display","block"):16==this.records.playerGetStepNum&&$(".chest").css("display","block"),this.animate()}},{key:"anylazeDiceResult",value:function(t){this.move(t)}},{key:"move",value:function(t){var e=this,n=0;this.timer=setInterval(function(){e.records.playerGetStepNum>=17&&(e.records.playerGetStepNum=-1),e.jump(),$(".human_wrap").css(j.distance[e.records.playerGetStepNum+1]),e.records.playerGetStepNum++,++n==t&&(clearInterval(e.timer),e.stop(),e.saveToStore(),"10"===j.distance[e.records.playerGetStepNum].label?(setTimeout(function(){new r.default({selector:".red_packet10",status:2,addMoney:.8,richman:e,records:e.records})},500),$(".red_packet10").find(".packet10").css("display","none")):"20"===j.distance[e.records.playerGetStepNum].label?(setTimeout(function(){new r.default({selector:".red_packet20",status:2,addMoney:1.5,richman:e,records:e.records})},500),$(".red_packet20").find(".packet20").css("display","none")):"bag"===j.distance[e.records.playerGetStepNum].label?(setTimeout(function(){new r.default({selector:".bag",status:4,richman:e,records:e.records})},500),$(".bag").find(".bag_bg").css("display","none")):"box"===j.distance[e.records.playerGetStepNum].label?(setTimeout(function(){new a.default({selector:".box",richman:e,records:e.records})},500),$(".box").find(".box_bg").css("display","none")):"plate"===j.distance[e.records.playerGetStepNum].label?(setTimeout(function(){new c.default({selector:".plate",parent:e,records:e.records,richman:e})},500),$(".plate").find(".plate_bg").css("display","none")):"obstacles"===j.distance[e.records.playerGetStepNum].label?(setTimeout(function(){new s.default({records:e.records,richman:e,selector:".chest"})},500),$(".chest").css("display","none")):setTimeout(function(){new u.default({status:1})},500),j.isClick=!0)},300)}},{key:"calculateDistance",value:function(){var t=this;$(function(){setTimeout(function(){var e=[];$(".grid").each(function(t,n){var i={};i.left=$(n).position().left,i.top=$(n).position().top,e.push(i)});for(var n=0;n<e.length;n++)e[n].label||(e[n].label=j.remark[n].label);j.distance=e,$(".human_wrap").css(j.distance[t.records.playerGetStepNum]),t.turn()},10)})}},{key:"turn",value:function(){this.records.playerGetStepNum>=13?$(".human").addClass("human_turn"):$(".human").removeClass("human_turn")}},{key:"jump",value:function(){$(".human_bright").css("display","none"),$(".human").addClass("human_jump"),this.turn()}},{key:"stop",value:function(){$(".human").removeClass("human_jump"),$(".human_bright").css("display","block")}},{key:"coinAnimate",value:function(t,e){if(e){var n=$(""+e).find(".gold");n.show().addClass("fly"),n.off("webkitAnimationEnd").on({webkitAnimationEnd:function(){n.removeClass("fly").hide()}})}this.updatePlayerGetMoney(t)}},{key:"showPlayerGetMoneyTotal",value:function(){var t=this.records.playerGetPacketNum?this.records.playerGetPacketNum:0;$(".red_packet").html(""+t.toFixed(2))}},{key:"updatePlayerGetMoney",value:function(t){var e=this,n=0,i=setInterval(function(){n++,e.records.playerGetPacketNum+=t/8,e.records.playerGetPacketNum<=0&&(e.records.playerGetPacketNum=0);var o=e.records.playerGetPacketNum;$(".red_packet").text(""+o.toFixed(2)),n>=8&&(clearInterval(i),e.saveToStore(),e.increase())},80)}},{key:"getAwardTime",value:function(){this.records.isPlayerFreeNumZero?$(".playtime").html("视频解锁:<span>"+this.records.viewVideoLockNum+"</span>次"):$(".playtime").html("今日剩余:<span>"+this.records.playerGetLimitNum+"</span>次")}},{key:"randomNum",value:function(t,e){switch(arguments.length){case 1:return parseInt(Math.random()*t+1,10);case 2:return parseInt(Math.random()*(e-t+1)+t,10);default:return 0}}},{key:"animate",value:function(){var t=this;$(".dice").addClass("rotate"),$(".arrow,.hand").hide(),$(".dice").off("webkitAnimationEnd").on({webkitAnimationEnd:function(){P=t.diceGroup[t.records.cashDiceIndex],t.records.cashDiceIndex++,t.saveToStore(),t.startGo(P),t.records.isPlayerFreeNumZero?t.records.viewVideoLockNum>0?($(".begin").attr("statis-name","Video_004"),$(".begin").attr("statis-click-disabled","false")):$(".begin").attr("statis-name",""):$(".begin").attr("statis-name","Video_actPlay")}})}},{key:"startGo",value:function(t){$(".dice").attr("class","dice"),$(".dice").removeClass("rotate").addClass("dice"+t),this.anylazeDiceResult(t),$(".arrow,.hand").show()}},{key:"increase",value:function(){var t=this.records.playerGetPacketNum;$(".color_progress").animate({transform:"translate("+(t/80*100-100)+"%,0)"},1e3,"linear")}},{key:"getActivityInfo",value:function(){var t=this;this.adax.activityInfoA(this.temp).then(function(e){if(t.activity=e.activity,"TV013H"===$("#TV013").attr("version")?document.title="幸运大富翁":document.title=t.activity.activityparam.title,t.attr.activityremark=e.activity.activityremark,t.attr.otherremark=e.activity.otherremark,"TV013H"===$("#TV013").attr("version"))t.activity.activityparam.bgcolor,t.activity.activityparam.withdrawbtn,t.activity.activityparam.rule,t.activity.activityparam.needtimesbg,t.activity.activityparam.needtimesnumcolor,t.activity.activityparam.needtimestextcolor,t.activity.activityparam.mainbg,t.activity.activityparam.redpacketnumbg,t.activity.activityparam.progressbg,t.activity.activityparam.human,t.activity.activityparam.arrow,t.activity.activityparam.hand,t.activity.activityparam.dice1,t.activity.activityparam.dice2,t.activity.activityparam.dice3,t.activity.activityparam.dice4,t.activity.activityparam.dice5,t.activity.activityparam.dice6,t.activity.activityparam.packet1,t.activity.activityparam.packet2,t.activity.activityparam.wheel,t.activity.activityparam.bag1,t.activity.activityparam.bag2,t.activity.activityparam.box2,t.activity.activityparam.box1,t.activity.activityparam.bomb,t.activity.activityparam.humanbrightcolor})}}]),e}())},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.getRamdon=function(t,e){var n=t-e+1;return Math.abs(Math.floor(Math.random()*n))+t},e.formatNumber=function(t){var e="";e=t>=1e6?(t/1e4/100>999.99?999.99:(t/1e4/100).toFixed(2))+"m":t>=1e5?(t/10/100).toFixed(2)+"k":t+"";return e},e.getCurrTime=function(){return(new Date).getTime()},e.getTomorrowTime=function(){return new Date(new Date((new Date).toLocaleDateString()).getTime()+864e5).getTime()},e.getNextMonthTime=function(){return new Date(new Date((new Date).toLocaleDateString()).getTime()+2592e6).getTime()},e.getNextWeekTime=function(){var t=new Date,e=24*(7-(0==t.getDay()?7:t.getDay())+1);return new Date((new Date).toLocaleDateString()).getTime()+60*e*60*1e3},e.getQueryString=function(t){var e=new RegExp("(^|&)"+t+"=([^&]*)(&|$)"),n=window.location.search.substr(1).match(e);return null!=n?unescape(n[2]):null};window.common.Util.sendAdax},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(7);var o=window.common,r=o.heritance.Comp,a=(o.Gdata,o.Util,window.standard.Store,window.common.Util),s=a.loadVideoBack,c=(a.onRewardBack,a.loadRewardVideo),u=a.showRewardVideo,l=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.richman=t.richman,n.addMoney=t.addMoney||null,n.selector=t.selector,n.records=t.records,n.config={},n.init(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r),i(e,[{key:"init",value:function(){if(null===this.addMoney){for(var t=Math.random().toFixed(2);t<.1;)t=Math.random().toFixed(2);this.addMoney=t}$("body").append(this.html()),this.watchs();var e=$(".popup_bg");e.addClass("animated bounceInUp"),setTimeout(function(){e.removeClass("animated bounceInUp")},1e3)}},{key:"loadVideo",value:function(){c(),s(function(){})}},{key:"videoPlayEnd",value:function(){this.remove(),this.richman.coinAnimate(this.addMoney,this.selector)}},{key:"html",value:function(){return'\n        <div id="God" class="God"> \n\t\t\t<div class="god_bg">\n\t\t\t\t<div class="closeBtn"></div>\n\t\t\t\t<div class="money">\n\t\t\t\t\t<span class="amount">'+this.addMoney+'</span>\n\t\t\t\t\t<span class="yuan">元</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="btn" statis-name="Video_002">\n\t\t\t\t</div>\n            </div>\n        </div>'}},{key:"watchs",value:function(){var t=this;$(".closeBtn").off("click").on("click",function(){t.remove()}),$(".btn").click(function(){u(function(){t.videoPlayEnd()},1)})}},{key:"remove",value:function(){$("#God").remove()}}]),e}();e.default=l},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(9);var o=window.common,r=o.heritance.Comp,a=(o.Gdata,o.Util,window.standard.Store,window.common.Util),s=(a.loadVideoBack,a.onRewardBack,a.loadRewardVideo,a.showRewardVideo,function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.records=t.records,n.selector=t.selector,n.richman=t.richman,n.config={},n.init(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r),i(e,[{key:"init",value:function(){$("body").append(this.html()),this.watchs();var t=$(".obstacle_bg");t.addClass("animated bounceInUp"),setTimeout(function(){t.removeClass("animated bounceInUp")},1e3)}},{key:"html",value:function(){return'\n        <div id="Obstacle" class="Obstacle"> \n\t\t\t<div class="obstacle_bg">\n\t\t\t\t<div class="closeBtn"></div>\n\t\t\t\t<div class="discription">\n\t\t\t\t\t损失10%现金\n\t\t\t\t</div>\n\t\t\t\t<div class="btn">\n\t\t\t\t</div>\n            </div>\n        </div>'}},{key:"reduceMoney",value:function(){var t=0-this.records.playerGetPacketNum*.1.toFixed(2);this.richman.coinAnimate(t,this.selector)}},{key:"watchs",value:function(){var t=this;$(".closeBtn").off("click").on("click",function(){t.remove()}),$(".btn").click(function(){t.remove()})}},{key:"remove",value:function(){this.reduceMoney(),$("#Obstacle").remove()}}]),e}());e.default=s},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(11);var o=a(n(0)),r=a(n(1));function a(t){return t&&t.__esModule?t:{default:t}}window.standard.module.output;var s=window.common,c=s.heritance.Comp,u=(s.Gdata,window.standard.Doom),l=window.common.Util.showRewardVideo,d=0,f=["780","1440","1020","960","900","840"],p=[0,0,0,.4,.4,.2],v=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.richman=t.richman,n.selector=t.selector,n.records=t.records,n.attr.isWorking=!1,n.attr.angle=0,n.init(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,c),i(e,[{key:"init",value:function(){this.load(),this.bind()}},{key:"load",value:function(){$("body").append(this.html())}},{key:"videoPlayEnd",value:function(){this.attr.isWorking=!0,this.rotating(),this.btnStatus(event)}},{key:"bind",value:function(){var t=this;this.rotateInt(),$(document).on("click",".start",function(e){t.attr.isWorking?t.btnStatus(e):l(function(){t.videoPlayEnd()},1)}),$(".wheel").off("webkitTransitionEnd").on({webkitTransitionEnd:function(e){$("#CTurnplate").attr("data-angle",d),t.attr.angle=d,960==t.attr.angle?new o.default({selector:t.selector,status:2,addMoney:1,richman:t.richman,records:t.records}):900==t.attr.angle?new o.default({selector:t.selector,status:2,addMoney:.5,richman:t.richman,records:t.records}):new r.default({status:2}),t.attr.isWorking=!1,t.remove()}}).bind(this),$(document).on("click","#slyderAdventuresClose",function(){t.remove()})}},{key:"random",value:function(t,e){for(var n=0,i=0,o=Math.random(),r=e.length-1;r>=0;r--)n+=e[r];o*=n;for(r=e.length-1;r>=0;r--)if(o<=(i+=e[r]))return t[r];return null}},{key:"btnStatus",value:function(t){$(t.currentTarget).addClass("click"),setTimeout(function(){$(t.currentTarget).removeClass("click")},100)}},{key:"rotateInt",value:function(){$(".wheel").removeClass("roing").addClass("roteinit")}},{key:"rotating",value:function(){var t=$(".wheel"),e=u.getRotate(".wheel");d=parseInt(this.random(f,p)),t.removeClass("roteinit"),t.css({transform:"rotate("+e+"deg)","-webkit-transform":"rotate("+e+"deg)"}),setTimeout(function(){t.addClass("roing").css({transform:"rotateZ("+d+"deg)","-webkit-transform":"rotateZ("+d+"deg)"})},100)}},{key:"html",value:function(){return'\x3c!-- 转盘内容 --\x3e\n\t\t\t\t<div id="CTurnplate">\n\t\t\t\t\t<div id="slyderAdventuresBG">\n\t\t\t\t\t\t<div id="slyderAdventuresClose">\n\t\t\t\t\t\t</div>\n\t\t\t\t\t\t<div class="title">看视频抽现金红包</div>\n\t\t\t\t\t\t<div id="slydAdvent" class="wheel roteinit"></div>\n\t\t\t\t\t\t<div id="lighting"></div>\n\t\t\t\t\t\t<div id="Pointer_1" class="start" statis-name="Video_003"></div>\n\t\t\t\t\t\t<div id="slyderHand" css-name="R_pointfade"></div>\n\t\t\t\t\t</div> \n                </div>'}},{key:"remove",value:function(){$("#CTurnplate").remove()}}]),e}();e.default=v},function(t,e){},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(14);var o=window.common,r=o.heritance.Comp,a=(o.Gdata,o.Util,window.standard.Store,function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.richman=t.richman,n.addMoney=18.88,n.config={},n.init(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r),i(e,[{key:"init",value:function(){$("body").append(this.html()),this.watchs();var t=$(".new_user_bg");t.addClass("animated bounceInUp"),setTimeout(function(){t.removeClass("animated bounceInUp")},1e3)}},{key:"html",value:function(){return'\n        <div id="NewUser" class="NewUser"> \n            <div class="new_user_bg">\n\t\t\t\t<div class="title">新人红包已到账！</div>\n\t\t\t\t<div class="money">\n\t\t\t\t\t<span class="amount">'+this.addMoney+'</span>\n\t\t\t\t\t<span class="yuan">元</span>\n\t\t\t\t</div>\n\t\t\t\t<div class="discription">\n\t\t\t\t\t满80元可提现至支付宝\n\t\t\t\t</div>\n\t\t\t\t<div class="btn" statis-name="Video_actPlay">\n\t\t\t\t\t<p>\n\t\t\t\t\t\t开心收下\n\t\t\t\t\t</p>\n\t\t\t\t</div>\n            </div>\n        </div>'}},{key:"watchs",value:function(){var t=this;$(".btn").click(function(){t.richman.records.isNewUser=!1,t.remove(),t.richman.coinAnimate(18.88)})}},{key:"remove",value:function(){$("#NewUser").remove()}}]),e}());e.default=a},function(t,e){},function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=function(){function t(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}return function(e,n,i){return n&&t(e.prototype,n),i&&t(e,i),e}}();n(16);var o=window.common,r=o.heritance.Comp,a=o.Gdata,s=function(t){function e(t){!function(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}(this,e);var n=function(t,e){if(!t)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!e||"object"!=typeof e&&"function"!=typeof e?t:e}(this,(e.__proto__||Object.getPrototypeOf(e)).call(this));return n.config=[["1、参与活动即有机会获得幸运奖，每天有3次免费掷骰子机会，看视频可额外获得掷骰子机会，每天最高有10次机会，红包累积到达80元可提现；"],["2、现金可从用户首次进入游戏累计到每周日23：59：59，每周一0点清零，请注意及时提现"],["3、如发现用户存在作弊行为，则取消用户奖励"],["4、如有问题，可联系客服电话 "+a.CSPN+"，或客服QQ "+a.CSQQ+"。"]],n.init(),n}return function(t,e){if("function"!=typeof e&&null!==e)throw new TypeError("Super expression must either be null or a function, not "+typeof e);t.prototype=Object.create(e&&e.prototype,{constructor:{value:t,enumerable:!1,writable:!0,configurable:!0}}),e&&(Object.setPrototypeOf?Object.setPrototypeOf(t,e):t.__proto__=e)}(e,r),i(e,[{key:"init",value:function(){$("body").append(this.html()),this.watchs();var t=$(".rule_bg");t.addClass("animated bounceInUp"),setTimeout(function(){t.removeClass("animated bounceInUp")},1e3)}},{key:"html",value:function(){return'\n        <div id="Rule" class="Rule"> \n\t\t\t<div class="rule_bg">\n\t\t\t\t<div class="topbg"></div>\n                <div class="closeBtn"></div>\n                <div class="txt_box">\n                    <p>'+this.config[0]+"</p>\n                    <p>"+this.config[1]+"</p>\n                    <p>"+this.config[2]+"</p>\n                    <p>"+this.config[3]+"</p>\n                </div>\n            </div>\n        </div>"}},{key:"watchs",value:function(){var t=this;$(".closeBtn").off("click").on("click",function(){t.remove()})}},{key:"remove",value:function(){$("#Rule").remove()}}]),e}();e.default=s},function(t,e){},function(t,e,n){
/*!
 * A Toast Box
 * v1.1.4 ©2018 PLDaily <pcd12321@gmail.com> 
 * https://github.com/PLDaily/show-toast#readme
 */
!function(e,n){t.exports=n()}("undefined"!=typeof self&&self,function(){return function(t){function e(i){if(n[i])return n[i].exports;var o=n[i]={i:i,l:!1,exports:{}};return t[i].call(o.exports,o,o.exports,e),o.l=!0,o.exports}var n={};return e.m=t,e.c=n,e.d=function(t,n,i){e.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},e.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return e.d(n,"a",n),n},e.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},e.p="/",e(e.s=0)}([function(t,e,n){"use strict";var i="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t},o=function(t){return t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},r={_is_load:!1,showAlertMsgBox:function(t){if(this._is_load)this.doEvent(t);else{var e=[];e.push("zIndex:9999999999"),e.push("padding:12px"),e.push("minWidth:200px"),e.push("borderRadius:5px"),e.push("lineHeight:1.2"),e.push("fontSize:12px"),e.push("color:#FFF"),e.push("boxSizing:border-box"),e.push("backgroundColor:rgba(39, 39, 39, 0.7)"),e.push("position:fixed"),e.push("left:50%"),e.push("transform:translateX(-50%)"),e.push("textAlign:center");var n=document.createDocumentFragment();this.oDiv=document.createElement("div"),this.oDiv.className="show-toast";for(var i=0,r=e.length;i<r;i++){var a=o(e[i].split(":")[0]),s=o(e[i].split(":")[1]);this.oDiv.style[a]=s}n.appendChild(this.oDiv),document.body.appendChild(n),this._is_load=!0,this.doEvent(t)}},doEvent:function(t){var e=this;this.timer&&clearTimeout(this.timer),this.timer=setTimeout(function(){e.oDiv.style.display="none",clearTimeout(e.timer),e.timer=null},t.time),this.oDiv.style.display="block",this.oDiv.innerHTML=t.str,"top"===t.position?(this.oDiv.style.top="50px",this.oDiv.style.bottom="auto",this.oDiv.style.transform="translate(-50%, 0)"):"bottom"===t.position?(this.oDiv.style.bottom="50px",this.oDiv.style.top="auto",this.oDiv.style.transform="translate(-50%, 0)"):(this.oDiv.style.top="50%",this.oDiv.style.bottom="auto",this.oDiv.style.transform="translate(-50%, -50%)")}};t.exports=function(t){var e={};if(function(t){return"object"===(void 0===t?"undefined":i(t))&&!!t}(t))e=t;else{if(!function(t){return"[object String]"===Object.prototype.toString.call(t)}(t))throw new TypeError("Expected an object or a String");e={str:t}}e=function(t){for(var e=arguments.length,n=Array(e>1?e-1:0),i=1;i<e;i++)n[i-1]=arguments[i];var o=!0,r=!1,a=void 0;try{for(var s,c=n[Symbol.iterator]();!(o=(s=c.next()).done);o=!0){var u=s.value;for(var l in u)t[l]=u[l]}}catch(t){r=!0,a=t}finally{try{!o&&c.return&&c.return()}finally{if(r)throw a}}return t}({str:"success",time:2e3,position:"middle"},e),r.showAlertMsgBox(e)}}])})}]);