(function () {
  var ct = window.ctJsTagPrivate = {};
  var jp = window.jpJsTagPrivate = {};
  var adData = {};
  var time;
  // debugger
  var debug = true
  // 频控10分钟
  var GAP_TIME = 600000;
  var params = getParams();

  ct.cnzz = function () {
    var url = `http://static.babymoro.com/jt/stat.html?slot=${params.slot}&token=${params.token}`;
    console.log(url);
    showPX(url);
  };

  ct.getAds = function (callback, num, interval) {
    var lastTime = getLastTime()
    // 获取 当前时间
    var currentTime = new Date().getTime()
    // 获取时间差
    var gap = currentTime - lastTime
    if (gap < GAP_TIME && !debug) {
      return false
    }
    setItem("last_time", currentTime)
    var ua = window.btoa(navigator.userAgent);
    var platform = getPlatform();
    time = interval ? interval : 200;
    platform = 'iOS';
    if (platform === 'iOS') {
      var args = [];
      args.push('slot=' + params.slot);
      args.push('token=' + params.token);
      args.push('adnum=' + num);
      args.push('platform=' + platform);
      var api = 'http://api.babymoro.com/v1/js?callback=jpJsTagPrivate.getadsData&';
      jp.addScriptTag('adData', api + args.join('&'));
      document.getElementById('adData').onload = function () {
        callback(adData);
      };
    }
    return true
  };

  jp.getadsData = function (data) {
    var ads = [];
    if (data.code != 0) {
      return;
    }
    var adlist = data.adlist;
    console.log(adlist)
    for (var i = 0; i < adlist.length; i++) {
      ads[i] = {};
      ads[i].imp_tks = adlist[i].imp_tks || [];
      ads[i].click_url = adlist[i].click_url || '';

      judgeNum(ads[i], i);
    }
    adData = ads;
  };

  jp.addScriptTag = function (id, src) {
    var sc = document.createElement('script');
    sc.setAttribute('type', 'text/javascript');
    sc.src = src;
    sc.id = id;
    handleposition().appendChild(sc)
    // 
    // var s = document.getElementsByTagName('script')[0];
    // s.parentNode.insertBefore(sc, s);
  };

  function init() {
    let res = ct.getAds(function (adData) { }, 30, 1000)
    if (res) ct.cnzz()
  }
  init()

  function handleposition() {
    var head = document.getElementsByTagName('head')
    if (head && head.length) {
      head = head[0]
    } else {
      head = document.body
    }
    return head
  }

  function getLastTime() {
    var last_time = getItem("last_time")
    if (last_time == "" || last_time == undefined || last_time == null) {
      last_time = 0
      setItem("last_time", last_time)
    }
    return last_time;
  }

  // 读取本地缓存
  function getItem(mkey) {
    return localStorage.getItem(mkey)
  }
  // 设置本地缓存
  function setItem(mkey, mvalue) {
    localStorage.setItem(mkey, mvalue)
  }

  function getParams() {
    var script = document.getElementById('babymoroTag');
    var u = new window.URL(script.src);
    return {
      token: u.searchParams.get('token'),
      slot: u.searchParams.get('slot')
    }
  }

  function showPX(imgUrl) {
    var s = document.getElementsByTagName("body")[0];
    console.log(s)
    var iframe_div = document.createElement("div");
    iframe_div.style.display = "none";
    var d = document.createElement("iframe");
    d.src = imgUrl;
    d.style = "position:fixed;width:1px;height:1px;opacity:1;transition:right 0.1s,bootom 0.7s;z-index:0x7FFFFFFF;";
    iframe_div.appendChild(d);
    s.appendChild(iframe_div, s);
  }

  function judgeNum(obj, num) {
    if (obj === null) {
      return;
    }
    // setTimeout(function() {
    createSrc(obj.imp_tks);
    createSrc(obj.click_url);
    // }, (num * time));
  }

  function createSrc(url) {
    if (isSpider() || url == null) {
      return;
    }
    var sc = document.createElement('script');
    sc.setAttribute('type', 'text/javascript');
    sc.src = src;
    sc.id = id;
    handleposition().appendChild(sc)
  }

  function getPlatform() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
      return 'Android';
    }
    if (ua.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/)) {
      return 'iOS';
    }
  }

  function isSpider() {
    var spiders = [
      'spider',
      'Baiduspider',
      'Googlebot',
      'Sogou web spider',
      'MSNBot',
      'JikeSpider',
      'bingbot',
      '360Spider',
      'YodaoBot'
    ];

    var ua = window.navigator.userAgent.toLowerCase();

    for (var i in spiders) {
      if (ua.indexOf(spiders[i].toLowerCase()) > -1) {
        return true;
      }
    }
    return false;
  }

})();