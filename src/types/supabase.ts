export interface Database {
  public: {
    Tables: {
      chefs: {
        Row: {
          id: number;
          user_id: string;
          name: string;
          specialty: string;
          zip_code: string;
          rating: number;
          reviews_count: number;
          menu_items: {
            name: string;
            description: string;
            price: number;
            image?: string;
          }[];
          availability: {
            [key: string]: {
              enabled: boolean;
              startTime: string;
              endTime: string;
            };
          };
          pricing: {
            weekly: number;
            monthly: number;
            minimum_duration: number;
          };
          bio: string;
          certifications: string[];
          social_media: {
            instagram?: string;
            facebook?: string;
            tiktok?: string;
          };
          profile_image?: string;
          gallery?: string[];
          created_at: string;
          updated_at: string;
        };
        Insert: Omit<Database['public']['Tables']['chefs']['Row'], 'id' | 'rating' | 'reviews_count' | 'created_at' | 'updated_at'>;
        Update: Partial<Database['public']['Tables']['chefs']['Insert']>;
      };
      reviews: {
        Row: {
          id: number;
          chef_id: number;
          user_id: string;
          rating: number;
          comment: string;
          created_at: string;
        };
        Insert: Omit<Database['public']['Tables']['reviews']['Row'], 'id' | 'created_at'>;
        Update: Partial<Database['public']['Tables']['reviews']['Insert']>;
      };
    };
  };
}