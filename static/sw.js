const CACHE_VERSION = 'v1';
const CACHE_NAME = `daemon-cache-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// 需要缓存的静态资源
const STATIC_CACHE = [
    '/',
    '/css/main.css',
    '/js/main.js',
    '/offline.html',
];

// 安装 Service Worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('Opened cache');
                return cache.addAll(STATIC_CACHE);
            })
            .then(() => self.skipWaiting())
    );
});

// 激活 Service Worker
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cacheName) => {
                    if (cacheName !== CACHE_NAME) {
                        console.log('Deleting old cache:', cacheName);
                        return caches.delete(cacheName);
                    }
                })
            );
        }).then(() => self.clients.claim())
    );
});

// 拦截请求
self.addEventListener('fetch', (event) => {
    // 只处理同源请求
    if (!event.request.url.startsWith(self.location.origin)) {
        return;
    }

    // 跳过 POST 请求
    if (event.request.method !== 'GET') {
        return;
    }

    event.respondWith(
        caches.match(event.request)
            .then((response) => {
                // 缓存命中，返回缓存的资源
                if (response) {
                    return response;
                }

                // 没有缓存，发起网络请求
                return fetch(event.request)
                    .then((response) => {
                        // 检查是否是有效响应
                        if (!response || response.status !== 200 || response.type !== 'basic') {
                            return response;
                        }

                        // 克隆响应
                        const responseToCache = response.clone();

                        // 缓存响应
                        caches.open(CACHE_NAME)
                            .then((cache) => {
                                cache.put(event.request, responseToCache);
                            });

                        return response;
                    })
                    .catch(() => {
                        // 网络请求失败，返回离线页面
                        return caches.match(OFFLINE_URL);
                    });
            })
    );
});

// 消息处理
self.addEventListener('message', (event) => {
    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }
});
