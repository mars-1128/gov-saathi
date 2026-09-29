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
  AlertTriangle,
  Copy,
  Check,
  ShieldAlert,
  Info,
  CheckSquare,
  Compass,
  FileCheck,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import { getServiceDetail } from '../lib/api';
import { GovernmentService } from '../types';
import { OfficialBadge } from '../components/OfficialBadge';
import { SaveButton } from '../components/SaveButton';
import { useLanguage } from '../context/LanguageContext';

export const ServiceDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useLanguage();
  const [service, setService] = useState<GovernmentService | null>(null);
  const [loading, setLoading] = useState(true);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedPhone, setCopiedPhone] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

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
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const handleCopyPhone = (phone: string) => {
    navigator.clipboard.writeText(phone);
    setCopiedPhone(true);
    setTimeout(() => setCopiedPhone(false), 2000);
  };

  const handleCopyEmail = (email: string) => {
    navigator.clipboard.writeText(email);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2000);
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-24 text-center">
        <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h3 className="text-base font-bold text-slate-800 dark:text-slate-200">Retrieving Official Government Record...</h3>
        <p className="text-xs text-slate-500 mt-1">Verifying gazetted information against .gov.in & .nic.in directories.</p>
      </div>
    );
  }

  if (!service) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-20 text-center space-y-4">
        <AlertTriangle className="w-12 h-12 text-amber-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Service Record Not Found</h2>
        <p className="text-xs text-slate-500">
          The requested government service could not be located or has not yet completed official verification audit.
        </p>
        <Link to="/services" className="inline-flex px-5 py-2.5 rounded-xl bg-blue-600 text-white text-xs font-semibold shadow hover:bg-blue-700 transition">
          Return to All Services
        </Link>
      </div>
    );
  }

  const hostname = (() => {
    try {
      return new URL(service.official_website).hostname;
    } catch {
      return service.official_website;
    }
  })();

  const mandatoryDocs = service.documents?.filter(d => d.is_mandatory) || [];
  const optionalDocs = service.documents?.filter(d => !d.is_mandatory) || [];

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Top Breadcrumb & Share Actions */}
      <div className="flex items-center justify-between">
        <Link
          to="/services"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{t('back_to_services')}</span>
        </Link>

        <div className="flex items-center gap-2">
          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-200 dark:border-slate-800 text-xs font-medium text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800/60 transition"
          >
            {copiedLink ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <Share2 className="w-3.5 h-3.5" />}
            <span>{copiedLink ? t('link_copied') : t('share_service')}</span>
          </button>
          <SaveButton serviceId={service.slug} />
        </div>
      </div>

      {/* Main Service Card Banner */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6">
        
        {/* Verification & Jurisdiction Header */}
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              {service.jurisdiction_level} {t('jurisdiction_header')}
            </span>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              📍 {service.state}
            </span>
            {service.category_name && (
              <span className="text-xs font-medium px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
                {service.category_name}
              </span>
            )}
          </div>

          <OfficialBadge status={service.verification_status} lastVerified={service.last_verified_at} sourceUrl={service.official_source} />
        </div>

        {/* Title & Ministry */}
        <div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            {service.name}
          </h1>
          <div className="flex items-center gap-2 mt-2 text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-medium">
            <Building className="w-4 h-4 text-blue-600 flex-shrink-0" />
            <span>{service.department}</span>
          </div>
        </div>

        {/* Citizen Quick Explanation: Why & When To Use */}
        <div className="rounded-2xl p-5 bg-gradient-to-r from-blue-50/90 to-indigo-50/70 dark:from-blue-950/40 dark:to-indigo-950/30 border border-blue-200 dark:border-blue-900/60 text-blue-950 dark:text-blue-100 space-y-2">
          <div className="flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-400">
            <Sparkles className="w-4 h-4 text-blue-600" />
            <span>{t('simple_words_when')}</span>
          </div>
          <p className="text-sm sm:text-base leading-relaxed font-normal text-slate-800 dark:text-slate-200">
            {service.simple_description || service.description}
          </p>
        </div>

        {/* Quick Facts Matrix */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4 pt-1">
          {/* Fee */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Banknote className="w-4 h-4 text-emerald-600" />
              {t('verified_fee')}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              {service.fee || t('free_of_cost')}
            </div>
          </div>

          {/* Official Helpline */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Phone className="w-4 h-4 text-blue-600" />
              {t('official_helpline')}
            </div>
            <div className="mt-1 flex items-center gap-1 text-sm font-bold font-mono text-blue-600 dark:text-blue-400">
              <a href={`tel:${service.official_helpline || '1800-11-4000'}`} className="hover:underline">
                {service.official_helpline || '1800-11-4000'}
              </a>
              {service.official_helpline && (
                <button
                  onClick={() => handleCopyPhone(service.official_helpline!)}
                  title="Copy helpline number"
                  className="p-1 hover:bg-slate-200 dark:hover:bg-slate-700 rounded transition"
                >
                  {copiedPhone ? <Check className="w-3 h-3 text-emerald-600" /> : <Copy className="w-3 h-3 text-slate-400" />}
                </button>
              )}
            </div>
          </div>

          {/* Application Mode */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Smartphone className="w-4 h-4 text-purple-600" />
              {t('application_mode')}
            </div>
            <div className="mt-1 text-sm font-bold text-slate-900 dark:text-white">
              {service.application_mode}
            </div>
          </div>

          {/* Turnaround Time */}
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200/60 dark:border-slate-800/60">
            <div className="text-[11px] text-slate-500 dark:text-slate-400 font-medium flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-amber-600" />
              {t('processing_time')}
            </div>
            <div className="mt-1 text-xs font-bold text-slate-900 dark:text-white line-clamp-2">
              {service.processing_information || '3 - 15 Working Days'}
            </div>
          </div>
        </div>

        {/* Official Direct Touchpoints Action Deck */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-4">
          <div className="text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
            {t('official_touchpoints')}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            {/* Primary Portal Action */}
            <a
              href={service.official_website}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-4 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-600 to-blue-800 hover:from-blue-800 hover:to-indigo-700 text-white font-bold text-sm shadow-lg shadow-blue-600/20 hover:scale-[1.01] transition-all"
            >
              <span>{t('open_official_portal_with_host')} ({hostname})</span>
              <ExternalLink className="w-4 h-4" />
            </a>

            {/* Helpline Click-to-Call */}
            {service.official_helpline && (
              <a
                href={`tel:${service.official_helpline}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold text-xs text-slate-800 dark:text-slate-200 transition"
              >
                <Phone className="w-4 h-4 text-blue-600" />
                <span>{t('call_helpline')} {service.official_helpline}</span>
              </a>
            )}

            {/* Email Support */}
            {service.official_email && (
              <button
                onClick={() => handleCopyEmail(service.official_email!)}
                className="inline-flex items-center justify-center gap-2 px-4 py-4 rounded-2xl border border-slate-200 dark:border-slate-800 hover:bg-slate-50 dark:hover:bg-slate-800/60 font-semibold text-xs text-slate-800 dark:text-slate-200 transition"
              >
                <Mail className="w-4 h-4 text-indigo-600" />
                <span>{copiedEmail ? t('email_copied') : service.official_email}</span>
              </button>
            )}
          </div>

          {service.official_app && (
            <div className="flex items-center gap-2 text-xs text-slate-600 dark:text-slate-400 bg-slate-50 dark:bg-slate-800/40 p-3 rounded-xl border border-slate-200/60 dark:border-slate-800/60">
              <Smartphone className="w-4 h-4 text-purple-600 flex-shrink-0" />
              <span>
                Official Mobile Application: <strong className="text-slate-900 dark:text-white">{service.official_app}</strong> (Available on Google Play & Apple App Store)
              </span>
            </div>
          )}
        </div>

      </div>

      {/* Preparation Checklist: What to Prepare Before Starting */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-4">
        <div className="flex items-center gap-2">
          <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
          <h2 className="text-lg sm:text-xl font-bold text-slate-900 dark:text-white">
            {t('preparation_checklist')}
          </h2>
        </div>
        <p className="text-xs text-slate-500 dark:text-slate-400">
          Gather these simple details before opening the government portal to complete your application smoothly in one go.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2">
          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="block text-slate-900 dark:text-white">Active Mobile Phone for OTP</strong>
              Ensure the mobile number linked with your Aadhaar is switched on and ready to receive SMS verification codes.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="block text-slate-900 dark:text-white">Digital / Scanned Copies Under 2MB</strong>
              Keep clear photographs or PDF scans of required documents (Aadhaar, address proof, or previous receipt) ready on your device.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="block text-slate-900 dark:text-white">Exact Demographic Spelling</strong>
              Ensure your name, father's name, and date of birth in application forms match your Aadhaar card letter-by-letter.
            </div>
          </div>

          <div className="flex items-start gap-3 p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
            <div className="text-xs text-slate-700 dark:text-slate-300">
              <strong className="block text-slate-900 dark:text-white">No Middleman Required</strong>
              This service is directly available to citizens. You do not need to pay unauthorized internet café brokers or agents.
            </div>
          </div>
        </div>
      </div>

      {/* Step by Step Practical Walkthrough */}
      {service.steps && service.steps.length > 0 && (
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <div>
              <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
                Action Roadmap
              </div>
              <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
                {t('application_roadmap')}
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                Follow these verified steps on the official portal to complete your request without confusion.
              </p>
            </div>
            <span className="text-xs font-semibold px-3 py-1 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800 w-fit">
              {service.steps.length} Simple Steps
            </span>
          </div>

          <div className="space-y-4">
            {service.steps.map((step) => (
              <div
                key={step.step_number}
                className="flex items-start gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 hover:border-blue-300 dark:hover:border-blue-800 transition"
              >
                <div className="w-9 h-9 rounded-2xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white font-bold text-sm flex items-center justify-center flex-shrink-0 mt-0.5 shadow-md shadow-blue-600/20">
                  {step.step_number}
                </div>
                <div className="flex-1 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h3 className="font-bold text-sm sm:text-base text-slate-900 dark:text-white">
                      {step.title}
                    </h3>
                    {step.estimated_time && (
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 flex items-center gap-1 bg-white dark:bg-slate-800 px-2.5 py-1 rounded-full border border-slate-200/60 dark:border-slate-700">
                        <Clock className="w-3 h-3 text-blue-500" /> {step.estimated_time}
                      </span>
                    )}
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-normal">
                    {step.description}
                  </p>
                  {step.action_url && (
                    <div className="pt-1">
                      <a
                        href={step.action_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
                      >
                        <span>Direct Action Link</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Documents & Eligibility Breakdown */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        
        {/* Required Documents with Smart Breakdown */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <FileText className="w-5 h-5 text-indigo-600 dark:text-indigo-400" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {t('mandatory_documents')}
            </h3>
          </div>

          {service.documents && service.documents.length > 0 ? (
            <div className="space-y-4">
              {mandatoryDocs.length > 0 && (
                <div className="space-y-2.5">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-rose-600 dark:text-rose-400 flex items-center gap-1">
                    <span>{t('mandatory_documents')}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {mandatoryDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-rose-50/60 dark:bg-rose-950/20 border border-rose-200/60 dark:border-rose-900/40 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-rose-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white">{doc.document_name}</span>
                          {doc.description && (
                            <p className="text-[11px] text-slate-600 dark:text-slate-400 mt-0.5">{doc.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {optionalDocs.length > 0 && (
                <div className="space-y-2.5 pt-2">
                  <div className="text-[11px] font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400 flex items-center gap-1">
                    <span>{t('optional_documents')}</span>
                  </div>
                  <ul className="space-y-2.5">
                    {optionalDocs.map((doc, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 text-xs">
                        <CheckCircle2 className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
                        <div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">{doc.document_name}</span>
                          {doc.description && (
                            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">{doc.description}</p>
                          )}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/50 text-emerald-900 dark:text-emerald-200 text-xs space-y-1">
              <strong className="block font-bold">No Physical Paper Documents Required!</strong>
              <p className="text-[11px] leading-relaxed">
                This service operates 100% paperless through Aadhaar e-KYC or online self-declaration.
              </p>
            </div>
          )}
        </div>

        {/* Eligibility & Who Can Apply */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            <h3 className="font-bold text-base sm:text-lg text-slate-900 dark:text-white">
              {t('who_is_eligible')}
            </h3>
          </div>

          <div className="space-y-4 text-xs">
            <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
              <span className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                <Info className="w-4 h-4 text-blue-600" />
                {t('citizen_eligibility')}:
              </span>
              <p className="text-slate-600 dark:text-slate-400 leading-relaxed font-normal">
                {service.eligibility || 'Any Indian resident citizen meeting basic age and demographic criteria.'}
              </p>
            </div>

            {service.requirements && service.requirements.length > 0 && (
              <div className="space-y-2">
                <span className="font-bold text-slate-900 dark:text-white text-xs">{t('important_conditions')}:</span>
                <ul className="space-y-2">
                  {service.requirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-slate-700 dark:text-slate-300">
                      <span className="w-1.5 h-1.5 rounded-full bg-blue-600 mt-1.5 flex-shrink-0" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            <div className="p-4 rounded-2xl bg-amber-50/70 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 text-amber-900 dark:text-amber-200 space-y-1">
              <strong className="block font-bold">{t('jurisdiction_notice')}</strong>
              <p className="text-[11px] leading-relaxed">
                This is a <strong className="uppercase">{service.jurisdiction_level}</strong> level government facility. Grievances and applications are officially routed under <strong className="capitalize">{service.state}</strong> administrative authorities.
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* What Happens Next: Timeline & Escalation */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 p-6 sm:p-8 shadow-sm space-y-5">
        <div>
          <div className="text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
            Timeline & Follow-up
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-slate-900 dark:text-white mt-1">
            {t('what_happens_next')}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            {t('timeline_sub')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Stage 1: Instant</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">SMS Acknowledgment</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              You receive an official Reference/Docket ID via SMS and email immediately upon form submission.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
            <span className="text-xs font-bold text-indigo-600 dark:text-indigo-400">Stage 2: 24 - 48 Hours</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Officer Assignment</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The application is electronically routed to your designated ward, district officer, or nodal desk.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
            <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">Stage 3: 3 - 30 Days</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Action & Resolution</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              The service is delivered: document issued, defect repaired with photo proof, or grievance reply submitted.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800/60 space-y-1.5">
            <span className="text-xs font-bold text-amber-600 dark:text-amber-400">Stage 4: If Delayed</span>
            <h4 className="font-bold text-sm text-slate-900 dark:text-white">Appellate Escalation</h4>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              If dissatisfied or past deadline, you can file a First Appeal or call the official toll-free helpline.
            </p>
          </div>
        </div>
      </div>

      {/* Tips to Avoid Rejection */}
      {service.tips && service.tips.length > 0 && (
        <div className="rounded-3xl bg-amber-50/50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-900/40 p-6 sm:p-8 space-y-4">
          <div className="flex items-center gap-2 text-amber-900 dark:text-amber-300">
            <Compass className="w-5 h-5 text-amber-600" />
            <h3 className="font-bold text-base sm:text-lg">
              {t('tips_to_avoid_rejection')}
            </h3>
          </div>
          <ul className="space-y-2.5">
            {service.tips.map((tip, idx) => (
              <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-sm text-amber-950 dark:text-amber-200">
                <Check className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
                <span>{tip}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Citizen Safety & Anti-Fraud Guarantee Banner */}
      <div className="rounded-3xl p-6 bg-slate-900 text-white dark:bg-slate-950 border border-slate-800 space-y-3">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
          <ShieldAlert className="w-4 h-4 text-emerald-400" />
          <span>{t('anti_fraud_notice')}</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-1 text-xs text-slate-300">
          <div>
            <strong className="block text-white mb-0.5">🔒 Always Check .gov.in Domain</strong>
            Genuine government portals end strictly in <code>.gov.in</code> or <code>.nic.in</code>. Beware of fake <code>.com</code> or <code>.org</code> clones.
          </div>
          <div>
            <strong className="block text-white mb-0.5">🚫 Never Share UPI PIN or OTP</strong>
            Government officers will NEVER ask you for bank OTPs, UPI PINs, or remote screen-sharing software (AnyDesk, TeamViewer).
          </div>
          <div>
            <strong className="block text-white mb-0.5">💰 Zero Middleman Fees</strong>
            All official fees are fixed and paid directly through secure government payment gateways (SBI ePay, Bharatkosh).
          </div>
        </div>
      </div>

    </div>
  );
};

