import React from 'react';
import { useForm } from 'react-hook-form';
import { Plus, Trash2, ArrowRight, ArrowLeft } from 'lucide-react';

interface MenuSetupFormProps {
  onNext: (data: any) => void;
  onBack: () => void;
}

const MenuSetupForm: React.FC<MenuSetupFormProps> = ({ onNext, onBack }) => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      menuItems: [{ name: '', description: '', price: '' }]
    }
  });

  const menuItems = watch('menuItems');

  const addMenuItem = () => {
    const newMenuItem = { name: '', description: '', price: '' };
    const updatedMenuItems = [...menuItems, newMenuItem];
    register('menuItems', { value: updatedMenuItems });
  };

  const removeMenuItem = (index: number) => {
    if (menuItems.length > 1) {
      const updatedMenuItems = menuItems.filter((_, i) => i !== index);
      register('menuItems', { value: updatedMenuItems });
    }
  };

  return (
    <form onSubmit={handleSubmit(onNext)} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-gray-700">Cuisine Type</label>
        <select
          {...register('cuisineType', { required: 'Please select a cuisine type' })}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
        >
          <option value="">Select cuisine type...</option>
          <option value="italian">Italian</option>
          <option value="asian">Asian</option>
          <option value="mexican">Mexican</option>
          <option value="mediterranean">Mediterranean</option>
          <option value="american">American</option>
          <option value="fusion">Fusion</option>
          <option value="other">Other</option>
        </select>
        {errors.cuisineType && (
          <p className="mt-1 text-sm text-red-600">{errors.cuisineType.message as string}</p>
        )}
      </div>

      <div className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium text-gray-900">Menu Items</h3>
          <button
            type="button"
            onClick={addMenuItem}
            className="inline-flex items-center px-3 py-1 border border-transparent text-sm font-medium rounded-md text-orange-600 bg-orange-100 hover:bg-orange-200"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add Item
          </button>
        </div>

        {menuItems.map((item, index) => (
          <div key={index} className="p-4 border rounded-md space-y-4">
            <div className="flex justify-between items-start">
              <div className="flex-grow space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700">Item Name</label>
                  <input
                    type="text"
                    {...register(`menuItems.${index}.name`, { required: 'Item name is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    {...register(`menuItems.${index}.description`, { required: 'Description is required' })}
                    rows={2}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Price</label>
                  <input
                    type="number"
                    step="0.01"
                    {...register(`menuItems.${index}.price`, { required: 'Price is required' })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-orange-500 focus:ring-orange-500"
                  />
                </div>
              </div>
              {menuItems.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeMenuItem(index)}
                  className="ml-4 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="h-5 w-5" />
                </button>
              )}
            </div>
          </div>
        ))}
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

export default MenuSetupForm;