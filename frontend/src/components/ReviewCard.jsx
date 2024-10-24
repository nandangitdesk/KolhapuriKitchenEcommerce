import React from 'react';
import defaultAvatar from '../assets/images/default-avatar.webp';
import {  Rating } from '@mui/material';
import { Star, StarBorder } from '@mui/icons-material'; 

const ReviewCard = ({ review }) => {
  const options = {
    value: review.ratings,
    readOnly: true,
    size: "large",
    precision: 0.5,
    icon: <Star fontSize="inherit" style={{ color: "#ffc107" }} />,
    emptyIcon: <StarBorder fontSize="inherit" style={{ color: "#ffc107" }} />
  };

  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-shadow duration-300 rounded-lg p-6 mb-6">
      <div className="flex items-center mb-4">
        <img
          src={review.avatar || defaultAvatar}
          alt={review.name}
          className="w-12 h-12 rounded-full mr-4 border-2 border-gray-200 shadow-md" // Added border and shadow
        />
        <div>
          <h4 className="text-lg font-semibold text-gray-800">{review.name}</h4>
          <div className="flex items-center">
            <Rating {...options} />
            <span className="ml-2 text-sm text-gray-500">{review.rating.toFixed(1)} / 5</span> {/* Display rating value */}
          </div>
        </div>
      </div>
      <p className="text-gray-700 leading-relaxed mb-4">{review.comment}</p>
 
    </div>
  );
};

export default ReviewCard;
