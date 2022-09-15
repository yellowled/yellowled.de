import whenDomReady from 'when-dom-ready';

import { jsReady } from './util/jsReady';

import { darkMode } from './modules/darkMode';
import { initSearch } from './modules/search';

whenDomReady(() => {
    jsReady();
    darkMode();
    initSearch();
});
