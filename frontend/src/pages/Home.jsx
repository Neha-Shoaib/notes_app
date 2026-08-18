import React, { useState } from 'react';
// Assuming react-router-dom is used for navigation. 
// If not using react-router-dom, change these to standard buttons or <a> tags.
import { useNavigate } from 'react-router-dom';
import { 
  Notebook, 
  Search, 
  FolderHeart, 
  ShieldCheck, 
  ArrowRight, 
  Play, 
  Menu, 
  X, 
  Sparkles, 
  CheckCircle2 
} from 'lucide-react';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stub handlers for navigation routing
  const handleNavigateLogin = () => {
    navigate('/login');
  };

  const handleNavigateRegister = () => {
    navigate('/register');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white transition-all dark:border-slate-800 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-indigo-600/10 rounded-xl border border-indigo-500/20 text-indigo-500 dark:bg-indigo-900/30 dark:border-indigo-400/30 dark:text-indigo-400">
              <Notebook className="w-6 h-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Memos
            </span>
          </div>

          {/* Desktop Links Menu */}
     

          {/* Desktop Auth Actions */}
          <div className="hidden md:flex items-center gap-4">
            <button 
              onClick={handleNavigateLogin}
              className="text-sm font-medium text-slate-600 hover:text-slate-900 transition-colors px-3 py-2 dark:text-slate-400 dark:hover:text-white"
            >
              Login
            </button>
            <button 
              onClick={handleNavigateRegister}
              className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:shadow-indigo-500/20"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Menu Button Trigger */}
          <button 
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full border-b border-slate-200 bg-white px-4 py-6 space-y-4 shadow-xl flex flex-col dark:border-slate-800 dark:bg-slate-900">

            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3 dark:border-slate-800">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleNavigateLogin(); }}
                className="w-full text-center font-medium text-slate-600 hover:text-slate-900 py-2.5 rounded-xl border border-slate-200 transition-colors dark:text-slate-300 dark:hover:text-white dark:border-slate-700"
              >
                Login
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleNavigateRegister(); }}
                className="w-full text-center font-medium bg-indigo-600 hover:bg-indigo-700 text-white py-2.5 rounded-xl transition-colors dark:bg-indigo-500 dark:hover:bg-indigo-400"
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-5  pb-20 md:pt-12">
        {/* Subtle background glow graphics */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10 dark:bg-indigo-900/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          
          {/* Subtle Accent Pill Banner */}
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-600 font-medium mb-6 animate-fade-in dark:border-indigo-400/30 dark:bg-indigo-900/20 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Introducing Markdown Shortcuts & Real-time Sync</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15] dark:text-white">
            Capture your thoughts.{' '}
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
              Organize your life.
            </span>
          </h1>

          {/* Subtitle */}
          <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
            Memos is a lightweight, clean workspace engineered for speed. Take markdown notes, tag meticulously, and synchronize flawlessly to the secure cloud.
          </p>

          {/* Call-to-actions */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleNavigateRegister}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 dark:bg-indigo-500 dark:hover:bg-indigo-400 dark:shadow-indigo-500/20"
            >
              <span>Create Your Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-medium border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-600 hover:text-slate-900 px-6 py-3.5 rounded-xl transition-all duration-200 dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300 dark:hover:text-white"
              onClick={() => alert("Demo preview coming soon!")}
            >
              <Play className="w-4 h-4 fill-current text-slate-400 dark:text-slate-500" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* Beautiful Mockup Dashboard Element */}
          <div className="mt-16 border border-slate-200 bg-slate-50 p-2 rounded-2xl max-w-5xl mx-auto shadow-2xl relative dark:border-slate-700 dark:bg-slate-800">
            <div className="absolute inset-0 bg-gradient-to-b from-indigo-500/5 to-transparent rounded-2xl pointer-events-none" />
            <div className="border border-slate-200 bg-white rounded-xl overflow-hidden aspect-[16/9] flex text-left text-xs text-slate-500 dark:border-slate-700 dark:bg-slate-900">
              {/* Sidebar Preview Component mockup */}
              <div className="w-1/4 border-r border-slate-200 bg-slate-50 p-3 hidden sm:flex flex-col gap-4 dark:border-slate-700 dark:bg-slate-900">
                <div className="flex items-center gap-2 border-b border-slate-200 pb-3 dark:border-slate-700">
                  <div className="w-2 h-2 rounded-full bg-red-500" />
                  <div className="w-2 h-2 rounded-full bg-yellow-500" />
                  <div className="w-2 h-2 rounded-full bg-green-500" />
                </div>
                <div className="space-y-1.5">
                  <div className="h-6 w-full bg-slate-200 rounded-md dark:bg-slate-800" />
                  <div className="h-6 w-5/6 bg-slate-100 rounded-md dark:bg-slate-700/50" />
                  <div className="h-6 w-4/5 bg-slate-100 rounded-md dark:bg-slate-700/50" />
                </div>
              </div>
              {/* Body Canvas mockup */}
              <div className="flex-1 p-4 bg-slate-50 flex flex-col gap-4 dark:bg-slate-900">
                <div className="h-8 w-1/3 bg-slate-200 rounded-md dark:bg-slate-800" />
                <div className="space-y-2">
                  <div className="h-3 w-full bg-slate-200/60 rounded dark:bg-slate-700/60" />
                  <div className="h-3 w-full bg-slate-200/60 rounded dark:bg-slate-700/60" />
                  <div className="h-3 w-2/3 bg-slate-200/60 rounded dark:bg-slate-700/60" />
                </div>
                <div className="flex gap-2 pt-2">
                  <span className="px-2 py-0.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-600 rounded-md dark:bg-indigo-900/30 dark:border-indigo-400/20 dark:text-indigo-400">#freelance</span>
                  <span className="px-2 py-0.5 bg-violet-500/10 border border-violet-500/20 text-violet-600 rounded-md dark:bg-violet-900/30 dark:border-violet-400/20 dark:text-violet-400">#university</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* 3. FEATURE GRID SECTION */}
      <section id="features" className="py-20 border-t border-slate-200 bg-slate-50 relative dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* Header Block */}
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Engineered with modern workflows in mind
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              No complex clutter. Just simple note layout constructs paired with heavy engineering pipelines to keep records running instantly.
            </p>
          </div>

          {/* Grid Layout Container */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Feature 1: Fast Search */}
            <div className="group border border-slate-200 hover:border-indigo-200 bg-white p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:hover:border-slate-600 dark:bg-slate-800">
              <div className="p-3 bg-indigo-600/10 text-indigo-600 border border-indigo-500/20 rounded-xl w-fit transition-colors group-hover:bg-indigo-600/20 dark:bg-indigo-900/30 dark:text-indigo-400 dark:border-indigo-400/20 dark:group-hover:bg-indigo-900/40">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors dark:text-slate-200 dark:group-hover:text-white">
                Lightning Fast Search
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">
                Indexed directly using specialized matching algorithms. Find text matches inside titles, paragraphs, or categories across thousands of pages instantly.
              </p>
            </div>

            {/* Feature 2: Categorization */}
            <div className="group border border-slate-200 hover:border-violet-200 bg-white p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:hover:border-slate-600 dark:bg-slate-800">
              <div className="p-3 bg-violet-600/10 text-violet-600 border border-violet-500/20 rounded-xl w-fit transition-colors group-hover:bg-violet-600/20 dark:bg-violet-900/30 dark:text-violet-400 dark:border-violet-400/20 dark:group-hover:bg-violet-900/40">
                <FolderHeart className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors dark:text-slate-200 dark:group-hover:text-white">
                Smart Categorization
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">
                Color coordinate tags, establish hierarchical sub-directories, and structure multi-family dashboards cleanly without cluttering your interface.
              </p>
            </div>

            {/* Feature 3: Secure Cloud Sync */}
            <div className="group border border-slate-200 hover:border-emerald-200 bg-white p-8 rounded-2xl backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:hover:border-slate-600 dark:bg-slate-800">
              <div className="p-3 bg-emerald-600/10 text-emerald-600 border border-emerald-500/20 rounded-xl w-fit transition-colors group-hover:bg-emerald-600/20 dark:bg-emerald-900/30 dark:text-emerald-400 dark:border-emerald-400/20 dark:group-hover:bg-emerald-900/40">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="mt-4 text-xl font-bold text-slate-800 group-hover:text-slate-900 transition-colors dark:text-slate-200 dark:group-hover:text-white">
                Secure Cloud Sync
              </h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">
                Powered securely by automated high-availability databases. Your private data is safely isolated, fully encrypted, and backed up in real time.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* 4. FOOTER */}
      <footer className="border-t border-slate-200 py-12 bg-slate-50 text-slate-500 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Notebook className="w-4 h-4 text-indigo-500/50" />
            <span className="font-semibold text-slate-600 dark:text-slate-400">&copy; 2026 Memos Inc.</span>
            <span className="text-slate-300 dark:text-slate-700">|</span>
            <span className="text-slate-500 dark:text-slate-400">Built cleanly using React & Tailwind.</span>
          </div>
          <div className="flex gap-6 text-slate-400">
            <span className="hover:text-slate-900 cursor-pointer transition-colors dark:hover:text-white" onClick={handleNavigateLogin}>App Launch</span>
          </div>
        </div>
      </footer>

    </div>
  );
};

export default LandingPage;