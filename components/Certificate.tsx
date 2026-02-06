import React, { forwardRef } from 'react';
import { PledgeFormData } from '../types';
import { CLSELogo, KGiSLLogo } from './Logos';

interface CertificateProps {
  data: PledgeFormData;
}

const Certificate = forwardRef<HTMLDivElement, CertificateProps>(({ data }, ref) => {
  const currentDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric'
  }).toUpperCase();

  const certificateId = `KGiSL-${Date.now()}-${Math.random().toString(36).substr(2, 5).toUpperCase()}`;

  return (
    <div
      ref={ref}
      className="certificate-container w-full max-w-[1000px] bg-white p-2 relative overflow-hidden shadow-2xl"
      style={{ minHeight: '700px' }}
    >
      {/* Outer Gold Border */}
      <div className="h-full w-full border-[20px] border-[#daaa00] relative p-1">
        {/* Inner Detailed Border */}
        <div className="h-full w-full border-[4px] border-[#1a1a2e] relative flex flex-col items-center p-8 bg-[#fffdf5]">

          {/* Corner Ornaments (CSS Shapes) */}
          <div className="absolute top-0 left-0 w-24 h-24 border-t-[8px] border-l-[8px] border-[#daaa00]"></div>
          <div className="absolute top-0 right-0 w-24 h-24 border-t-[8px] border-r-[8px] border-[#daaa00]"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 border-b-[8px] border-l-[8px] border-[#daaa00]"></div>
          <div className="absolute bottom-0 right-0 w-24 h-24 border-b-[8px] border-r-[8px] border-[#daaa00]"></div>

          {/* Background Watermark */}
          <div className="absolute inset-0 flex items-center justify-center opacity-[0.03] pointer-events-none select-none z-0">
            <KGiSLLogo className="h-[500px] grayscale" />
          </div>

          <div className="relative z-10 w-full flex flex-col items-center h-full">
            {/* Header / Logos */}
            <div className="flex items-center justify-between w-full px-12 mb-8">
              <CLSELogo className="h-20" />
              <div className="text-center">
                <p className="font-serif text-[#1a1a2e] tracking-widest text-xs font-bold uppercase mb-1">Presented By</p>
                <p className="font-serif text-[#daaa00] font-black tracking-widest text-sm uppercase">Center for Life Skills & Education</p>
              </div>
              <KGiSLLogo className="h-20" />
            </div>

            {/* Title Section */}
            <div className="text-center mb-8 relative">
              <h1 className="font-cinzel text-6xl font-black text-[#1a1a2e] tracking-[0.1em] mb-2 drop-shadow-sm">CERTIFICATE</h1>
              <p className="font-playfair text-3xl italic text-[#daaa00] font-bold tracking-wider">- OF COMMITMENT -</p>
              <div className="w-64 h-1 bg-gradient-to-r from-transparent via-[#daaa00] to-transparent mx-auto mt-4"></div>
            </div>

            {/* Recipient Section */}
            <div className="text-center w-full mb-8">
              <p className="font-serif text-[#666] uppercase tracking-[0.3em] text-xs font-bold mb-6">This Honor is Proudly Bestowed Upon</p>

              <div className="relative inline-block px-12 pb-4 mb-2">
                <h2 className="font-playfair text-5xl font-black text-[#1a1a2e] italic relative z-10 px-4">
                  {data.fullName}
                </h2>
                <div className="absolute bottom-0 left-0 w-full h-[2px] bg-[#1a1a2e]"></div>
                <div className="absolute bottom-[-4px] left-[10%] w-[80%] h-[1px] bg-[#daaa00]"></div>
              </div>
            </div>

            {/* Pledge Content */}
            <div className="max-w-3xl text-center mb-10 px-8">
              <p className="font-serif text-[#1a1a2e] text-lg leading-relaxed font-medium">
                For solemnly pledging to prioritize mental health, maintain a <span className="text-[#daaa00] font-black">DRUG-FREE</span> lifestyle, and foster a supportive environment for the well-being of the KGiSL community.
              </p>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-2 gap-x-12 gap-y-6 w-full max-w-4xl px-12 mb-12">
              <div className="flex flex-col border-l-4 border-[#daaa00] pl-4">
                <span className="font-serif text-[#666] text-[10px] uppercase tracking-widest font-bold">Institution</span>
                <span className="font-bold text-[#1a1a2e] text-lg leading-tight">{data.college}</span>
              </div>
              <div className="flex flex-col border-l-4 border-[#daaa00] pl-4">
                <span className="font-serif text-[#666] text-[10px] uppercase tracking-widest font-bold">Department</span>
                <span className="font-bold text-[#1a1a2e] text-lg leading-tight">{data.department}</span>
              </div>
              <div className="flex flex-col border-l-4 border-[#daaa00] pl-4">
                <span className="font-serif text-[#666] text-[10px] uppercase tracking-widest font-bold">Roll Number</span>
                <span className="font-bold text-[#1a1a2e] text-lg">{data.rollNumber}</span>
              </div>
              <div className="flex flex-col border-l-4 border-[#daaa00] pl-4">
                <span className="font-serif text-[#666] text-[10px] uppercase tracking-widest font-bold">Year of Study</span>
                <span className="font-bold text-[#1a1a2e] text-lg">{data.yearOfStudy}</span>
              </div>
              <div className="flex flex-col border-l-4 border-[#daaa00] pl-4">
                <span className="font-serif text-[#666] text-[10px] uppercase tracking-widest font-bold">Gender</span>
                <span className="font-bold text-[#1a1a2e] text-lg">{data.gender}</span>
              </div>
              <div className="flex flex-col border-l-4 border-[#daaa00] pl-4">
                <span className="font-serif text-[#666] text-[10px] uppercase tracking-widest font-bold">Awarded On</span>
                <span className="font-bold text-[#1a1a2e] text-lg">{currentDate}</span>
              </div>
            </div>

            {/* Footer / Auth */}
            <div className="w-full mt-auto flex items-end justify-between px-16 pb-4">
              {/* Badge */}
              <div className="relative w-24 h-24 flex items-center justify-center">
                <div className="absolute inset-0 bg-[#daaa00] rounded-full opacity-20 animate-pulse"></div>
                <div className="w-20 h-20 border-[3px] border-[#daaa00] rounded-full flex items-center justify-center p-1 bg-white">
                  <div className="w-full h-full border border-[#1a1a2e] rounded-full flex items-center justify-center text-center">
                    <span className="text-[8px] font-black uppercase text-[#1a1a2e] leading-tight transform -rotate-12">
                      Official<br />Pledge<br />Seal
                    </span>
                  </div>
                </div>
              </div>

              {/* ID */}
              <div className="flex flex-col items-center">
                <span className="font-mono text-[10px] text-gray-400 tracking-widest mb-1">CERTIFICATE ID</span>
                <span className="font-mono text-sm font-bold text-[#1a1a2e] tracking-widest border border-[#1a1a2e] px-3 py-1 bg-white">
                  {certificateId}
                </span>
              </div>

              {/* Signature */}
              <div className="flex flex-col items-center justify-end h-24">
                <div className="font-signature text-3xl text-[#1a1a2e] mb-2 transform -rotate-3">Authorized</div>
                <div className="h-[2px] w-48 bg-[#1a1a2e] mb-2"></div>
                <span className="font-serif text-[10px] font-bold uppercase tracking-widest text-[#666]">KGiSL Administration</span>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
});

Certificate.displayName = "Certificate";

export default Certificate;