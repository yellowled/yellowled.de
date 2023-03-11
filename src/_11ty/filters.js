const { DateTime } = require("luxon");

module.exports = {
    dateFormat: function (date, format = "dd.LL.yyyy") {
        return DateTime.fromJSDate(date).toFormat(String(format));
    },

    dateISO: function (date) {
        return DateTime.fromJSDate(date).toISO();
    },

    datePlays: function (
        date,
        formatIn = "yyyy-LL-dd",
        formatOut = "dd.LL.yyyy"
    ) {
        const formatted = DateTime.fromFormat(
            String(date),
            String(formatIn)
        ).toFormat(String(formatOut));

        if (formatted === "Invalid DateTime") {
            return date;
        }
        return formatted;
    },
};
