import React from 'react';
import { Search, Calendar, Truck } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: Search,
      title: 'Find Your Chef',
      description: 'Browse through our curated list of talented home chefs in your area.'
    },
    {
      icon: Calendar,
      title: 'Choose Your Plan',
      description: 'Select a subscription plan that fits your schedule and dietary preferences.'
    },
    {
      icon: Truck,
      title: 'Enjoy Delivery',
      description: 'Get fresh, home-cooked meals delivered right to your doorstep.'
    }
  ];

  return (
    <section className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center relative">
          <div className="relative inline-block">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How Local Kitchen Works
            </h2>
            {/* Decorative swoosh */}
            <div className="absolute left-1/2 transform -translate-x-[55%] -bottom-2 w-64 h-3 overflow-hidden">
              <div className="absolute w-64 h-12 bg-orange-500/20 rounded-full" />
            </div>
          </div>
          <p className="mt-8 max-w-2xl mx-auto text-xl text-gray-500">
            Getting started with Local Kitchen is easy. Here's how it works.
          </p>
        </div>

        <div className="mt-12">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="flex flex-col items-center text-center">
                  <div className="flex items-center justify-center h-16 w-16 rounded-full bg-orange-100 text-orange-500">
                    <step.icon className="h-8 w-8" />
                  </div>
                  <h3 className="mt-6 text-xl font-bold text-gray-900">{step.title}</h3>
                  <p className="mt-2 text-base text-gray-500">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;