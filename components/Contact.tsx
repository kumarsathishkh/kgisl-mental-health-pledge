import React from 'react';

export const Contact: React.FC = () => {
    return (
        <div className="max-w-7xl mx-auto px-6 py-20 animate-in fade-in duration-700">
            <div className="text-center mb-16 space-y-4">
                <h1 className="text-5xl font-black text-kgislPurple font-cinzel tracking-wide">Contact <span className="text-kgislRed">Us</span></h1>
                <div className="w-24 h-1.5 bg-kgislRed mx-auto rounded-full"></div>
                <p className="text-xl text-gray-500 font-bold uppercase tracking-widest max-w-2xl mx-auto">We're Here to Help & Listen</p>
            </div>

            <div className="grid lg:grid-cols-12 gap-12">
                {/* Contact Info */}
                <div className="lg:col-span-5 space-y-8">
                    <div className="bg-kgislPurple text-white p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-32 translate-x-32 pointer-events-none"></div>

                        <h3 className="text-2xl font-black uppercase tracking-widest mb-8 border-b border-white/20 pb-4">Get in Touch</h3>

                        <div className="space-y-8">
                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg"><span className="text-2xl">📍</span></div>
                                <div>
                                    <p className="font-bold text-white/50 text-xs uppercase tracking-widest mb-1">Visit Us</p>
                                    <p className="font-bold text-lg leading-snug">KGiSL Campus,<br />Saravanampatti,<br />Coimbatore - 641035</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg"><span className="text-2xl">📧</span></div>
                                <div>
                                    <p className="font-bold text-white/50 text-xs uppercase tracking-widest mb-1">Email Us</p>
                                    <p className="font-bold text-lg">clse@kgisl.ac.in</p>
                                    <p className="font-bold text-lg">info@kgisl.com</p>
                                </div>
                            </div>

                            <div className="flex items-start gap-4">
                                <div className="bg-white/10 p-3 rounded-lg"><span className="text-2xl">📞</span></div>
                                <div>
                                    <p className="font-bold text-white/50 text-xs uppercase tracking-widest mb-1">Call Us</p>
                                    <p className="font-bold text-lg">+91 422 441 9999</p>
                                </div>
                            </div>
                        </div>

                        <div className="mt-12 pt-8 border-t border-white/20">
                            <p className="text-center font-bold text-white/40 text-xs uppercase tracking-widest">Available Mon - Sat, 9am - 5pm</p>
                        </div>
                    </div>
                </div>

                {/* Map / Form Placeholer */}
                <div className="lg:col-span-7">
                    <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 h-full flex flex-col justify-center text-center space-y-6">
                        <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center text-4xl mx-auto mb-4">
                            💬
                        </div>
                        <h3 className="text-3xl font-black text-kgislPurple">Need Confidential Support?</h3>
                        <p className="text-gray-600 max-w-lg mx-auto text-lg">
                            If you or a friend is struggling with mental health or substance abuse, please don't hesitate to reach out. Our counselors are here to listen without judgement.
                        </p>
                        <div className="pt-8">
                            <button className="bg-kgislRed hover:bg-red-700 text-white font-black py-4 px-10 rounded-2xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 uppercase tracking-widest">
                                Request Counseling
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
