import React from 'react';
import './ProductCard.css';
import { useNavigate, useParams } from 'react-router-dom';

const ProductCard = ({ product }) => {
  const navigate = useNavigate();
  const { categoryId } = useParams(); // dynamically grabs 'vegetables' or 'snacks'

  const handleClick = () => {
    navigate(`/product/${categoryId}/${product.id}`);
  };

  return (
    <div
      onClick={handleClick}
      className='productCard w-[12rem] m-2 transition-all cursor-pointer rounded-lg overflow-hidden'
    >
      <div className='h-[12rem]'>
        <img
          className='h-full w-full object-cover object-left-top'
          src={product.image}
          alt={product.description}
        />
      </div>
      <div className='textPart bg-white p-3'>
        <div>
          <p className='font-bold opacity-60 text-sm'>{product.name}</p>
          <p className='text-xs'>{product.description || ''}</p>
        </div>
        <div className='flex items-center space-x-2 mt-2 text-sm'>
        <p className='font-semibold'>₹{product.price.toLocaleString('en-IN')}</p>

          {product.originalPrice && (
            <>
              <p className='line-through opacity-50'>{product.originalPrice}</p>
              <p className='text-green-600 font-semibold'>{product.discount || '70% off'}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;