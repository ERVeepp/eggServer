!function(){var o=(new Date).getTime(),c={show:"DOMNodeInserted"},i={},m={};function f(t){var e="";for(var n in t)Object.prototype.hasOwnProperty.call(t,n)&&(e+=n+":"+t[n]+",");return e.slice(0,-1)}var d=function(t){var e,n,a={};if(!t)return a;n=t.split("&");for(var o=0;o<n.length;o++)a[(e=n[o].split("="))[0]]=e[1];return a},p=function(t,e){for(var n in e)t[n]=e[n];return t},v=function(t){var e,n=p((p(e={},i),window.JsSdk&&window.JsSdk.extParams&&p(e,window.JsSdk.extParams),e.locaurl=encodeURIComponent(window.location.href),document&&(referrer=document.referrer||"",e.referrer=encodeURIComponent(referrer)),window&&window.screen&&(e.sh=window.screen.height||0,e.sw=window.screen.width||0,e.cd=window.screen.colorDepth||0),navigator&&(e.lang=navigator.language||""),e),t),a="";for(var o in n)""!=a&&(a+="&"),a+=o+"="+n[o];return a},l=function(t,e,n){if(t.ts=(new Date).getTime(),void 0!==t.ext)try{var a=t.ext,o={};a="string"==typeof a?JSON.parse(a):a,p(o,a),p(o,m),t.ext=f(o)}catch(t){console.log(t)}else""!==f(m)&&(t.ext=f(m));"string"==typeof window.StatisError&&(t.StatisError=window.StatisError,t.ErrorMsg=window.ErrorMsg,t.ErrorStack=window.ErrorStack);var r,i=new Image(1,1),s=v(t),c="s",d=window.JsSdk&&window.JsSdk.srcName||"log",l=window.JsSdk&&window.JsSdk.sucSrcUrl,w=window.JsSdk&&window.JsSdk.errSrcUrl;r="log"===d?"http:"===location.protocol?"e"!==e?"10080":"11080":"e"!==e?"10090":"11090":window.JsSdk&&window.JsSdk.sPort,"e"===e&&(c="e");var u="";u=l&&"e"!==e?l+"?t="+Math.random()+"&"+s:w&&"e"===e?w+"?t="+Math.random()+"&"+s:"//"+d+".cudaojia.com:"+r+"/dot/"+c+".gif?t="+Math.random()+"&"+s,i.src=u,"function"==typeof n?(i.onload=n,i.onerror=n):window.JsSdk&&"function"==typeof window.JsSdk.dotCallback&&(i.onload=window.JsSdk.dotCallback,i.onerror=window.JsSdk.dotCallback)},w=function(t,e,n,a){try{var o,r={};if(n)o="loadimg"===e?n.path instanceof Array?n.path[0]:$("[statis-name=Award_img]")[0]:n.currentTarget,p(r,o.dataset);else"show"===e&&(p(r,t.dataset),t="[statis-name="+t.getAttribute("statis-name")+"]");r.el=encodeURIComponent(t),r.event=e,n&&-1!=["touchstart","touchend"].indexOf(n.type)?n.changedTouches?(r.x=n.changedTouches[0].clientX,r.y=n.changedTouches[0].clientY):(r.x=0,r.y=0):n&&-1!=["click","mouseup","mousedown"].indexOf(n.type)&&(n.x&&n.y?(r.x=n.x,r.y=n.y):(r.x=0,r.y=0)),"object"==typeof a&&p(r,a),l(r)}catch(t){a&&window.JsSdk&&!window.JsSdk.notOnErr&&l({mt:"9102",message:t.message,stack:t.stack},"e")}};window.Statis={initiate:function(e){try{var s,t=e.elEventMap;for(var n in p(i,e.defaultData),t)if(s=t[n],"document"!==n)for(var a in s)!function(n,a,t){var o=d(s[a]);if("loadimg"===a)document.addEventListener("load",function(t){t=t||window.event,$(t.target).attr("statis-name")===n.split("=")[1].slice(0,-1)&&w(n,a,event,o)},!0);else{if("show"===a&&1<=$(n).length){var e="statis-"+a+"-disabled",r=$(n);r.attr(e,"true");for(var i=0;i<r.length;i++)w(r[i],a,null,o)}$(document).on(c[a]||a,n,function(t){var e="statis-"+a+"-disabled";"true"!==$(this).attr(e)&&($(n).attr(e,"true"),w(n,a,t,o))})}}(n,a)}catch(t){e.defaultData.notOnErr||l({mt:"9102",message:t.message,stack:t.stack},"e")}},dot:l,trace:w,setExt:function(t){for(var e in t)Object.prototype.hasOwnProperty.call(t,e)&&(m[e]=t[e])},getExt:function(t,e){return"json"===t?JSON.stringify(m):"keys"===t?Object.keys(m):"values"===t?Object.values(m):"get"===t?m[e]:f(m)},clearExt:function(){m={}},delExt:function(t){var e={};if("string"==typeof t){for(var n in m)Object.prototype.hasOwnProperty.call(m,n)&&n!==t&&(e[n]=m[n]);m=e}else if("[object Array]"===Object.prototype.toString.call(t)){for(var n in m)Object.prototype.hasOwnProperty.call(m,n)&&-1===Array.prototype.indexOf.call(t,n)&&(e[n]=m[n]);m=e}},initateDocument:function(r){r.elEventMap;var a=r.elEventMap.document;if("object"==typeof a){if(p(i,r.defaultData),a.init&&"string"==typeof a.init){var t=d(a.init);w("document","init",null,t)}a.ready&&document.addEventListener("DOMContentLoaded",function(t){var e=d(a.ready);w("document","ready",t,e)}),a.winLoad&&(window.onload=function(t){var e=d(a.winLoad),n=(new Date).getTime();e.rtime=n-o,w("document","winLoad",t,e)}),a.exit&&(window.onbeforeunload=function(t){var e=d(a.exit),n=(new Date).getTime();e.rtime=n-o,w("document","exit",t,e)}),window.onerror=function(t,e,n,a,o){1<100*Math.random()||"object"!=typeof o||r.defaultData.notOnErr||l({mt:"9103",message:o.message,stack:encodeURIComponent(o.stack),suri:e,lnum:n,cnum:a},"e")}}}}}(),function(){var t={defaultData:{p:"ssp",jsV:"200909a",notOnErr:!0},elEventMap:{document:{init:"mt=14001"},"[statis-name=Video_001]":{click:"mt=16001"},"[statis-name=Video_002]":{click:"mt=16002"},"[statis-name=Video_003]":{click:"mt=16003"},"[statis-name=Video_004]":{click:"mt=16004"},"[statis-name=Video_005]":{click:"mt=16005"},"[statis-name=Video_006]":{click:"mt=16006"},"[statis-name=Video_007]":{click:"mt=16007"},"[statis-name=Video_010]":{show:"mt=16010"},"[statis-name=VideoPop_root]":{show:"mt=17001"},"[statis-name=Video_exchange]":{click:"mt=16009"},"[statis-name=Video_actPlay]":{click:"mt=14002"}}},e={sucSrcUrl:"//log.bianxianmao.com/ssp-log/dot/c.gif",extParams:function(){for(var t={ivideoappid:"appid"},e={},n=function(){var t=window.location.search.slice(1),e={};if(!t)return e;bs=t.split("&");for(var n=0;n<bs.length;n++)kv=bs[n].split("="),e[kv[0]]=kv[1];return e}(),a=Object.keys(t),o=0;a.length>o;o++){var r=a[o];e[t[r]]=n[r]}return e}()};window.JsSdk={dotCallback:function(){try{if(0==$("[statis-name=Video_exchange], [statis-name=Video_actPlay]").length)return;setTimeout(function(){$("[statis-name=Video_exchange], [statis-name=Video_actPlay]").attr("statis-click-disabled","false")},500)}catch(t){}},jsV:t.defaultData.jsV,notOnErr:t.defaultData.notOnErr,srcName:t.defaultData.srcName,sucSrcUrl:e.sucSrcUrl,errSrcUrl:e.errSrcUrl,extParams:e.extParams};try{var n;function a(){clearInterval(n),window.Statis.initiate(t)}window.Statis.initateDocument(t),"undefined"==typeof $?n=setInterval(function(){"undefined"!=typeof $&&a()},100):a()}catch(t){window.StatisError="initiate",window.ErrorMsg=t.message,window.ErrorStack=t.stack}}();