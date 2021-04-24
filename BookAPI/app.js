const express = require('express');
const Book = require('../BookAPI/models/book');
const mongoose = require('mongoose');


const app = express();

mongoose.connect('mongodb://localhost:27017/graphQL?safe=true', { useNewUrlParser: true });
mongoose.connection.once('open', () => {
    console.log('connected to mongo db');
});

//1. /book/{id}
app.get('/book/:id', (req, res) => {
    //res.send({ name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' });
    
    Book.findById(req.params.id, (err, bookData) => {
        if (err) return res.status(500).send("There was a problem finding the book.");
        if (!bookData) return res.status(404).send("No book found.");

        res.status(200).send(bookData);
    });
});

//2. /books/
app.get('/books/', (req, res) => { 
    // res.send([
    //     { name: 'Name of the Wind', genre: 'Fantasy', id: '1', authorId: '1' },
    //     { name: 'The Final Empire', genre: 'Fantasy', id: '2', authorId: '2' }
    // ]);
    Book.find({}, (err, bookData) => {

        if (err) return res.status(500).send("There was a problem finding the book.");
        if (!bookData) return res.status(404).send("No book found.");
        res.status(200).send(bookData);
    });
});

//3. /book/author/:id
app.get('/book/author/:id', (req, res) => {
    console.log(req.params.id)
    Book.find({ authorId: req.params.id }, (err, bookData) => {
        if (err) return res.status(500).send("There was a problem finding the book by author.");
        if (!bookData) return res.status(404).send("No book by the specified author found.");

        res.status(200).send(bookData);
    });
});


app.listen(4002, () => { console.log('BookAPI now listening for requests on port 4002');})