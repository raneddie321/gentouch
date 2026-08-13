import React from 'react';
import { motion } from 'framer-motion';
import { Award, ExternalLink, Maximize2 } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

const CERTIFICATES_PDF = 'https://media.db.com/files/public/user_696d0abebfd23bf1bebcd93b/2f8134dfa_CamScanner180320261206.pdf';
const CERTIFICATE_PREVIEW = 'https://images.unsplash.com/photo-1589330694653-ded6df03f754?w=900&q=80';

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
            כל התעודות הונפקו על ידי מכון וינגייט. לחצו על תעודה כדי להגדיל.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
          {certificates.map((cert, i) => (
            <Dialog key={cert.title}>
              <DialogTrigger asChild>
                <motion.button
                  type="button"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="group text-right rounded-2xl bg-card border border-border/50 hover:border-primary/30 transition-all duration-300 hover:shadow-lg overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
                >
                  <div className="relative aspect-[4/3] bg-muted overflow-hidden">
                    <img
                      src={cert.image || CERTIFICATE_PREVIEW}
                      alt={`תעודת ${cert.title}`}
                      className="w-full h-full object-cover opacity-90 transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/5 to-transparent" />
                    <div className="absolute bottom-3 left-3 rounded-full bg-white/90 text-primary p-2">
                      <Maximize2 className="w-4 h-4" />
                    </div>
                  </div>
                  <div className="p-5">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Award className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-playfair text-xl font-bold text-foreground mb-1">
                          {cert.title}
                        </h3>
                        <p className="font-heebo text-muted-foreground text-xs">מכון וינגייט</p>
                        <p className="font-heebo text-muted-foreground/70 text-xs mt-1">
                          תקופת הקורס: {cert.period}
                        </p>
                        <p className="font-heebo text-primary/80 text-xs mt-1">
                          תאריך הנפקה: {cert.date}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.button>
              </DialogTrigger>
              <DialogContent dir="rtl" className="max-w-4xl p-0 overflow-hidden bg-card">
                <DialogTitle className="sr-only">{cert.title}</DialogTitle>
                <DialogDescription className="sr-only">
                  תצוגה מוגדלת של תעודת ההסמכה.
                </DialogDescription>
                <div className="grid md:grid-cols-[1fr_280px]">
                  <img
                    src={cert.image || CERTIFICATE_PREVIEW}
                    alt={`תעודת ${cert.title}`}
                    className="w-full h-full max-h-[78vh] object-contain bg-muted"
                  />
                  <div className="p-6 flex flex-col justify-between gap-6">
                    <div>
                      <p className="font-heebo text-primary text-sm mb-2">מכון וינגייט</p>
                      <h3 className="font-playfair text-2xl font-bold text-foreground mb-4">{cert.title}</h3>
                      <p className="font-heebo text-sm text-muted-foreground mb-1">תקופת הקורס: {cert.period}</p>
                      <p className="font-heebo text-sm text-muted-foreground">תאריך הנפקה: {cert.date}</p>
                    </div>
                    <a
                      href={CERTIFICATES_PDF}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 font-heebo text-primary hover:text-primary/80 transition-colors text-sm font-medium border border-primary/30 rounded-full px-5 py-3 hover:bg-primary/5"
                    >
                      <ExternalLink className="w-4 h-4" />
                      צפייה בקובץ המקורי
                    </a>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          ))}
        </div>
      </div>
    </section>
  );
}
