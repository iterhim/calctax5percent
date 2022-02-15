const incomes = [

    {currency: 'EUR', summ: 400, date: "2020-03-30"},

    {currency: 'CNY', summ: 5000, date: "2020-02-20"},

    {currency: 'USD', summ: 458, date: "2020-01-31"},

    {currency: 'usd', summ: 458, date: "2007-01-31"},


];
const axios = require('axios');
async function init () {
    let summaa = 0;
    let allsum = [];
    async function makeGetRequest(linkk, sumComponents) {
        let res = await axios.get(linkk);
        //виведення об'єктів в консоль
        let alljson = res.data;
        // console.log(alljson);
        //переведення валют в гривні
        summaa = alljson[0].rate * sumComponents;
        // console.log(summaa);
        //створення масиву, для того, щоб данні не видалились при їх обробці
        allsum.push(summaa);
        // console.log(allsum);
        return alljson;

    }
    let aa, fullsum = 0, totalearned = 0;
    for(let i = 0; i < incomes.length; i++) {
        //створення адаптивної ссилки
        let linkk = 'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode='+ incomes[i].currency +'&date='+ incomes[i].date[0]+incomes[i].date[1]+incomes[i].date[2]+incomes[i].date[3]+incomes[i].date[5]+incomes[i].date[6]+incomes[i].date[8]+incomes[i].date[9] +'&json';
        let sumComponents = incomes[i].summ;
        // console.log(linkk);
        totalearned += parseInt(incomes[i].summ);
        aa = await makeGetRequest(linkk, sumComponents);
    }
    //цикл для того, щоб сума в гривнях шукалась після того, як дії усі завершаться(якщо написати це в минулий цикл, то allsum[3] ще не оприділилось і вся змінна fullsum набуває значення NaN)
    for(let j = 0; j < incomes.length; j++) {
        fullsum += parseInt(allsum[j]);
    }
        //виведення значень
        console.log("Сума усіх грошей в гривнях = " + fullsum + " грн");
        console.log("Сума усіх грошей = " + totalearned);
        console.log("5% відсотків від усіх грошей = " + (fullsum*5)/100 + "грн");


}
init()
