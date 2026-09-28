import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import {
  ExternalLink,
  ShieldCheck,
  Building,
  Phone,
  Banknote,
  Smartphone,
  Mail,
  Calendar,
  CheckCircle2,
  FileText,
  Clock,
  ArrowLeft,
  Share2,
  HelpCircle,
  AlertTriangle
} from 'lucide-react';
import { getServiceDetail } from '../lib/api';
import { GovernmentService } from '../types';
import { OfficialBadge } from '../components/OfficialBadge';
import { SaveButton } from '../components/SaveButton';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [service, setService] = useState<GovernmentService | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const loadDetail = async () => {
      if (!slug) return;
      setLoading(true);
      try {
        const data = await getServiceDetail(slug);
        setService(data);
      } catch (e) {
        console.error('Failed to load service detail', e);
      } finally {
        setLoading(false);
      }
    };
    loadDetail();
  }, [slug]);

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <p className="text-xs text-slate-500">Retrieving official service record...</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Service Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested government service could not be located or has not yet undergone official verification.
        </p>
        <Link to="/services" className="inline-flex px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
          Return to Services
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb & Share */}
      <div className="flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to All Services</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60"
          >
            <Share2 className="w-3.5 h-3.5" />
            <span>{copied ? 'Link Copied!' : 'Share'}</span>
          </button>
          <SaveButton serviceId={service.slug} />
        </div>
      </div>

      {/* Main Service Card Banner */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Verification & Jurisdiction Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {service.jurisdiction_level} JURISDICTION
            </span>
            <span className="text-xs font-semibold text-slate-500">
              {service.state}
            </span>
          </div>

          <OfficialBadge status={service.verification_status} lastVerified={service.last_verified_at} sourceUrl={service.official_source} />
        </div>

        {/* Name & Ministry */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {service.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            <Building className="w-4 h-4 text-slate-400 flex-shrink-0" />
            <span>{service.department}</span>
          </div>
        </div>

        {/* Simple Citizen Guidance Box */}
        <div className="rounded-2xl p-5 bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-100 space-y-1">
          <h4 className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            Why This Service?
          </h4>
          <p className="text-sm leading-relaxed font-normal">
            {service.simple_description || service.description}
          </p>
        </div>

        {/* Quick Facts Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Banknote className="w-4 h-4 text-emerald-600" />
              Verified Fee
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              {service.fee || 'Free of Cost'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-blue-600" />
              Official Helpline
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white font-mono">
              {service.official_helpline ? (
                <a href={`tel:${service.official_helpline}`} className="hover:underline text-blue-600 dark:text-blue-400">
                  {service.official_helpline}
                </a>
              ) : '1800-11-4000'}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-purple-600" />
              Application Mode
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              {service.application_mode}
            </div>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-4 flex flex-col sm:flex-row items-center gap-4">
          <a
            href={service.official_website}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-sm shadow-xl shadow-blue-600/20 hover:scale-[1.01] transition-all"
          >
            <span>Open Official Government Portal ({new URL(service.official_website).hostname})</span>
            <ExternalLink className="w-4 h-4" />
          </a>

          {service.official_app && (
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Also available on <span className="font-bold text-slate-700 dark:text-slate-300">{service.official_app}</span>
            </div>
          )}
        </div>

      </div>

      {/* Step by Step Instructions Section */}
      {service.steps && service.steps.length > 0 && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div>
            <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
              Process Roadmap
            </div>
            <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
              Step-by-Step Application Instructions
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
              Follow these verified steps on the official portal to complete your request without agents.
            </p>
          </div>

          <div className="space-y-4">
            {service.steps.map((step) => (
              <div
                key={step.step_number}
                className="flex items-start gap-4 p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60"
              >
                <div className="w-8 h-8 rounded-full bg-blue-600 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5 shadow-sm">
                  {step.step_number}
                </div>
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-bold text-sm text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    {step.estimated_time && (
                      <span className="text-[11px] font-medium text-slate-500 flex items-center gap-1">
                        <Clock className="w-3 h-3" /> {step.estimated_time}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents & Requirements Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Documents */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Required Documents
            </h3>
          </div>

          {service.documents && service.documents.length > 0 ? (
            <ul className="space-y-3">
              {service.documents.map((doc, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-700 dark:text-slate-300">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold">{doc.document_name}</span>
                    {doc.is_mandatory && (
                      <span className="ml-1.5 text-[10px] text-red-500 font-bold uppercase">(Mandatory)</span>
                    )}
                    {doc.description && (
                      <p className="text-[11px] text-slate-500 mt-0.5">{doc.description}</p>
                    )}
                  </div>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-xs text-slate-500">
              No specific physical documents required. Self-registration via Mobile OTP / Aadhaar authentication.
            </p>
          )}
        </div>

        {/* Eligibility & Requirements */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-base text-slate-900 dark:text-white">
              Who Is It For & Eligibility
            </h3>
          </div>

          <div className="space-y-3 text-xs text-slate-700 dark:text-slate-300">
            <div>
              <span className="font-bold text-slate-900 dark:text-white">Eligibility Criteria:</span>
              <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {service.eligibility || 'Any Indian resident citizen.'}
              </p>
            </div>

            <div>
              <span className="font-bold text-slate-900 dark:text-white">Turnaround / Processing Time:</span>
              <p className="mt-1 text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {service.processing_information || 'Varies based on administrative review.'}
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
