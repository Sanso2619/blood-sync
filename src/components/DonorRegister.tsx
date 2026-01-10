import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff, CheckCircle } from 'lucide-react';
import imgLogo from "figma:asset/6c97523942fe730fbd4ae098955eb28b9f9eefad.png";

interface DonorRegisterProps {
  onBack: () => void;
  onRegisterSuccess: () => void;
}

export function DonorRegister({ onBack, onRegisterSuccess }: DonorRegisterProps) {
  const [formData, setFormData] = useState({
    phone: '',
    pincode: '',
    password: '',
    confirmPassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // Phone validation (10 digits)
    if (!formData.phone) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10}$/.test(formData.phone)) {
      newErrors.phone = 'Phone number must be 10 digits';
    }

    // Pincode validation (6 digits)
    if (!formData.pincode) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Pincode must be 6 digits';
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/register/donor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          phone: formData.phone,
          pincode: formData.pincode,
          password: formData.password,
        }),
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        setErrors({ submit: data.message || 'Registration failed' });
        setIsLoading(false);
        return;
      }

      setIsLoading(false);
      // Redirect to login page
      onRegisterSuccess();
    } catch (error) {
      console.error('Registration error:', error);
      setErrors({ submit: 'Failed to connect to server. Please ensure the backend is running.' });
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to Login</span>
      </button>

      {/* Register Card */}
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <img alt="BloodSync" src={imgLogo} className="w-12 h-12" />
          <div className="flex flex-col leading-none">
            <span className="text-white tracking-wide text-lg">BLOOD</span>
            <span className="text-[#f00a0a] tracking-wide text-lg">SYNC</span>
          </div>
        </div>

        {/* Register Form Card */}
        <div className="bg-[#171717] border border-white/10 rounded-lg p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl mb-2">Create Donor Account</h1>
            <p className="text-[#a3a3a3] text-sm">Join us in saving lives through blood donation</p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Phone Number Input */}
            <div>
              <label htmlFor="phone" className="block text-white text-sm mb-2">
                Phone Number
              </label>
              <input
                id="phone"
                type="tel"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder="Enter 10-digit phone number"
                maxLength={10}
                className={`w-full bg-[#0e0e10] border rounded px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                  errors.phone 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-white/10 focus:border-[#dc2626]'
                }`}
              />
              {errors.phone && (
                <p className="text-red-400 text-xs mt-1">{errors.phone}</p>
              )}
            </div>

            {/* Pincode Input */}
            <div>
              <label htmlFor="pincode" className="block text-white text-sm mb-2">
                Pincode
              </label>
              <input
                id="pincode"
                type="text"
                value={formData.pincode}
                onChange={(e) => handleInputChange('pincode', e.target.value)}
                placeholder="Enter 6-digit pincode"
                maxLength={6}
                className={`w-full bg-[#0e0e10] border rounded px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-colors ${
                  errors.pincode 
                    ? 'border-red-500 focus:border-red-500' 
                    : 'border-white/10 focus:border-[#dc2626]'
                }`}
              />
              {errors.pincode && (
                <p className="text-red-400 text-xs mt-1">{errors.pincode}</p>
              )}
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-white text-sm mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={(e) => handleInputChange('password', e.target.value)}
                  placeholder="Enter password (min 6 characters)"
                  className={`w-full bg-[#0e0e10] border rounded px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-colors pr-12 ${
                    errors.password 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-[#dc2626]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            {/* Confirm Password Input */}
            <div>
              <label htmlFor="confirmPassword" className="block text-white text-sm mb-2">
                Confirm Password
              </label>
              <div className="relative">
                <input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  value={formData.confirmPassword}
                  onChange={(e) => handleInputChange('confirmPassword', e.target.value)}
                  placeholder="Re-enter your password"
                  className={`w-full bg-[#0e0e10] border rounded px-4 py-3 text-white placeholder:text-white/30 focus:outline-none transition-colors pr-12 ${
                    errors.confirmPassword 
                      ? 'border-red-500 focus:border-red-500' 
                      : 'border-white/10 focus:border-[#dc2626]'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/60 transition-colors"
                >
                  {showConfirmPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">{errors.confirmPassword}</p>
              )}
              {formData.password && formData.confirmPassword && formData.password === formData.confirmPassword && (
                <div className="flex items-center gap-1 mt-1">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <p className="text-green-500 text-xs">Passwords match</p>
                </div>
              )}
            </div>

            {/* Error Message */}
            {errors.submit && (
              <div className="p-4 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm">
                {errors.submit}
              </div>
            )}

            {/* Register Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed mt-6"
            >
              {isLoading ? (
                <span className="flex items-center justify-center gap-2">
                  <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="none"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                  Creating account...
                </span>
              ) : (
                'Create Account'
              )}
            </button>
          </form>

          {/* Login Link */}
          <div className="mt-6 text-center">
            <span className="text-[#a3a3a3] text-sm">Already have an account? </span>
            <button
              type="button"
              onClick={onBack}
              className="text-[#dc2626] hover:text-[#b91c1c] text-sm transition-colors font-medium"
            >
              Login
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-white/40 text-xs mt-8">
          By creating an account, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}
