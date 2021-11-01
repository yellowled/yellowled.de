module.exports = {
    extends: ['stylelint-config-standard-scss', 'stylelint-config-prettier'],
    rules: {
        indentation: 4,
        'no-descending-specificity': null,
        'alpha-value-notation': [
            'percentage',
            {
                exceptProperties: ['opacity'],
            },
        ],
        'property-no-vendor-prefix': [
            true,
            {
                ignoreProperties: ['appearance', 'text-size-adjust'],
            },
        ],
    },
};
