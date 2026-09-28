import React from 'react';
import { Link } from 'react-router-dom';
import * as Icons from 'lucide-react';
import { Category } from '../types';

interface CategoryCardProps {
  category: Category;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category }) => {
  // Dynamically resolve icon from Lucide
  const IconComponent = (Icons as any)[category.icon] || Icons.Folder;

  return (
    <Link
      to={`/categories/${category.slug}`}
      className="gov-service-card group relative p-5 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="w-11 h-11 rounded-lg bg-blue-50 dark:bg-blue-950/50 border border-blue-100 dark:border-blue-900/40 flex items-center justify-center text-[#1B365D] dark:text-blue-400 group-hover:scale-105 group-hover:bg-[#1B365D] group-hover:text-white transition-all duration-200">
          <IconComponent className="w-5 h-5" />
        </div>

        <h3 className="mt-3.5 font-bold text-[#1B365D] dark:text-white text-base group-hover:text-blue-700 dark:group-hover:text-blue-400 transition-colors">
          {category.name}
        </h3>

        <p className="mt-1.5 text-xs text-[#333333] dark:text-slate-400 line-clamp-2 leading-relaxed">
          {category.description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between text-xs font-semibold text-[#1B365D] dark:text-blue-400">
        <span>Explore services</span>
        <Icons.ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
};
