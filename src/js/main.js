import whenDomReady from 'when-dom-ready';

import { jsReady } from './util/jsReady';

import { darkMode } from './modules/darkMode';
import { initSearch } from './modules/search';

whenDomReady(() => {
    if (window.navigator && navigator.serviceWorker) {
        navigator.serviceWorker
            .getRegistrations()
            .then(function (registrations) {
                for (let registration of registrations) {
                    registration.unregister();
                }
            });
    }
    jsReady();
    darkMode();
    initSearch();
});
