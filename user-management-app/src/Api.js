const express = require('express');
const router = express.Router();
const app = express();
const PORT = 5000;

let books = [
    { id: 1, title: "The Great Gatsby", author: "F. Scott Fitzgerald" },
    { id: 2, title: "To Kill a Mockingbird", author: "Harper Lee" },
   
]

app.get('/api/books', (req, res) => {
    res.json(books);
});

app.get('/api/books',
    (req, res) => {
        res.json(books);
    }
);

app.get('/api/books/:id', (req, res) => {
    const id = parseInt(req.params.id);
})

app.get('/api/books/:id',
    (req, res) => {
        const id = parseInt(req.params.id);
        const book = books.find(book => book.id === id);

        if (book) {
            res.json(book);
        } else {
            res.status(404)
            .json({message: 'Book not found'});
        }
        
    });
app.listen(PORT, 
    () => { 
        console.log('Server is running on port' ${PORT}')
        });