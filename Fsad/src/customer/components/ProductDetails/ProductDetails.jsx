import { useParams, useNavigate } from 'react-router-dom';
import farmfresh from '../../../Data/farmfresh';
import cosmetics from '../../../Data/cosmetics';
import electronics from '../../../Data/electronics';
import decoratives from '../../../Data/decoratives';
import cleaners from '../../../Data/cleaners';
import dailyneeds from '../../../Data/dailyneeds';
import { useCart } from '../context/CartContext';
import ProductReviewCard from './ProductReviewCard';
import { StarIcon } from '@heroicons/react/20/solid';

function classNames(...classes) {
  return classes.filter(Boolean).join(' ');
}

export default function ProductDetails() {
  const { category, productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();

  const dataMap = {
    farmfresh,
    dailyneeds,
    cosmetics,
    electronics,
    decoratives,
    cleaners,
  };

  const products = dataMap[category] || [];
  const product = products.find((item) => item.id === parseInt(productId));

  if (!product) {
    return <div className="p-8 text-red-500">Product not found</div>;
  }

  const reviews = { href: '#', average: 4, totalCount: 23 };

  const handleAddtoCart = () => {
    addToCart({ ...product, category });
    navigate('/cart');
  };

  const formatPrice = (price) => `₹${price.toLocaleString('en-IN')}`;

  return (
    <div className="bg-white min-h-screen relative">
      {/* Blue Shadow Strip at top */}
      <div className="absolute top-0 left-0 w-full h-10 shadow-md" style={{ boxShadow: '0 4px 20px rgba(56, 189, 248, 0.5)' }} />

      {/* Main Content */}
      <div className="relative py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left Side Image */}
          <div className="flex justify-center">
            <img
              src={product.image}
              alt={product.name}
              className="h-[400px] w-[400px] object-contain"
            />
          </div>

          {/* Right Side Content */}
          <div className="flex flex-col gap-6 border-l border-gray-300 pl-12">
            {/* Product Title */}
            <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>

            {/* Product Description */}
            <p className="text-gray-700 text-lg">{product.description}</p>

            {/* Pricing */}
            <div className="flex flex-col gap-1">
              <p className="text-2xl font-bold text-gray-900">{formatPrice(product.price)}</p>
              <div className="flex gap-2 items-center">
                <p className="text-sm line-through text-gray-400">{formatPrice(product.originalPrice)}</p>
                <p className="text-sm text-blue-600">{product.discount}</p>
              </div>
            </div>

            {/* Reviews */}
            <div className="flex items-center gap-2">
              {[0, 1, 2, 3, 4].map((rating) => (
                <StarIcon
                  key={rating}
                  className={classNames(
                    reviews.average > rating ? 'text-blue-500' : 'text-gray-200',
                    'h-5 w-5'
                  )}
                  aria-hidden="true"
                />
              ))}
              <a
                href={reviews.href}
                className="text-sm font-medium text-blue-600 hover:text-blue-500"
              >
                {reviews.totalCount} reviews
              </a>
            </div>

            {/* Add to Bag Button */}
            <button
              onClick={handleAddtoCart}
              className="mt-6 w-[200px] py-3 text-center text-lg font-semibold bg-gradient-to-r from-[#7fb0d6] to-[#d4e5f2] text-gray-800 rounded-lg hover:from-[#6aa1c8] hover:to-[#c0d9ea] shadow-md"
            >
              Add to Bag
            </button>
          </div>
        </div>

        {/* Reviews Card Below */}
        <div className="mt-16">
          <ProductReviewCard />
        </div>
      </div>
    </div>
  );
}
