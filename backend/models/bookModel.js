import mongoose from "mongoose";

// Creating the schema for the books, ID is excluded as it will be handled by database
const bookSchema = mongoose.Schema(
    {
        title: {
            type: String,
            required: true,
        },
        author: {
            type: String,
            required: true,
        },
        publishYear: {
            type: String,
            required: true,
        },
    },
    // field for time of creation/time of update
    {
        timestamps: true,
    }
);

// export book model to be used elsewhere
export const Book = mongoose.model('Book', bookSchema);