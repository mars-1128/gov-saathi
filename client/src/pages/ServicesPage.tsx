import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Filter, Search, Layers, MapPin, RefreshCw, AlertCircle } from 'lucide-react';
import { ServiceCard } from '../components/ServiceCard';
import { getServices, getCategories } from '../lib/api';
import { GovernmentService, Category } from '../types';
import { useLocation, INDIAN_STATES } from '../context/LocationContext';

export const ServicesPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { state: userState } = useLocation();

  const [services, setServices] = useState<GovernmentService[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  // Filters
  const [searchQuery, setSearchQuery] = useState(searchParams.get('search') || '');
  const [selectedCategory, setSelectedCategory] = useState(searchParams.get('category') || '');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState(searchParams.get('jurisdiction') || '');
  const [selectedState, setSelectedState] = useState(searchParams.get('state') || userState);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      try {
        const [cats, servs] = await Promise.all([
          getCategories(),
          getServices({
            category: selectedCategory,
            jurisdiction: selectedJurisdiction,
            state: selectedState,
            search: searchQuery
          })
        ]);
        setCategories(cats);
        setServices(servs);
      } catch (e) {
        console.error('Services load error', e);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, [selectedCategory, selectedJurisdiction, selectedState, searchQuery]);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSearchParams({
      ...(searchQuery ? { search: searchQuery } : {}),
      ...(selectedCategory ? { category: selectedCategory } : {}),
      ...(selectedJurisdiction ? { jurisdiction: selectedJurisdiction } : {}),
      ...(selectedState && selectedState !== 'All India' ? { state: selectedState } : {})
    });
  };

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedCategory('');
    setSelectedJurisdiction('');
    setSelectedState('All India');
    setSearchParams({});
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[#1B365D] dark:text-white">
          Verified Government Services Directory
        </h1>
        <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Search and filter verified Central, State, and Municipal government portals across India.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 sm:p-6 rounded-2xl bg-white dark:bg-slate-900 border border-[#E2E8F0] dark:border-slate-800 shadow-sm space-y-4">
        
        {/* Search input */}
        <form onSubmit={handleSearchSubmit} className="flex gap-2">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keyword, certificate name, problem, or department..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-[#E2E8F0] dark:border-slate-800 bg-[#F8F9FA] dark:bg-slate-950 text-xs sm:text-sm text-slate-900 dark:text-white focus:outline-none focus:border-[#1B365D]"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 rounded-xl bg-[#1B365D] hover:bg-[#0A2540] text-white font-semibold text-xs transition-colors"
          >
            Search
          </button>
        </form>

        {/* Dropdown Filters */}
        <div className="flex flex-wrap items-center gap-3 text-xs">
          
          {/* Jurisdiction */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Jurisdiction:</span>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium"
            >
              <option value="">All Levels</option>
              <option value="CENTRAL">Central Government</option>
              <option value="STATE">State Government</option>
              <option value="MUNICIPAL">Municipal / Local Body</option>
              <option value="DISTRICT">District Administration</option>
            </select>
          </div>

          {/* Category */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">Category:</span>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium max-w-[200px] truncate"
            >
              <option value="">All Categories</option>
              {categories.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.name}
                </option>
              ))}
            </select>
          </div>

          {/* State */}
          <div className="flex items-center gap-1.5">
            <span className="text-slate-500 font-medium">State:</span>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="p-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-medium max-w-[180px] truncate"
            >
              {INDIAN_STATES.map((st) => (
                <option key={st} value={st}>
                  {st}
                </option>
              ))}
            </select>
          </div>

          {(searchQuery || selectedCategory || selectedJurisdiction || selectedState !== 'All India') && (
            <button
              onClick={clearFilters}
              className="text-xs text-blue-600 dark:text-blue-400 font-semibold hover:underline ml-auto"
            >
              Clear Filters
            </button>
          )}

        </div>

      </div>

      {/* Services Grid */}
      {loading ? (
        <div className="p-16 text-center">
          <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-3" />
          <p className="text-xs text-slate-500">Loading verified services...</p>
        </div>
      ) : services.length === 0 ? (
        <div className="p-16 text-center rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
          <AlertCircle className="w-10 h-10 text-amber-500 mx-auto" />
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            No verified services found matching criteria
          </h3>
          <p className="text-xs text-slate-500 max-w-md mx-auto">
            Try adjusting your search query, selecting "All Levels", or resetting your state filter.
          </p>
          <button
            onClick={clearFilters}
            className="px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="text-xs text-slate-500 font-medium">
            Showing {services.length} verified government services
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <ServiceCard key={service.id} service={service} />
            ))}
          </div>
        </div>
      )}

    </div>
  );
};
