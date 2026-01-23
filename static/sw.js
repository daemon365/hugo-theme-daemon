const CACHE_VERSION = 'v2';
const CACHE_NAME = `daemon-cache-${CACHE_VERSION}`;
const OFFLINE_URL = '/offline.html';

// 需要缓存的静态资源
const STATIC_CACHE = [
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
        // 网络优先策略：先尝试从网络获取，失败后才使用缓存
        fetch(event.request)
            .then((response) => {
                // 检查是否是有效响应
                if (!response || response.status !== 200 || response.type !== 'basic') {
                    return response;
                }

                // 克隆响应
                const responseToCache = response.clone();

                // 只缓存静态资源（CSS、JS、图片等）
                const url = new URL(event.request.url);
                if (url.pathname.match(/\.(css|js|png|jpg|jpeg|gif|svg|woff|woff2|ttf)$/i)) {
                    caches.open(CACHE_NAME)
                        .then((cache) => {
                            cache.put(event.request, responseToCache);
                        });
                }

                return response;
            })
            .catch(() => {
                // 网络请求失败，尝试从缓存获取
                return caches.match(event.request)
                    .then((cachedResponse) => {
                        return cachedResponse || caches.match(OFFLINE_URL);
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
