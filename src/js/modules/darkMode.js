/**
 * Handle dark mode
 */

import { sunIcon, moonIcon } from '../util/icons';

export const darkMode = () => {
    const toggleBtn = document.getElementById('dark-mode');
    let currentTheme = localStorage.getItem('theme');

    // User prefers dark color scheme
    if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        // if nothing is stored, preset to dark
        if (!currentTheme) {
            currentTheme = 'dark';
            toggleBtn.innerHTML = sunIcon;
        }
    }

    // set theme if stored
    if (currentTheme) document.documentElement.dataset.theme = currentTheme;

    toggleBtn.addEventListener('click', function () {
        // get current theme
        currentTheme = document.documentElement.dataset.theme;
        let theme;
        // switch theme dataset to opposite
        theme = currentTheme === 'dark' ? '' : 'dark';
        document.documentElement.dataset.theme = theme;
        // switch icon
        this.innerHTML = theme === '' ? moonIcon : sunIcon;
        localStorage.setItem('theme', theme);
    });
};
