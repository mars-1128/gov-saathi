import React, { useEffect, useState } from 'react';
import { FileText, ExternalLink, ShieldCheck, Download, CheckCircle2, RefreshCw } from 'lucide-react';
import { getDigitalDocuments } from '../lib/api';
import { DigitalDocument } from '../types';

export const DocumentsPage: React.FC = () => {
  const [documents, setDocuments] = useState<DigitalDocument[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getDigitalDocuments()
      .then(setDocuments)
      .finally(() => setLoading(false));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600 dark:text-blue-400">
          <FileText className="w-4 h-4" />
          <span>Legally Valid Digital Records</span>
        </div>
        <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-slate-900 dark:text-white mt-1">
          DigiLocker & Official Document Services
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-2xl leading-relaxed">
          Access authentic, digitally signed government documents issued directly from CBSE, state education boards, MoRTH, and Income Tax Department. Legally valid under Rule 9A of IT Rules 2016.
        </p>
      </div>

      {/* DigiLocker How It Works Card */}
      <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-900 to-slate-900 text-white p-6 sm:p-8 shadow-xl space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center text-white">
              <Download className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bold text-lg sm:text-xl">
                DigiLocker — National Document Wallet
              </h3>
              <p className="text-xs text-blue-200">
                Ministry of Electronics and Information Technology (MeitY)
              </p>
            </div>
          </div>

          <a
            href="https://www.digilocker.gov.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white text-slate-900 font-bold text-xs shadow-md hover:bg-slate-100 transition-colors"
          >
            <span>Open DigiLocker Web Portal</span>
            <ExternalLink className="w-4 h-4 text-blue-700" />
          </a>
        </div>

        {/* 3 Step Instruction Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mb-1">
              1
            </div>
            <h4 className="font-bold text-sm">Sign in with Aadhaar OTP</h4>
            <p className="text-xs text-blue-200 font-normal">
              Authenticate using your 12-digit Aadhaar number and secure 6-digit security PIN.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mb-1">
              2
            </div>
            <h4 className="font-bold text-sm">Search Document Issuer</h4>
            <p className="text-xs text-blue-200 font-normal">
              Select your Education Board, Ministry of Road Transport, or Income Tax Department.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-white/10 border border-white/10 space-y-1">
            <div className="w-6 h-6 rounded-full bg-blue-500 text-white font-bold text-xs flex items-center justify-center mb-1">
              3
            </div>
            <h4 className="font-bold text-sm">Download Verified PDF</h4>
            <p className="text-xs text-blue-200 font-normal">
              Instant digital copy with authentic QR code legally accepted by Traffic Police and Universities.
            </p>
          </div>
        </div>
      </div>

      {/* Supported Documents Table / Grid */}
      <div className="space-y-4">
        <h3 className="font-bold text-lg text-slate-900 dark:text-white">
          Verified Supported Documents & Issuers
        </h3>

        {loading ? (
          <div className="p-12 text-center">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading document catalog...</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {documents.map((doc, idx) => (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-col justify-between hover:border-blue-500/50 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
                      Authentic Digital
                    </span>
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                  </div>

                  <h4 className="font-bold text-base text-slate-900 dark:text-white">
                    {doc.document}
                  </h4>
                  <div className="text-xs text-slate-500 font-medium mt-1">
                    Issuer: {doc.issuer}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-2 font-normal">
                    {doc.format}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                  <a
                    href="https://www.digilocker.gov.in/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
                  >
                    <span>Download on DigiLocker</span>
                    <ExternalLink className="w-3 h-3" />
                  </a>
                </div>

              </div>
            ))}
          </div>
        )}
      </div>

    </div>
  );
};
