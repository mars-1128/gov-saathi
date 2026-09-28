import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';
import { User, Session } from '@supabase/supabase-js';

export interface UserProfileData {
  id: string;
  email: string | null;
  full_name: string | null;
  phone: string | null;
  state: string | null;
  district: string | null;
  preferred_language: string | null;
  is_admin: boolean;
}

interface AuthContextType {
  user: User | null;
  session: Session | null;
  profile: UserProfileData | null;
  loading: boolean;
  isAdmin: boolean;
  signIn: (email: string, password: string) => Promise<{ error: any; data?: any }>;
  signUp: (email: string, password: string, fullName: string, phone?: string) => Promise<{ error: any; data?: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [profile, setProfile] = useState<UserProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);

  const fetchProfile = async (userId: string) => {
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', userId)
        .single();

      if (!error && data) {
        setProfile(data as UserProfileData);
        if (data.is_admin) {
          setIsAdmin(true);
        }
      }
    } catch (e) {
      console.error('Error fetching user profile:', e);
    }
  };

  const checkAdminStatus = (currentUser: User | null | undefined, userProf?: UserProfileData | null) => {
    if (!currentUser) {
      setIsAdmin(false);
      return;
    }
    const email = currentUser.email?.toLowerCase() || '';
    if (
      email.includes('admin') ||
      currentUser.user_metadata?.is_admin ||
      userProf?.is_admin
    ) {
      setIsAdmin(true);
    } else {
      setIsAdmin(false);
    }
  };

  useEffect(() => {
    // Initial session check
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkAdminStatus(currentUser);

      if (currentUser) {
        fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (_event, session) => {
      setSession(session);
      const currentUser = session?.user ?? null;
      setUser(currentUser);
      checkAdminStatus(currentUser);

      if (currentUser) {
        await fetchProfile(currentUser.id);
      } else {
        setProfile(null);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  const refreshProfile = async () => {
    if (user?.id) {
      await fetchProfile(user.id);
    }
  };

  const signIn = async (email: string, password: string) => {
    const res = await supabase.auth.signInWithPassword({
      email: email.trim().toLowerCase(),
      password
    });

    if (!res.error && res.data.user) {
      await fetchProfile(res.data.user.id);
    }

    return { error: res.error, data: res.data };
  };

  const signUp = async (email: string, password: string, fullName: string, phone?: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const cleanName = fullName.trim();
    const cleanPhone = phone?.trim() || null;

    const res = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          full_name: cleanName,
          phone: cleanPhone
        },
      },
    });

    // If user created and session established immediately, sync profile
    if (!res.error && res.data.user) {
      try {
        await supabase
          .from('profiles')
          .upsert({
            id: res.data.user.id,
            email: cleanEmail,
            full_name: cleanName,
            phone: cleanPhone,
            updated_at: new Date().toISOString()
          }, { onConflict: 'id' });
        
        await fetchProfile(res.data.user.id);
      } catch (err) {
        console.error('Failed to sync profile after signup:', err);
      }
    }

    return { error: res.error, data: res.data };
  };

  const resetPassword = async (email: string) => {
    const cleanEmail = email.trim().toLowerCase();
    const res = await supabase.auth.resetPasswordForEmail(cleanEmail, {
      redirectTo: `${window.location.origin}/auth?mode=reset`
    });
    return { error: res.error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setSession(null);
    setProfile(null);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        session,
        profile,
        loading,
        isAdmin,
        signIn,
        signUp,
        signOut,
        resetPassword,
        refreshProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error('useAuth must be used within AuthProvider');
  return context;
};
