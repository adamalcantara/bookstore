import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import BackButton from '../components/BackButton';
import Spinner from '../components/Spinner';

const ShowBook = () => {
  // state for book and loading
  const [book, setBook] = useState({});
  const [loading, setLoading] = useState(false);
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    axios
      // get the book's ID, then set the book using the response
      .get(`http://localhost:5555/books/${id}`)
      .then((response) => {
        setBook(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      })
  }, [])

  return (
    <div className='p-4'>
      <BackButton />
      <h1 className='text-3xl my-4'>Show Book</h1>
      {loading ? (
        <Spinner />
      ) : (
        <div className='flex flex-col justify-center items-center'>
          <div className='flex flex-col border-2 border-sky-400 rounded-xl w-fit p-4 text-white'>
            <div className='my-4'>
              {/* Book ID */}
              <span className='text-xl mr-4 text-gray-500'>ID</span>
              <span>{book._id}</span>
            </div>

            <div className='my-4'>
              {/* Book title */}
              <span className='text-xl mr-4 text-gray-500'>Title</span>
              <span>{book.title}</span>
            </div>

            <div className='my-4'>
              {/* Book author */}
              <span className='text-xl mr-4 text-gray-500'>Author</span>
              <span>{book.author}</span>
            </div>

            <div className='my-4'>
              {/* Book publishYear */}
              <span className='text-xl mr-4 text-gray-500'>Publish Year</span>
              <span>{book.publishYear}</span>
            </div>

            <div className='my-4'>
              {/* Book created */}
              <span className='text-xl mr-4 text-gray-500'>Addition Time</span>
              <span>{new Date(book.createdAt).toString()}</span>
            </div>

            <div>
              {/* Book updated */}
              <span className='text-xl mr-4 text-gray-500'>Updated Time</span>
              <span>{new Date(book.updatedAt).toString()}</span>
            </div>

          </div>
        </div>
      )}
    </div>
  )
}

export default ShowBook