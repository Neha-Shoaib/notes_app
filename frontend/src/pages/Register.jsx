import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';
import { StickyNote } from 'lucide-react';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [err, setErr] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErr('');
    try {
      await register(name, email, password);
      navigate('/');
    } catch (error) {
      setErr(error.message || 'Error occurred updating target creation mapping records.');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-4">
      <div className="w-full max-w-md bg-white border border-slate-200 rounded-2xl p-8 shadow-sm">
        <div className="text-center mb-6">
          <div className="inline-flex p-2.5 bg-indigo-600 text-white rounded-xl mb-3"><StickyNote className="w-6 h-6" /></div>
          <h2 className="text-xl font-bold text-slate-900">Create Account</h2>
          <p className="text-xs text-slate-500 mt-1">Get started with secure user isolated workspaces today</p>
        </div>

        {err && <div className="p-3 mb-4 text-xs font-medium text-rose-600 bg-rose-50 rounded-lg border border-rose-100">{err}</div>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Full Name</label>
            <input type="text" required value={name} onChange={e => setName(e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Email Address</label>
            <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">Password (Min 6 Characters)</label>
            <input type="password" required minLength={6} value={password} onChange={e => setPassword(e.target.value)} className="w-full px-3.5 py-2 rounded-lg border border-slate-200 text-sm focus:outline-none focus:border-indigo-500" />
          </div>
          <button type="submit" className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium rounded-lg transition-colors shadow-sm shadow-indigo-600/15">Register Account</button>
        </form>
        <p className="text-xs text-center text-slate-500 mt-5">Already have an account? <Link to="/login" className="text-indigo-600 hover:underline font-medium">Log in instead</Link></p>
      </div>
    </div>
  );
}