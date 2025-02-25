import React from 'react';
import { motion } from 'framer-motion';

const books = [
  { id: 1, image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1575620071l/51213455.jpg', size: 'w-24 h-36' },
  { id: 2, image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1567756356i/46157456.jpg', size: 'w-28 h-40' },
  { id: 3, image: 'https://live.staticflickr.com/8329/8124602803_e615c90c0c_b.jpg', size: 'w-32 h-44' },
  { id: 4, image: 'https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1561662189i/45034243.jpg', size: 'w-36 h-48' },
  { id: 5, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgLQJBEyUjwkEzlZKIlATVf2yDwiE2kfpSYQ&s', size: 'md:w-44 md:h-52 w-32 h-52' },
  { id: 6, image: 'https://images.booksense.com/images/521/769/9781799769521.jpg', size: 'w-36 h-48' },
  { id: 7, image: 'https://media.dubraybooks.ie/m/609b4ae3be197b53/original/9781503902374_5637692639.jpg', size: 'w-32 h-44' },
  { id: 8, image: 'https://upload.wikimedia.org/wikipedia/commons/e/eb/%22Kalyani%22_by_Vijay_Kumar_Singh_Book_Cover.png', size: 'w-28 h-40' },
  { id: 9, image: 'https://live.staticflickr.com/5078/14245377679_5513be0594_b.jpg', size: 'w-24 h-36' },
];

const Carousel = () => {

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center overflow-hidden p-8">
     
      
      {/* Animated Title */}
      <motion.h1
        className="text-black text-4xl md:text-7xl leading-tight font-serif w-[95%] md:w-2/3 mb-6 text-center"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      >
        Unleash Your Imagination with Every Page
      </motion.h1>
      
      {/* Animated Subheading */}
      <motion.p
        className="text-gray-600 text-lg md:text-xl  mb-10 text-center"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1.2, ease: 'easeInOut', delay: 0.5 }}
      >
        Discover, Explore, and Buy Books That Inspire You.
      </motion.p>
      
      <button className="mb-8 py-4 px-6 md:py-3 bg-black text-white rounded-full hover:bg-zinc-900 hover:scale-105 hover:shadow-lg transition-all duration-300 ease-in-out text-sm md:text-base">
        Start Reading o_o
      </button>
      
      <div className="relative md:w-full md:max-w-5xl md:mx-auto mb-24 md:mb-5">
        <div className="flex justify-center items-center gap-3">
          {books.map((book, index) => (
            <motion.div
              key={book.id}
              className={`${book.size} rounded-lg shadow-lg overflow-hidden`}
              animate={{
                y: [-20, 20, -20],
                rotateY: [0, 5, 0],
                scale: [1, 1.05, 1],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: index * 0.2,
              }}
              style={{
                transformOrigin: 'bottom',
                transformStyle: 'preserve-3d',
                transform: `rotateY(${index * 5}deg)`,
              }}
            >
              <img
                src={book.image}
                alt={`Book ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Carousel
