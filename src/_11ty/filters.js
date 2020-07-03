const CleanCSS = require('clean-css');
const { DateTime } = require('luxon');

module.exports = {
    cssmin: function (code) {
        return new CleanCSS({}).minify(code).styles;
    },

    dateFormat: function (date, format = 'dd.LL.yyyy') {
        return DateTime.fromJSDate(date).toFormat(String(format));
    },

    dateISO: function (date) {
        return DateTime.fromJSDate(date).toISO();
    },
};
