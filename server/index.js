const express = require('express')
const app = express();
const axios = require("axios");
const port = 5000;
const cors = require('cors');


app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello World!');
});

const highestCurrencyRates = {
    USD: { value: 1 },
    INR: { value: 83.002, date: '19 Oct 2022' },
    CNY: { value: 1.15109, date: '04 May 2022' },
    GBP: { value: 1.2649, date: '30 May 2022' },
    RUB: { value: 1.019048, date: '29 Jun 2022' }
};

app.get('/exchange-rate/:id', async (req, res) => {
    const { id } = req.params;
    let newData = {};
    try {
        const { data } = await axios.get(`https://api.exchangerate.host/highest?base=${id}`);
        newData = data;
    } catch (err) {
        console.log(err);
    };

    let getFiveCurrency = Object.keys(newData.rates).reduce((a, c) =>
        Object.keys(highestCurrencyRates).includes(c) ?
            [...a,{currentValue: newData.rates[c], highValue: highestCurrencyRates[c],name:c}]
            :
            a,
        []);

    res.json({getFiveCurrency, date: newData.date, base: id });
});

app.use((req, res, next) =>  {
    res.status(404).json({massage:"Page not found"});
})

app.use((err, req, res, next) => {
    consoe.log(err.massage);
    res.status(500).json({massage:err.massage})
});

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

