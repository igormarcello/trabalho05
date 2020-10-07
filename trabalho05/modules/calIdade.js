
var caldata = function(dataNasc){
    const dataSplit = dataNasc.split('/');
    const day = dataSplit[0]; // 30
    const month = dataSplit[1]; // 03
    const year = dataSplit[2]; // 2019
    dataNasc = new Date(year, month - 1, day);
    
    return ((year-2020)*-1);
}

module.exports = caldata;