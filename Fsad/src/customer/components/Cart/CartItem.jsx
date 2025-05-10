import React from 'react';
import { useCart } from '../context/CartContext';

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  const handleDecrease = () => {
    const newQuantity = item.quantity - 1;
    if (newQuantity > 0) {
      updateQuantity(item, newQuantity);
    } else {
      removeFromCart(item);
    }
  };

  const handleIncrease = () => {
    updateQuantity(item, item.quantity + 1);
  };

  return (
    <div className="p-2 shadow border rounded bg-white text-xs">
      <div className="flex items-center">
        {/* Product Image */}
        <div className="w-[3.5rem] h-[3.5rem] lg:w-[5rem] lg:h-[5rem]">
          <img
            className="w-full h-full object-cover object-top rounded"
            src={item.image}
            alt={item.name}
          />
        </div>

        {/* Product Info */}
        <div className="ml-3 flex-1 space-y-0.5">
          <p className="font-medium text-sm">{item.name}</p>
          <p className="text-gray-500 text-[11px] leading-tight">{item.description}</p>

          <div className="flex space-x-2 items-center text-[13px] text-gray-900 pt-1">
            <p className="font-semibold">₹{item.price}</p>
            <p className="line-through text-gray-400 text-[11px]">₹{item.originalPrice}</p>
            <p className="text-green-600 font-medium text-[11px]">{item.discount}</p>
          </div>

          {/* Quantity & Remove */}
          <div className="flex items-center space-x-2 pt-1">
            <div className="flex items-center border px-1 py-0.5 rounded space-x-1 text-[13px]">
              <button onClick={handleDecrease} className="hover:text-black">−</button>
              <span className="w-4 text-center">{item.quantity}</span>
              <button onClick={handleIncrease} className="hover:text-black">+</button>
            </div>
            <button
              onClick={() => removeFromCart(item)}
              className="text-purple-600 hover:underline text-[11px]"
            >
              REMOVE
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
