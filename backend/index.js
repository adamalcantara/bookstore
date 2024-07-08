import express from "express";
import { PORT, mongoURL } from "./config.js";
import mongoose from 'mongoose';

const app = express();

// get route
app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Welcome to the bookstore');
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