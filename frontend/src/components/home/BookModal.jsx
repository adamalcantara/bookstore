import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';
import { PiBookOpenTextLight } from 'react-icons/pi';
import { BiUserCircle } from 'react-icons/bi';

const BookModal = ({ book, onClose }) => {
  return (
    <div className='fixed bg-black bg-opacity-60 top-0 left-0 right-0 bottom-0 z-50 flex justify-center items-center' onClick={onClose}>
        {/* The modal itself */}
        <div onClick={(event) => event.stopPropagation()} className='w-[600px] max-w-full h-[400px] border rounded-xl p-4 flex flex-col relative bg-zinc-950'>
            <AiOutlineClose className='absolute right-6 top-6 text-3xl text-red-600 hover:text-white hover: cursor-pointer bg-zinc-950' onClick={onClose}/>
            <h2 className='w-fit px-4 py-1 bg-sky-300 text-black rounded-lg'>{book.publishYear}</h2>
            <h4 className='my-2 text-gray-500 bg-zinc-950'>{book._id}</h4>
            <div className='flex justify-start items-center gap-x-2 bg-zinc-950'>
                <PiBookOpenTextLight className='text-sky-300 text-2xl bg-zinc-950' />
                <h2 className='my-1 bg-zinc-950'>{book.title}</h2>
            </div>
            <div className='flex justify-start items-center gap-x-2 bg-zinc-950'>
                <BiUserCircle className='text-sky-300 text-2xl bg-zinc-950' />
                <h2 className='my-1 bg-zinc-950'>{book.author}</h2>
            </div>
        </div>
    </div>
  )
}

export default BookModal