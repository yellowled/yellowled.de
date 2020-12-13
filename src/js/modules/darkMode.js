/**
 * Handle dark mode
 *
 * https://hankchizljaw.com/wrote/create-a-user-controlled-dark-or-light-mode/
 */

import { sunIcon, moonIcon } from '../util/icons';
import { getCSSCustomProp } from '../util/getCustomCSSProp';

export const darkMode = () => {
    const STORAGE_KEY = 'user-color-scheme';
    const COLOR_MODE_KEY = '--color-mode';

    const toggleBtn = document.getElementById('dark-mode');

    const applySetting = (passedSetting) => {
        let currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

        if (currentSetting) {
            document.documentElement.setAttribute(
                'data-user-color-scheme',
                currentSetting
            );
            setButtonLabelAndStatus(currentSetting);
        } else {
            setButtonLabelAndStatus(getCSSCustomProp(COLOR_MODE_KEY));
        }
    };

    const setButtonLabelAndStatus = (currentSetting) => {
        toggleBtn.innerHTML = currentSetting === 'dark' ? sunIcon : moonIcon;
        toggleBtn.setAttribute(
            'aria-label',
            `Zu ${
                currentSetting === 'dark' ? 'hellem' : 'dunklem'
            } Farbschema wechseln`
        );
    };

    const toggleSetting = () => {
        let currentSetting = localStorage.getItem(STORAGE_KEY);

        switch (currentSetting) {
            case null:
                currentSetting =
                    getCSSCustomProp(COLOR_MODE_KEY) === 'dark'
                        ? 'light'
                        : 'dark';
                break;
            case 'light':
                currentSetting = 'dark';
                break;
            case 'dark':
                currentSetting = 'light';
                break;
        }

        localStorage.setItem(STORAGE_KEY, currentSetting);

        return currentSetting;
    };

    toggleBtn.addEventListener('click', (e) => {
        e.preventDefault();
        applySetting(toggleSetting());
    });

    applySetting();
};
