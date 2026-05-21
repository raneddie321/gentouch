import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Send, Clock } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

export default function ContactSection() {
  const [form, setForm] = useState({ name: '', phone: '', message: '' });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone) {
      toast.error('נא למלא שם וטלפון');
      return;
    }
    setSending(true);
    // Simulate sending
    await new Promise((r) => setTimeout(r, 1000));
    toast.success('ההודעה נשלחה בהצלחה! נחזור אליך בהקדם');
    setForm({ name: '', phone: '', message: '' });
    setSending(false);
  };

  return (
    <section id="contact" dir="rtl" className="py-24 md:py-32 px-4 bg-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-heebo text-primary text-sm tracking-[0.2em] uppercase mb-3">צור קשר</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
            בואו נדבר
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-heebo text-muted-foreground text-lg max-w-2xl mx-auto">
            מעוניינים לקבוע תור או לשאול שאלה? מלאו את הטופס ואחזור אליכם בהקדם
          </p>
        </motion.div>

        <div className="grid md:grid-cols-5 gap-8 md:gap-12">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-3"
          >
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 block">שם מלא</label>
                  <Input
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="השם שלכם"
                    className="font-heebo bg-background border-border/60 rounded-xl h-12 text-right"
                  />
                </div>
                <div>
                  <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 block">טלפון</label>
                  <Input
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    placeholder="מספר הטלפון שלכם"
                    className="font-heebo bg-background border-border/60 rounded-xl h-12 text-right"
                    type="tel"
                  />
                </div>
              </div>
              <div>
                <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 block">הודעה</label>
                <Textarea
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  placeholder="ספרו לי על מה אתם רוצים לטפל..."
                  className="font-heebo bg-background border-border/60 rounded-xl min-h-[140px] text-right resize-none"
                />
              </div>
              <Button
                type="submit"
                disabled={sending}
                className="w-full sm:w-auto font-heebo bg-primary text-primary-foreground rounded-full px-10 py-6 text-base font-medium hover:opacity-90 transition-all"
              >
                {sending ? (
                  <span className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                    שולח...
                  </span>
                ) : (
                  <span className="flex items-center gap-2">
                    <Send className="w-4 h-4" />
                    שליחת הודעה
                  </span>
                )}
              </Button>
            </form>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="md:col-span-2 space-y-6"
          >
            <div className="p-6 rounded-2xl bg-card border border-border/50 space-y-6">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heebo text-sm font-medium text-foreground mb-1">טלפון</p>
                  <p className="font-heebo text-muted-foreground text-sm">ליצירת קשר מלאו את הטופס</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heebo text-sm font-medium text-foreground mb-1">שעות פעילות</p>
                  <p className="font-heebo text-muted-foreground text-sm">ראשון - חמישי: 09:00 - 20:00</p>
                  <p className="font-heebo text-muted-foreground text-sm">שישי: 09:00 - 14:00</p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-heebo text-sm font-medium text-foreground mb-1">מיקום</p>
                  <p className="font-heebo text-muted-foreground text-sm">טיפולים בקליניקה ובבית המטופל</p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}