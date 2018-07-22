var makeDate = function() {
    var d = new Date();
    var formattedDate = "";
//date acts as an index so Jan. would be 0 so add 1 to make up for it. 
    formattedDate += (d.getMonth() + 1) + "_";

    formattedDate += d.getDate() + "_";

    formattedDate +=d.getFullYear();

    return formattedDate;
};

module.exports = makeData;