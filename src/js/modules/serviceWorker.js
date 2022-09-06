/**
 * Register service worker, mainly for caching
 *
 * https://css-tricks.com/add-a-service-worker-to-your-site/
 */

export const initSW = () => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker
            .register('/sw.js')
            .catch((registrationError) => {
                console.error('SW registration failed: ', registrationError);
            });
    }
    // disable PWA install prompt
    window.addEventListener('beforeinstallprompt', (e) => e.preventDefault());
};
