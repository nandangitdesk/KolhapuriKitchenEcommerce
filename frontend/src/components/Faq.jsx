import React, { useState } from 'react'
import Navbar from './layouts/Navbar'
import Footer from './layouts/Footer'
import MetaData from './layouts/MetaData'
const FaqItem = ({ question, answer }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 py-4">
      <MetaData title="Faq" />
      <button
        className="flex justify-between items-center w-full text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900">{question}</span>
        <span className="ml-6 flex-shrink-0">
          {isOpen ? (
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
            </svg>
          ) : (
            <svg className="h-6 w-6 text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-2 pr-12">
          <p className="text-base text-gray-500">{answer}</p>
        </div>
      )}
    </div>
  );
};

const Faq = () => {
  const faqData = [
    {
      question: "What products does Kolhapuri Kitchen offer?",
      answer: "We offer a variety of homemade masalas and spices, including Kolhapuri Masala, Garam Masala, Chutney Powders, and much more. Each product is made with fresh ingredients to deliver authentic flavors."
    },
    {
      question: "How are your masalas made?",
      answer: "All of our masalas are made using traditional Kolhapuri recipes passed down through generations. We use only the finest quality ingredients and prepare our masalas in small batches to ensure freshness and authenticity."
    },
    {
      question: "Are your products free from preservatives and additives?",
      answer: "Yes, all of our products are 100% natural and free from any preservatives, artificial colors, or additives. We believe in delivering the purest and most authentic flavors."
    },
    {
      question: "What is your return policy?",
      answer: "We aim to deliver the best quality products. However, if you receive damaged or incorrect products, you can return them within 7 days of delivery. Please contact our customer service team for assistance."
    },
    {
      question: "How long does shipping take?",
      answer: "Shipping times vary depending on your location. Typically, orders are processed within 2-3 business days and delivered within 5-7 business days."
    },

    // Add more FAQ items as needed
  ];

  return (
    <div className='w-full h-full mt-32 '>
      <Navbar />
      <div className='w-full h-full mt-10 max-w-3xl mx-auto px-8'>
        <h1 className='text-3xl font-bold mb-6'>Frequently Asked Questions🙋🏻‍♂️</h1>
        <div className='space-y-6'>
          {faqData.map((item, index) => (
            <FaqItem key={index} question={item.question} answer={item.answer} />
          ))}
        </div>
      </div>
    
    </div>
  )
}

export default Faq