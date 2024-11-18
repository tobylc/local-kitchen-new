import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowLeft, ArrowRight } from 'lucide-react';

interface PricingFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const PricingForm: React.FC<PricingFormProps> = ({ onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Subscription Plans</h3>
        <div className="space-y-4">
          <div className="border rounded-md p-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('plans.weekly')}
                className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <div className="ml-3">
                <span className="block font-medium text-gray-700">Weekly Plan</span>
                <input
                  type="number"
                  {...register('weeklyPrice', { 
                    required: 'Weekly price is required',
                    min: { value: 1, message: 'Price must be greater than 0' }
                  })}
                  placeholder="Price per week"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </label>
          </div>

          <div className="border rounded-md p-4">
            <label className="flex items-start">
              <input
                type="checkbox"
                {...register('plans.monthly')}
                className="mt-1 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
              />
              <div className="ml-3">
                <span className="block font-medium text-gray-700">Monthly Plan</span>
                <input
                  type="number"
                  {...register('monthlyPrice', { 
                    required: 'Monthly price is required',
                    min: { value: 1, message: 'Price must be greater than 0' }
                  })}
                  placeholder="Price per month"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                />
              </div>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Minimum Subscription Duration (months)</label>
        <input
          type="number"
          {...register('minDuration', { 
            required: 'Please specify minimum duration',
            min: { value: 1, message: 'Minimum duration must be at least 1 month' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.minDuration && (
          <p className="mt-1 text-sm text-red-600">{errors.minDuration.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Cancellation Policy</label>
        <textarea
          {...register('cancellationPolicy', { required: 'Please specify cancellation policy' })}
          rows={4}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
          placeholder="Describe your cancellation policy..."
        />
        {errors.cancellationPolicy && (
          <p className="mt-1 text-sm text-red-600">{errors.cancellationPolicy.message as string}</p>
        )}
      </div>

      <div className="border-t pt-6">
        <div className="flex items-start">
          <div className="flex items-center h-5">
            <input
              type="checkbox"
              {...register('termsAccepted', { 
                required: 'You must accept the terms and conditions'
              })}
              className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
            />
          </div>
          <div className="ml-3 text-sm">
            <label className="font-medium text-gray-700">Terms and Conditions</label>
            <p className="text-gray-500">I agree to the 30% platform commission and accept all terms and conditions.</p>
            {errors.termsAccepted && (
              <p className="mt-1 text-sm text-red-600">{errors.termsAccepted.message as string}</p>
            )}
          </div>
        </div>
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
          Next Step
          <ArrowRight className="ml-2 h-5 w-5" />
        </button>
      </div>
    </form>
  );
};

export default PricingForm;