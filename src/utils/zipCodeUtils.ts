import zipcodes from 'zipcodes';

export const findNearbyZipCodes = (zipCode: string, radius: number = 5): string[] => {
  try {
    return zipcodes.radius(zipCode, radius) || [];
  } catch (error) {
    console.error('Error finding nearby zip codes:', error);
    return [];
  }
};

export const isValidZipCode = (zipCode: string): boolean => {
  return /^\d{5}(-\d{4})?$/.test(zipCode) && zipcodes.lookup(zipCode) !== null;
};

export const calculateDistance = (zipCode1: string, zipCode2: string): number | null => {
  const location1 = zipcodes.lookup(zipCode1);
  const location2 = zipcodes.lookup(zipCode2);
  
  if (!location1 || !location2) return null;

  // Calculate distance using the Haversine formula
  const R = 3959; // Earth's radius in miles
  const lat1 = location1.latitude * Math.PI / 180;
  const lat2 = location2.latitude * Math.PI / 180;
  const lon1 = location1.longitude * Math.PI / 180;
  const lon2 = location2.longitude * Math.PI / 180;

  const dLat = lat2 - lat1;
  const dLon = lon2 - lon1;

  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
           Math.cos(lat1) * Math.cos(lat2) *
           Math.sin(dLon/2) * Math.sin(dLon/2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  const distance = R * c;

  return Math.round(distance * 10) / 10; // Round to 1 decimal place
};