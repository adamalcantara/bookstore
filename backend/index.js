import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from 'mongoose';
import { Book } from "./models/bookModel.js";

const app = express();

// Middleware for parsing request body
app.use(express.json());

// get route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to the bookstore');
});

// Route for saving a new book to the database
app.post('/books', async (request, response) => {
 try {
    // Check to make sure that all required fields have been sent. If not, throw an error
    if (
        !request.body.title ||
        !request.body.author ||
        !request.body.publishYear
    ) {
        return response.status(400).send({
            message: 'Send all the required fields: title, author, publishYear',
        })
    }
    // If the if statement above does not throw an error, move to new book creation
    const newBook = {
        title: request.body.title,
        author: request.body.author,
        publishYear: request.body.publishYear,
    };
    // Create a variable for the creation of a new book
    const book = await Book.create(newBook);
    // Send the book
    return response.status(201).send(book);
 } catch (error) {
    console.log(error.message);
    response.status(500).send({ message: error.message });
 }
});

// Route to get all the books from the database
app.get('/books', async (request,response) => {
    try {
        // create variable for awaiting a book
        const books = await Book.find({});
        // return the number of books, and then the data of the books themselves
        return response.status(200).json({
            count: books.length,
            data: books
        });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

mongoose
    .connect(mongoURL)
    .then(() => {
        console.log('App connected to database');
        app.listen(PORT, () => {
            console.log(`App is listening to the port: ${PORT}`);
        });
    })
    .catch((error) => {
        console.log(error);
    });