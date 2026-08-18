import React, { useState, useEffect } from 'react';
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
  Mic, 
  Plus, 
  Tag, 
  FileText, 
  HelpCircle, 
  Layers, 
  Lock,
  Volume2
} from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Animated Typing Demo States
  const [typedTitle, setTypedTitle] = useState('');
  const [typedContent, setTypedContent] = useState('');
  const [activeStep, setActiveStep] = useState(1);
  const [isVoiceActive, setIsVoiceActive] = useState(false);

  // Auto-typing Simulation Loop for Demo Canvas
  useEffect(() => {
    let titleText = "Project Architecture Review";
    let contentText = "Refactored Groq Whisper audio pipeline for Roman Urdu & English notes. Deployed with JWT tokens.";
    let timer;

    const runSimulation = () => {
      // Step 1: Typing title
      setActiveStep(1);
      setIsVoiceActive(false);
      setTypedTitle('');
      setTypedContent('');

      let titleIdx = 0;
      const titleInterval = setInterval(() => {
        if (titleIdx < titleText.length) {
          setTypedTitle(titleText.substring(0, titleIdx + 1));
          titleIdx++;
        } else {
          clearInterval(titleInterval);
          // Step 2: Voice Dictation & Content Typing
          setActiveStep(2);
          setIsVoiceActive(true);

          let contentIdx = 0;
          const contentInterval = setInterval(() => {
            if (contentIdx < contentText.length) {
              setTypedContent(contentText.substring(0, contentIdx + 1));
              contentIdx++;
            } else {
              clearInterval(contentInterval);
              setIsVoiceActive(false);
              // Step 3: Tags & Saved State
              setActiveStep(3);
              timer = setTimeout(() => {
                runSimulation();
              }, 4000);
            }
          }, 35);
        }
      }, 50);
    };

    runSimulation();

    return () => clearTimeout(timer);
  }, []);

  const handleNavigateLogin = () => navigate('/login');
  const handleNavigateRegister = () => navigate('/register');

  return (
    <div className="min-h-screen bg-white text-slate-900 font-sans selection:bg-indigo-500/30 selection:text-indigo-200 dark:bg-slate-950 dark:text-slate-100">
      
      {/* 1. STICKY NAVIGATION BAR */}
      <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/80 backdrop-blur-md transition-all dark:border-slate-800 dark:bg-slate-950/80">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <div className="flex items-center gap-2.5 cursor-pointer" onClick={() => navigate('/')}>
            <div className="p-2 bg-indigo-600/10 rounded-xl border border-indigo-500/20 text-indigo-600 dark:bg-indigo-900/30 dark:border-indigo-400/30 dark:text-indigo-400">
              <Notebook className="w-5 h-5" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
              Memos
            </span>
          </div>

          {/* Desktop Navigation Links with Hover Tooltips */}
          <nav className="hidden md:flex items-center gap-8">
            <a 
              href="#how-it-works" 
              className="group relative text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white"
            >
              How It Works
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap dark:bg-slate-800">
                Step-by-step workflow
              </span>
            </a>
            <a 
              href="#features" 
              className="group relative text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white"
            >
              Features
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap dark:bg-slate-800">
                AI Voice, Search & Cloud Sync
              </span>
            </a>
            <a 
              href="#demo-section" 
              className="group relative text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors dark:text-slate-400 dark:hover:text-white"
            >
              Live Demo
              <span className="pointer-events-none absolute -bottom-9 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[11px] px-2.5 py-1 rounded-md shadow-lg whitespace-nowrap dark:bg-slate-800">
                Interactive preview
              </span>
            </a>
          </nav>

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
              className="text-sm font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              Get Started Free
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden p-2 text-slate-500 hover:text-slate-900 transition-colors dark:text-slate-400 dark:hover:text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 w-full border-b border-slate-200 bg-white px-5 py-6 space-y-4 shadow-xl flex flex-col dark:border-slate-800 dark:bg-slate-900">
            <a 
              href="#how-it-works" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              How It Works
            </a>
            <a 
              href="#features" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Features
            </a>
            <a 
              href="#demo-section" 
              onClick={() => setIsMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-700 dark:text-slate-300"
            >
              Live Demo
            </a>
            <div className="pt-4 border-t border-slate-200 flex flex-col gap-3 dark:border-slate-800">
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleNavigateLogin(); }}
                className="w-full text-center font-medium text-slate-600 hover:text-slate-900 py-2.5 rounded-xl border border-slate-200 dark:text-slate-300 dark:border-slate-700"
              >
                Login
              </button>
              <button 
                onClick={() => { setIsMobileMenuOpen(false); handleNavigateRegister(); }}
                className="w-full text-center font-medium bg-indigo-600 text-white py-2.5 rounded-xl dark:bg-indigo-500"
              >
                Get Started Free
              </button>
            </div>
          </div>
        )}
      </header>

      {/* 2. HERO SECTION */}
      <section className="relative overflow-hidden pt-10 pb-20 md:pt-16">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-96 bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none -z-10 dark:bg-indigo-900/20" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/5 text-xs text-indigo-600 font-medium mb-6 dark:border-indigo-400/30 dark:bg-indigo-900/20 dark:text-indigo-400">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI-Powered Speech-to-Text & Instant Search</span>
          </div>

          <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-slate-900 max-w-4xl mx-auto leading-[1.15] dark:text-white">
            Capture your thoughts.{' '}
            <span className="bg-gradient-to-r from-indigo-500 via-violet-500 to-purple-600 bg-clip-text text-transparent">
              Organize your life.
            </span>
          </h1>

          <p className="mt-6 text-lg md:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed dark:text-slate-400">
            A fast, minimalistic workspace. Dictate voice notes in English, Urdu, or Roman Urdu, structure thoughts seamlessly, and sync across all devices.
          </p>

          {/* CTA Buttons */}
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button 
              onClick={handleNavigateRegister}
              className="w-full sm:w-auto group inline-flex items-center justify-center gap-2 font-medium bg-indigo-600 hover:bg-indigo-700 text-white px-6 py-3.5 rounded-xl shadow-lg shadow-indigo-600/20 transition-all duration-200 hover:-translate-y-0.5 dark:bg-indigo-500 dark:hover:bg-indigo-400"
            >
              <span>Create Free Account</span>
              <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <button 
              onClick={() => setIsVideoModalOpen(true)}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 font-medium border border-slate-200 hover:border-slate-300 bg-slate-50 hover:bg-slate-100 text-slate-700 px-6 py-3.5 rounded-xl transition-all dark:border-slate-700 dark:bg-slate-800 dark:hover:bg-slate-700 dark:text-slate-300"
            >
              <Play className="w-4 h-4 fill-current text-indigo-600 dark:text-indigo-400" />
              <span>Watch Demo</span>
            </button>
          </div>

          {/* 3. ANIMATED DASHBOARD PREVIEW SIMULATOR */}
          <div id="demo-section" className="mt-16 border border-slate-200 bg-slate-900 p-3 rounded-2xl max-w-5xl mx-auto shadow-2xl relative text-left dark:border-slate-800">
            {/* Window Toolbar Header */}
            <div className="flex items-center justify-between pb-3 px-2 border-b border-slate-800 text-xs text-slate-400">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-rose-500/80" />
                <div className="w-3 h-3 rounded-full bg-amber-500/80" />
                <div className="w-3 h-3 rounded-full bg-emerald-500/80" />
                <span className="ml-2 font-mono text-[11px] text-slate-500 hidden sm:inline">memos-workspace-preview</span>
              </div>
              <div className="flex items-center gap-2">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold flex items-center gap-1 ${
                  isVoiceActive ? 'bg-rose-500/20 text-rose-300 animate-pulse' : 'bg-indigo-500/20 text-indigo-300'
                }`}>
                  {isVoiceActive ? <Mic className="w-3 h-3 text-rose-400 animate-bounce" /> : <Sparkles className="w-3 h-3" />}
                  {isVoiceActive ? 'Voice Transcribing...' : 'Live Interactive Mockup'}
                </span>
              </div>
            </div>

            {/* Dashboard Mockup Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 min-h-[280px]">
              
              {/* Note Modal Form Simulation */}
              <div className="md:col-span-2 bg-slate-800/90 rounded-xl p-5 border border-slate-700 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400 flex items-center gap-1">
                      <FileText className="w-3.5 h-3.5" /> Note Editor
                    </span>
                    <span className="text-[11px] text-slate-400">Step {activeStep} of 3</span>
                  </div>

                  {/* Dynamic Title Input */}
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 mb-3">
                    <div className="text-xs text-slate-400 mb-1">Title (Optional)</div>
                    <div className="text-sm font-medium text-slate-100 font-mono min-h-[20px]">
                      {typedTitle}
                      <span className="inline-block w-1.5 h-4 bg-indigo-500 animate-pulse ml-0.5 align-middle" />
                    </div>
                  </div>

                  {/* Dynamic Body Input */}
                  <div className="bg-slate-900 border border-slate-700 rounded-lg p-2.5 min-h-[90px]">
                    <div className="text-xs text-slate-400 mb-1 flex justify-between">
                      <span>Note Content</span>
                      {isVoiceActive && <span className="text-rose-400 text-[10px] font-bold">● Listening to Audio</span>}
                    </div>
                    <div className="text-xs text-slate-300 leading-relaxed font-mono">
                      {typedContent}
                    </div>
                  </div>
                </div>

                {/* Tags & Action Bar */}
                <div className="flex items-center justify-between pt-4 mt-3 border-t border-slate-700/60">
                  <div className="flex gap-2">
                    <span className="px-2 py-0.5 bg-indigo-500/20 text-indigo-300 border border-indigo-500/30 rounded text-[11px] flex items-center gap-1">
                      <Tag className="w-3 h-3" /> #architecture
                    </span>
                    <span className="px-2 py-0.5 bg-violet-500/20 text-violet-300 border border-violet-500/30 rounded text-[11px]">
                      #groq-whisper
                    </span>
                  </div>
                  <button className="bg-indigo-600 text-white text-xs px-3 py-1.5 rounded-lg font-medium flex items-center gap-1 shadow-md shadow-indigo-600/30">
                    <Plus className="w-3 h-3" /> Save Note
                  </button>
                </div>
              </div>

              {/* Sidebar Guide Explanations */}
              <div className="bg-slate-800/40 rounded-xl p-4 border border-slate-700/60 flex flex-col justify-between">
                <div>
                  <h4 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-1.5">
                    <HelpCircle className="w-3.5 h-3.5 text-indigo-400" /> How It Happens
                  </h4>
                  <ul className="space-y-3 text-xs text-slate-300">
                    <li className={`p-2 rounded-lg transition-all ${activeStep === 1 ? 'bg-indigo-950/80 border border-indigo-500/50 text-indigo-200' : 'opacity-60'}`}>
                      <strong>1. Compose Fast:</strong> Start typing or leave the title empty for automatic naming.
                    </li>
                    <li className={`p-2 rounded-lg transition-all ${activeStep === 2 ? 'bg-indigo-950/80 border border-indigo-500/50 text-indigo-200' : 'opacity-60'}`}>
                      <strong>2. Audio Dictation:</strong> Press mic to record multilingual speech parsed instantly by Groq.
                    </li>
                    <li className={`p-2 rounded-lg transition-all ${activeStep === 3 ? 'bg-indigo-950/80 border border-indigo-500/50 text-indigo-200' : 'opacity-60'}`}>
                      <strong>3. Instant Sync:</strong> Tag your memo and save securely to MongoDB.
                    </li>
                  </ul>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

      {/* 4. STEP-BY-STEP GUIDED SECTION */}
      <section id="how-it-works" className="py-20 border-t border-slate-200 bg-slate-50 dark:border-slate-800 dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Create and Organize in 3 Simple Steps
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Zero clutter, full productivity. Here is how you manage your thoughts inside Memos.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-indigo-600/10 text-indigo-600 flex items-center justify-center font-bold text-base mb-4 dark:bg-indigo-900/30 dark:text-indigo-400">
                1
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Speak or Type</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Click <strong>"Compose Note"</strong> or tap the microphone button on the search bar or modal to dictate voice memos hands-free.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-violet-600/10 text-violet-600 flex items-center justify-center font-bold text-base mb-4 dark:bg-violet-900/30 dark:text-violet-400">
                2
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Filter & Categorize</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Add tags like <em>#work</em> or <em>#university</em>. Toggle between Grid and List views to tailor your workspace view.
              </p>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm dark:bg-slate-800 dark:border-slate-700">
              <div className="w-10 h-10 rounded-xl bg-emerald-600/10 text-emerald-600 flex items-center justify-center font-bold text-base mb-4 dark:bg-emerald-900/30 dark:text-emerald-400">
                3
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Instant Search</h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                Use the real-time search bar to filter notes by title, inner text, or hashtags within milliseconds.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FEATURE GRID SECTION */}
      <section id="features" className="py-20 border-t border-slate-200 bg-white relative dark:border-slate-800 dark:bg-slate-950">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl dark:text-white">
              Engineered with modern workflows in mind
            </h2>
            <p className="mt-4 text-slate-500 dark:text-slate-400">
              Constructed with high-speed API layers and isolated user authentication for maximum privacy.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group border border-slate-200 bg-slate-50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
              <div className="p-3 bg-indigo-600/10 text-indigo-600 border border-indigo-500/20 rounded-xl w-fit mb-4 dark:bg-indigo-900/30 dark:text-indigo-400">
                <Volume2 className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">AI Voice Transcription</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">
                Powered by Whisper and LLaMA models on Groq hardware to accurately capture English, Urdu, and Roman Urdu.
              </p>
            </div>

            <div className="group border border-slate-200 bg-slate-50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
              <div className="p-3 bg-violet-600/10 text-violet-600 border border-violet-500/20 rounded-xl w-fit mb-4 dark:bg-violet-900/30 dark:text-violet-400">
                <Search className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Instant Keyword Indexing</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">
                Search queries simultaneously match against titles, body paragraphs, and hashtag collections in real time.
              </p>
            </div>

            <div className="group border border-slate-200 bg-slate-50 p-8 rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:shadow-md dark:border-slate-700 dark:bg-slate-900">
              <div className="p-3 bg-emerald-600/10 text-emerald-600 border border-emerald-500/20 rounded-xl w-fit mb-4 dark:bg-emerald-900/30 dark:text-emerald-400">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 dark:text-white">Encrypted Cloud Storage</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed dark:text-slate-400">
                MongoDB persistence coupled with JWT authorization safeguards individual workspaces with zero leakage.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. FOOTER */}
      <footer className="border-t border-slate-200 py-12 bg-slate-50 text-slate-500 text-sm dark:border-slate-800 dark:bg-slate-900 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Notebook className="w-4 h-4 text-indigo-500" />
            <span className="font-semibold text-slate-700 dark:text-slate-300">&copy; 2026 Memos. All rights reserved.</span>
          </div>
          <div className="flex gap-6 text-slate-500 dark:text-slate-400 text-xs">
            <span className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={handleNavigateLogin}>Login</span>
            <span className="hover:text-indigo-600 cursor-pointer transition-colors" onClick={handleNavigateRegister}>Register</span>
          </div>
        </div>
      </footer>

      {/* 7. VIDEO DEMO MODAL POPUP */}
      {isVideoModalOpen && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 w-full max-w-3xl rounded-2xl overflow-hidden shadow-2xl relative">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 text-slate-200">
              <span className="text-sm font-semibold flex items-center gap-2">
                <Play className="w-4 h-4 text-indigo-400" /> Memos App Workflow Overview
              </span>
              <button 
                onClick={() => setIsVideoModalOpen(false)}
                className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-6 text-center">
              <div className="aspect-video bg-slate-950 rounded-xl border border-slate-800 flex flex-col items-center justify-center p-6 text-slate-400">
                <Play className="w-12 h-12 text-indigo-500 mb-3" />
                <p className="text-slate-200 font-semibold text-base">Interactive App Walkthrough</p>
                <p className="text-xs text-slate-400 mt-1 max-w-sm">
                  Experience fast voice dictation, instant tagging, and search directly on your dashboard.
                </p>
                <button
                  onClick={() => { setIsVideoModalOpen(false); handleNavigateRegister(); }}
                  className="mt-6 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold rounded-xl"
                >
                  Try It Live Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Home;