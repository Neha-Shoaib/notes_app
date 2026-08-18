import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { StickyNote, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');
  
  // New State for visibility toggle
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      navigate('/dashboard'); // 👈 Updated path to route authenticated sessions directly to the workspace
    } catch (error) {
      setErr(error.message || 'Credentials parsing match verification error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4 transition-colors dark:bg-slate-950">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-xl shadow-slate-200/60 dark:bg-slate-900 dark:border-slate-800">
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-indigo-600/10 border border-indigo-500/20 text-indigo-600 rounded-xl mb-3 dark:bg-indigo-900/30 dark:border-indigo-400/30 dark:text-indigo-400">
            <StickyNote className="w-6 h-6" />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1 dark:text-slate-400">Log in to safely access your personal workspace entries</p>
        </div>

        {err && (
          <div className="p-3 mb-4 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg border border-rose-200 dark:text-rose-400 dark:bg-rose-900/20 dark:border-rose-500/30">
            {err}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">Email Address</label>
            <input 
              type="email" 
              required 
              value={email} 
              onChange={e => setEmail(e.target.value)} 
              className="w-full px-3.5 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-indigo-500 transition-colors dark:bg-slate-800 dark:border-slate-700 dark:text-slate-100 dark:focus:border-indigo-400" 
            />
          </div>
          
          {/* Input Block Wrapper supporting the Interactive Toggle */}
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1 dark:text-slate-400">Password</label>
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
          </div>

          <button 
            type="submit" 
            className="w-full py-2.5 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-all duration-200 shadow-sm shadow-indigo-600/15 cursor-pointer dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:shadow-indigo-500/15"
          >
            Sign In
          </button>
        </form>
        
        <p className="text-xs text-center text-slate-500 mt-5 dark:text-slate-400">
          Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline font-medium dark:text-indigo-400">Create one here</Link>
        </p>
      </div>
    </div>
  );
}