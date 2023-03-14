import whenDomReady from "when-dom-ready";

import { darkMode } from "./modules/darkMode";
import { initSearch } from "./modules/search";

whenDomReady(() => {
    darkMode();
    initSearch();
});
