import React, { useEffect, useState } from 'react';
import { useSearchParams, Link, useNavigate } from 'react-router-dom';
import {
  Search,
  ShieldCheck,
  ExternalLink,
  Phone,
  Building,
  CheckCircle2,
  AlertCircle,
  FileText,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Layers,
  ArrowRight,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { SearchBar } from '../components/SearchBar';
import { searchServices } from '../lib/api';
import { SearchResultResponse, GovernmentService, SubService } from '../types';
import { useLocation } from '../context/LocationContext';
import { useLanguage } from '../context/LanguageContext';

export const SearchResultsPage: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q') || searchParams.get('query') || searchParams.get('search') || '';
  const { state: userState } = useLocation();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [searchResult, setSearchResult] = useState<SearchResultResponse | null>(null);
  const [expandedSubId, setExpandedSubId] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;
    const executeSearch = async () => {
      if (!query.trim()) {
        setSearchResult(null);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const res = await searchServices(query.trim(), userState);
        if (isMounted) {
          setSearchResult(res);
          // Auto-expand matched sub-service if targeted
          if (res.matched_sub_service) {
            setExpandedSubId(res.matched_sub_service.id);
          } else {
            setExpandedSubId(null);
          }
        }
      } catch (err) {
        console.error('Search request error:', err);
        if (isMounted) {
          setSearchResult({
            success: false,
            query,
            normalized_query: query.toLowerCase(),
            top_service: null,
            matched_sub_service: null,
            matched_services: [],
            total_matches: 0,
            suggested_queries: [
              'Aadhaar Mobile Number Update',
              'Download e-Aadhaar PDF',
              'Apply New PAN Card',
              'Driving Licence Renewal',
              'Birth Certificate Online',
              'Recover Lost Documents'
            ],
            popular_services: []
          });
        }
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    executeSearch();
    return () => {
      isMounted = false;
    };
  }, [query, userState]);

  const toggleSubService = (id: string) => {
    setExpandedSubId(prev => (prev === id ? null : id));
  };

  const handleSuggestionClick = (suggestion: string) => {
    navigate(`/search?q=${encodeURIComponent(suggestion)}`);
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Top Search Bar (Dedicated Service Search, never AI Chatbot) */}
        <div className="bg-white dark:bg-slate-900 rounded-3xl p-4 sm:p-6 shadow-sm border border-slate-200/80 dark:border-slate-800">
          <SearchBar initialValue={query} />
        </div>

        {/* Loading Spinner */}
        {loading && (
          <div className="p-16 text-center space-y-3 bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto" />
            <p className="text-sm font-semibold text-slate-700 dark:text-slate-300">
              Searching verified government services and official procedures...
            </p>
            <p className="text-xs text-slate-400">
              Matching official databases for "{query}"
            </p>
          </div>
        )}

        {/* Results Loaded */}
        {!loading && searchResult && (
          <div className="space-y-8">
            
            {/* Header: Search results for "<query>" */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-200 dark:border-slate-800">
              <div>
                <p className="text-xs uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                  Government Service Search Results
                </p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#1B365D] dark:text-white mt-0.5">
                  Search results for: <span className="text-blue-600 dark:text-blue-400">"{searchResult.query}"</span>
                </h1>
              </div>

              {searchResult.total_matches > 0 && (
                <div className="flex items-center gap-2 text-xs font-semibold text-slate-600 dark:text-slate-300 bg-white dark:bg-slate-900 px-3.5 py-1.5 rounded-full border border-slate-200 dark:border-slate-800 shadow-2xs">
                  <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  <span>{searchResult.total_matches} Verified Portals Found</span>
                </div>
              )}
            </div>

            {/* =========================================================================
                CASE 1: MATCHING SERVICE FOUND
                ========================================================================= */}
            {searchResult.top_service ? (
              <div className="space-y-8">
                
                {/* 1. PRIMARY TARGET SERVICE GUIDE BOX */}
                <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-lg shadow-blue-950/5 overflow-hidden">
                  
                  {/* Top Banner with Badges */}
                  <div className="p-6 sm:p-8 bg-gradient-to-r from-blue-900 via-indigo-900 to-[#1B365D] text-white">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-300 bg-emerald-950/70 border border-emerald-500/40 px-3 py-1 rounded-full">
                        <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                        Verified Official Government Portal
                      </span>
                      <span className="text-xs font-semibold text-blue-200 bg-blue-950/60 px-2.5 py-1 rounded-full border border-blue-400/20">
                        {searchResult.top_service.jurisdiction_level}
                      </span>
                      {searchResult.top_service.state && searchResult.top_service.state !== 'All India' && (
                        <span className="text-xs font-semibold text-amber-200 bg-amber-950/50 px-2.5 py-1 rounded-full border border-amber-400/20">
                          {searchResult.top_service.state}
                        </span>
                      )}
                    </div>

                    <h2 className="text-xl sm:text-3xl font-extrabold tracking-tight">
                      {searchResult.top_service.name}
                    </h2>

                    {searchResult.top_service.department && (
                      <p className="text-xs sm:text-sm text-blue-200 mt-1.5 flex items-center gap-1.5 font-medium">
                        <Building className="w-4 h-4 flex-shrink-0 text-blue-300" />
                        <span>{searchResult.top_service.department}</span>
                      </p>
                    )}

                    <p className="mt-3 text-sm text-blue-100/90 leading-relaxed max-w-3xl">
                      {searchResult.top_service.simple_description || searchResult.top_service.description}
                    </p>

                    {/* Official Portal Action Strip */}
                    <div className="mt-6 flex flex-wrap items-center gap-3 pt-4 border-t border-white/10">
                      {searchResult.top_service.official_website && (
                        <a
                          href={searchResult.top_service.official_website}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white hover:bg-blue-50 text-[#1B365D] font-bold text-xs shadow-md transition-all hover:scale-[1.02]"
                        >
                          <span>Open Official Website</span>
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}

                      {searchResult.top_service.official_helpline && (
                        <div className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-white/10 border border-white/10 text-xs font-semibold text-blue-100">
                          <Phone className="w-3.5 h-3.5 text-amber-300" />
                          <span>Helpline: {searchResult.top_service.official_helpline}</span>
                        </div>
                      )}

                      <Link
                        to={`/services/${searchResult.top_service.slug}`}
                        className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-blue-700/60 hover:bg-blue-700 text-white font-semibold text-xs border border-white/10 transition-colors ml-auto"
                      >
                        <span>View Full Service Documentation</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  {/* 2. SPECIFIC SUB-SERVICE SPOTLIGHT (If targeted query like "mobile update" / "correction") */}
                  {searchResult.matched_sub_service && (
                    <div className="p-6 sm:p-8 bg-amber-50/70 dark:bg-amber-950/20 border-b border-amber-200/80 dark:border-amber-900/40">
                      <div className="flex items-center gap-2 text-xs font-bold text-amber-800 dark:text-amber-400 mb-2">
                        <Info className="w-4 h-4 text-amber-600 dark:text-amber-400 flex-shrink-0" />
                        <span className="uppercase tracking-wider">Targeted Procedure Details</span>
                      </div>

                      <h3 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
                        {searchResult.matched_sub_service.title}
                      </h3>
                      
                      <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 mt-1 leading-relaxed">
                        {searchResult.matched_sub_service.description}
                      </p>

                      {/* Key highlights: Methods, Fees, Offline options */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 my-4">
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/60 dark:border-slate-800">
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Available Methods</p>
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 mt-0.5">
                            {searchResult.matched_sub_service.methods?.join(' & ') || 'Online & Offline'}
                          </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/60 dark:border-slate-800">
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Official Government Fee</p>
                          <p className="text-xs font-bold text-emerald-700 dark:text-emerald-400 mt-0.5">
                            {searchResult.matched_sub_service.fee || searchResult.top_service.fee || 'Official Rate'}
                          </p>
                        </div>
                        <div className="p-3 bg-white dark:bg-slate-900 rounded-xl border border-amber-200/60 dark:border-slate-800">
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">Physical / Seva Kendra Option</p>
                          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-0.5 truncate">
                            {searchResult.matched_sub_service.offline_option || 'Available at nearest Seva Kendra'}
                          </p>
                        </div>
                      </div>

                      {/* Required Documents */}
                      {searchResult.matched_sub_service.documents_required && searchResult.matched_sub_service.documents_required.length > 0 && (
                        <div className="mb-4 p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 space-y-2">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200 flex items-center gap-1.5">
                            <FileText className="w-3.5 h-3.5 text-blue-600" />
                            <span>Documents Required:</span>
                          </p>
                          <div className="flex flex-wrap gap-1.5">
                            {searchResult.matched_sub_service.documents_required.map((doc, i) => (
                              <span
                                key={i}
                                className="text-xs px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 font-medium"
                              >
                                • {doc}
                              </span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Step-by-Step Procedure */}
                      {searchResult.matched_sub_service.step_summary && searchResult.matched_sub_service.step_summary.length > 0 && (
                        <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-amber-200/60 dark:border-slate-800 space-y-2.5 mb-4">
                          <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                            How to complete this procedure:
                          </p>
                          <div className="space-y-2">
                            {searchResult.matched_sub_service.step_summary.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                                <span className="w-5 h-5 rounded-full bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300 flex items-center justify-center flex-shrink-0 font-bold text-[11px]">
                                  {idx + 1}
                                </span>
                                <span className="leading-relaxed">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Important Instructions Note */}
                      {searchResult.matched_sub_service.important_notes && (
                        <div className="p-3 rounded-xl bg-amber-100/60 dark:bg-amber-950/40 border border-amber-300/40 text-xs text-amber-900 dark:text-amber-200 font-medium flex items-start gap-2">
                          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                          <span><strong>Important Note:</strong> {searchResult.matched_sub_service.important_notes}</span>
                        </div>
                      )}

                      {/* Direct Sub-Service Action URL */}
                      {searchResult.matched_sub_service.action_url && (
                        <div className="mt-4">
                          <a
                            href={searchResult.matched_sub_service.action_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md transition-all"
                          >
                            <span>Open Direct Portal for this Service</span>
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                      )}
                    </div>
                  )}

                  {/* 3. AVAILABLE SUB-SERVICES CARDS (Aadhaar, PAN, DL, etc.) */}
                  {searchResult.top_service.sub_services && searchResult.top_service.sub_services.length > 0 && (
                    <div className="p-6 sm:p-8 space-y-4">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                            All Available {searchResult.top_service.name.split('(')[0].trim()} Services
                          </h3>
                          <p className="text-xs text-slate-500 dark:text-slate-400">
                            Click any service to view required documents, official fees, and step-by-step methods.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {searchResult.top_service.sub_services.map((sub) => {
                          const isExpanded = expandedSubId === sub.id;
                          return (
                            <div
                              key={sub.id}
                              className={`rounded-2xl border transition-all text-left overflow-hidden ${
                                isExpanded
                                  ? 'border-blue-500 ring-2 ring-blue-500/10 bg-blue-50/20 dark:bg-slate-800/60'
                                  : 'border-slate-200 dark:border-slate-800 hover:border-blue-300 dark:hover:border-slate-700 bg-white dark:bg-slate-900'
                              }`}
                            >
                              <div
                                onClick={() => toggleSubService(sub.id)}
                                className="p-4 sm:p-5 cursor-pointer flex items-start justify-between gap-3"
                              >
                                <div className="space-y-1 min-w-0">
                                  <div className="flex flex-wrap items-center gap-1.5">
                                    <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/60 dark:border-blue-800/60">
                                      {sub.methods?.join(' & ') || 'Central'}
                                    </span>
                                    {sub.fee && (
                                      <span className="text-[10px] font-semibold px-2 py-0.5 rounded-md bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300">
                                        {sub.fee.split('(')[0].trim()}
                                      </span>
                                    )}
                                  </div>

                                  <h4 className="font-bold text-sm text-[#1B365D] dark:text-white line-clamp-1">
                                    {sub.title}
                                  </h4>

                                  <p className="text-xs text-slate-600 dark:text-slate-400 line-clamp-2">
                                    {sub.description}
                                  </p>
                                </div>

                                <button
                                  type="button"
                                  className="text-slate-400 hover:text-blue-600 p-1 rounded-lg"
                                  aria-label="Toggle details"
                                >
                                  {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                                </button>
                              </div>

                              {/* Expanded Detailed Sub-Service Info */}
                              {isExpanded && (
                                <div className="px-5 pb-5 pt-2 border-t border-slate-100 dark:border-slate-800/80 space-y-3 bg-white/60 dark:bg-slate-900/60 text-xs">
                                  {sub.fee && (
                                    <div>
                                      <span className="font-semibold text-slate-500">Official Fee: </span>
                                      <span className="font-bold text-emerald-700 dark:text-emerald-400">{sub.fee}</span>
                                    </div>
                                  )}

                                  {sub.offline_option && (
                                    <div>
                                      <span className="font-semibold text-slate-500">Offline / Kendra: </span>
                                      <span className="text-slate-700 dark:text-slate-300">{sub.offline_option}</span>
                                    </div>
                                  )}

                                  {sub.documents_required && sub.documents_required.length > 0 && (
                                    <div>
                                      <p className="font-semibold text-slate-500 mb-1">Required Documents:</p>
                                      <ul className="list-disc list-inside space-y-0.5 text-slate-700 dark:text-slate-300">
                                        {sub.documents_required.map((doc, idx) => (
                                          <li key={idx}>{doc}</li>
                                        ))}
                                      </ul>
                                    </div>
                                  )}

                                  {sub.step_summary && sub.step_summary.length > 0 && (
                                    <div>
                                      <p className="font-semibold text-slate-500 mb-1">Step-by-step Process:</p>
                                      <ol className="list-decimal list-inside space-y-1 text-slate-700 dark:text-slate-300">
                                        {sub.step_summary.map((st, idx) => (
                                          <li key={idx}>{st}</li>
                                        ))}
                                      </ol>
                                    </div>
                                  )}

                                  {sub.important_notes && (
                                    <div className="p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/40 text-amber-800 dark:text-amber-300 border border-amber-200/60 dark:border-amber-800/60">
                                      {sub.important_notes}
                                    </div>
                                  )}

                                  {sub.action_url && (
                                    <div className="pt-1">
                                      <a
                                        href={sub.action_url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-bold text-[11px] transition-colors"
                                      >
                                        <span>Proceed on Official Portal</span>
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                  )}
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}

                  {/* 4. OFFICIAL SERVICE REQUIREMENTS & APPLICATION PROCESS */}
                  <div className="p-6 sm:p-8 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/40 space-y-4">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      General Instructions & Verification Information
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <p className="font-bold text-slate-700 dark:text-slate-300">Application Mode & Processing</p>
                        <p className="text-slate-600 dark:text-slate-400">
                          Mode: <strong>{searchResult.top_service.application_mode}</strong>
                        </p>
                        <p className="text-slate-600 dark:text-slate-400">
                          Processing Information: {searchResult.top_service.processing_information || 'Standard Government Timelines'}
                        </p>
                      </div>

                      <div className="p-4 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-1.5">
                        <p className="font-bold text-slate-700 dark:text-slate-300">Eligibility & Scope</p>
                        <p className="text-slate-600 dark:text-slate-400">
                          {searchResult.top_service.eligibility || 'All citizens residing in India'}
                        </p>
                      </div>
                    </div>
                  </div>

                </div>

                {/* 5. OTHER MATCHING SERVICES */}
                {searchResult.matched_services.length > 1 && (
                  <div className="space-y-4 pt-4">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Other Relevant Government Services
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {searchResult.matched_services.slice(1, 5).map((service) => (
                        <div
                          key={service.id}
                          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 dark:hover:border-blue-500 shadow-sm transition-all text-left flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <div className="flex items-center justify-between gap-2 mb-1.5">
                              <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                                {service.jurisdiction_level}
                              </span>
                              {service.fee && (
                                <span className="text-[10px] text-slate-500 font-medium">
                                  {service.fee.split('(')[0].trim()}
                                </span>
                              )}
                            </div>

                            <h4 className="font-bold text-sm text-[#1B365D] dark:text-white line-clamp-1">
                              {service.name}
                            </h4>

                            <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">
                              {service.simple_description || service.description}
                            </p>
                          </div>

                          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
                            {service.official_website ? (
                              <a
                                href={service.official_website}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                              >
                                <span>Official Portal</span>
                                <ExternalLink className="w-3 h-3" />
                              </a>
                            ) : <span />}

                            <Link
                              to={`/services/${service.slug}`}
                              className="text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-blue-600 flex items-center gap-1"
                            >
                              <span>View Box</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            ) : (
              /* =========================================================================
                 CASE 2: FALLBACK - NO DIRECT SERVICE FOUND
                 (DO NOT REDIRECT TO AI SATHI - SHOW HELPFUL GUIDANCE & OPTIONAL BUTTON)
                 ========================================================================= */
              <div className="space-y-8">
                
                {/* Fallback Zero Results Card */}
                <div className="p-8 sm:p-12 text-center rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-sm space-y-4">
                  <div className="w-14 h-14 rounded-2xl bg-amber-50 dark:bg-amber-950/50 text-amber-600 dark:text-amber-400 flex items-center justify-center mx-auto border border-amber-200 dark:border-amber-800">
                    <AlertCircle className="w-7 h-7" />
                  </div>

                  <div className="space-y-1">
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      No matching government service found for "{searchResult.query}"
                    </h2>
                    <p className="text-xs sm:text-sm text-slate-500 max-w-lg mx-auto leading-relaxed">
                      We could not find an exact official government service matching this phrase in the directory. You can try related searches below or ask our conversational assistant.
                    </p>
                  </div>

                  {/* Optional Ask Sathi Chatbot Trigger Button */}
                  <div className="pt-2">
                    <Link
                      to={`/ai-saathi?q=${encodeURIComponent(searchResult.query)}`}
                      className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all"
                    >
                      <Sparkles className="w-4 h-4 text-amber-300" />
                      <span>Ask AI Saathi Chatbot for Conversational Help</span>
                    </Link>
                  </div>
                </div>

                {/* Suggested Related Searches */}
                {searchResult.suggested_queries && searchResult.suggested_queries.length > 0 && (
                  <div className="p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 space-y-3">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                      <Search className="w-4 h-4 text-blue-600" />
                      <span>Suggested Related Searches</span>
                    </h3>
                    <div className="flex flex-wrap gap-2">
                      {searchResult.suggested_queries.map((sug, idx) => (
                        <button
                          key={idx}
                          type="button"
                          onClick={() => handleSuggestionClick(sug)}
                          className="px-3.5 py-2 rounded-xl bg-slate-100 hover:bg-blue-50 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-700 dark:text-slate-200 hover:text-blue-600 dark:hover:text-blue-400 text-xs font-medium transition-colors border border-slate-200/60 dark:border-slate-700"
                        >
                          "{sug}"
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Popular Services Directory */}
                {searchResult.popular_services && searchResult.popular_services.length > 0 && (
                  <div className="space-y-4">
                    <h3 className="font-bold text-base text-slate-900 dark:text-white">
                      Popular Government Services
                    </h3>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                      {searchResult.popular_services.map((service) => (
                        <div
                          key={service.id}
                          className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 hover:border-blue-400 shadow-sm flex flex-col justify-between space-y-3"
                        >
                          <div>
                            <span className="text-[10px] font-bold text-emerald-700 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/40 px-2 py-0.5 rounded">
                              {service.jurisdiction_level}
                            </span>
                            <h4 className="font-bold text-sm text-[#1B365D] dark:text-white mt-2 line-clamp-1">
                              {service.name}
                            </h4>
                            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                              {service.simple_description || service.description}
                            </p>
                          </div>

                          <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <button
                              type="button"
                              onClick={() => handleSuggestionClick(service.name.split('(')[0].trim())}
                              className="text-xs font-bold text-blue-600 dark:text-blue-400 hover:underline"
                            >
                              Search Service
                            </button>
                            <Link
                              to={`/services/${service.slug}`}
                              className="text-xs font-medium text-slate-500 hover:text-slate-800 dark:hover:text-white"
                            >
                              Details →
                            </Link>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        )}

      </div>
    </div>
  );
};
