import React from 'react';
import { useNavigate } from 'react-router-dom';

const HomeSectionCard = ({ name, description, image, category }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${category.toLowerCase()}`);
  };

  return (
    <div
      onClick={handleClick}

      className="cursor-pointer flex flex-col items-center bg-white rounded-xl shadow-md hover:shadow-2xl overflow-hidden w-[11rem]
      border border-black transition-transform transition-shadow duration-300 hover:scale-105"
  >
      <div className="h-[9rem] w-[8rem]">
        <img className="object-cover object-top w-full h-full" src={image} alt={name} />
      </div>
      <div className="p-2 text-center">
        <h3 className="text-sm font-semibold text-gray-800 truncate">{name}</h3>
        <p className="mt-1 text-xs text-gray-500 line-clamp-2">{description}</p>
      </div>
    </div>
  );
};

export default HomeSectionCard;
