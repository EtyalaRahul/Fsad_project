import { useParams } from 'react-router-dom';
import farmfreshdata from '../../../Data/farmfresh';
import dailyneedsdata from '../../../Data/dailyneeds';
import electronicsdata from '../../../Data/electronics';
import cosmetics from '../../../Data/cosmetics';
import decoratives from '../../../Data/decoratives';
import cleaners from '../../../Data/cleaners';
import ProductCard from './ProductCard';

const productDataMap = {
  farmfresh: farmfreshdata,
  dailyneeds: dailyneedsdata,
  electronics: electronicsdata,
  cosmetics: cosmetics,
  decoratives: decoratives,
  cleaners: cleaners,
};

export default function Product() {
  const { categoryId } = useParams();
  const categoryData = productDataMap[categoryId] || [];

  return (
    <div className="bg-white relative">
      {/* Blue Shadow Strip */}
      <div className="absolute top-0 left-0 w-full h-10 shadow-md" style={{ boxShadow: '0 4px 20px rgba(56, 189, 248, 0.5)' }}></div>

      {/* Content */}
      <div className="relative py-10 px-6">
        
        <div className="flex flex-wrap justify-center mt-9">
          {categoryData.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
