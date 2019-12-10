const express = require('express');
const app = express();
const Beer = require('./models/Beer');

app.use(express.json());

app.post('/beer', (req, res) => {
    console.log('post to beer recieved');
    Beer
        .create(req.body)
        .then(beer => res.send(beer));
});

app.get('/beer', (req, res) => {
    console.log('request made from client');
    Beer
        .find()
        .then(beer => res.send(beer));
});

app.get('/beer/:beerId', (req, res) => {
    console.log('request made for single item');
    Beer
        .findById(req.params.beerId)
        .then(beer => res.send(beer));
});

app.put('/beer/:beerId', (req, res) => {
    console.log('request made to update item');
    Beer
        .findByIdAndUpdate({ _id: req.params.beerId }, req.body, { new: true })
        .then(updatedBeer => res.send(updatedBeer));
});

app.delete('/beer/:beerId', (req, res) => {
    console.log('request made to delete item');
    Beer
        .findByIdAndDelete({ _id: req.params.beerId })
        .then(updatedBeer => res.send(updatedBeer));
});

module.exports = app;
