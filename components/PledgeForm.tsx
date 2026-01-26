
import React, { useState, useEffect } from 'react';
import { PledgeFormData, YearOfStudy, KG_INSTITUTIONS } from '../types';

interface PledgeFormProps {
  onSubmit: (data: PledgeFormData) => void;
}

const PledgeForm: React.FC<PledgeFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<PledgeFormData>({
    fullName: '',
    email: '',
    college: '',
    department: '',
    rollNumber: '',
    yearOfStudy: YearOfStudy.FIRST,
    gender: ''
  });

  const [availableDepartments, setAvailableDepartments] = useState<string[]>([]);

  useEffect(() => {
    if (formData.college) {
      setAvailableDepartments(KG_INSTITUTIONS[formData.college as keyof typeof KG_INSTITUTIONS] || []);
      setFormData(prev => ({ ...prev, department: '' }));
    }
  }, [formData.college]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.college || !formData.department || !formData.rollNumber || !formData.email) {
      alert("Please fill in all required fields to generate your certificate.");
      return;
    }
    onSubmit(formData);
  };

  const inputClass = "w-full px-5 py-4 bg-white border-2 border-gray-200 rounded-2xl focus:ring-4 focus:ring-kgislPurple/10 focus:border-kgislPurple outline-none transition-all font-bold text-black placeholder:text-gray-300 text-lg shadow-sm";
  const labelClass = "text-[12px] font-black text-kgislPurple uppercase ml-1 mb-2 block tracking-[0.15em]";

  return (
    <form onSubmit={handleSubmit} className="space-y-10">
      {/* Step 1: Personal Verification */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-kgislPurple text-white flex items-center justify-center font-black shadow-lg text-lg ring-4 ring-kgislPurple/5">1</div>
          <h3 className="text-xl font-black text-kgislPurple uppercase tracking-widest">Student Information</h3>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <label className={labelClass}>Student Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="e.g. NANDHAKUMAR M"
              className={inputClass}
              required
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Campus Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="student@kgisl.ac.in"
              className={inputClass}
              required
            />
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Gender Identity</label>
            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="" className="text-gray-400">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="space-y-1">
            <label className={labelClass}>Roll / Register Number</label>
            <input
              type="text"
              name="rollNumber"
              value={formData.rollNumber}
              onChange={handleChange}
              placeholder="e.g. 24UCY129"
              className={inputClass}
              required
            />
          </div>
        </div>
      </div>

      {/* Step 2: Academic Verification */}
      <div className="space-y-6">
        <div className="flex items-center gap-4 mb-2">
          <div className="w-10 h-10 rounded-2xl bg-kgislRed text-white flex items-center justify-center font-black shadow-lg text-lg ring-4 ring-kgislRed/5">2</div>
          <h3 className="text-xl font-black text-kgislRed uppercase tracking-widest">Institutional Records</h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          <div className="space-y-1">
            <label className={labelClass}>KGiSL Institution</label>
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              className={inputClass}
              required
            >
              <option value="">Select Official College</option>
              {Object.keys(KG_INSTITUTIONS).map(college => (
                <option key={college} value={college}>{college}</option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-1">
              <label className={labelClass}>Major / Department</label>
              <select
                name="department"
                value={formData.department}
                onChange={handleChange}
                disabled={!formData.college}
                className={`${inputClass} disabled:bg-gray-50 disabled:cursor-not-allowed disabled:border-gray-100 disabled:shadow-none transition-opacity duration-300`}
                required
              >
                <option value="">{formData.college ? "Select Stream" : "Select College First"}</option>
                {availableDepartments.map(dept => (
                  <option key={dept} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            <div className="space-y-1">
              <label className={labelClass}>Academic Year</label>
              <select
                name="yearOfStudy"
                value={formData.yearOfStudy}
                onChange={handleChange}
                className={inputClass}
                required
              >
                {Object.values(YearOfStudy).map(year => (
                  <option key={year} value={year}>{year}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </div>

      <div className="pt-10">
        <button
          type="submit"
          className="w-full bg-kgislPurple text-white font-black py-6 rounded-[2rem] shadow-2xl hover:bg-kgislPurple/95 transition-all transform hover:-translate-y-2 active:scale-[0.97] flex items-center justify-center gap-5 group ring-8 ring-kgislPurple/5"
        >
          <span className="text-2xl uppercase tracking-[0.15em] font-black">Issue My Pledge Certificate</span>
          <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center group-hover:bg-white/20 transition-colors">
            <svg className="w-8 h-8 group-hover:translate-x-1.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3.5" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
          </div>
        </button>
      </div>
    </form>
  );
};

export default PledgeForm;
