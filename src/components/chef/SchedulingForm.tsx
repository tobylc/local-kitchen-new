import React from 'react';
import { useForm } from 'react-hook-form';
import { ArrowRight, ArrowLeft } from 'lucide-react';

interface SchedulingFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const SchedulingForm: React.FC<SchedulingFormProps> = ({ onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();

  const daysOfWeek = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'
  ];

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <h3 className="text-lg font-medium text-gray-900 mb-4">Available Days & Times</h3>
        <div className="space-y-4">
          {daysOfWeek.map((day) => (
            <div key={day} className="flex items-center space-x-4">
              <div className="w-1/4">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    {...register(`availability.${day}.enabled`)}
                    className="rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <span className="ml-2 text-sm text-gray-700">{day}</span>
                </label>
              </div>
              <div className="w-3/4 flex space-x-4">
                <div>
                  <select
                    {...register(`availability.${day}.startTime`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i}:00`}>
                        {i.toString().padStart(2, '0')}:00
                      </option>
                    ))}
                  </select>
                </div>
                <span className="text-gray-500 self-center">to</span>
                <div>
                  <select
                    {...register(`availability.${day}.endTime`)}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  >
                    {Array.from({ length: 24 }, (_, i) => (
                      <option key={i} value={`${i}:00`}>
                        {i.toString().padStart(2, '0')}:00
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Maximum Daily Orders</label>
        <input
          type="number"
          {...register('maxDailyOrders', { 
            required: 'Please specify maximum daily orders',
            min: { value: 1, message: 'Must accept at least 1 order per day' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.maxDailyOrders && (
          <p className="mt-1 text-sm text-red-600">{errors.maxDailyOrders.message as string}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">Delivery Radius (miles)</label>
        <input
          type="number"
          {...register('deliveryRadius', { 
            required: 'Please specify delivery radius',
            min: { value: 1, message: 'Minimum delivery radius is 1 mile' },
            max: { value: 50, message: 'Maximum delivery radius is 50 miles' }
          })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        />
        {errors.deliveryRadius && (
          <p className="mt-1 text-sm text-red-600">{errors.deliveryRadius.message as string}</p>
        )}
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

export default SchedulingForm;