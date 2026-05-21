const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Calendar, Clock, User, Phone, Mail, Send, CheckCircle, ChevronDown, MessageSquare, MapPin } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { getServiceSettings } from '@/lib/serviceSettings';

const TIME_SLOTS = [
  '09:00', '10:00', '11:00', '12:00',
  '13:00', '14:00', '15:00', '16:00',
  '17:00', '18:00', '19:00'
];

// Simulate some unavailable slots (in a real app this would come from DB)
const UNAVAILABLE = ['11:00', '14:00', '17:00'];

export default function BookingSection() {
  const SERVICES = getServiceSettings();
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [serviceOpen, setServiceOpen] = useState(false);

  const today = new Date().toISOString().split('T')[0];
  const selectedService = SERVICES.find(s => s.id === form.service);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.service || !form.date || !form.time) {
      toast.error('נא למלא את כל השדות הנדרשים');
      return;
    }
    setSending(true);
    await db.entities.Appointment.create({ ...form, service: selectedService?.label, status: 'ממתין' });
    setSuccess(true);
    setSending(false);
  };

  if (success) {
    return (
      <section id="booking" dir="rtl" className="py-24 px-4 bg-background">
        <div className="max-w-xl mx-auto text-center">
          <motion.div initial={{ scale: 0, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ type: 'spring', duration: 0.7 }}>
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle className="w-12 h-12 text-primary" />
            </div>
            <h3 className="font-playfair text-3xl font-bold text-foreground mb-4">התור נקבע בהצלחה!</h3>
            <p className="font-heebo text-muted-foreground text-lg mb-2">{form.name}, קיבלנו את בקשתך לתור</p>
            <p className="font-heebo text-foreground font-medium mb-1">{selectedService?.label}</p>
            <p className="font-heebo text-muted-foreground mb-8">
              {new Date(form.date).toLocaleDateString('he-IL', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })} בשעה {form.time}
            </p>
            <p className="font-heebo text-muted-foreground/70 text-sm mb-8">נחזור אליך בהקדם לאישור</p>
            <button
              onClick={() => { setSuccess(false); setForm({ name: '', phone: '', email: '', service: '', date: '', time: '', notes: '' }); }}
              className="font-heebo text-primary text-sm underline underline-offset-4"
            >
              קביעת תור נוסף
            </button>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section id="booking" dir="rtl" className="py-24 md:py-32 px-4 bg-background">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <p className="font-heebo text-primary text-sm tracking-[0.2em] uppercase mb-3">הזמינו עכשיו</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">קביעת תור</h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-heebo text-muted-foreground text-lg">בחרו שירות, תאריך ושעה ונחזור אליכם לאישור</p>
        </motion.div>

        <motion.form
          initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          onSubmit={handleSubmit}
          className="bg-card border border-border/50 rounded-3xl p-8 md:p-10 space-y-8"
        >
          {/* Personal Details */}
          <div>
            <h3 className="font-heebo text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">פרטים אישיים</h3>
            <div className="grid sm:grid-cols-2 gap-5">
              <div>
                <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                  <User className="w-4 h-4 text-primary" /> שם מלא *
                </label>
                <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="השם שלכם" className="font-heebo bg-background border-border/60 rounded-xl h-12 text-right" />
              </div>
              <div>
                <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                  <Phone className="w-4 h-4 text-primary" /> טלפון *
                </label>
                <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="מספר טלפון" type="tel" className="font-heebo bg-background border-border/60 rounded-xl h-12 text-right" />
              </div>
            </div>
            <div className="mt-5">
              <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                <Mail className="w-4 h-4 text-primary" /> אימייל (אופציונלי)
              </label>
              <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="כתובת אימייל" type="email" className="font-heebo bg-background border-border/60 rounded-xl h-12 text-right" />
            </div>
          </div>

          <div className="w-full h-px bg-border/40" />

          {/* Service Dropdown */}
          <div>
            <h3 className="font-heebo text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">סוג טיפול</h3>
            <div className="relative">
              <button
                type="button"
                onClick={() => setServiceOpen(!serviceOpen)}
                className={`w-full font-heebo text-right flex items-center justify-between px-4 h-14 rounded-xl border transition-all duration-200 ${
                  form.service ? 'border-primary bg-primary/5 text-foreground' : 'border-border/60 bg-background text-muted-foreground'
                }`}
              >
                <ChevronDown className={`w-4 h-4 text-primary transition-transform duration-200 ${serviceOpen ? 'rotate-180' : ''}`} />
                <span className="font-heebo">
                  {selectedService ? (
                    <span className="flex items-center gap-2">
                      <span className="font-medium">{selectedService.label}</span>
                      <span className="text-sm text-muted-foreground">— {selectedService.duration} | {selectedService.price}</span>
                    </span>
                  ) : 'בחרו סוג טיפול *'}
                </span>
              </button>

              <AnimatePresence>
                {serviceOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.15 }}
                    className="absolute top-full mt-2 w-full bg-card border border-border/60 rounded-2xl shadow-xl z-50 overflow-hidden"
                  >
                    {SERVICES.map((s) => (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => { setForm({ ...form, service: s.id }); setServiceOpen(false); }}
                        className={`w-full text-right px-5 py-4 flex items-center justify-between transition-colors duration-150 border-b border-border/30 last:border-0 ${
                          form.service === s.id ? 'bg-primary/10' : 'hover:bg-muted/50'
                        }`}
                      >
                        <div className="text-left">
                          <span className="font-heebo text-xs text-primary font-semibold">{s.price}</span>
                          <span className="font-heebo text-xs text-muted-foreground block">{s.duration}</span>
                        </div>
                        <div className="text-right">
                          <p className="font-heebo font-medium text-foreground">{s.label}</p>
                          <p className="font-heebo text-xs text-muted-foreground mt-0.5">{s.desc}</p>
                        </div>
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {form.service === 'home' && (
              <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="mt-3 flex items-center gap-2 text-primary bg-primary/5 rounded-xl px-4 py-3">
                <MapPin className="w-4 h-4 shrink-0" />
                <p className="font-heebo text-sm">אזור השירות: חדרה עד נתניה. תוספת נסיעה כלולה במחיר.</p>
              </motion.div>
            )}
          </div>

          <div className="w-full h-px bg-border/40" />

          {/* Date & Time */}
          <div>
            <h3 className="font-heebo text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">תאריך ושעה</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              <div>
                <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-primary" /> תאריך *
                </label>
                <Input type="date" min={today} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value, time: '' })} className="font-heebo bg-background border-border/60 rounded-xl h-12 text-right" />
              </div>
              <div>
                <label className="font-heebo text-sm font-medium text-foreground/80 mb-3 flex items-center gap-2">
                  <Clock className="w-4 h-4 text-primary" /> שעה *
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {TIME_SLOTS.map((t) => {
                    const unavailable = UNAVAILABLE.includes(t);
                    return (
                      <button
                        key={t}
                        type="button"
                        disabled={unavailable}
                        onClick={() => !unavailable && setForm({ ...form, time: t })}
                        className={`font-heebo text-xs py-2.5 rounded-xl border transition-all duration-200 relative ${
                          unavailable
                            ? 'border-border/30 bg-muted/30 text-muted-foreground/40 cursor-not-allowed line-through'
                            : form.time === t
                            ? 'border-primary bg-primary/10 text-primary font-semibold shadow-sm'
                            : 'border-border/60 bg-background text-foreground/70 hover:border-primary/50 hover:bg-primary/5'
                        }`}
                      >
                        {t}
                      </button>
                    );
                  })}
                </div>
                <div className="flex items-center gap-4 mt-3">
                  <span className="flex items-center gap-1.5 font-heebo text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded bg-primary/20 border border-primary inline-block" /> פנוי
                  </span>
                  <span className="flex items-center gap-1.5 font-heebo text-xs text-muted-foreground">
                    <span className="w-3 h-3 rounded bg-muted/30 border border-border/30 inline-block" /> תפוס
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full h-px bg-border/40" />

          {/* Notes */}
          <div>
            <h3 className="font-heebo text-sm font-semibold text-foreground/60 uppercase tracking-widest mb-4">הערות למטפל</h3>
            <label className="font-heebo text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
              <MessageSquare className="w-4 h-4 text-primary" /> הערות אישיות לפני ההגעה (אופציונלי)
            </label>
            <Textarea
              value={form.notes}
              onChange={(e) => setForm({ ...form, notes: e.target.value })}
              placeholder="לדוגמה: כאב גב תחתון, פציעה ישנה בכתף, רגישות לשמן מסוים, העדפת לחץ עדין/חזק..."
              className="font-heebo bg-background border-border/60 rounded-xl min-h-[110px] text-right resize-none"
            />
            <p className="font-heebo text-xs text-muted-foreground/60 mt-2">המידע יישמר בסוד ויועבר ישירות למטפל לפני הטיפול</p>
          </div>

          {/* Summary */}
          {(selectedService || form.date || form.time) && (
            <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: 'auto' }} className="bg-primary/5 border border-primary/20 rounded-2xl px-5 py-4 space-y-1">
              <p className="font-heebo text-sm font-semibold text-primary mb-2">סיכום הבקשה</p>
              {selectedService && <p className="font-heebo text-sm text-foreground">סוג טיפול: <strong>{selectedService.label}</strong> — {selectedService.price} | {selectedService.duration}</p>}
              {form.date && <p className="font-heebo text-sm text-foreground">תאריך: <strong>{new Date(form.date).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}</strong></p>}
              {form.time && <p className="font-heebo text-sm text-foreground">שעה: <strong>{form.time}</strong></p>}
            </motion.div>
          )}

          <Button
            type="submit"
            disabled={sending}
            className="w-full font-heebo bg-primary text-primary-foreground rounded-full py-6 text-base font-medium hover:opacity-90 transition-all"
          >
            {sending ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-4 h-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
                שולח...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-2">
                <Send className="w-4 h-4" />
                קביעת תור
              </span>
            )}
          </Button>
        </motion.form>
      </div>
    </section>
  );
}
