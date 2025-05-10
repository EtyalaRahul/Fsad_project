import React from 'react';
import { Grid, Button } from '@mui/material';
import StarIcon from '@mui/icons-material/Star';
import AddressCard from '../Address/AddressCard';
import OrderTracker from './OrderTracker';

const productList = [
  {
    name: "Fresh Tomato",
    image: "/images/tomatoes.jpg", // your own image
    color: "Red",
    size: "1kg",
    seller: "Fresh Farm",
    price: 40,
  },
  {
    name: "Hand Wash",
    image: "/images/handwash.png", // your own image
    color: "Purple",
    size: "500ml",
    seller: "Clean Co.",
    price: 120,
  },
  {
    name: "Apple",
    image: "/images/apples.png", // your own image
    color: "Red",
    size: "1kg",
    seller: "Fresh Farm",
    price: 150,
  },
];

const OrderDetails = () => {
  return (
    <div className="px-5 lg:px-20 py-10 space-y-10">
      {/* Delivery Address */}
      <div>
        <h1 className="font-bold text-2xl pb-5">Delivery Address</h1>
        <AddressCard />
      </div>

      {/* Order Tracker */}
      <div>
        <OrderTracker activeStep={4} />
      </div>

      {/* Ordered Products */}
      <div className="space-y-6">
        {productList.map((product, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-md p-5 flex flex-col md:flex-row items-center gap-5 border hover:shadow-lg transition-all duration-300"
          >
            {/* Product Image */}
            <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
              <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
            </div>

            {/* Product Details */}
            <div className="flex-grow space-y-1 text-center md:text-left">
              <h1 className="font-semibold text-lg">{product.name}</h1>
              <p className="text-gray-500 text-sm">Color: {product.color} | Size: {product.size}</p>
              <p className="text-gray-500 text-sm">Seller: {product.seller}</p>
              <p className="font-bold text-gray-800 text-md">₹{product.price}</p>
            </div>

            {/* Rate & Review */}
            <div className="text-center md:text-right">
              <Button variant="text" startIcon={<StarIcon />} sx={{ color: "#9155FD", fontWeight: 600 }}>
                Rate & Review
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderDetails;
