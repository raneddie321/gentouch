import React from 'react';
import { motion } from 'framer-motion';
import { CalendarCheck, Clock, MapPin, Phone } from 'lucide-react';

export default function ContactSection() {
  return (
    <section id="contact" dir="rtl" className="py-24 md:py-32 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-heebo text-primary text-sm tracking-[0.2em] uppercase mb-3">יצירת קשר</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
            לקביעת תור
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <a
            href="/Book"
            className="inline-flex items-center justify-center gap-2 font-heebo bg-primary text-primary-foreground rounded-full px-9 py-4 text-base font-medium hover:opacity-90 transition-all"
          >
            <CalendarCheck className="w-5 h-5" />
            מעבר לטופס קביעת תור
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid md:grid-cols-3 gap-5"
        >
          <div className="p-6 rounded-2xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Phone className="w-5 h-5 text-primary" />
            </div>
            <p className="font-heebo text-sm font-medium text-foreground mb-1">טלפון</p>
            <p className="font-heebo text-muted-foreground text-sm">לאחר שליחת הזמנה נחזור אליכם לאישור בהקדם.</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="w-5 h-5 text-primary" />
            </div>
            <p className="font-heebo text-sm font-medium text-foreground mb-1">שעות פעילות</p>
            <p className="font-heebo text-muted-foreground text-sm">ראשון - חמישי: 09:00 - 20:00</p>
            <p className="font-heebo text-muted-foreground text-sm">שישי: 09:00 - 14:00</p>
          </div>

          <div className="p-6 rounded-2xl bg-card border border-border/50">
            <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <MapPin className="w-5 h-5 text-primary" />
            </div>
            <p className="font-heebo text-sm font-medium text-foreground mb-1">אזורי שירות</p>
            <p className="font-heebo text-muted-foreground text-sm">טיפולים בקליניקה ובבית הלקוח באזור עמק חפר, חדרה ונתניה.</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
