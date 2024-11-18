import React from 'react';
import { Link } from 'react-router-dom';
import { Chef } from '../types';
import { Star, MapPin } from 'lucide-react';

interface SearchResultsProps {
  chefs: Chef[];
  searchPerformed: boolean;
}

const SearchResults: React.FC<SearchResultsProps> = ({ chefs, searchPerformed }) => {
  if (!searchPerformed) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">Please use the search bar to find chefs in your area.</p>
      </div>
    );
  }

  if (chefs.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <p className="text-center text-gray-600">No chefs found in your area. Try searching with a different zip code.</p>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h2 className="text-3xl font-bold text-gray-900 mb-8">Chefs in Your Area</h2>
      <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
        {chefs.map((chef) => (
          <Link
            key={chef.id}
            to={`/chef/${chef.id}`}
            className="flex flex-col rounded-lg shadow-lg overflow-hidden transition-transform hover:scale-105"
          >
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
                {chef.distance && (
                  <div className="flex items-center mt-2 text-sm text-gray-500">
                    <MapPin className="h-4 w-4 mr-1" />
                    <span>{chef.distance} miles away</span>
                  </div>
                )}
              </div>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-xl font-bold text-gray-900">${chef.price}/week</span>
                <span className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-orange-500 hover:bg-orange-600">
                  View Profile
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default SearchResults;