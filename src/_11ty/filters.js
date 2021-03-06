const { DateTime } = require('luxon');

module.exports = {
    dateFormat: function (date, format = 'dd.LL.yyyy') {
        return DateTime.fromJSDate(date).toFormat(String(format));
    },

    dateISO: function (date) {
        return DateTime.fromJSDate(date).toISO();
    },
};
