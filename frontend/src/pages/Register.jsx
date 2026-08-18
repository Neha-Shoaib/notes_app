import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { StickyNote, Eye, EyeOff, Check, X, KeyRound, ArrowRight, Loader2 } from 'lucide-react';

export default function Register() {
  const navigate = useNavigate();
  
  // Step State (1: User Details -> 2: OTP Verification)
  const [step, setStep] = useState(1);
  
  // Form Field States
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  
  // UI & Loading States
  const [err, setErr] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [isPasswordValid, setIsPasswordValid] = useState(false);
  const [validations, setValidations] = useState({
    minLength: false,
    hasNumber: false,
    hasSpecial: false,
  });

  // Real-time structural validation logic
  useEffect(() => {
    const checks = {
      minLength: password.length >= 6,
      hasNumber: /\d/.test(password),
      hasSpecial: /[!@#$%^&*(),.?":{}|<>_]/.test(password),
    };
    
    setValidations(checks);
    setIsPasswordValid(checks.minLength && checks.hasNumber && checks.hasSpecial);
  }, [password]);

  // Step 1: Request OTP from backend
  const handleSendOtp = async (e) => {
    e.preventDefault();
    setErr('');

    if (!isPasswordValid) {
      setErr('Please ensure your password meets all structural security criteria.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/send-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email.trim() }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Failed to send OTP to email.');
      }

      setStep(2);
    } catch (error) {
      setErr(error.message || 'Error sending verification code.');
    } finally {
      setLoading(false);
    }
  };

  // Step 2: Verify OTP and Register user directly without external context
  const handleVerifyAndRegister = async (e) => {
    e.preventDefault();
    setErr('');

    if (!otp || otp.trim().length !== 6) {
      setErr('Please enter a valid 6-digit verification code.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          password,
          otp: otp.trim(),
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.message || data.error || 'Invalid or expired OTP code.');
      }

      if (data.token) {
        localStorage.setItem('token', data.token);
      }

      navigate('/dashboard');
    } catch (error) {
      setErr(error.message || 'Invalid or expired OTP code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-slate-950">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 rounded-xl mb-3 dark:bg-indigo-900/30 dark:border-indigo-400/30 dark:text-indigo-400">
            <StickyNote className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            {step === 1 ? 'Create Account' : 'Verify Email'}
          </h2>
          <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">
            {step === 1 
              ? 'Get started with secure user isolated workspaces today' 
              : `Enter the 6-digit code sent to ${email}`}
          </p>
        </div>

        {err && (
          <div className="p-3 mb-4 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg border border-rose-200 dark:text-rose-400 dark:bg-rose-900/20 dark:border-rose-500/30">
            {err}
          </div>
        )}

        {step === 1 ? (
          /* STEP 1: Registration Form */
          <form onSubmit={handleSendOtp} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">
                Full Name
              </label>
              <input 
                type="text" 
                required 
                value={name} 
                onChange={e => setName(e.target.value)} 
                className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:border-indigo-400" 
              />
            </div>
            
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
            
            {/* Password Input with Visibility Switch */}
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">
                Password
              </label>
              <div className="relative">
                <input 
                  type={showPassword ? "text" : "password"} 
                  required 
                  value={password} 
                  onChange={e => setPassword(e.target.value)} 
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

              {/* Validation Criteria Box */}
              <div className="mt-3 p-3 bg-white rounded-lg border border-slate-200 space-y-1.5 dark:bg-slate-800 dark:border-slate-700">
                <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">Password Security:</p>
                
                <div className="flex items-center gap-2 text-xs">
                  {validations.minLength ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
                  <span className={validations.minLength ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}>At least 6 characters</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  {validations.hasNumber ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
                  <span className={validations.hasNumber ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}>Contains at least one number (0-9)</span>
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  {validations.hasSpecial ? <Check className="w-3.5 h-3.5 text-emerald-600" /> : <X className="w-3.5 h-3.5 text-slate-300 dark:text-slate-600" />}
                  <span className={validations.hasSpecial ? "text-slate-700 dark:text-slate-300" : "text-slate-400 dark:text-slate-500"}>Contains one special symbol (@, #, !, $, etc.)</span>
                </div>
              </div>
            </div>

            <button 
              type="submit" 
              disabled={!isPasswordValid || loading}
              className={`w-full py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2 ${
                isPasswordValid && !loading
                  ? "bg-indigo-600 hover:bg-indigo-700 shadow-indigo-600/15 cursor-pointer dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:shadow-indigo-500/15" 
                  : "bg-slate-200 text-slate-400 cursor-not-allowed dark:bg-slate-700 dark:text-slate-500"
              }`}
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Continue to Verification'}
              {!loading && <ArrowRight className="w-4 h-4" />}
            </button>
          </form>
        ) : (
          /* STEP 2: OTP Verification Form */
          <form onSubmit={handleVerifyAndRegister} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 dark:text-slate-400">
                Enter 6-Digit Code
              </label>
              <div className="relative">
                <KeyRound className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  maxLength={6}
                  required
                  placeholder="123456"
                  value={otp}
                  onChange={e => setOtp(e.target.value)}
                  className="w-full pl-10 pr-4 py-2.5 bg-white border border-slate-200 rounded-lg text-lg font-mono text-center tracking-[0.35em] text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:border-indigo-400"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading || otp.length !== 6}
              className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : 'Verify & Complete Registration'}
            </button>

            <div className="flex items-center justify-between text-xs pt-2">
              <button
                type="button"
                onClick={() => { setStep(1); setErr(''); }}
                className="text-slate-500 hover:text-slate-700 transition-colors dark:text-slate-400 dark:hover:text-slate-200"
              >
                ← Edit details
              </button>
              <button
                type="button"
                onClick={handleSendOtp}
                disabled={loading}
                className="text-indigo-600 hover:underline font-medium dark:text-indigo-400"
              >
                Resend Code
              </button>
            </div>
          </form>
        )}
        
        {step === 1 && (
          <p className="text-xs text-center text-slate-500 mt-5 dark:text-slate-400">
            Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-medium dark:text-indigo-400">Log in instead</Link>
          </p>
        )}
      </div>
    </div>
  );
}