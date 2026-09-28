// GOV SAATHI - REUSABLE VALIDATION SCHEMAS & HELPERS
// Human-name validation, standard email validation, Indian mobile validation, strong password rules

export interface PasswordRuleState {
  hasMinLength: boolean;
  hasUppercase: boolean;
  hasLowercase: boolean;
  hasNumber: boolean;
  hasSpecialChar: boolean;
  isValid: boolean;
  score: number;
  label: 'Weak' | 'Fair' | 'Good' | 'Strong';
}

/**
 * Validates human full names.
 * Allows: Letters, spaces, apostrophes (O'Connor), hyphens (Mary-Jane).
 * Rejects: Numbers, random symbols, emojis, URLs, and excessive spaces.
 */
export const validateFullName = (name: string): { isValid: boolean; error?: string; cleanName: string } => {
  const trimmed = name.trim().replace(/\s+/g, ' ');
  
  if (!trimmed) {
    return { isValid: false, error: 'Full name is required.', cleanName: '' };
  }

  if (trimmed.length < 2) {
    return { isValid: false, error: 'Please enter a valid name using at least 2 letters.', cleanName: trimmed };
  }

  if (trimmed.length > 70) {
    return { isValid: false, error: 'Name is too long (maximum 70 characters).', cleanName: trimmed };
  }

  // Check for URLs
  if (/(https?:\/\/|www\.)/i.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid human name.', cleanName: trimmed };
  }

  // Regex allowing unicode letters, apostrophe, hyphen, and single spaces
  // Examples of valid: John Doe, Mohammed Raza, Mary Jane, O'Connor, Mary-Jane
  // Examples of invalid: John123, 12345, John@Doe, John#123
  const nameRegex = /^[A-Za-z\u00C0-\u024F\u0900-\u0D7F]+(?:[' -][A-Za-z\u00C0-\u024F\u0900-\u0D7F]+)*$/;

  if (!nameRegex.test(trimmed)) {
    return {
      isValid: false,
      error: 'Please enter a valid name using letters and spaces.',
      cleanName: trimmed
    };
  }

  return { isValid: true, cleanName: trimmed };
};

/**
 * Validates standard email addresses.
 * Rejects obviously invalid formats like example, example@, @example.com, example@gmail, hello..test@example.com
 */
export const validateEmail = (email: string): { isValid: boolean; error?: string; cleanEmail: string } => {
  const trimmed = email.trim().toLowerCase();

  if (!trimmed) {
    return { isValid: false, error: 'Email address is required.', cleanEmail: '' };
  }

  // Check for consecutive dots
  if (trimmed.includes('..')) {
    return { isValid: false, error: 'Please enter a valid email address.', cleanEmail: trimmed };
  }

  // Standard RFC-compliant email regex
  const emailRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+$/;

  if (!emailRegex.test(trimmed)) {
    return { isValid: false, error: 'Please enter a valid email address.', cleanEmail: trimmed };
  }

  const parts = trimmed.split('@');
  if (parts.length !== 2) {
    return { isValid: false, error: 'Please enter a valid email address.', cleanEmail: trimmed };
  }

  const domain = parts[1];
  if (!domain.includes('.') || domain.endsWith('.')) {
    return { isValid: false, error: 'Please enter a valid email address with a domain (e.g. .com, .in).', cleanEmail: trimmed };
  }

  return { isValid: true, cleanEmail: trimmed };
};

/**
 * Validates and normalizes Indian mobile phone numbers (+91 XXXXX XXXXX).
 * Accepts: +919876543210, 9876543210, 09876543210, +91 98765 43210.
 * Normalizes to standard E.164: +919876543210.
 */
export const validateIndianMobile = (phone: string, isOptional = false): { isValid: boolean; error?: string; normalizedPhone: string } => {
  const trimmed = phone.trim();

  if (!trimmed) {
    if (isOptional) {
      return { isValid: true, normalizedPhone: '' };
    }
    return { isValid: false, error: 'Mobile number is required.', normalizedPhone: '' };
  }

  // Remove spaces, dashes, brackets
  const cleaned = trimmed.replace(/[\s\-()]/g, '');

  let digits = cleaned;
  if (digits.startsWith('+91')) {
    digits = digits.substring(3);
  } else if (digits.startsWith('91') && digits.length === 12) {
    digits = digits.substring(2);
  } else if (digits.startsWith('0') && digits.length === 11) {
    digits = digits.substring(1);
  }

  // Valid Indian mobile numbers are exactly 10 digits starting with 6, 7, 8, or 9
  if (!/^[6-9]\d{9}$/.test(digits)) {
    return {
      isValid: false,
      error: 'Please enter a valid 10-digit Indian mobile number (starts with 6, 7, 8, or 9).',
      normalizedPhone: ''
    };
  }

  return {
    isValid: true,
    normalizedPhone: `+91${digits}`
  };
};

/**
 * Real-time Password Strength and Rule Checker.
 * Minimum 8 characters, at least 1 uppercase, 1 lowercase, 1 number, 1 special character.
 */
export const checkPasswordRules = (password: string): PasswordRuleState => {
  const hasMinLength = password.length >= 8;
  const hasUppercase = /[A-Z]/.test(password);
  const hasLowercase = /[a-z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~`§±]/.test(password);

  const criteriaCount = [hasMinLength, hasUppercase, hasLowercase, hasNumber, hasSpecialChar].filter(Boolean).length;

  let score = 0;
  let label: 'Weak' | 'Fair' | 'Good' | 'Strong' = 'Weak';

  if (criteriaCount <= 2) {
    score = 1;
    label = 'Weak';
  } else if (criteriaCount === 3 || criteriaCount === 4) {
    score = 2;
    label = 'Fair';
  } else if (criteriaCount === 5 && password.length < 12) {
    score = 3;
    label = 'Good';
  } else if (criteriaCount === 5 && password.length >= 12) {
    score = 4;
    label = 'Strong';
  }

  const isValid = hasMinLength && hasUppercase && hasLowercase && hasNumber && hasSpecialChar;

  return {
    hasMinLength,
    hasUppercase,
    hasLowercase,
    hasNumber,
    hasSpecialChar,
    isValid,
    score,
    label
  };
};

/**
 * Reusable Sign In Schema Validator
 */
export const signInSchema = {
  validate: (values: { email?: string; password?: string }) => {
    const emailResult = validateEmail(values.email || '');
    if (!emailResult.isValid) {
      return { isValid: false, error: emailResult.error || 'Please enter a valid email address.' };
    }
    if (!values.password || values.password.trim() === '') {
      return { isValid: false, error: 'Password is required.' };
    }
    return {
      isValid: true,
      data: {
        email: emailResult.cleanEmail,
        password: values.password
      }
    };
  }
};

/**
 * Reusable Sign Up Schema Validator
 */
export const signUpSchema = {
  validate: (values: {
    fullName?: string;
    email?: string;
    phone?: string;
    password?: string;
    confirmPassword?: string;
  }) => {
    // 1. Full name
    const nameResult = validateFullName(values.fullName || '');
    if (!nameResult.isValid) {
      return { isValid: false, error: nameResult.error };
    }

    // 2. Email
    const emailResult = validateEmail(values.email || '');
    if (!emailResult.isValid) {
      return { isValid: false, error: emailResult.error };
    }

    // 3. Mobile (optional during email registration, but validated if provided)
    let normalizedPhone = '';
    if (values.phone && values.phone.trim() !== '') {
      const phoneResult = validateIndianMobile(values.phone, true);
      if (!phoneResult.isValid) {
        return { isValid: false, error: phoneResult.error };
      }
      normalizedPhone = phoneResult.normalizedPhone;
    }

    // 4. Password Rules
    const passwordState = checkPasswordRules(values.password || '');
    if (!passwordState.isValid) {
      return {
        isValid: false,
        error: 'Password does not meet the required security rules.'
      };
    }

    // 5. Password Confirmation
    if (values.password !== values.confirmPassword) {
      return {
        isValid: false,
        error: 'Passwords do not match.'
      };
    }

    return {
      isValid: true,
      data: {
        fullName: nameResult.cleanName,
        email: emailResult.cleanEmail,
        phone: normalizedPhone,
        password: values.password as string
      }
    };
  }
};

/**
 * Reusable Password Reset Schema
 */
export const forgotPasswordSchema = {
  validate: (values: { email?: string }) => {
    const emailResult = validateEmail(values.email || '');
    if (!emailResult.isValid) {
      return { isValid: false, error: emailResult.error };
    }
    return { isValid: true, data: { email: emailResult.cleanEmail } };
  }
};

/**
 * Maps raw backend/Supabase error codes and messages to citizen-friendly popups.
 */
export const getFriendlyAuthErrorMessage = (error: any): string => {
  if (!error) return '';

  const msg = (error.message || '').toLowerCase();
  const status = error.status || 0;

  if (msg.includes('invalid login credentials') || msg.includes('invalid credentials')) {
    return 'Incorrect email or password. Please try again.';
  }
  if (msg.includes('user already registered') || msg.includes('already exists') || msg.includes('duplicate')) {
    return 'An account with this email already exists. Please sign in.';
  }
  if (msg.includes('email not confirmed')) {
    return 'Please verify your email address. Check your inbox for the confirmation link.';
  }
  if (msg.includes('user not found') || msg.includes('no user')) {
    return 'No account was found with these details.';
  }
  if (msg.includes('rate limit') || msg.includes('too many requests') || status === 429) {
    return 'Too many attempts. Please wait a moment before trying again.';
  }
  if (msg.includes('failed to fetch') || msg.includes('network') || msg.includes('connection')) {
    return 'Unable to connect. Please check your internet connection and try again.';
  }
  if (msg.includes('password should be at least')) {
    return 'Password must contain at least 8 characters with uppercase, lowercase, numbers, and symbols.';
  }

  return 'Authentication failed. Please verify your details and try again.';
};
