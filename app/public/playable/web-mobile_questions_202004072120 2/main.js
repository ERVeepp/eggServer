window.boot = function () {
    var settings = window._CCSettings;
    window._CCSettings = undefined;

    if ( !settings.debug ) {
        var uuids = settings.uuids;

        var rawAssets = settings.rawAssets;
        var assetTypes = settings.assetTypes;
        var realRawAssets = settings.rawAssets = {};
        for (var mount in rawAssets) {
            var entries = rawAssets[mount];
            var realEntries = realRawAssets[mount] = {};
            for (var id in entries) {
                var entry = entries[id];
                var type = entry[1];
                // retrieve minified raw asset
                if (typeof type === 'number') {
                    entry[1] = assetTypes[type];
                }
                // retrieve uuid
                realEntries[uuids[id] || id] = entry;
            }
        }

        var scenes = settings.scenes;
        for (var i = 0; i < scenes.length; ++i) {
            var scene = scenes[i];
            if (typeof scene.uuid === 'number') {
                scene.uuid = uuids[scene.uuid];
            }
        }

        var packedAssets = settings.packedAssets;
        for (var packId in packedAssets) {
            var packedIds = packedAssets[packId];
            for (var j = 0; j < packedIds.length; ++j) {
                if (typeof packedIds[j] === 'number') {
                    packedIds[j] = uuids[packedIds[j]];
                }
            }
        }

        var subpackages = settings.subpackages;
        for (var subId in subpackages) {
            var uuidArray = subpackages[subId].uuids;
            if (uuidArray) {
                for (var k = 0, l = uuidArray.length; k < l; k++) {
                    if (typeof uuidArray[k] === 'number') {
                        uuidArray[k] = uuids[uuidArray[k]];
                    }
                }
            }
        }
    }

    function setLoadingDisplay () {
        // Loading splash scene
        var splash = document.getElementById('splash');
        var progressBar = splash.querySelector('.progressBg_bar');
        var progress_txt = splash.querySelector('.progressBg_txt');
        cc.loader.onProgress = function (completedCount, totalCount, item) {
            if (progressBar) {
                var percent =  completedCount / totalCount;
                var wid = (percent*27 + 70).toFixed(0);
                progressBar.style.width =  (wid)+"px";
                if(progress_txt){
                    progress_txt.innerHTML= (percent *30 + 70).toFixed(0) + "%"
                }
            }
        };
        splash.style.display = 'block';
        progressBar.style.width = '0%';

        cc.director.once(cc.Director.EVENT_AFTER_SCENE_LAUNCH, function () {
            splash.style.display = 'none';
        });
    }

    var onStart = function () {
        cc.loader.downloader._subpackages = settings.subpackages;

        cc.view.enableRetina(true);
        cc.view.resizeWithBrowserSize(true);

        if (cc.sys.isMobile) {
            if (settings.orientation === 'landscape') {
                cc.view.setOrientation(cc.macro.ORIENTATION_LANDSCAPE);
            }
            else if (settings.orientation === 'portrait') {
                cc.view.setOrientation(cc.macro.ORIENTATION_PORTRAIT);
            }
            cc.view.enableAutoFullScreen([
                cc.sys.BROWSER_TYPE_BAIDU,
                cc.sys.BROWSER_TYPE_WECHAT,
                cc.sys.BROWSER_TYPE_MOBILE_QQ,
                cc.sys.BROWSER_TYPE_MIUI,
            ].indexOf(cc.sys.browserType) < 0);
        }

        // Limit downloading max concurrent task to 2,
        // more tasks simultaneously may cause performance draw back on some android system / browsers.
        // You can adjust the number based on your own test result, you have to set it before any loading process to take effect.
        if (cc.sys.isBrowser && cc.sys.os === cc.sys.OS_ANDROID) {
            cc.macro.DOWNLOAD_MAX_CONCURRENT = 2;
        }

        function loadScene(launchScene) {
            cc.director.loadScene(launchScene,
                function (err) {
                    if (!err) {
                        if (cc.sys.isBrowser) {
                            // show canvas
                            var canvas = document.getElementById('GameCanvas');
                            canvas.style.visibility = '';
                            var div = document.getElementById('GameDiv');
                            if (div) {
                                div.style.backgroundImage = '';
                            }
                        }
                        cc.loader.onProgress = null;
                        console.log('Success to load scene: ' + launchScene);
                    }
                    else if (CC_BUILD) {
                        setTimeout(function () {
                            loadScene(launchScene);
                        }, 1000);
                    }
                }
            );

        }

        var launchScene = settings.launchScene;

        //TODO: to confirm
        // function getBlurTexture(url){
        //     var canvas = document.createElement('canvas');
        //     var ctx = canvas.getContext('2d');
        //     canvas.width = 750;
        //     canvas.height = 1334;
        //     var img = new Image();
        //     img.src = url;
        //     img.setAttribute('crossorigin', 'anonymous');
        //     img.onload = function(){
        //         ctx.drawImage(img, 0, 0, 750, 1334);
        //         var imgData = ctx.getImageData(0, 0, 750, 1334);
        //         var blurData = window.gaussBlur(imgData);
        //         ctx.putImageData(blurData, 0, 0);
        //         var url = canvas.toDataURL('image/png');
        //         console.log(url);
        //     }
        // }

        // getBlurTexture("https://sf1-ttcdn-tos.pstatp.com/obj/ttfe/union/playable/remote_res/projects/rhythmGame/test/textures/reward.png");
        //load the remote res
        //Because the jslist is load in main.js
        function loadRemoteRes(prefix){
            //load res
            var splash = document.getElementById('splash');
            var progressBar = splash.querySelector('.progressBg_bar');
            var progress_txt = splash.querySelector('.progressBg_txt');

            splash.style.display = 'block';
            progressBar.style.width = '0%';

            //percent 70 is remote res proportion;
            var remoteCallBack = function(){
                if(progressBar){
                    var percent = window.remoteCur / window.remoteTotal;
                    var wid = (percent*70).toFixed(0);
                    progressBar.style.width =  wid +"px";
                    if(progress_txt){
                        progress_txt.innerHTML= (percent *70).toFixed(0) + "%"
                    }

                    if(window.remoteCur == window.remoteTotal){
                        if (cc.sys.isBrowser) {
                            setLoadingDisplay();
                        }
                        // load scene
                        loadScene(launchScene);
                    }
                }
            }

            var hashSet = [];
            window.remoteRes = {};
            window.remoteRes.texs = [];
            window.remoteRes.audios = [];
            window.remoteTotal = 0;
            window.remoteCur = 0;
            var scenes = window.gameCfg.phases.scenes;
            for(var key in scenes){
                var sprites = scenes[key].sprites;
                for(var spriteKey in sprites){
                    var urls = sprites[spriteKey].urls;
                    for(var urlKey in urls){
                        var url = urls[urlKey];
                        if(hashSet.indexOf(url) < 0){
                            hashSet.push(url);
                            window.remoteTotal++;
                            loadRemoteTexCore(prefix, url, remoteCallBack);
                        }
                    }
                }

                var audios = scenes[key].audios;
                for(var audioKey in audios){
                    var url = audios[audioKey].url;
                    if(hashSet.indexOf(url) < 0){
                        hashSet.push(url);
                        window.remoteTotal++;
                        loadRemoteAudioCore(prefix, url, remoteCallBack);
                    }
                }

                var prefabs = scenes[key].prefabs;
                for(var prefabKey in prefabs){
                    var sprites = prefabs[prefabKey].sprites;
                    for(var spriteKey in sprites){
                        var urls = sprites[spriteKey].urls;
                        for(var urlKey in urls){
                            var url = urls[urlKey];
                            if(hashSet.indexOf(url) < 0){
                                hashSet.push(url);
                                window.remoteTotal++;
                                loadRemoteTexCore(prefix, url, remoteCallBack);
                            }
                        }
                    }

                    var audios = prefabs[prefabKey].audios;
                    for(var audioKey in audios){
                        var url = audios[audioKey].url;
                        if(hashSet.indexOf(url) < 0){
                            hashSet.push(url);
                            window.remoteTotal++;
                            loadRemoteAudioCore(prefix, url, remoteCallBack);
                        }
                    }
                }
            }
        }

        function loadRemoteTexCore(prefix, url, callBack){
            var realUrl = url;

            cc.loader.load(realUrl, function(error, texture) {
                window.remoteCur++;
                window.remoteRes.texs.push({url: url, texture: texture});
                if(callBack){
                    callBack();
                }
            });
        }

        function loadRemoteAudioCore(prefix, url, callBack){
            var realUrl = url;

            cc.loader.load(realUrl, function(error, audio){
                window.remoteCur++;
                window.remoteRes.audios.push({url: url, audio: audio});
                if(callBack){
                    callBack();
                }
            });
        }

        loadRemoteRes(window.gameCfg.global.defaultPrefix);
    };

    // jsList
    var jsList = settings.jsList;

    var bundledScript = settings.debug ? 'src/project.dev.js' : 'src/project.js';
    if (jsList) {
        jsList = jsList.map(function (x) {
            return 'src/' + x;
        });
        jsList.push(bundledScript);
    }
    else {
        jsList = [bundledScript];
    }

    var option = {
        id: 'GameCanvas',
        scenes: settings.scenes,
        debugMode: settings.debug ? cc.debug.DebugMode.INFO : cc.debug.DebugMode.ERROR,
        showFPS: settings.debug,
        frameRate: 60,
        jsList: jsList,
        groupList: settings.groupList,
        collisionMatrix: settings.collisionMatrix,
    };

    // init assets
    cc.AssetLibrary.init({
        libraryPath: 'res/import',
        rawAssetsBase: 'res/raw-',
        rawAssets: settings.rawAssets,
        packedAssets: settings.packedAssets,
        md5AssetsMap: settings.md5AssetsMap,
        subpackages: settings.subpackages
    });

    cc.game.run(option, onStart);

    var intervalFunc = function(){
        if(cc.game._prepared){
            if(document.hidden){
                cc.game.step();
            }
            else{
                clearInterval(interval);
            }
        }
    }
    var interval = setInterval(intervalFunc, 1000 / 60);
};

if (window.jsb) {
    var isRuntime = (typeof loadRuntime === 'function');
    if (isRuntime) {
        require('src/settings.js');
        require('src/cocos2d-runtime.js');
        require('jsb-adapter/engine/index.js');
    }
    else {
        require('src/settings.js');
        require('src/cocos2d-jsb.js');
        require('jsb-adapter/jsb-engine.js');
    }

    cc.macro.CLEANUP_IMAGE_CACHE = true;
    window.boot();
}

