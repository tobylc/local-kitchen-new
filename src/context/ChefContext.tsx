import React, { createContext, useContext, useState, ReactNode } from 'react';
import { findNearbyZipCodes, calculateDistance } from '../utils/zipCodeUtils';
import { supabase } from '../lib/supabase';
import { Chef } from '../types';

interface ChefContextType {
  chefs: Chef[];
  setChefs: React.Dispatch<React.SetStateAction<Chef[]>>;
  searchChefsByZipCode: (zipCode: string) => Promise<Chef[]>;
  loading: boolean;
}

const ChefContext = createContext<ChefContextType | undefined>(undefined);

// Mock data for development
const mockChefs: Chef[] = [
  {
    id: 1,
    name: 'Sarah Johnson',
    specialty: 'Italian Cuisine',
    rating: 4.9,
    reviews: 128,
    image: 'https://images.unsplash.com/photo-1583394293214-28ded15ee548?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 29.99,
    zipCode: '90210'
  },
  {
    id: 2,
    name: 'Michael Chen',
    specialty: 'Asian Fusion',
    rating: 4.8,
    reviews: 93,
    image: 'https://images.unsplash.com/photo-1581299894007-aaa50297cf16?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80',
    price: 24.99,
    zipCode: '90211'
  }
];

export const ChefProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [chefs, setChefs] = useState<Chef[]>([]);
  const [loading, setLoading] = useState(false);

  const searchChefsByZipCode = async (zipCode: string): Promise<Chef[]> => {
    setLoading(true);
    try {
      const nearbyZipCodes = findNearbyZipCodes(zipCode);
      
      // Always use mock data if Supabase is not properly configured
      if (process.env.NODE_ENV === 'development' || !import.meta.env.VITE_SUPABASE_URL) {
        const chefsWithDistance = mockChefs.map(chef => ({
          ...chef,
          distance: calculateDistance(zipCode, chef.zipCode) || 0
        }))
        .filter(chef => chef.distance <= 5)
        .sort((a, b) => (a.distance || 0) - (b.distance || 0));
        
        setChefs(chefsWithDistance);
        return chefsWithDistance;
      }

      // Production Supabase query
      const { data: chefsData, error } = await supabase
        .from('chefs')
        .select('*')
        .in('zip_code', nearbyZipCodes);

      if (error) throw error;

      const chefsWithDistance = (chefsData || []).map(chef => ({
        ...chef,
        distance: calculateDistance(zipCode, chef.zipCode) || 0
      }))
      .filter(chef => chef.distance <= 5)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));

      setChefs(chefsWithDistance);
      return chefsWithDistance;
    } catch (error) {
      console.error('Error searching chefs:', error);
      // Fallback to mock data on error
      const mockResults = mockChefs.map(chef => ({
        ...chef,
        distance: calculateDistance(zipCode, chef.zipCode) || 0
      }))
      .filter(chef => chef.distance <= 5)
      .sort((a, b) => (a.distance || 0) - (b.distance || 0));
      
      setChefs(mockResults);
      return mockResults;
    } finally {
      setLoading(false);
    }
  };

  return (
    <ChefContext.Provider value={{ chefs, setChefs, searchChefsByZipCode, loading }}>
      {children}
    </ChefContext.Provider>
  );
};

export const useChef = () => {
  const context = useContext(ChefContext);
  if (context === undefined) {
    throw new Error('useChef must be used within a ChefProvider');
  }
  return context;
};