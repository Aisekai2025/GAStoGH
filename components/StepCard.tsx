
import React from 'react';

interface StepCardProps {
  title: string;
  icon: string;
  children: React.ReactNode;
}

export const StepCard: React.FC<StepCardProps> = ({ title, icon, children }) => {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8 mb-6 animate-fadeIn">
      <div className="flex items-center gap-4 mb-6">
        <div className="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center text-2xl">
          {icon}
        </div>
        <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
      </div>
      <div className="prose prose-indigo max-w-none text-gray-600 space-y-4">
        {children}
      </div>
    </div>
  );
};
