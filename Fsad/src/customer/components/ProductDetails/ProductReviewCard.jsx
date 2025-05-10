import React from 'react';
import { Rating } from '@mui/material';
import { LinearProgress } from '@mui/material';

const reviews = [
  {
    name: 'Raam',
    date: 'April 5, 2023',
    rating: 4.5,
    comment: 'Nice product, I love this shirt',
  },
  {
    name: 'Raam',
    date: 'April 5, 2023',
    rating: 4.5,
    comment: 'Nice product, I love this shirt',
  },
  {
    name: 'Raam',
    date: 'April 5, 2023',
    rating: 4.5,
    comment: 'Nice product, I love this shirt',
  },
];

const ratingSummary = [
  { label: 'Excellent', value: 70 },
  { label: 'Very Good', value: 50 },
  { label: 'Good', value: 30 },
  { label: 'Average', value: 20 },
  { label: 'Poor', value: 10 },
];

const ProductReviewCard = () => {
  return (
    <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-6">
      {/* Left: Recent Reviews */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Recent Review & Rating</h2>
        <div className="space-y-4">
          {reviews.map((review, index) => (
            <div key={index} className="flex items-start space-x-4 p-4 border rounded-lg">
              <div className="flex items-center justify-center w-10 h-10 rounded-full bg-purple-500 text-white text-lg font-semibold">
                {review.name[0]}
              </div>
              <div>
                <h3 className="font-semibold">{review.name}</h3>
                <p className="text-sm text-gray-500">{review.date}</p>
                <Rating value={review.rating} precision={0.5} readOnly />
                <p className="text-gray-700 mt-1">{review.comment}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right: Product Ratings Summary */}
      <div>
        <h2 className="text-lg font-semibold mb-4">Product Ratings</h2>
        <div className="flex items-center space-x-2 mb-2">
          <Rating value={4.5} precision={0.5} readOnly />
          <span className="text-sm text-gray-500">54890 Ratings</span>
        </div>
        <div className="space-y-2">
          {ratingSummary.map((item, index) => (
            <div key={index} className="flex items-center space-x-4">
              <span className="w-24 text-sm">{item.label}</span>
              <LinearProgress
                variant="determinate"
                value={item.value}
                sx={{ width: '100%', height: 10, borderRadius: 5 }}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductReviewCard;
