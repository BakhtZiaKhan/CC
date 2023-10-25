const express = require('express');
const app = express();
const db = require('./persistence');
const getItems = require('./routes/getItems');
const addItem = require('./routes/addItem');
const updateItem = require('./routes/updateItem');
const deleteItem = require('./routes/deleteItem');

app.use(express.json());
app.use(express.static(__dirname + '/static'));

app.get('/items', getItems);
app.post('/items', addItem);
app.put('/items/:id', updateItem);
app.delete('/items/:id', deleteItem);

db.init().then(() => {
    app.listen(3000, () => console.log('Listening on port 3000'));
}).catch((err) => {
    console.error(err);
    process.exit(1);
});

const gracefulShutdown = () => {
    db.teardown()
        .catch(() => {})
        .then(() => process.exit());
};

process.on('SIGINT', gracefulShutdown);
process.on('SIGTERM', gracefulShutdown);
process.on('SIGUSR2', gracefulShutdown); // Sent by nodemon 

const quotes = [
  "Quote 1: Your first quote here.",
  "Quote 2: Another inspiring quote.",
  "Quote 3: Keep changing your quotes!",
  "Quote 4: This is the fourth quote.",
  "Quote 5: The final quote for now.",
];

document.addEventListener("DOMContentLoaded", function () {
  const quoteContainer = document.getElementById("quote-container");
  const quoteElement = document.getElementById("quote");

  let currentQuoteIndex = 0;

  function updateQuote() {
    quoteElement.textContent = quotes[currentQuoteIndex];
    currentQuoteIndex = (currentQuoteIndex + 1) % quotes.length;
  }

  updateQuote();

  setInterval(updateQuote, 5000); // Change the quote every 5 seconds (5000 milliseconds)
});



