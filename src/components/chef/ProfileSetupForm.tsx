import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, Check } from 'lucide-react';

interface ProfileSetupFormProps {
  onSubmit: (data: any) => void;
  onBack: () => void;
}

const ProfileSetupForm: React.FC<ProfileSetupFormProps> = ({ onSubmit, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Profile Picture</label>
        <div className="mt-1 flex items-center">
          <input
            type="file"
            accept="image/*"
            {...register('profilePicture')}
            className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Bio</label>
        <textarea
          {...register('bio', { 
            required: 'Bio is required',
            minLength: { value: 100, message: 'Bio must be at least 100 characters' }
          })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          placeholder="Tell potential customers about yourself, your cooking journey, and what makes your food special..."
        />
        {errors.bio && (
          <p className="mt-1 text-sm text-red-600">{errors.bio.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Certifications</label>
        <input
          type="text"
          {...register('certifications')}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          placeholder="Food Handler's Certificate, Culinary School, etc."
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Social Media Links</label>
        <div className="space-y-2">
          <input
            type="url"
            {...register('instagram')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="Instagram URL"
          />
          <input
            type="url"
            {...register('facebook')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="Facebook URL"
          />
          <input
            type="url"
            {...register('tiktok')}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
            placeholder="TikTok URL"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Featured Dishes Gallery</label>
        <input
          type="file"
          multiple
          accept="image/*"
          {...register('gallery')}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-orange-50 file:text-orange-600 hover:file:bg-orange-100"
        />
        <p className="mt-1 text-sm text-gray-500">Upload up to 6 photos of your best dishes</p>
      </div>

      <div className="flex justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center px-4 py-2 border border-gray-300 text-base font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          <ArrowLeft className="mr-2 h-5 w-5" />
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
        >
          Complete Registration
          <Check className="ml-2 h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default ProfileSetupForm;