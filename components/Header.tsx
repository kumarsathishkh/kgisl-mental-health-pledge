
import React from 'react';
import { CLSELogo, KGiSLLogo } from './Logos';

interface HeaderProps {
  onHome?: () => void;
}

const Header: React.FC<HeaderProps> = ({ onHome }) => {
  return (
    <header className="w-full bg-white border-b border-gray-100 shadow-sm py-4 px-6 no-print sticky top-0 z-50">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4 cursor-pointer" onClick={onHome}>
          <CLSELogo className="h-14" />
          <KGiSLLogo className="h-14 hidden sm:block" />
          <div className="h-12 w-[1px] bg-gray-200 hidden md:block"></div>
          <div className="hidden lg:flex flex-col">
            <h1 className="text-sm font-black text-kgislPurple uppercase tracking-tight">Mental Health</h1>
            <p className="text-[8px] font-black text-kgislRed tracking-[0.2em] uppercase">Drug-Free Pledge</p>
          </div>
        </div>
        
        <nav className="hidden md:flex items-center gap-8">
           <button onClick={onHome} className="text-[10px] font-black text-kgislPurple hover:text-kgislRed uppercase tracking-widest">Home</button>
           <a href="#" className="text-[10px] font-black text-gray-400 hover:text-kgislPurple uppercase tracking-widest">About CLSE</a>
           <a href="#" className="text-[10px] font-black text-gray-400 hover:text-kgislPurple uppercase tracking-widest">Contact</a>
        </nav>

        <div className="flex items-center gap-3 bg-gray-50 px-5 py-2.5 rounded-2xl border border-gray-100">
           <div className="text-right">
             <div className="text-[9px] font-black text-kgislPurple uppercase tracking-tight">Pledge System</div>
             <div className="text-[8px] font-bold text-kgislRed tracking-widest uppercase">v2.4 Official</div>
           </div>
           <div className="w-8 h-8 rounded-full bg-kgislPurple flex items-center justify-center text-white font-black text-[10px]">KG</div>
        </div>
      </div>
    </header>
  );
};

export default Header;
