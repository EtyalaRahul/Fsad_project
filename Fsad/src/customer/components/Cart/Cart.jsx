import React from 'react';
import CartItem from './CartItem';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems } = useCart();

  const handleCheckout = () => {
    navigate("/checkout?step=2");
  };

  const totalItems = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);
  const totalOriginal = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.originalPrice) * (item.quantity || 1),
    0
  );
  const totalPrice = cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * (item.quantity || 1),
    0
  );
  const discount = totalOriginal - totalPrice;

  return (
    <div className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Cart Items Section */}
      <div className="lg:col-span-2 space-y-5">
        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <CartItem key={`${item.category}-${item.id}`} item={item} />
          ))
        ) : (
          <p>Your cart is empty</p>
        )}
      </div>

      {/* Price Details Section */}
      <div className="bg-white border border-[#7fb0d6] shadow-md rounded-md p-6 h-fit">

        <h2 className="text-lg font-semibold mb-4">PRICE DETAILS</h2>
        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span>Price ({totalItems} items)</span>
            <span className="font-medium text-blue-600">₹{totalOriginal.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Discount</span>
            <span className="text-green-600">-₹{discount.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span className="text-green-600">Free</span>
          </div>
        </div>

        <hr className="my-4" />

        <div className="flex justify-between font-semibold text-base">
          <span>Total Amount</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>

        <button
  onClick={handleCheckout}
  disabled={cartItems.length === 0}
  className={`mt-6 w-full py-3 text-center text-lg font-semibold rounded-lg shadow-md ${
    cartItems.length === 0
      ? 'bg-gray-300 cursor-not-allowed text-gray-500'
      : 'bg-gradient-to-r from-[#7fb0d6] to-[#d4e5f2] text-gray-800 hover:from-[#6aa1c8] hover:to-[#c0d9ea]'
  }`}
>
  CHECK OUT
</button>






      </div>
    </div>
  );
};

export default Cart;
