import React, { useState } from 'react';
import { ChefHat, ArrowRight, ArrowLeft } from 'lucide-react';
import ChefInfoForm from '../components/chef/ChefInfoForm';
import MenuSetupForm from '../components/chef/MenuSetupForm';
import SchedulingForm from '../components/chef/SchedulingForm';
import PricingForm from '../components/chef/PricingForm';
import ProfileSetupForm from '../components/chef/ProfileSetupForm';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { Database } from '../types/supabase';

type Chef = Database['public']['Tables']['chefs']['Insert'];

const steps = [
  { id: 'chef-info', title: 'Personal Information' },
  { id: 'menu-setup', title: 'Menu Setup' },
  { id: 'scheduling', title: 'Availability' },
  { id: 'pricing', title: 'Pricing & Terms' },
  { id: 'profile', title: 'Profile Setup' }
];

const BecomeChef = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<Partial<Chef>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleNext = (stepData: any) => {
    setFormData(prev => ({
      ...prev,
      ...stepData
    }));
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleFinalSubmit = async (finalStepData: any) => {
    try {
      setIsSubmitting(true);
      setError(null);

      // Get the current user
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError) throw userError;
      if (!user) throw new Error('No authenticated user found');

      // Prepare chef data
      const chefData: Chef = {
        user_id: user.id,
        name: formData.name!,
        specialty: formData.specialty!,
        zip_code: formData.zip_code!,
        menu_items: formData.menu_items!,
        availability: formData.availability!,
        pricing: {
          weekly: formData.pricing?.weekly!,
          monthly: formData.pricing?.monthly!,
          minimum_duration: formData.pricing?.minimum_duration!
        },
        bio: finalStepData.bio,
        certifications: finalStepData.certifications?.split(',').map((cert: string) => cert.trim()) || [],
        social_media: {
          instagram: finalStepData.instagram,
          facebook: finalStepData.facebook,
          tiktok: finalStepData.tiktok
        }
      };

      // Create chef profile
      const { error: chefError } = await supabase
        .from('chefs')
        .insert([chefData]);

      if (chefError) throw chefError;

      // Redirect to chef dashboard
      navigate('/chef/dashboard');
    } catch (error: any) {
      console.error('Error creating chef profile:', error);
      setError(error.message || 'Failed to create chef profile');
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderStep = () => {
    switch (currentStep) {
      case 0:
        return <ChefInfoForm onNext={handleNext} />;
      case 1:
        return <MenuSetupForm onNext={handleNext} onBack={handleBack} />;
      case 2:
        return <SchedulingForm onNext={handleNext} onBack={handleBack} />;
      case 3:
        return <PricingForm onNext={handleNext} onBack={handleBack} />;
      case 4:
        return <ProfileSetupForm onSubmit={handleFinalSubmit} onBack={handleBack} isSubmitting={isSubmitting} />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <ChefHat className="h-12 w-12 text-orange-500 mx-auto" />
          <h1 className="mt-4 text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Become a Home Chef
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Share your culinary passion and earn money doing what you love
          </p>
        </div>

        {error && (
          <div className="mb-8 bg-red-50 border border-red-200 rounded-md p-4">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex justify-center">
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className={`flex items-center relative ${
                  index <= currentStep ? 'text-orange-600' : 'text-gray-400'
                }`}>
                  <div className={`rounded-full transition duration-500 ease-in-out h-12 w-12 py-3 border-2 ${
                    index <= currentStep ? 'border-orange-600 bg-orange-100' : 'border-gray-300'
                  } flex items-center justify-center`}>
                    {index + 1}
                  </div>
                  <div className={`absolute top-0 -ml-10 text-center mt-16 w-32 text-sm font-medium transition-opacity duration-300 ${
                    index === currentStep ? 'opacity-100' : 'opacity-0'
                  }`}>
                    {step.title}
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className={`flex-auto border-t-2 transition duration-500 ease-in-out ${
                    index < currentStep ? 'border-orange-600' : 'border-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="bg-white shadow-lg rounded-lg p-8">
          {renderStep()}
        </div>
      </div>
    </div>
  );
};

export default BecomeChef;