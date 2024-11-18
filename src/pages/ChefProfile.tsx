import React from 'react';
import { useParams } from 'react-router-dom';
import { Star, MapPin, Clock, Calendar, Award, Instagram, Facebook } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { Chef } from '../types';

const ChefProfile = () => {
  const { id } = useParams();
  const [chef, setChef] = React.useState<Chef | null>(null);
  const [selectedPlan, setSelectedPlan] = React.useState<'weekly' | 'monthly'>('weekly');
  const [activeTab, setActiveTab] = React.useState<'menu' | 'reviews' | 'schedule'>('menu');

  React.useEffect(() => {
    const fetchChefData = async () => {
      if (!id) return;
      
      const { data, error } = await supabase
        .from('chefs')
        .select('*, reviews(*)')
        .eq('id', id)
        .single();

      if (error) {
        console.error('Error fetching chef:', error);
        return;
      }

      setChef(data);
    };

    fetchChefData();
  }, [id]);

  if (!chef) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="relative h-96">
        <div className="absolute inset-0">
          <img
            src={chef.gallery?.[0] || chef.image}
            alt={`${chef.name}'s featured dish`}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black bg-opacity-50" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-end pb-12">
          <div className="text-white">
            <h1 className="text-4xl font-bold">{chef.name}</h1>
            <p className="mt-2 text-xl">{chef.specialty}</p>
            <div className="mt-4 flex items-center space-x-4">
              <div className="flex items-center">
                <Star className="h-5 w-5 text-yellow-400 fill-current" />
                <span className="ml-1">{chef.rating} ({chef.reviews} reviews)</span>
              </div>
              <div className="flex items-center">
                <MapPin className="h-5 w-5" />
                <span className="ml-1">{chef.zipCode}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2">
            {/* Tabs */}
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                {['menu', 'reviews', 'schedule'].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab as typeof activeTab)}
                    className={`
                      whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm
                      ${activeTab === tab
                        ? 'border-orange-500 text-orange-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    {tab.charAt(0).toUpperCase() + tab.slice(1)}
                  </button>
                ))}
              </nav>
            </div>

            {/* Tab Content */}
            <div className="mt-8">
              {activeTab === 'menu' && (
                <div className="space-y-8">
                  {chef.menuItems?.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-24 h-24 rounded-lg object-cover"
                      />
                      <div>
                        <h3 className="text-lg font-medium text-gray-900">{item.name}</h3>
                        <p className="mt-1 text-gray-500">{item.description}</p>
                        <p className="mt-2 text-orange-600">${item.price}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'reviews' && (
                <div className="space-y-8">
                  {chef.reviews?.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-8">
                      <div className="flex items-start">
                        <img
                          src={review.user.avatar}
                          alt={review.user.name}
                          className="w-12 h-12 rounded-full"
                        />
                        <div className="ml-4">
                          <h4 className="font-medium text-gray-900">{review.user.name}</h4>
                          <div className="flex items-center mt-1">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating
                                    ? 'text-yellow-400 fill-current'
                                    : 'text-gray-300'
                                }`}
                              />
                            ))}
                          </div>
                          <p className="mt-2 text-gray-600">{review.comment}</p>
                          <p className="mt-2 text-sm text-gray-500">
                            {new Date(review.created_at).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {activeTab === 'schedule' && (
                <div className="space-y-6">
                  {Object.entries(chef.availability || {}).map(([day, hours]) => (
                    <div key={day} className="flex items-center justify-between">
                      <span className="font-medium text-gray-900">{day}</span>
                      <span className="text-gray-500">
                        {hours.enabled ? `${hours.startTime} - ${hours.endTime}` : 'Closed'}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right Column - Subscription Box */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-6">
              <h3 className="text-lg font-medium text-gray-900">Subscribe to {chef.name}</h3>
              
              {/* Plan Toggle */}
              <div className="mt-4 flex rounded-lg bg-gray-100 p-1">
                {['weekly', 'monthly'].map((plan) => (
                  <button
                    key={plan}
                    onClick={() => setSelectedPlan(plan as typeof selectedPlan)}
                    className={`
                      flex-1 rounded-md py-2 text-sm font-medium
                      ${selectedPlan === plan
                        ? 'bg-white shadow-sm text-orange-600'
                        : 'text-gray-500 hover:text-gray-700'
                      }
                    `}
                  >
                    {plan.charAt(0).toUpperCase() + plan.slice(1)}
                  </button>
                ))}
              </div>

              {/* Price */}
              <div className="mt-6 text-center">
                <span className="text-4xl font-bold text-gray-900">
                  ${selectedPlan === 'weekly' ? chef.weeklyPrice : chef.monthlyPrice}
                </span>
                <span className="text-gray-500">/{selectedPlan}</span>
              </div>

              {/* Features */}
              <ul className="mt-6 space-y-4">
                <li className="flex items-center">
                  <Calendar className="h-5 w-5 text-orange-500" />
                  <span className="ml-3 text-gray-600">
                    {selectedPlan === 'weekly' ? '5 meals per week' : '20 meals per month'}
                  </span>
                </li>
                <li className="flex items-center">
                  <Clock className="h-5 w-5 text-orange-500" />
                  <span className="ml-3 text-gray-600">Flexible delivery times</span>
                </li>
                <li className="flex items-center">
                  <Award className="h-5 w-5 text-orange-500" />
                  <span className="ml-3 text-gray-600">Quality guaranteed</span>
                </li>
              </ul>

              {/* Subscribe Button */}
              <button className="mt-8 w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500">
                Subscribe Now
              </button>

              {/* Social Links */}
              {(chef.instagram || chef.facebook) && (
                <div className="mt-6 flex justify-center space-x-4">
                  {chef.instagram && (
                    <a
                      href={chef.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-500"
                    >
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                  {chef.facebook && (
                    <a
                      href={chef.facebook}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-400 hover:text-orange-500"
                    >
                      <Facebook className="h-6 w-6" />
                    </a>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChefProfile;