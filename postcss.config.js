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
        cssnano: {
            preset: 'default',
        },
    },
};
