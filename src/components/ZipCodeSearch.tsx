import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { useChef } from '../context/ChefContext';
import { isValidZipCode } from '../utils/zipCodeUtils';

interface ZipCodeSearchProps {
  onSearch: (chefs: any[]) => void;
}

const ZipCodeSearch: React.FC<ZipCodeSearchProps> = ({ onSearch }) => {
  const [zipCode, setZipCode] = useState('');
  const [error, setError] = useState('');
  const { searchChefsByZipCode, loading } = useChef();

  const handleSearch = () => {
    if (!zipCode) {
      setError('Please enter a zip code');
      return;
    }

    if (!isValidZipCode(zipCode)) {
      setError('Please enter a valid zip code');
      return;
    }

    setError('');
    const results = searchChefsByZipCode(zipCode);
    onSearch(results);
  };

  return (
    <div className="relative rounded-md shadow-sm max-w-md w-full">
      <input
        type="text"
        className={`block w-full rounded-md border-gray-300 pl-4 pr-12 focus:border-orange-500 focus:ring-orange-500 sm:text-sm h-12 ${
          error ? 'border-red-300' : ''
        }`}
        placeholder="Enter your zip code..."
        value={zipCode}
        onChange={(e) => setZipCode(e.target.value)}
        maxLength={5}
      />
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-r-md text-white bg-orange-500 hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500 h-12"
          onClick={handleSearch}
          disabled={loading}
        >
          {loading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white" />
          ) : (
            <Search className="h-5 w-5" />
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-sm text-red-600" id="zip-error">
          {error}
        </p>
      )}
    </div>
  );
};

export default ZipCodeSearch;