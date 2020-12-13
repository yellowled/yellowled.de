/**
 * Get a CSS Custom Property value
 *
 * @param {String} propKey key of custom CSS property to get
 */

export const getCSSCustomProp = (propKey) => {
    let response = getComputedStyle(document.documentElement).getPropertyValue(
        propKey
    );

    if (response.length) {
        response = response.replace(/"/g, '').trim();
    }

    return response;
};
