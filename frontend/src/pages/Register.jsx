import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { StickyNote, Eye, EyeOff, Check, X } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  
  // New States
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');

    // Block database calls if client validation criteria aren't met
    if (!isPasswordValid) {
      setErr('Please ensure your password meets all structural security criteria.');
      return;
    }

    try {
      await register(name, email, password);
      navigate('/dashboard'); // 👈 Updated to point directly to your protected dashboard
    } catch (error) {
      setErr(error.message || 'Error occurred updating target creation mapping records.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4 transition-colors">
      <div className="w-full max-w-md bg-slate-900 border border-slate-800 rounded-2xl p-8 shadow-xl">
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-500 rounded-xl mb-3">
            <StickyNote className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-100">Create Account</h2>
          <p className="text-xs text-slate-400 mt-1">Get started with secure user isolated workspaces today</p>
        </div>

        {err && (
          <div className="p-3 mb-4 text-xs font-medium text-rose-400 bg-rose-500/10 rounded-lg border border-rose-500/20">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Full Name</label>
            <input 
              type="text" 
              required 
              value={name} 
              onChange={e => setName(e.target.value)} 
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors" 
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full px-3.5 py-2 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors" 
            />
          </div>
          
          {/* Password Input with Visibility Switch */}
          <div>
            <label className="block text-xs font-semibold text-slate-400 uppercase tracking-wider mb-1">Password</label>
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"} 
                required 
                value={password} 
                onChange={e => setPassword(e.target.value)} 
                className="w-full px-3.5 py-2 pr-10 bg-slate-950 border border-slate-800 rounded-lg text-sm text-slate-100 focus:outline-none focus:border-indigo-500 transition-colors" 
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
                aria-label={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>

            {/* Validation Criteria Box */}
            <div className="mt-3 p-3 bg-slate-950 rounded-lg border border-slate-800 space-y-1.5">
              <p className="text-[11px] font-medium text-slate-500 uppercase tracking-wider mb-1">Password Security:</p>
              
              <div className="flex items-center gap-2 text-xs">
                {validations.minLength ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-slate-600" />}
                <span className={validations.minLength ? "text-slate-300" : "text-slate-500"}>At least 6 characters</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                {validations.hasNumber ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-slate-600" />}
                <span className={validations.hasNumber ? "text-slate-300" : "text-slate-500"}>Contains at least one number (0-9)</span>
              </div>
              
              <div className="flex items-center gap-2 text-xs">
                {validations.hasSpecial ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <X className="w-3.5 h-3.5 text-slate-600" />}
                <span className={validations.hasSpecial ? "text-slate-300" : "text-slate-500"}>Contains one special symbol (@, #, !, $, etc.)</span>
              </div>
            </div>
          </div>

          <button 
            type="submit" 
            disabled={!isPasswordValid}
            className={`w-full py-2.5 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm ${
              isPasswordValid 
                ? "bg-indigo-600 hover:bg-indigo-500 shadow-indigo-600/15 cursor-pointer" 
                : "bg-slate-800 text-slate-500 cursor-not-allowed"
            }`}
          >
            Register Account
          </button>
        </form>
        
        <p className="text-xs text-center text-slate-400 mt-5">
          Already have an account? <Link to="/login" className="text-indigo-400 hover:underline font-medium">Log in instead</Link>
        </p>
      </div>
    </div>
  );
}