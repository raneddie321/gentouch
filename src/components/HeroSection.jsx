const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

export default function HeroSection() {
  const scrollToServices = () => {
    const el = document.querySelector('#services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  const goToBook = () => {
    window.location.href = '/Book';
  };

  return (
    <section id="hero" dir="rtl" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://i.ibb.co/qFrzgggk/Chat-GPT-Image-Mar-31-2026-04-27-47-PM.png"
          alt="בנגיעה אחת רכה"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <p className="font-heebo text-[#cf82bf] text-sm md:text-base tracking-[0.3em] uppercase mb-4">
            מוסמך מכון וינגייט
          </p>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="font-playfair text-6xl md:text-8xl lg:text-[7rem] font-bold text-[#cf82bf] mb-6 leading-tight"
        >
          בנגיעה אחת רכה
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="font-heebo text-[#cf82bf] text-lg md:text-xl lg:text-2xl font-light mb-4"
        >
          טיפולי עיסוי מקצועיים
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="flex flex-wrap justify-center gap-3 mb-10"
        >
          {['עיסוי שוודי קלאסי', 'עיסוי רפואי', 'טיפולי ספא', 'עיסוי ספורטאים', 'טיפול עד הבית'].map((tag) => (
            <span
              key={tag}
              className="font-heebo text-xs md:text-sm text-[#cf82bf] border border-[#cf82bf]/40 rounded-full px-4 py-1.5"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="flex flex-col sm:flex-row gap-4 justify-center"
        >
          <button
            onClick={goToBook}
            className="font-heebo bg-[#cf82bf] text-white px-8 py-3.5 rounded-full text-base font-medium hover:opacity-90 transition-all duration-300 hover:scale-105"
          >
            קביעת תור
          </button>
          <button
            onClick={scrollToServices}
            className="font-heebo border border-[#cf82bf]/60 text-[#cf82bf] px-8 py-3.5 rounded-full text-base font-medium hover:bg-[#cf82bf]/10 transition-all duration-300"
          >
            פירוט הטיפולים
          </button>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <ArrowDown className="w-5 h-5 text-[#cf82bf]" />
        </motion.div>
      </motion.div>
    </section>
  );
}
