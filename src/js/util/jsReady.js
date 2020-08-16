/**
 * Indicate that JS is ready by switching a class
 *
 * @param {String} target Selector on which the (no-)js class is set
 */

export const jsReady = (target = 'html') => {
    const el = document.querySelector(target);

    el.classList.remove('no-js');
    el.classList.add('js');
};
