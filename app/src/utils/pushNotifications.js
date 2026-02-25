const VAPID_PUBLIC_KEY = 'BB5gT5d4GUXlCOqdNx8ywTwsfqdGvNXYT3PeTEqCpqvzQbr7vVq9q5Ec1yPRv6wt7poGAmJAnAl7IVON5o538wU';

function urlBase64ToUint8Array(base64String) {
    const padding = '='.repeat((4 - base64String.length % 4) % 4);
    const base64 = (base64String + padding)
        .replace(/-/g, '+')
        .replace(/_/g, '/');

    const rawData = window.atob(base64);
    const outputArray = new Uint8Array(rawData.length);

    for (let i = 0; i < rawData.length; ++i) {
        outputArray[i] = rawData.charCodeAt(i);
    }
    return outputArray;
}

export async function registerServiceWorker() {
    if ('serviceWorker' in navigator) {
        try {
            const registration = await navigator.serviceWorker.register('/sw.js');
            console.log('Service Worker registered:', registration);
            return registration;
        } catch (error) {
            if (error.name === 'SecurityError' || error.message.includes('SSL')) {
                console.warn('Service Worker skipped: SSL certificate is invalid for local IP HTTPS. Push notifications will be disabled.');
            } else {
                console.error('Service Worker registration failed:', error);
            }
        }
    }
}

export async function subscribeToPush() {
    try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (!registration) return;

        // Force unsubscribe first to ensure we get a fresh token if the old one was stale
        const existingSubscription = await registration.pushManager.getSubscription();
        if (existingSubscription) {
            await existingSubscription.unsubscribe();
            console.log('Unsubscribed existing push subscription for freshness');
        }

        const subscription = await registration.pushManager.subscribe({
            userVisibleOnly: true,
            applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });

        console.log('User subscribed to fresh push:', subscription);

        // Send subscription to backend
        const token = localStorage.getItem('token');
        if (!token) return;

        await fetch('/api/v1/notifications/push/subscribe', {
            method: 'POST',
            body: JSON.stringify(subscription),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
    } catch (error) {
        console.error('Failed to subscribe to push:', error);
    }
}

export async function requestNotificationPermission() {
    if ('Notification' in window) {
        if (Notification.permission === 'granted') {
            await subscribeToPush();
        } else {
            const permission = await Notification.requestPermission();
            if (permission === 'granted') {
                await subscribeToPush();
            }
        }
    }
}
