import React from 'react';
import { Star } from 'lucide-react';

const FeaturedChefs = () => {
  const chefs = [
    {
      id: 1,
      name: 'Sarah Johnson',
      specialty: 'Italian Cuisine',
      rating: 4.9,
      reviews: 128,
      image: 'https://images.unsplash.com/photo-1556911261-6bd341186b2f?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 29.99
    },
    {
      id: 2,
      name: 'Michael Chen',
      specialty: 'Asian Fusion',
      rating: 4.8,
      reviews: 93,
      image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 24.99
    },
    {
      id: 3,
      name: 'Maria Garcia',
      specialty: 'Mediterranean',
      rating: 4.7,
      reviews: 156,
      image: 'https://images.unsplash.com/photo-1595257841889-eca2678454e2?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
      price: 27.99
    }
  ];

  return (
    <section className="py-12 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
          Featured Chefs
        </h2>
        <p className="mt-3 max-w-2xl text-xl text-gray-500 sm:mt-4">
          Discover our most popular home chefs and their delicious offerings.
        </p>
        
        <div className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {chefs.map((chef) => (
            <div key={chef.id} className="flex flex-col rounded-lg shadow-lg overflow-hidden">
              <div className="flex-shrink-0">
                <img className="h-48 w-full object-cover" src={chef.image} alt={chef.name} />
              </div>
              <div className="flex-1 bg-white p-6 flex flex-col justify-between">
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{chef.name}</h3>
                  <p className="mt-1 text-sm text-gray-500">{chef.specialty}</p>
                  <div className="flex items-center mt-2">
                    <Star className="h-5 w-5 text-yellow-400 fill-current" />
                    <span className="ml-1 text-sm text-gray-600">{chef.rating}</span>
                    <span className="mx-1 text-gray-400">·</span>
                    <span className="text-sm text-gray-600">{chef.reviews} reviews</span>
                  </div>
                </div>
                <div className="mt-6 flex items-center justify-between">
                  <span className="text-xl font-bold text-gray-900">${chef.price}/week</span>
                  <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedChefs;