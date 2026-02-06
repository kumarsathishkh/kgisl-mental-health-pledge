import React from 'react';

export const AboutCLSE: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in duration-700">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-5xl font-black text-kgislPurple font-cinzel tracking-wide">About <span className="text-kgislRed">CLSE</span></h1>
                <div className="w-24 h-1.5 bg-kgislRed mx-auto rounded-full"></div>
                <p className="text-xl text-gray-500 font-bold uppercase tracking-widest max-w-2xl mx-auto">Center for Life Skills & Education</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
                <div className="space-y-8">
                    <h2 className="text-3xl font-black text-kgislPurple leading-tight">
                        Fostering Holistic Growth &<br />Emotional Well-being
                    </h2>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        The Center for Life Skills & Education (CLSE) at KGiSL is a dedicated initiative committed to the holistic development of our students. We believe that true education extends beyond academic excellence to include emotional intelligence, mental resilience, and social responsibility.
                    </p>
                    <p className="text-lg text-gray-700 leading-relaxed">
                        Our mission is to create a supportive campus environment where every student feels empowered to seek help, practice self-care, and make positive life choices. Through our various programs, we address critical aspects of student life, from stress management to drug-free living.
                    </p>
                </div>
                <div className="relative">
                    <div className="absolute inset-0 bg-gradient-to-tr from-kgislPurple to-kgislRed opacity-10 rounded-[2.5rem] transform rotate-3"></div>
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 relative">
                        <div className="grid grid-cols-2 gap-6">
                            {[
                                { num: "10+", label: "Years of Impact" },
                                { num: "25k+", label: "Students Reached" },
                                { num: "50+", label: "Workshops/Year" },
                                { num: "100%", label: "Support Avail." }
                            ].map((stat, i) => (
                                <div key={i} className="text-center p-4 bg-gray-50 rounded-2xl">
                                    <div className="text-3xl font-black text-kgislRed mb-1">{stat.num}</div>
                                    <div className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
                {[
                    { title: "Mental Health", desc: "Promoting awareness, breaking stigmas, and providing accessible counseling resources for all students." },
                    { title: "Drug-Free Campus", desc: "Active campaigns and strict policies to ensure a safe, healthy, and substance-free educational environment." },
                    { title: "Skill Development", desc: "Equipping students with essential soft skills like leadership, communication, and emotional regulation." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-white p-8 rounded-3xl shadow-lg border border-gray-100 hover:shadow-xl transition-all group">
                        <div className="w-12 h-12 bg-kgislPurple/10 text-kgislPurple rounded-xl flex items-center justify-center text-2xl mb-6 group-hover:bg-kgislPurple group-hover:text-white transition-colors">
                            ✦
                        </div>
                        <h3 className="text-xl font-black text-kgislPurple mb-4">{item.title}</h3>
                        <p className="text-gray-600 leading-relaxed text-sm font-medium">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};
