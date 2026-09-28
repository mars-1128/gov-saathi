import React, { useState, useEffect } from 'react';
import { Bookmark } from 'lucide-react';
import { saveService, removeSavedService, getSavedServices } from '../lib/api';
import { useAuth } from '../context/AuthContext';

interface SaveButtonProps {
  serviceId: string;
}

export const SaveButton: React.FC<SaveButtonProps> = ({ serviceId }) => {
  const { user } = useAuth();
  const [isSaved, setIsSaved] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // Check saved state from local storage or API
    const checkStatus = async () => {
      try {
        const saved = await getSavedServices(user?.id);
        const exists = saved.some((s: any) => s.service_id === serviceId || s.service?.slug === serviceId || s.service?.id === serviceId);
        setIsSaved(exists);
      } catch (e) {
        // Fallback to localStorage for guest
        const local = JSON.parse(localStorage.getItem('gov_saathi_saved') || '[]');
        setIsSaved(local.includes(serviceId));
      }
    };
    checkStatus();
  }, [serviceId, user]);

  const toggleSave = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setLoading(true);

    try {
      if (isSaved) {
        await removeSavedService(serviceId, user?.id);
        setIsSaved(false);
        const local = JSON.parse(localStorage.getItem('gov_saathi_saved') || '[]');
        localStorage.setItem('gov_saathi_saved', JSON.stringify(local.filter((id: string) => id !== serviceId)));
      } else {
        await saveService(serviceId, user?.id);
        setIsSaved(true);
        const local = JSON.parse(localStorage.getItem('gov_saathi_saved') || '[]');
        if (!local.includes(serviceId)) local.push(serviceId);
        localStorage.setItem('gov_saathi_saved', JSON.stringify(local));
      }
    } catch (e) {
      console.error('Error toggling save', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={toggleSave}
      disabled={loading}
      className={`p-2 rounded-xl border transition-all ${
        isSaved
          ? 'bg-amber-500/10 border-amber-500/40 text-amber-600 dark:text-amber-400'
          : 'bg-slate-100/80 dark:bg-slate-800/80 border-slate-200 dark:border-slate-700/60 text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
      }`}
      title={isSaved ? 'Remove from Saved' : 'Save Service'}
    >
      <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-amber-500 text-amber-500' : ''}`} />
    </button>
  );
};
