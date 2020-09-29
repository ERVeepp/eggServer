var VERSION = 'v1.02';

// 缓存
self.addEventListener('install', function (event) {
  event.waitUntil(
    caches.open(VERSION).then(function (cache) {
      return cache.addAll([
        './app.js',
        './index.html'
      ]);
    })
  );
});

// 缓存更新
self.addEventListener('activate', function (event) {
  event.waitUntil(
    caches.keys().then(function (cacheNames) {
      console.log(cacheNames)
      return Promise.all(
        cacheNames.map(function (cacheName) {
          // 如果当前版本和缓存版本不一致
          if (cacheName !== VERSION) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

// 捕获请求并返回缓存数据
self.addEventListener('fetch', function (event) {
  event.respondWith(caches.match(event.request).catch(function (response) {
    console.log(response)
    // caches.match() always resolves
    // but in case of success response will have value
    if (response !== undefined) {
      return response;
    } else {
      return fetch(event.request).then(function (response) {
        console.log(response)
        // response may be used only once
        // we need to save clone to put one copy in cache
        // and serve second one
        let responseClone = response.clone();

        caches.open(VERSION).then(function (cache) {
          cache.put(event.request, responseClone);
        });
        return response;
      }).catch(function () {
        return caches.match('gallery/myLittleVader.jpg');
      });
    }
  }))
});