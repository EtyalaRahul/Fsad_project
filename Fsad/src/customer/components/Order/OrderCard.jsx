import React from 'react';
import { useNavigate } from 'react-router-dom';

const OrderCard = ({ orderId, image, name, size, price, status, deliveryDate }) => {
  const navigate = useNavigate();

  return (
    <div
      onClick={() => navigate(`/account/order/${orderId}`)}
      className="bg-white border  hover:shadow-lg transition-shadow duration-300 cursor-pointer rounded-lg p-5 flex gap-5 items-center"
    >
      {/* Product Image */}
      <div className="w-24 h-24 flex-shrink-0 overflow-hidden rounded-md">
        <img
          src={image || '/images/default-product.jpg'}
          alt={name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Details */}
      <div className="flex-grow space-y-1">
        <h2 className="text-lg font-semibold">{name}</h2>
        <p className="text-gray-500 text-sm">Size: {size}</p>
        <p className="font-medium text-gray-800">₹{price}</p>
      </div>

      {/* Order Status */}
      <div className="text-right text-sm space-y-1">
        <p className="text-green-600 font-bold">✔ {status}</p>
        <p className="text-gray-500">Delivery on {deliveryDate}</p>
      </div>
    </div>
  );
};

export default OrderCard;
