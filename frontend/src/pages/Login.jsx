import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { StickyNote } from 'lucide-react';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await login(email, password);
      navigate('/');
    } catch (error) {
      setErr(error.message || 'Credentials parsing match verification error.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-indigo-600 text-white rounded-xl mb-3"><StickyNote className="w-6 h-6" /></div>
          <h2 className="text-xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-xs text-slate-500 mt-1">Log in to safely access your personal workspace entries</p>
        </div>

        {err && <div className="p-3 mb-4 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg border border-rose-100">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Password</label>
            <input type="password" required value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-indigo-600/15">Sign In</button>
        </form>
        <p className="text-xs text-center text-slate-500 mt-5">Don't have an account? <Link to="/register" className="text-indigo-600 hover:underline font-medium">Create one here</Link></p>
      </div>
    </div>
  );
}