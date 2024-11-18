export interface Chef {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  image: string;
  price: number;
  zipCode: string;
  distance?: number;
  gallery?: string[];
  weeklyPrice?: number;
  monthlyPrice?: number;
  menuItems?: MenuItem[];
  availability?: {
    [key: string]: {
      enabled: boolean;
      startTime: string;
      endTime: string;
    };
  };
  instagram?: string;
  facebook?: string;
  reviews?: Review[];
}

export interface MenuItem {
  name: string;
  description: string;
  price: number;
  image: string;
}

export interface Review {
  id: number;
  chef_id: number;
  user_id: string;
  rating: number;
  comment: string;
  created_at: string;
  user: {
    name: string;
    avatar: string;
  };
}

export interface UserProfile {
  id: string;
  user_id: string;
  name: string;
  street_address: string;
  city: string;
  state: string;
  zip_code: string;
  phone: string;
  created_at?: string;
  updated_at?: string;
}