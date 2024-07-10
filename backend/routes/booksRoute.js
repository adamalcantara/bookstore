import express from 'express';
import { Book } from '../models/bookModel.js';

const router = express.Router();

// Route for saving a new book to the database
router.post('/', async (request, response) => {
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
router.get('/', async (request, response) => {
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

// Route to get a book BY ID from the database
router.get('/:id', async (request, response) => {
    try {

        // destructure the id
        const { id } = request.params;

        // create variable for awaiting a book
        const book = await Book.findById(id);
        // return the number of books, and then the data of the books themselves
        return response.status(200).json(book);
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// update a book
router.put('/:id', async (request, response) => {
    try {
        if (
            !request.body.title ||
            !request.body.author ||
            !request.body.publishYear
        ) {
            return response.status(400).send({
                message: 'All fields, title, author, publishYear, are required',
            });
        }

        // destructure the ID
        const { id } = request.params;

        // Save the result in a value
        const result = await Book.findByIdAndUpdate(id, request.body);

        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }
        return response.status(200).send({ message: 'Book updated successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

// Delete a book
router.delete('/:id', async (request, response) => {
    try {
        const { id } = request.params;

        // save result of getting the variable name to delete
        const result = await Book.findByIdAndDelete(id);

        // If there is no result, throw an error
        if (!result) {
            return response.status(404).json({ message: 'Book not found' });
        }

        return response.status(200).send({ message: 'Book deleted successfully' });
    } catch (error) {
        console.log(error.message);
        response.status(500).send({ message: error.message });
    }
});

export default router;