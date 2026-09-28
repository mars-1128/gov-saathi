import React, { useEffect, useState } from 'react';
import { ShieldCheck, AlertTriangle, CheckCircle, RefreshCw, Plus, Edit3, Eye, Lock } from 'lucide-react';
import { getServices } from '../lib/api';
import { GovernmentService, VerificationStatus } from '../types';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

export const AdminPage: React.FC = () => {
  const { user, isAdmin } = useAuth();
  const [services, setServices] = useState<GovernmentService[]>([]);
  const [loading, setLoading] = useState(true);
  const [statusMessage, setStatusMessage] = useState('');

  const loadData = async () => {
    setLoading(true);
    try {
      const data = await getServices();
      setServices(data);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleUpdateStatus = async (serviceId: string, newStatus: VerificationStatus) => {
    try {
      const res = await fetch('/api/admin/verify-service', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          serviceId,
          status: newStatus,
          notes: `Updated by admin ${user?.email || 'admin'} on ${new Date().toISOString()}`
        })
      });
      const data = await res.json();
      if (data.success) {
        setStatusMessage(`Successfully set ${serviceId} to ${newStatus}`);
        setServices(prev => prev.map(s => s.id === serviceId || s.slug === serviceId ? { ...s, verification_status: newStatus } : s));
        setTimeout(() => setStatusMessage(''), 3000);
      }
    } catch (e) {
      console.error(e);
    }
  };

  // If user is not admin, show security access denied screen
  if (!isAdmin && user && !user.email?.includes('admin')) {
    return (
      <div className="max-w-md mx-auto px-4 py-24 text-center space-y-4">
        <Lock className="w-12 h-12 text-red-500 mx-auto" />
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Admin Access Restricted</h2>
        <p className="text-xs text-slate-500 leading-relaxed">
          Your account ({user.email}) does not have administrative verification privileges. Only authorized government verification officers can access this dashboard.
        </p>
        <Link to="/" className="inline-flex px-4 py-2 rounded-xl bg-blue-600 text-white text-xs font-semibold">
          Return to Citizen Portal
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-6 rounded-3xl bg-slate-900 text-white shadow-xl">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400">
            <ShieldCheck className="w-4 h-4" />
            <span>Gov Saathi Administrative Verification Console</span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold mt-1">
            Service Records & Official Audit Manager
          </h1>
          <p className="text-xs text-slate-400 mt-0.5">
            Audit government portals, update verification stamps, and flag outdated departmental URLs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs px-3 py-1.5 rounded-xl bg-slate-800 text-slate-300 border border-slate-700 font-mono">
            Admin: {user?.email || 'Demo Admin Mode'}
          </span>
        </div>
      </div>

      {statusMessage && (
        <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-800 text-xs text-emerald-800 dark:text-emerald-200 flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-500" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Services Audit Table */}
      <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 shadow-sm overflow-hidden">
        <div className="p-6 border-b border-slate-100 dark:border-slate-800 flex items-center justify-between">
          <h3 className="font-bold text-base text-slate-900 dark:text-white">
            Active Government Service Records ({services.length})
          </h3>
          <span className="text-xs text-slate-500">
            Audit Frequency: Bi-weekly Gazetted Check
          </span>
        </div>

        {loading ? (
          <div className="p-16 text-center">
            <RefreshCw className="w-8 h-8 text-blue-600 animate-spin mx-auto mb-2" />
            <p className="text-xs text-slate-500">Loading audit records...</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-500 uppercase tracking-wider font-semibold border-b border-slate-100 dark:border-slate-800">
                <tr>
                  <th className="py-3.5 px-6">Service Name</th>
                  <th className="py-3.5 px-6">Jurisdiction</th>
                  <th className="py-3.5 px-6">Department</th>
                  <th className="py-3.5 px-6">Status</th>
                  <th className="py-3.5 px-6">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {services.map((s) => (
                  <tr key={s.id} className="hover:bg-slate-50/50 dark:hover:bg-slate-800/40">
                    <td className="py-4 px-6 font-semibold text-slate-900 dark:text-white max-w-xs">
                      <div>{s.name}</div>
                      <div className="text-[11px] text-slate-400 font-mono mt-0.5">{s.official_website}</div>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300">
                      <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-slate-800 font-mono text-[10px]">
                        {s.jurisdiction_level}
                      </span>
                    </td>
                    <td className="py-4 px-6 text-slate-600 dark:text-slate-300 max-w-xs truncate">
                      {s.department}
                    </td>
                    <td className="py-4 px-6">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full font-semibold text-[10px] ${
                        s.verification_status === 'VERIFIED'
                          ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                          : s.verification_status === 'NEEDS_REVIEW'
                          ? 'bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300'
                          : 'bg-red-100 text-red-800 dark:bg-red-950 dark:text-red-300'
                      }`}>
                        {s.verification_status}
                      </span>
                    </td>
                    <td className="py-4 px-6">
                      <div className="flex items-center gap-2">
                        <select
                          value={s.verification_status}
                          onChange={(e) => handleUpdateStatus(s.slug, e.target.value as VerificationStatus)}
                          className="p-1 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 text-[11px]"
                        >
                          <option value="VERIFIED">VERIFIED</option>
                          <option value="NEEDS_REVIEW">NEEDS_REVIEW</option>
                          <option value="OUTDATED">OUTDATED</option>
                          <option value="DISABLED">DISABLED</option>
                        </select>
                        <Link
                          to={`/services/${s.slug}`}
                          className="p-1.5 rounded-lg text-slate-400 hover:text-blue-600"
                          title="View Live Page"
                        >
                          <Eye className="w-4 h-4" />
                        </Link>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

      </div>

    </div>
  );
};
