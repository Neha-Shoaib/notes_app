import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Eye, EyeOff, ArrowLeft } from 'lucide-react';
import { apiRequest } from '../utils/api';

export default function ForgotPassword() {
  const navigate = useNavigate();
  
  // Step 1: 'request_otp', Step 2: 'reset_password'
  const [step, setStep] = useState('request_otp');
  
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState('');
  const [msg, setMsg] = useState('');
  const [loading, setLoading] = useState(false);

  // Step 1: Send OTP to email
const handleSendOtp = async (e) => {
  e.preventDefault();
  setErr('');
  setMsg('');
  setLoading(true);

  try {
    const data = await apiRequest('/auth/send-otp', {
      method: 'POST',
      body: { 
        email, 
        type: 'reset' // or 'forgot-password' depending on your backend controller
      }
    });
    setMsg(data.message || 'OTP sent successfully to your email address.');
    setStep('reset_password');
  } catch (error) {
    setErr(error.message || 'Failed to send OTP.');
  } finally {
    setLoading(false);
  }
};
  // Step 2: Verify OTP and set new password
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setErr('');
    setMsg('');

    if (newPassword !== confirmPassword) {
      setErr('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const data = await apiRequest('/auth/reset-password', {
        method: 'POST',
        body: { email, otp, newPassword }
      });
      setMsg(data.message || 'Password reset successful! Redirecting to login...');
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      setErr(error.message || 'Failed to reset password. Verify the OTP code and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-slate-950">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 rounded-xl mb-3 dark:bg-indigo-900/30 dark:border-indigo-400/30 dark:text-indigo-400">
            <KeyRound className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {step === 'request_otp' ? 'Forgot Password' : 'Reset Password'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
            {step === 'request_otp' 
              ? 'Enter your email address to receive a verification OTP' 
              : 'Enter the OTP code received and set your new password'}
          </p>
        </div>

        {err && (
          <div className="p-3 mb-4 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg border border-rose-200 dark:text-rose-400 dark:bg-rose-900/20 dark:border-rose-500/30">
            {err}
          </div>
        )}

        {msg && (
          <div className="p-3 mb-4 text-xs font-medium text-emerald-600 bg-emerald-50 rounded-lg border border-emerald-200 dark:text-emerald-400 dark:bg-emerald-900/20 dark:border-emerald-500/30">
            {msg}
          </div>
        )}

        {step === 'request_otp' ? (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">
                Email Address
              </label>
              <input 
                type="email" 
                required 
                value={email} 
                onChange={e => setEmail(e.target.value)} 
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:border-indigo-400" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm shadow-indigo-600/15 cursor-pointer dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:shadow-indigo-500/15"
            >
              {loading ? 'Sending OTP...' : 'Send Verification OTP'}
            </button>
          </form>
        ) : (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">
                Verification OTP
              </label>
              <input 
                type="text" 
                required 
                value={otp} 
                onChange={e => setOtp(e.target.value)} 
                placeholder="Enter 6-digit OTP"
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:border-indigo-400" 
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">
                New Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={newPassword} 
                  onChange={e => setNewPassword(e.target.value)} 
                  className="w-full px-3.5 py-2 pr-10 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:border-indigo-400" 
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 transition-colors dark:text-slate-500 dark:hover:text-slate-300"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">
                Confirm New Password
              </label>
              <input 
                type="password" 
                required 
                value={confirmPassword} 
                onChange={e => setConfirmPassword(e.target.value)} 
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:border-indigo-400" 
              />
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm shadow-indigo-600/15 cursor-pointer dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:shadow-indigo-500/15"
            >
              {loading ? 'Resetting Password...' : 'Update Password'}
            </button>

            <button
              type="button"
              onClick={() => { setStep('request_otp'); setErr(''); setMsg(''); }}
              className="w-full text-xs text-slate-500 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
            >
              Change email or request new OTP
            </button>
          </form>
        )}

        <div className="mt-6 text-center">
          <Link 
            to="/login" 
            className="inline-flex items-center gap-1.5 text-xs font-medium text-slate-500 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-indigo-400"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Back to Login
          </Link>
        </div>
      </div>
    </div>
  );
}