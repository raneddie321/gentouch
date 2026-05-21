const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink } from 'lucide-react';

const certificates = [
  { title: 'מעסה שוודי קלאסי', date: '17/06/2021', period: '21/10/2020 - 17/06/2021' },
  { title: 'מטפל ספא', date: '02/09/2021', period: '21/10/2020 - 02/09/2021' },
  { title: 'מעסה רפואי', date: '09/09/2021', period: '21/10/2020 - 09/09/2021' },
  { title: 'מעסה ספורטאים', date: '02/09/2021', period: '21/10/2020 - 02/09/2021' },
];

export default function CertificatesSection() {
  return (
    <section id="certificates" dir="rtl" className="py-24 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-heebo text-primary text-sm tracking-[0.2em] uppercase mb-3">הסמכות</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
            תעודות הסמכה
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-heebo text-muted-foreground text-lg max-w-2xl mx-auto">
            כל התעודות הונפקו על ידי מכון וינגייט — המכון הלאומי למצוינות בספורט
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6 mb-10">
          {certificates.map((cert, i) => (
            <motion.div
              key={cert.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative p-6 md:p-8 rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg group"
            >
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0 group-hover:bg-primary/20 transition-colors">
                  <Award className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-playfair text-xl md:text-2xl font-bold text-foreground mb-2">
                    {cert.title}
                  </h3>
                  <p className="font-heebo text-muted-foreground text-sm mb-1">
                    מכון וינגייט
                  </p>
                  <p className="font-heebo text-muted-foreground/70 text-xs">
                    תקופת הקורס: {cert.period}
                  </p>
                  <p className="font-heebo text-primary/80 text-xs mt-1">
                    תאריך הנפקה: {cert.date}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center"
        >
          <a
            href="https://media.db.com/files/public/user_696d0abebfd23bf1bebcd93b/2f8134dfa_CamScanner180320261206.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 font-heebo text-primary hover:text-primary/80 transition-colors text-sm font-medium border border-primary/30 rounded-full px-6 py-3 hover:bg-primary/5"
          >
            <ExternalLink className="w-4 h-4" />
            צפייה בתעודות המקוריות
          </a>
        </motion.div>
      </div>
    </section>
  );
}