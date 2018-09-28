var makeDate = function () {
    var d = new Date();
    var formattedDate = "";

    // getMonth, getDate, and getFullYear are native javascript functions, so dont worry about getting any sort of npms for them
    // keep in mind that months go by index, so we need to add 1 to the month to convert january from 0 to 1 and so on
    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate += d.getDate() + "_";

    formattedDate += d.getFullYear();

    return formattedDate;
};

module.exports = makeDate;