import whenDomReady from 'when-dom-ready';

import { jsReady } from './util/jsReady';

import { initSW } from './modules/serviceWorker';
import { darkMode } from './modules/darkMode';
import { initSearch } from './modules/search';

whenDomReady(() => {
    jsReady();
    initSW();
    darkMode();
    initSearch();
});
