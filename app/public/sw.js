/* eslint-disable no-restricted-globals */
self.addEventListener('push', function (event) {
    console.log('[Service Worker] Push Event received.');
    if (event.data) {
        const data = event.data.json();
        console.log('[Service Worker] Push Data:', data);
        const options = {
            body: data.body,
            icon: data.icon || '/vite.svg',
            badge: data.badge || '/vite.svg',
            data: {
                url: data.url
            }
        };

        event.waitUntil(
            self.registration.showNotification(data.title, options)
                .then(() => console.log('[Service Worker] Notification shown.'))
                .catch(err => console.error('[Service Worker] Notification error:', err))
        );
    } else {
        console.warn('[Service Worker] Push Event had no data.');
    }
});

self.addEventListener('notificationclick', function (event) {
    event.notification.close();

    const urlToOpen = event.notification.data.url || '/';

    event.waitUntil(
        clients.matchAll({
            type: 'window',
            includeUncontrolled: true
        }).then(function (clientList) {
            for (let i = 0; i < clientList.length; i++) {
                const client = clientList[i];
                if (client.url === urlToOpen && 'focus' in client) {
                    return client.focus();
                }
            }
            if (clients.openWindow) {
                return clients.openWindow(urlToOpen);
            }
        })
    );
});
