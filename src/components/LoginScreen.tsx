import { useState } from 'react';
import { ArrowLeft, Eye, EyeOff } from 'lucide-react';
import { UserRole } from '../App';
import imgLogo from "figma:asset/6c97523942fe730fbd4ae098955eb28b9f9eefad.png";

interface LoginScreenProps {
  role: UserRole;
  onBack: () => void;
  onLoginSuccess: () => void;
  onShowRegister?: () => void;
}

const roleConfig = {
  donor: {
    title: 'Donor Login',
    subtitle: 'Access your profile and donation history',
  },
  'blood-bank': {
    title: 'Blood Bank Login',
    subtitle: 'Manage inventory and coordinate with hospitals',
  },
  hospital: {
    title: 'Hospital Login',
    subtitle: 'Request blood and track emergency responses',
  },
};

export function LoginScreen({ role, onBack, onLoginSuccess, onShowRegister }: LoginScreenProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  // Handle null role
  if (!role) {
    return null;
  }

  const config = roleConfig[role as keyof typeof roleConfig];

  // If config is still undefined, return null or show error
  if (!config) {
    console.error('Invalid role:', role);
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    // Simulate API call - accept any credentials
    setTimeout(() => {
      setIsLoading(false);
      // Always succeed and go to dashboard
      onLoginSuccess();
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center p-6">
      {/* Back Button */}
      <button
        onClick={onBack}
        className="fixed top-8 left-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors group"
      >
        <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
        <span className="text-sm">Back to Home</span>
      </button>

      {/* Login Card */}
      <div className="w-full max-w-[440px]">
        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-12">
          <img alt="BloodSync" src={imgLogo} className="w-12 h-12" />
          <div className="flex flex-col leading-none">
            <span className="text-white tracking-wide text-lg">BLOOD</span>
            <span className="text-[#f00a0a] tracking-wide text-lg">SYNC</span>
          </div>
        </div>

        {/* Login Form Card */}
        <div className="bg-[#171717] border border-white/10 rounded-lg p-10">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-white text-3xl mb-2">{config.title}</h1>
            <p className="text-[#a3a3a3] text-sm">{config.subtitle}</p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-900/20 border border-red-900/50 rounded text-red-400 text-sm">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email/Phone/ID Input */}
            <div>
              <label htmlFor="email" className="block text-white text-sm mb-2">
                {role === 'donor' ? 'Phone Number' : 'ID'}
              </label>
              <input
                id="email"
                type="text"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={
                  role === 'donor' 
                    ? 'Enter your phone number' 
                    : 'Enter your ID'
                }
                className="w-full bg-[#0e0e10] border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/30 focus:border-[#dc2626] focus:outline-none transition-colors"
                required
              />
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className="w-full bg-[#0e0e10] border border-white/10 rounded px-4 py-3 text-white placeholder:text-white/30 focus:border-[#dc2626] focus:outline-none transition-colors pr-12"
                  required
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
            </div>

            {/* Forgot Password */}
            <div className="flex justify-end">
              <button
                type="button"
                className="text-[#dc2626] hover:text-[#b91c1c] text-sm transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Login Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#dc2626] hover:bg-[#b91c1c] text-white py-3 rounded font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
                  Logging in...
                </span>
              ) : (
                'Login'
              )}
            </button>
          </form>

          {/* Create Account Link */}
          <div className="mt-6 text-center">
            <span className="text-[#a3a3a3] text-sm">Don't have an account? </span>
            <button
              type="button"
              className="text-[#dc2626] hover:text-[#b91c1c] text-sm transition-colors font-medium"
              onClick={() => {
                // Functional for all roles now
                if (onShowRegister) {
                  onShowRegister();
                }
              }}
            >
              Create account
            </button>
          </div>
        </div>

        {/* Help Text */}
        <p className="text-center text-white/40 text-xs mt-8">
          By logging in, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </div>
  );
}