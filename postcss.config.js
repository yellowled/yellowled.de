module.exports = {
    map: {
        inline: false,
        annotation: true,
        sourcesContent: true,
    },
    plugins: {
        autoprefixer: {
            grid: true,
        },
        'postcss-flexbugs-fixes': {},
        cssnano: {
            preset: 'default',
        },
    },
};
