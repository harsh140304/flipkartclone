import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import SkeletonCard from '../components/SkeletonCard';
import HeroCarousel from '../components/HeroCarousel';
import OfferBanner from '../components/OfferBanner';
import { fetchProducts } from '../api';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sort, setSort] = useState('');
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get('category') || '';
  const search = queryParams.get('search') || '';

  const isMainHomePage = !category && !search;

  useEffect(() => {
    const loadProducts = async () => {
      setLoading(true);
      try {
        const { data } = await fetchProducts({ category, search, sort });
        setProducts(data);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    };
    loadProducts();
  }, [category, search, sort]);

  return (
    <div className="p-4 sm:p-6 lg:px-10 min-h-screen">
      {isMainHomePage && <HeroCarousel />}
      
      {/* Header & Sort */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 bg-white p-4 shadow-sm rounded-sm">
        <div>
          <h1 className="text-xl font-medium text-fkTextPrimary">
            {search ? `Search results for "${search}"` : category ? category : 'All Products'}
            <span className="text-sm text-fkTextSecondary ml-2 font-normal">
              (Showing {products.length} products)
            </span>
          </h1>
        </div>
        
        <div className="mt-4 sm:mt-0 flex items-center">
          <span className="font-medium text-sm mr-4 hidden sm:block">Sort By</span>
          <select 
            value={sort} 
            onChange={(e) => setSort(e.target.value)}
            className="text-sm border-b-2 border-transparent hover:border-fkBlue focus:outline-none py-1 bg-transparent cursor-pointer font-medium text-fkTextPrimary"
          >
            <option value="">Relevance</option>
            <option value="price_asc">Price -- Low to High</option>
            <option value="price_desc">Price -- High to Low</option>
            <option value="rating">Rating</option>
          </select>
        </div>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loading ? (
          Array(8).fill(0).map((_, i) => <SkeletonCard key={i} />)
        ) : products.length > 0 ? (
          <>
            {products.slice(0, 8).map(product => <ProductCard key={product.id} product={product} />)}
            {products.length > 8 && (
              <div className="col-span-full">
                <OfferBanner />
              </div>
            )}
            {products.slice(8).map(product => <ProductCard key={product.id} product={product} />)}
          </>
        ) : (
          <div className="col-span-full bg-white p-10 flex flex-col items-center justify-center text-center rounded-sm shadow-sm">
            <img src="https://static-assets-web.flixcart.com/fk-p-linchpin-web/fk-cp-zion/img/error-no-search-results_2353c5.png" alt="No results" className="w-64 mb-6" />
            <h2 className="text-xl font-medium mb-2">Sorry, no results found!</h2>
            <p className="text-fkTextSecondary">Please check the spelling or try searching for something else</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
