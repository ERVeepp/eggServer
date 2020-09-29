
var s = document.getElementsByTagName('script')[0];

function getFileParameter() {
  var test = document.getElementById("kexun_jstag_tulyprsdo");
  var src = test.getAttribute("src");
  var theRequest = new Object();
  if (src.indexOf("?") != -1) {
      var str = src.substr(src.indexOf('?') + 1);
      var strs = str.split("&");
      for (var i = 0; i < strs.length; i++) {
          theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
      }
  }
  return theRequest
}
var JsPara=getFileParameter()
var slot=JsPara["slot"]
var token=JsPara["token"]

val_random=Math.random()
console.log("val_random="+val_random)
if (Math.random() >= 0.1) {
  cnzz();
}
start();

function cnzz() {
  // 数据统计
  var cnzzData = {
    "1": {
      "url": "https://s5.cnzz.com/z_stat.php?id=1277001430&web_id=1277001430",
      "token": "Wk0_8Z65UxltGMnHveE7LQ",
    },
    "2": {
      "url": "https://s96.cnzz.com/z_stat.php?id=1277051767&web_id=1277051767",
      "token": "JGIyogzhd_SS1StlJ5pdTw",
    },
    "3": {
      "url": "https://s96.cnzz.com/z_stat.php?id=1277054832&web_id=1277054832",
      "token": "lD2Wb8e3uBnkgyRpUdeZFQ",
    },
    "4": {
      "url": "https://s5.cnzz.com/z_stat.php?id=1277054940&web_id=1277054940",
      "token": "NFcWVU9xmHxc5EcrJxL8qg",
    },
    "5": {
      "url": "https://s5.cnzz.com/z_stat.php?id=1277222468&web_id=1277222468",
      "token": "mxLTrGCp7uy5vJNPV66FdQ",
    },
    "6": {
      "url": "https://s96.cnzz.com/z_stat.php?id=1277222475&web_id=1277222475",
      "token": "riA44cYyPuIZ4grFfSa5mw",
    },
    "7": {
      "url": "https://s23.cnzz.com/z_stat.php?id=1277222479&web_id=1277222479",
      "token": "zGS0Ywi4L7uLitjfV7d4sw",
    },
    "9": {
      "url": "https://s5.cnzz.com/z_stat.php?id=1277222485&web_id=1277222485",
      "token": "gCTWxdEzqPE1acFHiaMMyw",
    },
    "10": {
      "url": "https://s96.cnzz.com/z_stat.php?id=1277222490&web_id=1277222490",
      "token": "tiAwicVsuwnU32sFVj90IQ",
    },
    "11": {
      //天气预报之二190704
      "url": "https://s23.cnzz.com/z_stat.php?id=1277784153&web_id=1277784153",
      "token": "vkh60mjk2jYI7o5bq8f8vQ",
    },
  };
  var obj = cnzzData[slot];
  if (obj.token == token) {
    var la = document.createElement('script');
    la.type = 'text/javascript';
    la.async = true;
    la.src = obj.url;
    console.log("cnzz="+obj.url)
    s.parentNode.insertBefore(la, s);
  } else {
    console.log('invalid token');
  }
}

function start() {
  var tag = document.createElement('script');
  tag.id = 'babymoroTag';
  tag.type = 'text/javascript';
  tag.async = true;
  // tag.src = 'https://cdn.static.babymoro.com/jt/tag.min.js?slot='+slot+'&token='+token;
  tag.src = './tag_v2.js';
  s.parentNode.insertBefore(tag, s);
}