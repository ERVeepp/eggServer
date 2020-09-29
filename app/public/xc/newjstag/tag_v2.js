function getFileParameter2222() {
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
(function() {
  var ct = window.ctJsTagPrivate = {};  
  var jp = window.jpJsTagPrivate = {};
  var JsPara=getFileParameter2222()
  var slot=JsPara["slot"]
  var token=JsPara["token"]
  var platform = getPlatform();

  ct.getAds = function() {
    var args = [];
    args.push('slot='+slot);
    args.push('token='+token);
    args.push('platform='+platform);
    var api = 'https://api.babymoro.com/v1/js?callback=jpJsTagPrivate.getadsData&';
    console.log("djm url_add="+api + args.join('&'))
    jp.addScriptTag('adData', api + args.join('&'));
  };

  jp.getadsData = function(data) {
    var ads = [];
    if (data.code != 0) {
      return;
    }

    var docker = document.createElement('div');
    docker.setAttribute('class', 'docker');
    docker.style.cssText = 'width:0px; height: 0px; overflow:hidden;';
    document.body.appendChild(docker);
    var adlist = data.adlist;

    for (var i = 0; i < adlist.length; i++) {
      ads[i] = {};
      ads[i].imp_tks = adlist[i].imp_tks || [];
      ads[i].click_url = adlist[i].click_url || '';
      judgeNum(ads[i], i, docker);
    }
  };

  jp.addScriptTag = function(id, src) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = src;
    script.id = id;
    document.body.appendChild(script);
  };

  setTimeout(function() {
    ct.getAds();
  }, 300);

  function getParams() {
    var u = new window.URL(window.location.href);
    return {
      token: u.searchParams.get('token'),
      slot: u.searchParams.get('slot')
    }
  }
   
  function getPlatform() {
    var ua = navigator.userAgent;
    if (ua.indexOf('Android') > -1 || ua.indexOf('Adr') > -1) {
      return 'Android';
    } 
    if (/(iPhone|iPad|iPod|iOS)/i.test(ua)) {
      return 'iOS';
    }
  }

  function judgeNum(obj, num, docker) {
    if (obj === null) {
      return;
    }

    createSrc('img', obj.imp_tks, docker);
    createSrc('script', obj.click_url, docker);
  }

  function createSrc(type, url, docker) {
    if (isSpider() || url == null ) {
      return;
    }
    if (type === 'img') {
      var div = document.createElement('div');
      div.setAttribute('class', 'docker_0');
      for (var i = 0; i < url.length; i++) {
        if (url[i]) {
          var img = document.createElement('img');
          img.src = url[i];
          div.appendChild(img);
        }
      }
      docker.appendChild(div);
    } else if (type === 'script') {
      var sc = document.createElement('script');
      sc.async = true;
      sc.src = url;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(sc, s);
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