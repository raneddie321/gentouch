import React, { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Calendar, CheckCircle, ChevronLeft, ChevronRight, Clock, Mail, MapPin, MessageSquare, Phone, Sparkles, User } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { createAppointment, getSlotState, TIME_SLOTS } from '@/lib/appointments';
import { getServiceSettings } from '@/lib/serviceSettings';

const STEPS = [
  { id: 1, label: 'סוג טיפול' },
  { id: 2, label: 'תאריך ושעה' },
  { id: 3, label: 'פרטים אישיים' },
  { id: 4, label: 'הערות' },
];

const today = new Date().toISOString().split('T')[0];

export default function Book() {
  const services = getServiceSettings();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({ service: '', date: '', time: '', name: '', phone: '', email: '', notes: '' });
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [refreshKey, setRefreshKey] = useState(0);

  const selectedService = services.find((service) => service.id === form.service);

  useEffect(() => {
    const refresh = () => setRefreshKey((value) => value + 1);
    window.addEventListener('storage', refresh);
    return () => window.removeEventListener('storage', refresh);
  }, []);

  const canNext = () => {
    if (step === 1) return Boolean(form.service);
    if (step === 2) return Boolean(form.date && form.time);
    if (step === 3) return Boolean(form.name && form.phone);
    return true;
  };

  const handleDateChange = (date) => {
    setError('');
    setForm({ ...form, date, time: '' });
  };

  const handleSubmit = async () => {
    const slotState = getSlotState(form.date, form.time);
    if (!slotState.available) {
      setError('השעה הזאת כבר לא זמינה. בחרו שעה אחרת.');
      setStep(2);
      return;
    }

    setSending(true);
    createAppointment({
      ...form,
      service: selectedService?.label,
      status: 'ממתין',
    });
    setSuccess(true);
    setSending(false);
  };

  if (success) {
    return (
      <div dir="rtl" className="min-h-screen bg-[#cc93c0] flex flex-col items-center justify-center px-4 font-heebo">
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: 'spring', duration: 0.7 }}
          className="bg-white rounded-3xl shadow-xl p-10 max-w-md w-full text-center"
        >
          <div className="w-20 h-20 rounded-full bg-green-100 flex items-center justify-center mx-auto mb-5">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h2 className="font-playfair text-3xl font-bold text-foreground mb-3">התור נקבע!</h2>
          <p className="text-muted-foreground mb-1">{form.name}, קיבלנו את הבקשה שלך לתור</p>
          <p className="font-semibold text-foreground mb-1">{selectedService?.label}</p>
          <p className="text-muted-foreground mb-6">
            {new Date(form.date).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })} | {form.time}
          </p>
          <p className="text-sm text-muted-foreground/70 mb-8">נחזור אליך בהקדם לאישור</p>
          <a href="/Home" className="text-primary text-sm underline underline-offset-4">חזרה לאתר</a>
        </motion.div>
        <Watermark />
      </div>
    );
  }

  return (
    <div dir="rtl" className="min-h-screen bg-[#cc93c0] flex flex-col font-heebo">
      <div className="bg-white/80 backdrop-blur border-b border-border/30 px-4 py-4 text-center">
        <a href="/Home" className="font-playfair text-lg font-bold text-primary block mb-1">בנגיעה אחת רכה</a>
        <p className="text-xs text-muted-foreground">קביעת תור מקוונת</p>
      </div>

      <div className="flex-1 flex flex-col items-center justify-start px-4 py-8 pb-20">
        <div className="flex items-center gap-2 mb-10">
          {STEPS.map((item, index) => (
            <React.Fragment key={item.id}>
              <div className="flex flex-col items-center gap-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300 ${
                  step > item.id ? 'bg-primary text-primary-foreground' :
                  step === item.id ? 'bg-primary text-primary-foreground ring-4 ring-primary/20' :
                  'bg-white border-2 border-border/40 text-muted-foreground'
                }`}>
                  {step > item.id ? <CheckCircle className="w-4 h-4" /> : item.id}
                </div>
                <span className={`text-xs hidden sm:block ${step === item.id ? 'text-primary font-medium' : 'text-muted-foreground'}`}>{item.label}</span>
              </div>
              {index < STEPS.length - 1 && (
                <div className={`h-0.5 w-8 sm:w-16 transition-all duration-300 ${step > item.id ? 'bg-primary' : 'bg-border/40'}`} />
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="w-full max-w-lg">
          <AnimatePresence mode="wait">
            <motion.div
              key={`${step}-${refreshKey}`}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.25 }}
              className="bg-white rounded-3xl shadow-lg p-6 md:p-8"
            >
              {step === 1 && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-1">בחרו סוג טיפול</h2>
                  <p className="text-sm text-muted-foreground mb-6">איזה טיפול תרצו לקבל?</p>
                  <div className="space-y-3">
                    {services.map((service) => (
                      <button
                        key={service.id}
                        type="button"
                        onClick={() => setForm({ ...form, service: service.id })}
                        className={`w-full text-right flex items-center gap-4 px-4 py-4 rounded-2xl border-2 transition-all duration-200 ${
                          form.service === service.id
                            ? 'border-primary bg-primary/5'
                            : 'border-border/40 hover:border-primary/30 bg-white'
                        }`}
                      >
                        <span className="text-2xl">{service.emoji}</span>
                        <div className="flex-1">
                          <p className="font-semibold text-foreground">{service.label}</p>
                          <p className="text-xs text-muted-foreground mt-0.5">{service.desc}</p>
                        </div>
                        <div className="text-left shrink-0">
                          <p className="font-bold text-primary text-sm">{service.price}</p>
                          <p className="text-xs text-muted-foreground">{service.duration}</p>
                        </div>
                      </button>
                    ))}
                  </div>
                  {form.service === 'home' && (
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 flex items-center gap-2 text-primary bg-primary/5 rounded-xl px-4 py-3">
                      <MapPin className="w-4 h-4 shrink-0" />
                      <p className="text-sm">אזור השירות: חדרה עד נתניה.</p>
                    </motion.div>
                  )}
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-1">תאריך ושעה</h2>
                  <p className="text-sm text-muted-foreground mb-6">השעות מתעדכנות לפי הזמינות שסומנה בפאנל הניהול.</p>
                  <div className="mb-5">
                    <label className="text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2">
                      <Calendar className="w-4 h-4 text-primary" /> בחרו תאריך
                    </label>
                    <Input type="date" min={today} value={form.date} onChange={(e) => handleDateChange(e.target.value)} className="bg-stone-50 border-border/60 rounded-xl h-12 text-right" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground/80 mb-3 flex items-center gap-2">
                      <Clock className="w-4 h-4 text-primary" /> בחרו שעה
                    </label>
                    <div className="grid grid-cols-4 gap-2 mb-3">
                      {TIME_SLOTS.map((time) => {
                        const slotState = getSlotState(form.date, time);
                        const selected = form.time === time;
                        return (
                          <button
                            key={time}
                            type="button"
                            disabled={!slotState.available}
                            onClick={() => {
                              setError('');
                              setForm({ ...form, time });
                            }}
                            className={`text-sm py-2.5 rounded-xl border-2 transition-all duration-200 font-medium ${
                              !slotState.available
                                ? 'border-border/20 bg-stone-50 text-muted-foreground/30 cursor-not-allowed line-through'
                                : selected
                                ? 'border-primary bg-primary/10 text-primary'
                                : 'border-border/40 bg-white text-foreground/70 hover:border-primary/40'
                            }`}
                            title={slotState.reason}
                          >
                            {time}
                          </button>
                        );
                      })}
                    </div>
                    {error && <p className="text-sm text-red-500 mb-3">{error}</p>}
                    <div className="flex items-center gap-4">
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-3 rounded bg-primary/20 border-2 border-primary inline-block" /> פנוי</span>
                      <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><span className="w-3 h-3 rounded bg-stone-100 border-2 border-border/20 inline-block" /> תפוס / לא זמין</span>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-1">פרטים אישיים</h2>
                  <p className="text-sm text-muted-foreground mb-6">כדי שנוכל ליצור קשר</p>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"><User className="w-4 h-4 text-primary" /> שם מלא *</label>
                      <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="השם שלכם" className="bg-stone-50 border-border/60 rounded-xl h-12 text-right" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"><Phone className="w-4 h-4 text-primary" /> טלפון *</label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="מספר טלפון" type="tel" className="bg-stone-50 border-border/60 rounded-xl h-12 text-right" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"><Mail className="w-4 h-4 text-primary" /> אימייל (אופציונלי)</label>
                      <Input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="כתובת אימייל" type="email" className="bg-stone-50 border-border/60 rounded-xl h-12 text-right" />
                    </div>
                  </div>
                </div>
              )}

              {step === 4 && (
                <div>
                  <h2 className="font-playfair text-2xl font-bold text-foreground mb-1">הערות למטפל</h2>
                  <p className="text-sm text-muted-foreground mb-6">מידע שיעזור לנו להתכונן</p>

                  <label className="text-sm font-medium text-foreground/80 mb-2 flex items-center gap-2"><MessageSquare className="w-4 h-4 text-primary" /> הערות אישיות (אופציונלי)</label>
                  <Textarea
                    value={form.notes}
                    onChange={(e) => setForm({ ...form, notes: e.target.value })}
                    placeholder="לדוגמה: כאב גב תחתון, פציעה ישנה בכתף, העדפת לחץ עדין או חזק..."
                    className="bg-stone-50 border-border/60 rounded-xl min-h-[100px] text-right resize-none mb-6"
                  />

                  <div className="bg-primary/5 border border-primary/20 rounded-2xl p-5 space-y-2">
                    <p className="text-sm font-bold text-primary mb-3 flex items-center gap-2"><Sparkles className="w-4 h-4" /> סיכום הזמנה</p>
                    <div className="space-y-1.5">
                      <p className="text-sm text-foreground"><span className="text-muted-foreground">טיפול: </span><strong>{selectedService?.emoji} {selectedService?.label}</strong></p>
                      <p className="text-sm text-foreground"><span className="text-muted-foreground">מחיר: </span><strong>{selectedService?.price} | {selectedService?.duration}</strong></p>
                      <p className="text-sm text-foreground"><span className="text-muted-foreground">תאריך: </span><strong>{new Date(form.date).toLocaleDateString('he-IL', { weekday: 'long', day: 'numeric', month: 'long' })}</strong></p>
                      <p className="text-sm text-foreground"><span className="text-muted-foreground">שעה: </span><strong>{form.time}</strong></p>
                      <p className="text-sm text-foreground"><span className="text-muted-foreground">שם: </span><strong>{form.name}</strong></p>
                      <p className="text-sm text-foreground"><span className="text-muted-foreground">טלפון: </span><strong>{form.phone}</strong></p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-between mt-5 gap-3">
            {step > 1 ? (
              <button onClick={() => setStep(step - 1)} className="flex items-center gap-2 px-5 py-3 rounded-full border border-border/60 bg-white text-foreground/70 text-sm font-medium hover:border-primary/40 transition-all">
                <ChevronRight className="w-4 h-4" /> חזור
              </button>
            ) : (
              <a href="/Home" className="flex items-center gap-2 px-5 py-3 rounded-full border border-border/60 bg-white text-foreground/70 text-sm font-medium hover:border-primary/40 transition-all">
                <ChevronRight className="w-4 h-4" /> ביטול
              </a>
            )}

            {step < 4 ? (
              <button
                onClick={() => canNext() && setStep(step + 1)}
                disabled={!canNext()}
                className={`flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium transition-all ${
                  canNext()
                    ? 'bg-primary text-primary-foreground hover:opacity-90'
                    : 'bg-muted text-muted-foreground cursor-not-allowed'
                }`}
              >
                המשך <ChevronLeft className="w-4 h-4" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={sending || !canNext()}
                className="flex items-center gap-2 px-7 py-3 rounded-full bg-primary text-primary-foreground text-sm font-medium hover:opacity-90 transition-all disabled:opacity-60"
              >
                {sending ? (
                  <><div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" /> שולח...</>
                ) : (
                  <><CheckCircle className="w-4 h-4" /> שלח הזמנה</>
                )}
              </button>
            )}
          </div>
        </div>
      </div>

      <Watermark />
    </div>
  );
}

function Watermark() {
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 pointer-events-none select-none">
      <div className="bg-black/60 backdrop-blur-sm text-white/70 text-xs px-4 py-1.5 rounded-full font-heebo tracking-wide">
        Powered by <span className="font-bold text-white">PrimeCODE AI</span>
      </div>
    </div>
  );
}
