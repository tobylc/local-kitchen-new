import React from 'react';
import ZipCodeSearch from './ZipCodeSearch';
import { useNavigate } from 'react-router-dom';
import { Chef } from '../types';

const Hero = () => {
  const navigate = useNavigate();

  const handleSearch = (chefs: Chef[]) => {
    // Pass only serializable data
    navigate('/search', { 
      state: { 
        chefs: chefs.map(chef => ({
          id: chef.id,
          name: chef.name,
          specialty: chef.specialty,
          rating: chef.rating,
          reviews: chef.reviews,
          image: chef.image,
          price: chef.price,
          zipCode: chef.zipCode,
          distance: chef.distance
        })),
        searchPerformed: true 
      }
    });
  };

  return (
    <div className="relative bg-white overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:pb-28 xl:pb-32">
          <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
            <div className="sm:text-center lg:text-left">
              <h1 className="text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span className="block">Discover Amazing</span>
                <span className="block text-orange-500">Local Home Chefs</span>
              </h1>
              <p className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                Subscribe to talented home chefs in your area and enjoy delicious, 
                home-cooked meals delivered right to your door.
              </p>
              
              <div className="mt-8 sm:flex sm:justify-center lg:justify-start">
                <ZipCodeSearch onSearch={handleSearch} />
              </div>
            </div>
          </main>
          
          <div className="absolute right-0 top-0 h-full w-1/2 hidden lg:block">
            <img
              className="h-full w-full object-cover"
              src="https://images.unsplash.com/photo-1556911220-e15b29be8c8f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2850&q=80"
              alt="Couple cooking together in home kitchen"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;