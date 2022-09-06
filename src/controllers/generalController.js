const General = require("../databases/General");

const getCurrentDate = () => {
    Number.prototype.padLeft = function(base, chr) {
        var len = (String(base || 10).length - String(this).length) + 1;
        return len > 0 ? new Array(len).join(chr || '0') + this : this;
    }

    const currentDate = new Date;
    const currentDateFormatted = currentDate.getFullYear().padLeft() + "-" + currentDate.getMonth().padLeft() + "-" + currentDate.getDate().padLeft() + "T"  + currentDate.getHours().padLeft() + ":" + currentDate.getMinutes().padLeft() + ":" + currentDate.getSeconds().padLeft() + General.getTimezone().value;
    return currentDateFormatted;
}

module.exports = {
    getCurrentDate
}