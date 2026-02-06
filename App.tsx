
import React, { useState, useRef, useEffect } from 'react';
import { PledgeFormData } from './types';
import PledgeForm from './components/PledgeForm';
import Certificate from './components/Certificate';
import Header from './components/Header';
import { CLSELogo, KGiSLLogo } from './components/Logos';
import html2canvas from 'html2canvas';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

// Pledge Agreement Component
interface PledgeAgreementPageProps {
  studentName: string;
  onAccept: () => void;
  isLoading: boolean;
  displayedText: string;
  setDisplayedText: (text: string) => void;
  hasAccepted: boolean;
  setHasAccepted: (value: boolean) => void;
}

const PLEDGE_TEXT = `I pledge to support and promote mental health and well-being in my life and in the lives of those around me.

I commit to maintaining a drug-free lifestyle and actively discourage substance abuse among my peers.

I understand that mental health is as important as physical health, and I promise to seek help whenever needed.

I will work towards creating a supportive and healthy environment for all members of our educational community.

This is my solemn pledge to lead a responsible, healthy, and drug-free life.`;

const PledgeAgreementPage: React.FC<PledgeAgreementPageProps> = ({
  studentName,
  onAccept,
  isLoading,
  displayedText,
  setDisplayedText,
  hasAccepted,
  setHasAccepted
}) => {
  // Auto-typing effect
  useEffect(() => {
    if (displayedText.length < PLEDGE_TEXT.length) {
      const timer = setTimeout(() => {
        setDisplayedText(PLEDGE_TEXT.substring(0, displayedText.length + 1));
      }, 30);
      return () => clearTimeout(timer);
    }
  }, [displayedText, setDisplayedText]);

  return (
    <div className="max-w-4xl mx-auto px-6 py-16">
      <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 p-8 lg:p-12">

        {/* Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <CLSELogo className="h-12" />
          <div className="w-[1px] h-12 bg-kgislPurple/20"></div>
          <KGiSLLogo className="h-12" />
        </div>

        <h1 className="text-4xl font-black text-kgislPurple text-center mb-2">PLEDGE AGREEMENT</h1>
        <p className="text-center text-gray-500 font-bold uppercase tracking-widest mb-8">
          Before You Proceed
        </p>

        <div className="bg-gradient-to-br from-kgislPurple/5 to-kgislRed/5 rounded-xl p-8 border border-kgislPurple/10 mb-8 min-h-[300px]">
          <p className="text-lg leading-relaxed text-gray-800 font-medium whitespace-pre-wrap">
            {displayedText}
            {displayedText.length < PLEDGE_TEXT.length && (
              <span className="animate-pulse">|</span>
            )}
          </p>
        </div>

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mb-8">
          <p className="text-sm text-blue-700">
            <span className="font-bold">Note:</span> By clicking "I Accept", you are committing to the pledge above.
          </p>
        </div>

        {/* Acceptance */}
        <div className="flex items-start gap-4 mb-8 p-4 bg-gray-50 rounded-lg">
          <input
            type="checkbox"
            id="accept"
            checked={hasAccepted}
            onChange={(e) => setHasAccepted(e.target.checked)}
            className="w-5 h-5 mt-1 accent-kgislRed cursor-pointer"
          />
          <label htmlFor="accept" className="flex-1 cursor-pointer">
            <p className="font-bold text-gray-800">
              I, <span className="text-kgislPurple">{studentName}</span>, accept and commit to this pledge
            </p>
            <p className="text-sm text-gray-600 mt-1">
              I understand the importance of mental health and commit to leading a drug-free life.
            </p>
          </label>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4">
          <button
            onClick={onAccept}
            disabled={!hasAccepted || isLoading}
            className="flex-1 bg-kgislPurple hover:bg-kgislPurple/95 disabled:bg-gray-300 text-white font-black py-4 px-6 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 disabled:cursor-not-allowed uppercase tracking-widest text-sm"
          >
            {isLoading ? '⏳ Generating Certificate...' : '✓ Accept & Get Certificate'}
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<'landing' | 'form' | 'pledge-agreement' | 'certificate'>('landing');
  const [formData, setFormData] = useState<PledgeFormData | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [pledgeCount, setPledgeCount] = useState(0);
  const [certificateId, setCertificateId] = useState<string>('');
  const [error, setError] = useState<string>('');
  const [hasAccepted, setHasAccepted] = useState(false);
  const [displayedText, setDisplayedText] = useState('');
  const certificateRef = useRef<HTMLDivElement>(null);

  // Fetch pledge count on mount and refresh every 10 seconds
  useEffect(() => {
    const fetchPledgeCount = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/pledges/count`);
        const data = await response.json();
        setPledgeCount(data.count || 0);
      } catch (err) {
        console.error('Failed to fetch pledge count:', err);
        // Fallback to mock data if API fails
        setPledgeCount(prev => prev || 15742);
      }
    };

    fetchPledgeCount();
    const interval = setInterval(fetchPledgeCount, 10000);
    return () => clearInterval(interval);
  }, []);

  const handleStartPledge = () => {
    setView('form');
    setError('');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleFormSubmit = async (data: PledgeFormData) => {
    setIsGenerating(true);
    setError('');
    setHasAccepted(false);
    setDisplayedText('');

    // Go to pledge agreement page first
    setFormData(data);
    setIsGenerating(false);
    setView('pledge-agreement');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAcceptAndGenerateCertificate = async () => {
    if (!formData) return;

    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch(`${API_BASE_URL}/pledges`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to submit pledge');
      }

      const result = await response.json();

      setCertificateId(result.certificateId);
      setIsGenerating(false);
      setView('certificate');

      // Refresh pledge count
      setPledgeCount(prev => prev + 1);

      window.scrollTo({ top: 0, behavior: 'smooth' });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
      setIsGenerating(false);
    }
  };

  const downloadCertificate = async () => {
    if (!certificateRef.current) return;
    const canvas = await html2canvas(certificateRef.current, {
      scale: 3,
      useCORS: true,
      backgroundColor: '#ffffff',
    });
    const link = document.createElement('a');
    link.download = `KGiSL_Pledge_${formData?.fullName.replace(/\s+/g, '_')}.png`;
    link.href = canvas.toDataURL('image/png', 1.0);
    link.click();
  };

  return (
    <div className="min-h-screen flex flex-col bg-white selection:bg-kgislPurple selection:text-white font-montserrat">
      <Header onHome={() => setView('landing')} />

      <main className="flex-grow">
        {view === 'landing' && (
          <div className="animate-in fade-in duration-700">
            {/* CLSE Hero Section */}
            <section className="relative bg-[#f8f9ff] py-16 lg:py-24 border-b border-gray-100 overflow-hidden">
              <div className="absolute top-0 right-0 w-1/3 h-full bg-kgislPurple/5 skew-x-[-12deg] translate-x-20"></div>
              <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-12 gap-12 items-center relative z-10">
                <div className="lg:col-span-7 space-y-8">
                  <div className="inline-flex items-center gap-3 px-3 py-1 bg-kgislRed/10 border border-kgislRed/20 rounded-md text-kgislRed text-[10px] font-black uppercase tracking-widest">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-kgislRed opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-kgislRed"></span>
                    </span>
                    CLSE Initiative
                  </div>
                  <h1 className="text-5xl lg:text-7xl font-black text-kgislPurple leading-[1.1] font-cinzel">
                    Center for Life Skills & Education<br />
                    <span className="text-kgislRed">Empowering Well-being, Resilience, and Success</span>
                  </h1>
                  <p className="text-xl text-gray-600 font-medium leading-relaxed max-w-2xl border-l-4 border-kgislPurple pl-6">
                    CLSE at KGiSL is dedicated to fostering holistic student development through mental health awareness, drug-free living, and essential life skills. Our programs, workshops, and pledge campaigns help build a supportive, healthy, and thriving campus community.
                  </p>
                  <div className="flex flex-wrap gap-6 pt-4">
                    <button
                      onClick={handleStartPledge}
                      className="bg-kgislPurple hover:bg-[#251a55] text-white font-black py-5 px-14 rounded-xl shadow-[0_20px_40px_-10px_rgba(51,36,112,0.4)] transition-all transform hover:-translate-y-1 active:scale-95 text-lg uppercase tracking-widest flex items-center gap-4"
                    >
                      Take the Pledge
                      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </button>

                    <div className="flex items-center gap-4 px-8 py-4 bg-white border border-gray-100 rounded-xl shadow-sm">
                      <div className="w-12 h-12 rounded-full bg-kgislRed/10 flex items-center justify-center text-kgislRed">
                        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3.005 3.005 0 013.75-2.906z"></path></svg>
                      </div>
                      <div className="flex flex-col">
                        <span className="text-2xl font-black text-kgislPurple leading-none">{pledgeCount.toLocaleString()}</span>
                        <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">Total Pledges Taken</span>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-5 hidden lg:block">
                  <div className="relative group">
                    <div className="absolute -inset-4 bg-gradient-to-tr from-kgislPurple to-kgislRed opacity-20 blur-2xl rounded-full group-hover:opacity-30 transition-opacity"></div>
                    <div className="relative bg-gradient-to-b from-white to-gray-50 p-6 rounded-[2.5rem] shadow-2xl border border-gray-100 transform -rotate-3 group-hover:rotate-0 transition-transform duration-500">
                      <div className="flex flex-col gap-4 items-center justify-center">
                        <div className="w-full flex justify-center">
                          <CLSELogo className="h-32" />
                        </div>
                        <div className="w-full h-[1px] bg-gray-200"></div>
                        <div className="w-full flex justify-center">
                          <KGiSLLogo className="h-24" />
                        </div>
                      </div>
                      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur px-8 py-4 rounded-2xl shadow-xl border border-gray-100 w-[80%] text-center">
                        <p className="text-kgislPurple font-black uppercase text-xs tracking-widest">Center for Life Skills Education</p>
                        <p className="text-kgislRed font-bold text-[10px] uppercase mt-1 tracking-tighter">Mental Health & Drug-Free Initiative</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Steps Section - MyGov Experience */}
            <section className="py-20 bg-white">
              <div className="max-w-7xl mx-auto px-6">
                <div className="text-center mb-16 space-y-4">
                  <h2 className="text-3xl font-black text-kgislPurple uppercase tracking-widest font-cinzel">How to participate</h2>
                  <div className="w-16 h-1 bg-kgislRed mx-auto rounded-full"></div>
                </div>
                <div className="grid md:grid-cols-3 gap-12 relative">
                  {/* Connectors */}
                  <div className="hidden md:block absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>

                  {[
                    { step: '01', title: 'Start Pledge', desc: 'Click on the "Take the Pledge" button to begin your journey.' },
                    { step: '02', title: 'Enter Details', desc: 'Provide your official institutional details for record verification.' },
                    { step: '03', title: 'Get Certificate', desc: 'Download your official e-certificate and share your commitment.' }
                  ].map((item, i) => (
                    <div key={i} className="relative z-10 flex flex-col items-center text-center bg-white">
                      <div className={`w-20 h-20 rounded-2xl ${i === 1 ? 'bg-kgislRed' : 'bg-kgislPurple'} text-white flex items-center justify-center text-2xl font-black shadow-xl mb-6 ring-8 ring-white`}>
                        {item.step}
                      </div>
                      <h3 className="text-lg font-black text-kgislPurple uppercase tracking-widest mb-3">{item.title}</h3>
                      <p className="text-gray-500 text-sm leading-relaxed max-w-[200px]">{item.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Stats Cards */}
            <section className="pb-24">
              <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-4 gap-6">
                {[
                  { label: 'Campus Institutions', val: '06', icon: '🏛️' },
                  { label: 'Total Student Reach', val: '25k+', icon: '🎓' },
                  { label: 'Faculty Mentors', val: '400+', icon: '🤝' },
                  { label: 'Impact Score', val: '98%', icon: '📈' }
                ].map((s, idx) => (
                  <div key={idx} className="bg-slate-50 p-8 rounded-3xl border border-gray-100 hover:shadow-xl transition-shadow group">
                    <div className="text-4xl mb-4 grayscale group-hover:grayscale-0 transition-all">{s.icon}</div>
                    <div className="text-3xl font-black text-kgislPurple mb-1">{s.val}</div>
                    <div className="text-[10px] font-black text-gray-400 uppercase tracking-widest">{s.label}</div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        )}

        {view === 'form' && (
          <div className="max-w-4xl mx-auto px-6 py-16 animate-in slide-in-from-bottom-10 duration-700">
            <div className="mb-10 text-center">
              <button
                onClick={() => setView('landing')}
                className="inline-flex items-center gap-2 text-gray-400 hover:text-kgislPurple font-bold uppercase text-[10px] tracking-widest transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 19l-7-7 7-7"></path></svg>
                Back to Portal
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-kgislRed/10 border border-kgislRed/30 rounded-lg">
                <p className="text-kgislRed font-bold text-sm">{error}</p>
              </div>
            )}

            {isGenerating ? (
              <div className="flex flex-col items-center justify-center py-32 space-y-8">
                <div className="relative">
                  <div className="w-24 h-24 border-[6px] border-kgislPurple/10 border-t-kgislRed rounded-full animate-spin"></div>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-2 h-2 bg-kgislPurple rounded-full animate-pulse"></div>
                  </div>
                </div>
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-black text-kgislPurple uppercase tracking-widest">Processing Registry</h3>
                  <p className="text-gray-400 font-bold text-xs uppercase tracking-[0.2em] animate-pulse">Official Validation in progress...</p>
                </div>
              </div>
            ) : (
              <div className="bg-white rounded-[2.5rem] shadow-[0_50px_100px_-20px_rgba(51,36,112,0.15)] overflow-hidden border border-gray-100">
                <div className="bg-kgislPurple p-10 text-center relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -translate-y-16 translate-x-16"></div>
                  <div className="flex items-center justify-center gap-4 mb-4">
                    <CLSELogo className="h-10" />
                    <div className="w-[1px] h-10 bg-white/20"></div>
                    <KGiSLLogo className="h-10" />
                  </div>
                  <h2 className="text-3xl font-black text-white uppercase tracking-widest font-cinzel">Pledge Registration</h2>
                  <p className="text-white/50 text-[10px] font-black uppercase tracking-[0.3em] mt-3">Step 2: Authenticate Student Records</p>
                </div>
                <div className="p-10 lg:p-16">
                  <PledgeForm onSubmit={handleFormSubmit} />
                </div>
              </div>
            )}
          </div>
        )}

        {view === 'pledge-agreement' && formData && (
          <PledgeAgreementPage
            studentName={formData.fullName}
            onAccept={handleAcceptAndGenerateCertificate}
            isLoading={isGenerating}
            displayedText={displayedText}
            setDisplayedText={setDisplayedText}
            hasAccepted={hasAccepted}
            setHasAccepted={setHasAccepted}
          />
        )}

        {view === 'certificate' && formData && (
          <>
            <div className="max-w-6xl mx-auto px-6 py-16 animate-in zoom-in-95 duration-700">
              <div className="grid lg:grid-cols-12 gap-12 items-start">
                <div className="lg:col-span-8 space-y-8">
                  <div className="bg-white rounded-[2rem] shadow-2xl overflow-hidden border border-gray-100 ring-1 ring-black/5">
                    <Certificate data={formData} ref={certificateRef} />
                  </div>
                </div>

                <div className="lg:col-span-4 space-y-6 sticky top-28">
                  <div className="bg-white p-8 rounded-[2rem] shadow-xl border border-gray-100">
                    <div className="flex items-center gap-8 mt-10">
                      <button
                        onClick={handleStartPledge}
                        className="bg-kgislPurple text-white font-black py-5 px-10 rounded-2xl shadow-xl hover:bg-kgislPurple/95 transition-all transform hover:-translate-y-2 active:scale-[0.97] text-lg uppercase tracking-widest flex items-center gap-4"
                      >
                        Take the Pledge
                        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                      </button>
                      <div className="flex flex-col items-center">
                        <span className="text-5xl font-black text-kgislRed">{pledgeCount.toLocaleString()}</span>
                        <span className="text-xs font-bold text-gray-500 uppercase tracking-widest mt-1">Pledges & Counting</span>
                      </div>
                    </div>
                  </div>
                  {/* CLSE Logo and Visual */}
                  <div className="lg:col-span-5 flex flex-col items-center justify-center">
                    <CLSELogo className="h-24 mb-6" />
                    <KGiSLLogo className="h-16" />
                    <div className="mt-6 text-center text-gray-400 text-sm max-w-xs">
                      Supported by KGiSL Institutions
                    </div>
                  </div>

                  <div className="space-y-4">
                    <button
                      onClick={downloadCertificate}
                      className="w-full bg-kgislRed hover:bg-red-700 text-white font-black py-5 px-6 rounded-2xl shadow-xl transition-all transform hover:-translate-y-1 active:scale-95 flex items-center justify-center gap-3 uppercase text-xs tracking-widest"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path></svg>
                      Download e-Certificate
                    </button>

                    <button
                      onClick={() => setView('form')}
                      className="w-full bg-white border-2 border-gray-100 text-gray-400 hover:text-kgislPurple hover:border-kgislPurple font-black py-5 px-6 rounded-2xl transition-all uppercase text-xs tracking-widest"
                    >
                      Change Details
                    </button>
                  </div>

                  <div className="p-8 text-center bg-slate-50 rounded-[2rem] border border-gray-100 border-dashed">
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Share your commitment</p>
                    <div className="flex justify-center gap-4 mt-4">
                      {['X', 'IN', 'FB'].map(sm => (
                        <div key={sm} className="w-10 h-10 rounded-full bg-white border border-gray-200 flex items-center justify-center text-[10px] font-black text-kgislPurple hover:bg-kgislPurple hover:text-white transition-colors cursor-pointer">{sm}</div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* About CLSE Section */}
            <section className="max-w-5xl mx-auto px-6 py-16">
              <div className="bg-white rounded-3xl shadow-xl border border-gray-100 p-10">
                <h2 className="text-3xl font-black text-kgislPurple mb-4">About CLSE</h2>
                <p className="text-lg text-gray-700 mb-6">
                  The Center for Life Skills & Education (CLSE) is a pioneering initiative at KGiSL, focused on nurturing the mental, emotional, and social well-being of students. Through expert-led workshops, peer support programs, and awareness campaigns, CLSE equips students with the skills to thrive in academics and life.
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li><span className="font-bold text-kgislPurple">Mental Health Awareness:</span> Seminars, counseling, and resources for emotional resilience.</li>
                  <li><span className="font-bold text-kgislPurple">Drug-Free Campus:</span> Campaigns and pledges to promote healthy, substance-free living.</li>
                  <li><span className="font-bold text-kgislPurple">Life Skills Training:</span> Communication, leadership, stress management, and more.</li>
                  <li><span className="font-bold text-kgislPurple">Peer Support:</span> Student-led groups fostering empathy and community.</li>
                </ul>
                <div className="mt-8 text-center">
                  <button
                    onClick={handleStartPledge}
                    className="bg-kgislRed text-white font-black py-4 px-8 rounded-2xl shadow-lg hover:bg-kgislRed/90 transition-all text-lg uppercase tracking-widest"
                  >
                    Take the CLSE Pledge
                  </button>
                </div>
              </div>
            </section>
          </>
        )}
      </main>

      <footer className="w-full no-print bg-[#0a061a] pt-20 pb-10 text-white/60">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-20">
            <div className="col-span-2 space-y-6">
              <div className="flex items-center gap-4">
                <span className="text-4xl font-black text-white tracking-tighter">KGiSL</span>
                <div className="w-[2px] h-10 bg-white/10"></div>
                <div className="text-left">
                  <p className="text-[11px] font-black text-white uppercase tracking-widest leading-none">Center for Life Skills</p>
                  <p className="text-[11px] font-black text-kgislRed uppercase tracking-widest leading-none mt-1">Education (CLSE)</p>
                </div>
              </div>
              <p className="text-sm font-medium leading-relaxed max-w-md">
                Dedicated to the holistic development of students through emotional intelligence, mental resilience, and life skill proficiencies.
              </p>
            </div>

            <div className="space-y-6">
              <h5 className="text-white font-black uppercase text-xs tracking-widest">Quick Links</h5>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
                {['Home', 'About Initiative', 'Verification', 'Institutions'].map(l => (
                  <li key={l}><a href="#" className="hover:text-kgislRed transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>

            <div className="space-y-6">
              <h5 className="text-white font-black uppercase text-xs tracking-widest">Support</h5>
              <ul className="space-y-3 text-xs font-bold uppercase tracking-widest">
                {['Contact Us', 'Privacy Policy', 'Terms of Use', 'Accessibility'].map(l => (
                  <li key={l}><a href="#" className="hover:text-kgislRed transition-colors">{l}</a></li>
                ))}
              </ul>
            </div>
          </div>

          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-[10px] font-bold uppercase tracking-widest">
              © {new Date().getFullYear()} KGiSL Educational Institutions • Official Digital Portal
            </p>
            <div className="flex items-center gap-6">
              <CLSELogo className="h-8" />
              <KGiSLLogo className="h-8" />
              <span className="text-[9px] font-black uppercase tracking-tighter">Powered by KGiSL-KiTE IT Services</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default App;
