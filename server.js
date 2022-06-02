const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.listen(PORT);

app.get('/api/quotes/random', (req, res, next) => {
    res.send(getRandomElement(quotes));
})

app.get('/api/quotes', (req, res, next) => {
    const params = req.query;
    const hasNoParams = Object.keys(params).length === 0;
    if (hasNoParams) {
        res.send(quotes);
    }
    else {
        const personParams = params.person;
        if (personParams) {
            const personQuotes = [];
            for (const quoteIndex in quotes) {
                const quote = quotes[quoteIndex];
                if (quote.person === personParams) {
                    personQuotes.push(quote);
                }
            }
            res.send(personQuotes);
        }
    }
})

app.post('/api/quotes', (req, res, next) => {
    const {person, quote} = req.query;

    if (!person || !quote) {
        res.status(400).send();
    }

    else {
        quotes.push({quote, person});
        res.send({quote: quote});
    }

    console.log(quotes);
})