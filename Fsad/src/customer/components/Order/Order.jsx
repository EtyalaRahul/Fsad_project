import { Grid } from '@mui/material';
import React from 'react';
import OrderCard from './OrderCard'; // Adjust path if needed

const orders = [
  {
    orderId: "123",
    product: {
      name: "Fresh Tomato",
      image: "/images/tomatoes.jpg",
      price: 40,
    },
    size: "1kg",
    status: "Delivered",
    deliveryDate: "Apr 25, 2025",
  },
  {
    orderId: "124",
    product: {
      name: "Hand Wash",
      image: "/images/handwash.png",
      price: 120,
    },
    size: "500ml",
    status: "Delivered",
    deliveryDate: "Apr 24, 2025",
  },
];

const Order = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="space-y-6">
        {orders.map((order) => (
          <OrderCard
            key={order.orderId}
            orderId={order.orderId}
            image={order.product.image}
            name={order.product.name}
            size={order.size}
            price={order.product.price}
            status={order.status}
            deliveryDate={order.deliveryDate}
          />
        ))}
      </div>
    </div>
  );
};

export default Order;
