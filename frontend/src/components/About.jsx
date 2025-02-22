import React from 'react';
import { motion } from 'framer-motion';
import MetaData from './layouts/MetaData';
import Navbar from './layouts/Navbar';

const About = () => {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8 my-20">
        <MetaData title="About us" />
        <Navbar/>
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="max-w-4xl w-full space-y-12 text-center"
      >
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="relative"
        >
          <img 
            src="https://images.pexels.com/photos/1029141/pexels-photo-1029141.jpeg?cs=srgb&dl=pexels-nitin-arya-386173-1029141.jpg&fm=jpg" 
            alt="Decorative header" 
            className="w-full h-40 object-cover rounded-lg shadow-md"
          />
          <h1 className="absolute inset-0 flex items-center justify-center text-4xl sm:text-5xl font-extrabold text-white bg-black bg-opacity-50 rounded-lg">
            About Book Land
          </h1>
        </motion.div>
        
        <motion.p 
          className="mt-4 text-xl text-gray-600"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.8 }}
        >
          Your literary haven in the heart of Thane, Mumbai
        </motion.p>
        
        <motion.div 
          className="mt-8 space-y-6 text-lg text-gray-700"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-8">
            <img 
              src="https://images.pexels.com/photos/28845804/pexels-photo-28845804/free-photo-of-cozy-library-bookshelf-aisle-interior-view.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Book Land Store" 
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1 text-left">
              <p>
                Welcome to Book Land, where stories come to life and imagination knows no bounds. 
                Nestled in the vibrant city of Thane, Mumbai, we've been serving book lovers since 2010.
              </p>
              <p className="mt-4">
                Our passion for literature drives us to curate a diverse collection of books, 
                from timeless classics to contemporary bestsellers. We believe in the power of words 
                to inspire, educate, and transform lives.
              </p>
            </div>
          </div>
          <div className="flex flex-col md:flex-row-reverse items-center space-y-4 md:space-y-0 md:space-x-8 md:space-x-reverse">
            <img 
              src="https://images.pexels.com/photos/29817994/pexels-photo-29817994/free-photo-of-dramatic-light-on-open-magazine-indoors.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" 
              alt="Reading Corner" 
              className="w-64 h-64 object-cover rounded-lg shadow-md"
            />
            <div className="flex-1 text-left">
              <p>
                At Book Land, we're more than just a bookstore. We're a community of readers, 
                a sanctuary for book enthusiasts, and a launchpad for literary adventures. 
                Our knowledgeable staff is always ready to help you find your next great read or 
                engage in thoughtful discussions about your favorite authors.
              </p>
              <p className="mt-4">
                Whether you're a seasoned bibliophile or just beginning your reading journey, 
                Book Land is your destination for literary exploration. Come, lose yourself in the 
                world of books, and let your imagination soar.
              </p>
            </div>
          </div>
        </motion.div>
        
        <motion.div 
          className="mt-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.8 }}
        >
          <h2 className="text-2xl font-bold text-gray-900">Visit Us</h2>
          <p className="mt-2 text-gray-600">
            123 Reader's Lane, Thane West<br />
            Mumbai, Maharashtra 400601<br />
            India
          </p>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;

