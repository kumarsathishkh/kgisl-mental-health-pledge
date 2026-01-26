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
      className="certificate-container w-full max-w-[1000px] bg-white p-6 relative overflow-hidden shadow-2xl"
      style={{ minHeight: '700px' }}
    >
      {/* Professional Border */}
      <div className="absolute inset-2 border-[12px] border-kgislPurple z-20 pointer-events-none"></div>
      <div className="absolute inset-4 border-[2px] border-kgislRed z-20 pointer-events-none"></div>
      
      {/* Light Watermark */}
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.02] pointer-events-none select-none z-0">
        <span className="text-[180px] font-black text-kgislPurple">KGiSL</span>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center h-full text-center py-12 px-8">
        
        {/* Logo Section */}
        <div className="flex items-center justify-center gap-8 mb-6">
          <CLSELogo className="h-16" />
          <div className="w-[1px] h-16 bg-kgislPurple/20"></div>
          <KGiSLLogo className="h-16" />
        </div>

        {/* Main Title */}
        <div className="mb-6">
          <h1 className="font-cinzel text-5xl font-black text-kgislPurple tracking-[0.15em] mb-2">PLEDGE CERTIFICATE</h1>
          <div className="w-24 h-1 bg-kgislRed mx-auto"></div>
        </div>

        {/* Main Pledge Statement */}
        <div className="bg-kgislPurple text-white py-4 px-8 rounded-lg mb-8 w-[90%] max-w-2xl">
          <p className="text-2xl font-black italic tracking-wide">I PLEDGE TO SUPPORT MENTAL HEALTH</p>
          <p className="text-lg font-bold mt-2">& REMAIN DRUG-FREE</p>
        </div>

        {/* Student Details */}
        <div className="mb-8 w-full max-w-2xl space-y-4">
          <div>
            <p className="text-sm font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">This Certificate is Awarded to</p>
            <h2 className="text-4xl font-playfair font-black text-black italic border-b-2 border-kgislRed pb-2">
              {data.fullName}
            </h2>
          </div>

          <div className="grid grid-cols-2 gap-6 text-sm">
            <div>
              <p className="font-bold text-gray-500 uppercase tracking-widest mb-1">Institution</p>
              <p className="font-black text-black">{data.college}</p>
            </div>
            <div>
              <p className="font-bold text-gray-500 uppercase tracking-widest mb-1">Program</p>
              <p className="font-black text-black">{data.department}</p>
            </div>
            <div>
              <p className="font-bold text-gray-500 uppercase tracking-widest mb-1">Roll Number</p>
              <p className="font-black text-black">{data.rollNumber}</p>
            </div>
            <div>
              <p className="font-bold text-gray-500 uppercase tracking-widest mb-1">Year</p>
              <p className="font-black text-black">{data.yearOfStudy}</p>
            </div>
          </div>
        </div>

        {/* Date & Certificate ID */}
        <div className="flex items-center gap-8 justify-center text-xs font-bold text-gray-600 uppercase tracking-widest mt-auto mb-4">
          <span>Certificate ID: {certificateId}</span>
          <span className="w-1 h-1 bg-kgislRed rounded-full"></span>
          <span>Issued: {currentDate}</span>
        </div>
      </div>
    </div>
  );
});

Certificate.displayName = "Certificate";

export default Certificate;