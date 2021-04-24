const express = require('express');
const Author = require('../AuthorAPI/models/author');
const mongoose = require('mongoose');

const app = express();

mongoose.connect('mongodb://localhost/graphQL?safe=true', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo db');
});

//1. /author/{id}
app.get('/author/:id', (req, res) => {
     Author.findById(req.params.id, (err, authorData) => {
        if (err) return res.status(500).send("There was a problem finding the author.");
        if (!authorData) return res.status(404).send("No author found.");

        res.status(200).send(authorData);
    });
});

//2. /authors/
app.get('/authors/', (req, res) => {
        Author.find({}, (err, authorData) => {
        if (err) return res.status(500).send("There was a problem finding the author.");
        if (!authorData) return res.status(404).send("No author found.");

        res.status(200).send(authorData);
    });
});


app.listen(4001, () => { console.log('AuthorAPI now listening for requests on port 4001'); })