import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import {
  Shield,
  Lock,
  Mail,
  User,
  Phone,
  Eye,
  EyeOff,
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ArrowLeft,
  KeyRound,
  Check
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import {
  validateFullName,
  validateEmail,
  validateIndianMobile,
  checkPasswordRules,
  signUpSchema,
  signInSchema,
  forgotPasswordSchema,
  getFriendlyAuthErrorMessage
} from '../lib/validation';

export const AuthPage: React.FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialMode = searchParams.get('mode') === 'signup' ? 'signup' : 'signin';
  
  const [mode, setMode] = useState<'signin' | 'signup' | 'forgot'>(initialMode);
  
  // Form fields
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Field touched states (for real-time blur validation)
  const [touched, setTouched] = useState<{ [key: string]: boolean }>({});

  // Feedback states
  const [toastError, setToastError] = useState<string | null>(null);
  const [toastSuccess, setToastSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const { signIn, signUp, resetPassword, user } = useAuth();
  const navigate = useNavigate();

  // If user is already authenticated, redirect to /profile
  useEffect(() => {
    if (user && mode !== 'forgot') {
      navigate('/profile');
    }
  }, [user, navigate, mode]);

  // Sync mode with URL search params
  useEffect(() => {
    const urlMode = searchParams.get('mode');
    if (urlMode === 'signup') {
      setMode('signup');
    } else if (urlMode === 'forgot' || urlMode === 'reset') {
      setMode('forgot');
    } else {
      setMode('signin');
    }
  }, [searchParams]);

  const switchMode = (newMode: 'signin' | 'signup' | 'forgot') => {
    setMode(newMode);
    setToastError(null);
    setToastSuccess(null);
    setTouched({});
    setSearchParams(newMode === 'signin' ? {} : { mode: newMode });
  };

  const markTouched = (field: string) => {
    setTouched(prev => ({ ...prev, [field]: true }));
  };

  // Real-time field validation results
  const nameValidation = validateFullName(fullName);
  const emailValidation = validateEmail(email);
  const mobileValidation = validateIndianMobile(phone, true);
  const passwordRules = checkPasswordRules(password);
  const passwordsMatch = password.length > 0 && password === confirmPassword;

  // Sign In Handler
  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setToastError(null);
    setToastSuccess(null);

    const validation = signInSchema.validate({ email, password });
    if (!validation.isValid) {
      setToastError(validation.error || 'Please check your inputs.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await signIn(email, password);
      if (error) {
        setToastError(getFriendlyAuthErrorMessage(error));
      } else {
        navigate('/profile');
      }
    } catch (err: any) {
      setToastError('Unable to connect. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Sign Up Handler
  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setToastError(null);
    setToastSuccess(null);

    // Mark all as touched to trigger any field errors
    setTouched({
      fullName: true,
      email: true,
      phone: true,
      password: true,
      confirmPassword: true
    });

    const validation = signUpSchema.validate({
      fullName,
      email,
      phone,
      password,
      confirmPassword
    });

    if (!validation.isValid) {
      setToastError(validation.error || 'Please fill in all required fields correctly.');
      return;
    }

    setLoading(true);
    try {
      const { error, data } = await signUp(
        validation.data!.email,
        validation.data!.password,
        validation.data!.fullName,
        validation.data!.phone || undefined
      );

      if (error) {
        setToastError(getFriendlyAuthErrorMessage(error));
      } else {
        // If email confirmation is required by Supabase
        if (data?.user && !data?.session) {
          setToastSuccess('Account created! A confirmation link has been sent to your email. Please verify your email before logging in.');
          setMode('signin');
        } else {
          setToastSuccess('Account created successfully! Welcome to Gov Saathi.');
          setTimeout(() => navigate('/profile'), 1000);
        }
      }
    } catch (err: any) {
      setToastError('Unable to connect. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Forgot Password Handler
  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setToastError(null);
    setToastSuccess(null);

    const validation = forgotPasswordSchema.validate({ email });
    if (!validation.isValid) {
      setToastError(validation.error || 'Please enter a valid email address.');
      return;
    }

    setLoading(true);
    try {
      const { error } = await resetPassword(validation.data!.email);
      if (error) {
        setToastError(getFriendlyAuthErrorMessage(error));
      } else {
        setToastSuccess('Password reset instructions have been sent to your email. Please check your inbox and spam folders.');
      }
    } catch (err: any) {
      setToastError('Unable to connect. Please check your internet connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  // Password Strength Bar Color
  const getStrengthBarColor = () => {
    switch (passwordRules.score) {
      case 1:
        return 'bg-red-500 w-1/4';
      case 2:
        return 'bg-amber-500 w-2/4';
      case 3:
        return 'bg-blue-500 w-3/4';
      case 4:
        return 'bg-emerald-500 w-full';
      default:
        return 'bg-slate-200 w-0';
    }
  };

  const getStrengthTextColor = () => {
    switch (passwordRules.score) {
      case 1:
        return 'text-red-600';
      case 2:
        return 'text-amber-600';
      case 3:
        return 'text-blue-600';
      case 4:
        return 'text-emerald-600';
      default:
        return 'text-slate-400';
    }
  };

  return (
    <div className="min-h-[82vh] flex items-center justify-center px-4 py-12 bg-slate-50/60 dark:bg-slate-950">
      <div className="w-full max-w-md">
        
        {/* Main Card Container */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 p-6 sm:p-8 shadow-xl shadow-blue-900/5 space-y-6">
          
          {/* Top Brand Header */}
          <div className="text-center space-y-2">
            <Link to="/" className="inline-flex items-center gap-2.5 group mb-1">
              <div className="w-11 h-11 rounded-2xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-amber-500 p-0.5 shadow-md shadow-blue-500/10 group-hover:scale-105 transition-transform flex-shrink-0">
                <div className="w-full h-full bg-white dark:bg-slate-900 rounded-[14px] flex items-center justify-center">
                  <Shield className="w-6 h-6 text-blue-700 dark:text-blue-400 group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <div className="text-left">
                <div className="flex items-center gap-1.5">
                  <span className="font-extrabold text-xl tracking-tight text-slate-900 dark:text-white">
                    GOV SAATHI
                  </span>
                  <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.5 rounded bg-amber-500/15 text-amber-700 dark:text-amber-400 border border-amber-500/30">
                    Citizen Guide
                  </span>
                </div>
                <p className="text-[10px] font-bold tracking-wider text-slate-400 uppercase">
                  भारत सरकार सेवा साथी
                </p>
              </div>
            </Link>

            <h1 className="text-2xl font-extrabold text-[#1E3A8A] dark:text-white tracking-tight">
              {mode === 'signup' && 'Create Citizen Account'}
              {mode === 'signin' && 'Sign In to Your Account'}
              {mode === 'forgot' && 'Reset Your Password'}
            </h1>

            <p className="text-xs text-slate-500 dark:text-slate-400 max-w-xs mx-auto">
              {mode === 'signup' && 'Register to bookmark verified government services, save grievance roadmaps, and personalize your state.'}
              {mode === 'signin' && 'Access your personalized service roadmaps, saved applications, and document guidelines.'}
              {mode === 'forgot' && 'Enter your registered email address and we will send you a secure link to reset your password.'}
            </p>
          </div>

          {/* Mode Switcher Tabs (Sign In / Sign Up) */}
          {mode !== 'forgot' && (
            <div className="flex rounded-2xl bg-slate-100 dark:bg-slate-800 p-1 text-xs font-semibold">
              <button
                type="button"
                onClick={() => switchMode('signin')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  mode === 'signin'
                    ? 'bg-white dark:bg-slate-900 text-[#1E3A8A] dark:text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Sign In
              </button>

              <button
                type="button"
                onClick={() => switchMode('signup')}
                className={`flex-1 py-2.5 rounded-xl transition-all ${
                  mode === 'signup'
                    ? 'bg-white dark:bg-slate-900 text-[#1E3A8A] dark:text-white font-bold shadow-xs'
                    : 'text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>
          )}

          {/* Toast / Alert Notifications */}
          {toastError && (
            <div className="p-3.5 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900/60 text-xs text-rose-800 dark:text-rose-200 flex items-start gap-2.5 animate-in fade-in duration-150">
              <AlertCircle className="w-4 h-4 flex-shrink-0 mt-0.5 text-rose-600" />
              <div className="flex-1 font-medium">{toastError}</div>
              <button
                onClick={() => setToastError(null)}
                className="text-rose-400 hover:text-rose-700 text-xs"
              >
                ×
              </button>
            </div>
          )}

          {toastSuccess && (
            <div className="p-3.5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200 dark:border-emerald-900/60 text-xs text-emerald-800 dark:text-emerald-200 flex items-start gap-2.5 animate-in fade-in duration-150">
              <CheckCircle2 className="w-4 h-4 flex-shrink-0 mt-0.5 text-emerald-600" />
              <div className="flex-1 font-medium">{toastSuccess}</div>
              <button
                onClick={() => setToastSuccess(null)}
                className="text-emerald-400 hover:text-emerald-700 text-xs"
              >
                ×
              </button>
            </div>
          )}

          {/* ========================================================
              FORM: SIGN IN
              ======================================================== */}
          {mode === 'signin' && (
            <form onSubmit={handleSignIn} className="space-y-4 text-xs">
              
              {/* Email Address */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched('email')}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
                {touched.email && !emailValidation.isValid && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    <span>{emailValidation.error}</span>
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Password <span className="text-rose-500">*</span>
                  </label>
                  <button
                    type="button"
                    onClick={() => switchMode('forgot')}
                    className="text-[11px] font-semibold text-[#2563EB] hover:underline"
                  >
                    Forgot Password?
                  </button>
                </div>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Signing In...</span>
                  </>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Don't have an account yet?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signup')}
                  className="font-bold text-[#2563EB] hover:underline"
                >
                  Create citizen account
                </button>
              </div>

            </form>
          )}

          {/* ========================================================
              FORM: SIGN UP
              ======================================================== */}
          {mode === 'signup' && (
            <form onSubmit={handleSignUp} className="space-y-4 text-xs">
              
              {/* 1. Full Name */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Full Name <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    required
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    onBlur={() => markTouched('fullName')}
                    placeholder="e.g. Ramesh Kumar or Mary-Jane"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
                {touched.fullName && !nameValidation.isValid && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    <span>{nameValidation.error}</span>
                  </p>
                )}
              </div>

              {/* 2. Email Address */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onBlur={() => markTouched('email')}
                    placeholder="citizen@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
                {touched.email && !emailValidation.isValid && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    <span>{emailValidation.error}</span>
                  </p>
                )}
              </div>

              {/* 3. Mobile Number (Indian Format) */}
              <div>
                <div className="flex items-center justify-between mb-1.5">
                  <label className="font-semibold text-slate-700 dark:text-slate-300">
                    Mobile Number <span className="text-slate-400 font-normal">(Optional Contact)</span>
                  </label>
                  <span className="text-[10px] text-slate-400 font-medium">+91 (India)</span>
                </div>
                <div className="relative">
                  <Phone className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    onBlur={() => markTouched('phone')}
                    placeholder="+91 98765 43210"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
                {touched.phone && phone.trim() !== '' && !mobileValidation.isValid && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    <span>{mobileValidation.error}</span>
                  </p>
                )}
              </div>

              {/* 4. Password with Requirements Checklist & Strength Indicator */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Lock className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onBlur={() => markTouched('password')}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>

                {/* Password Strength Indicator */}
                {password.length > 0 && (
                  <div className="mt-2 space-y-1.5">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="text-slate-500">Password Strength:</span>
                      <span className={`font-bold ${getStrengthTextColor()}`}>
                        {passwordRules.label}
                      </span>
                    </div>
                    <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div className={`h-full transition-all duration-300 ${getStrengthBarColor()}`} />
                    </div>
                  </div>
                )}

                {/* Requirements Checklist (Required per specification) */}
                <div className="mt-2.5 p-3 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/60 dark:border-slate-800 space-y-1 text-[11px]">
                  <div className="font-semibold text-slate-700 dark:text-slate-300 mb-1">
                    Password must contain:
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasMinLength ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                    <Check className="w-3.5 h-3.5" />
                    <span>At least 8 characters</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasUppercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                    <Check className="w-3.5 h-3.5" />
                    <span>One uppercase letter (A-Z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasLowercase ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                    <Check className="w-3.5 h-3.5" />
                    <span>One lowercase letter (a-z)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasNumber ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                    <Check className="w-3.5 h-3.5" />
                    <span>One number (0-9)</span>
                  </div>
                  <div className={`flex items-center gap-1.5 ${passwordRules.hasSpecialChar ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                    <Check className="w-3.5 h-3.5" />
                    <span>One special character (!@#$%^&*)</span>
                  </div>
                </div>
              </div>

              {/* 5. Confirm Password */}
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Confirm Password <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    onBlur={() => markTouched('confirmPassword')}
                    placeholder="Re-enter your password"
                    className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
                    title={showConfirmPassword ? 'Hide password' : 'Show password'}
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {touched.confirmPassword && confirmPassword.length > 0 && !passwordsMatch && (
                  <p className="mt-1 text-[11px] text-rose-600 font-medium flex items-center gap-1">
                    <XCircle className="w-3 h-3" />
                    <span>Passwords do not match.</span>
                  </p>
                )}
                {passwordsMatch && (
                  <p className="mt-1 text-[11px] text-emerald-600 font-medium flex items-center gap-1">
                    <CheckCircle2 className="w-3 h-3" />
                    <span>Passwords match!</span>
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || !passwordRules.isValid || !passwordsMatch}
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2 mt-4"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Creating Citizen Account...</span>
                  </>
                ) : (
                  <>
                    <span>Create Citizen Account</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800 text-xs text-slate-500">
                Already registered with Gov Saathi?{' '}
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="font-bold text-[#2563EB] hover:underline"
                >
                  Sign in here
                </button>
              </div>

            </form>
          )}

          {/* ========================================================
              FORM: FORGOT PASSWORD
              ======================================================== */}
          {mode === 'forgot' && (
            <form onSubmit={handleForgotPassword} className="space-y-4 text-xs">
              
              <div>
                <label className="block font-semibold text-slate-700 dark:text-slate-300 mb-1.5">
                  Registered Email Address <span className="text-rose-500">*</span>
                </label>
                <div className="relative">
                  <Mail className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="name@example.com"
                    className="w-full pl-10 pr-3.5 py-2.5 rounded-xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-950 text-slate-900 dark:text-white text-xs sm:text-sm placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:bg-white dark:focus:bg-slate-900 transition-colors"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 rounded-xl bg-[#2563EB] hover:bg-[#1D4ED8] disabled:opacity-50 text-white font-bold text-xs shadow-md shadow-blue-500/20 hover:shadow-lg transition-all flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Sending Reset Link...</span>
                  </>
                ) : (
                  <>
                    <span>Send Password Reset Link</span>
                    <ArrowRight className="w-4 h-4" />
                  </>
                )}
              </button>

              <div className="text-center pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                <button
                  type="button"
                  onClick={() => switchMode('signin')}
                  className="font-semibold text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white inline-flex items-center gap-1.5"
                >
                  <ArrowLeft className="w-3.5 h-3.5" />
                  <span>Back to Sign In</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Security Notice Footer */}
        <div className="mt-6 text-center text-xs text-slate-400 dark:text-slate-500 space-y-1">
          <p className="flex items-center justify-center gap-1.5 font-medium">
            <Shield className="w-3.5 h-3.5 text-emerald-600" />
            <span>256-Bit SSL Encrypted & Protected by Supabase Auth</span>
          </p>
          <p className="text-[11px]">
            Gov Saathi never shares your credentials or accesses citizen passwords.
          </p>
        </div>

      </div>
    </div>
  );
};
