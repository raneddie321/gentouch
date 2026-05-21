import React, { useState } from 'react';
import { Calendar, CheckCircle, Clock, FileText, Loader2, Mail, Phone, Save, User, XCircle } from 'lucide-react';
import { toast } from 'sonner';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { DEFAULT_SERVICE_SETTINGS, getServiceSettings, resetServiceSettings, saveServiceSettings } from '@/lib/serviceSettings';
import { getAppointments, getDayAvailability, saveDayAvailability, TIME_SLOTS, updateAppointmentStatus } from '@/lib/appointments';

const ADMIN_CODE = 'poiuytrewq1';
const today = new Date().toISOString().split('T')[0];

const STATUS_COLORS = {
  ממתין: 'bg-yellow-100 text-yellow-800 border-yellow-200',
  אושר: 'bg-green-100 text-green-800 border-green-200',
  בוטל: 'bg-red-100 text-red-800 border-red-200',
};

function AdminLogin({ onSuccess }) {
  const [code, setCode] = useState('');
  const [error, setError] = useState(false);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (code === ADMIN_CODE) {
      onSuccess();
      return;
    }

    setError(true);
    setCode('');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background font-heebo flex items-center justify-center px-4">
      <div className="bg-card border border-border/50 rounded-3xl p-10 w-full max-w-sm text-center shadow-lg">
        <h1 className="font-playfair text-2xl font-bold text-foreground mb-2">פאנל ניהול</h1>
        <p className="font-heebo text-muted-foreground text-sm mb-8">הזן קוד גישה להמשך</p>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="password"
            value={code}
            onChange={(event) => {
              setCode(event.target.value);
              setError(false);
            }}
            placeholder="קוד גישה"
            className={`w-full text-center font-heebo border rounded-xl h-12 px-4 bg-background outline-none transition-colors ${
              error ? 'border-red-400' : 'border-border/60 focus:border-primary'
            }`}
          />
          {error && <p className="font-heebo text-red-500 text-sm">קוד שגוי, נסה שוב</p>}
          <button
            type="submit"
            className="w-full font-heebo bg-primary text-primary-foreground rounded-full py-3 font-medium hover:opacity-90 transition-opacity"
          >
            כניסה
          </button>
        </form>
      </div>
    </div>
  );
}

export default function Admin() {
  const [unlocked, setUnlocked] = useState(false);
  const [filter, setFilter] = useState('הכל');
  const [appointments, setAppointments] = useState(getAppointments());
  const [serviceSettings, setServiceSettings] = useState(getServiceSettings());
  const [availabilityDate, setAvailabilityDate] = useState(today);
  const [availability, setAvailability] = useState(getDayAvailability(today));

  if (!unlocked) return <AdminLogin onSuccess={() => setUnlocked(true)} />;

  const filtered = filter === 'הכל' ? appointments : appointments.filter((appointment) => appointment.status === filter);
  const counts = {
    הכל: appointments.length,
    ממתין: appointments.filter((appointment) => appointment.status === 'ממתין').length,
    אושר: appointments.filter((appointment) => appointment.status === 'אושר').length,
    בוטל: appointments.filter((appointment) => appointment.status === 'בוטל').length,
  };

  const bookedSlotsForSelectedDate = new Set(
    appointments
      .filter((appointment) => appointment.date === availabilityDate)
      .map((appointment) => appointment.time)
  );

  const updateServiceField = (serviceId, field, value) => {
    setServiceSettings((prev) =>
      prev.map((service) => (service.id === serviceId ? { ...service, [field]: value } : service))
    );
  };

  const handleSaveServices = () => {
    saveServiceSettings(serviceSettings);
    toast.success('השירותים נשמרו בהצלחה');
  };

  const handleResetServices = () => {
    resetServiceSettings();
    setServiceSettings(DEFAULT_SERVICE_SETTINGS);
    toast.success('השירותים אופסו לברירת מחדל');
  };

  const persistAvailability = (nextAvailability) => {
    const saved = saveDayAvailability(availabilityDate, nextAvailability);
    setAvailability(saved);
    toast.success('הזמינות נשמרה');
  };

  const handleAvailabilityDateChange = (date) => {
    setAvailabilityDate(date);
    setAvailability(getDayAvailability(date));
  };

  const toggleSlot = (time) => {
    const unavailableSlots = availability.unavailableSlots.includes(time)
      ? availability.unavailableSlots.filter((slot) => slot !== time)
      : [...availability.unavailableSlots, time];

    persistAvailability({ ...availability, closed: false, unavailableSlots });
  };

  const setFullDay = (closed) => {
    persistAvailability({
      closed,
      unavailableSlots: closed ? TIME_SLOTS : [],
    });
  };

  const handleStatusChange = (id, status) => {
    const nextAppointments = updateAppointmentStatus(id, status);
    setAppointments(nextAppointments);
    toast.success('הסטטוס עודכן');
  };

  return (
    <div dir="rtl" className="min-h-screen bg-background font-heebo">
      <div className="bg-card border-b border-border/50 px-4 py-6">
        <div className="max-w-5xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="font-playfair text-2xl md:text-3xl font-bold text-foreground">פאנל ניהול תורים</h1>
            <p className="font-heebo text-muted-foreground text-sm mt-1">בנגיעה אחת רכה</p>
          </div>
          <a href="/" className="font-heebo text-sm text-primary hover:underline">חזרה לאתר</a>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 py-8">
        <section className="bg-card border border-border/50 rounded-2xl p-5 md:p-6 mb-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-5">
            <div>
              <h2 className="font-heebo text-xl font-bold text-foreground">זמינות יומית</h2>
              <p className="font-heebo text-sm text-muted-foreground mt-1">בכל בוקר סמנו לאיזה שעות אפשר להזמין. שעות שהוזמנו כבר נחסמות אוטומטית.</p>
            </div>
            <div className="w-full md:w-56">
              <Input
                type="date"
                min={today}
                value={availabilityDate}
                onChange={(event) => handleAvailabilityDateChange(event.target.value)}
                className="font-heebo bg-background"
              />
            </div>
          </div>

          <div className="flex flex-wrap gap-2 mb-5">
            <Button className="font-heebo rounded-full" onClick={() => setFullDay(false)}>
              כל היום זמין
            </Button>
            <Button variant="outline" className="font-heebo rounded-full" onClick={() => setFullDay(true)}>
              כל היום לא זמין
            </Button>
          </div>

          <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-2">
            {TIME_SLOTS.map((time) => {
              const booked = bookedSlotsForSelectedDate.has(time);
              const unavailable = availability.closed || availability.unavailableSlots.includes(time);
              return (
                <button
                  key={time}
                  type="button"
                  disabled={booked}
                  onClick={() => toggleSlot(time)}
                  className={`rounded-xl border-2 px-3 py-3 text-sm font-bold transition-all ${
                    booked
                      ? 'border-yellow-300 bg-yellow-100 text-yellow-800 cursor-not-allowed'
                      : unavailable
                      ? 'border-red-200 bg-red-50 text-red-700'
                      : 'border-green-200 bg-green-50 text-green-700'
                  }`}
                >
                  <span className="block">{time}</span>
                  <span className="block text-[11px] font-medium mt-1">
                    {booked ? 'הוזמן' : unavailable ? 'לא זמין' : 'זמין'}
                  </span>
                </button>
              );
            })}
          </div>
        </section>

        <section className="bg-card border border-border/50 rounded-2xl p-5 md:p-6 mb-8">
          <div className="flex items-center justify-between gap-3 mb-5">
            <div>
              <h2 className="font-heebo text-xl font-bold text-foreground">ניהול שירותים ומחירים</h2>
              <p className="font-heebo text-sm text-muted-foreground mt-1">העדכונים ישפיעו על דף הבית ועל טופס קביעת התור</p>
            </div>
            <div className="flex gap-2">
              <Button variant="outline" className="font-heebo rounded-full" onClick={handleResetServices}>
                איפוס
              </Button>
              <Button className="font-heebo rounded-full" onClick={handleSaveServices}>
                <Save className="w-4 h-4 ml-1" />
                שמור
              </Button>
            </div>
          </div>

          <div className="space-y-5">
            {serviceSettings.map((service) => (
              <div key={service.id} className="border border-border/50 rounded-2xl p-4 md:p-5 bg-background/40">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="font-heebo text-sm text-muted-foreground mb-1 block">שם שירות</label>
                    <Input value={service.label} onChange={(event) => updateServiceField(service.id, 'label', event.target.value)} className="font-heebo" />
                  </div>
                  <div>
                    <label className="font-heebo text-sm text-muted-foreground mb-1 block">אימוג׳י</label>
                    <Input value={service.emoji} onChange={(event) => updateServiceField(service.id, 'emoji', event.target.value)} className="font-heebo" />
                  </div>
                  <div>
                    <label className="font-heebo text-sm text-muted-foreground mb-1 block">מחיר</label>
                    <Input value={service.price} onChange={(event) => updateServiceField(service.id, 'price', event.target.value)} className="font-heebo" />
                  </div>
                  <div>
                    <label className="font-heebo text-sm text-muted-foreground mb-1 block">משך טיפול</label>
                    <Input value={service.duration} onChange={(event) => updateServiceField(service.id, 'duration', event.target.value)} className="font-heebo" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-heebo text-sm text-muted-foreground mb-1 block">קישור תמונה</label>
                    <Input value={service.image} onChange={(event) => updateServiceField(service.id, 'image', event.target.value)} className="font-heebo" />
                  </div>
                  <div className="md:col-span-2">
                    <label className="font-heebo text-sm text-muted-foreground mb-1 block">מידע/תיאור השירות</label>
                    <Textarea value={service.desc} onChange={(event) => updateServiceField(service.id, 'desc', event.target.value)} className="font-heebo min-h-[90px] resize-y" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: 'סך הכל', key: 'הכל', color: 'text-foreground' },
            { label: 'ממתינים', key: 'ממתין', color: 'text-yellow-600' },
            { label: 'אושרו', key: 'אושר', color: 'text-green-600' },
            { label: 'בוטלו', key: 'בוטל', color: 'text-red-500' },
          ].map(({ label, key, color }) => (
            <div key={key} className="bg-card border border-border/50 rounded-2xl p-5 text-center">
              <p className={`font-heebo text-3xl font-bold ${color} mb-1`}>{counts[key]}</p>
              <p className="font-heebo text-muted-foreground text-sm">{label}</p>
            </div>
          ))}
        </div>

        <div className="flex gap-2 mb-6 flex-wrap">
          {['הכל', 'ממתין', 'אושר', 'בוטל'].map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`font-heebo text-sm px-5 py-2 rounded-full border transition-all ${
                filter === status
                  ? 'bg-primary text-primary-foreground border-primary'
                  : 'bg-card border-border/60 text-foreground/70 hover:border-primary/40'
              }`}
            >
              {status} {counts[status] > 0 && `(${counts[status]})`}
            </button>
          ))}
        </div>

        {filtered.length === 0 ? (
          <div className="text-center py-20">
            <Calendar className="w-12 h-12 text-muted-foreground/30 mx-auto mb-4" />
            <p className="font-heebo text-muted-foreground">אין תורים להצגה</p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((appointment) => (
              <div key={appointment.id} className="bg-card border border-border/50 rounded-2xl overflow-hidden hover:shadow-md transition-shadow">
                <div className="p-5 md:p-6">
                  <div className="flex flex-wrap items-start gap-3 justify-between">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <User className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-heebo font-bold text-foreground text-lg">{appointment.name}</h3>
                        <div className="flex flex-wrap items-center gap-3 mt-1">
                          <a href={`tel:${appointment.phone}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                            <Phone className="w-3.5 h-3.5" /> {appointment.phone}
                          </a>
                          {appointment.email && (
                            <a href={`mailto:${appointment.email}`} className="flex items-center gap-1 text-sm text-muted-foreground hover:text-primary">
                              <Mail className="w-3.5 h-3.5" /> {appointment.email}
                            </a>
                          )}
                        </div>
                      </div>
                    </div>

                    <span className={`font-heebo text-xs font-medium px-3 py-1.5 rounded-full border ${STATUS_COLORS[appointment.status] || STATUS_COLORS.ממתין}`}>
                      {appointment.status}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-3 mt-4">
                    <span className="font-heebo text-xs px-3 py-1.5 rounded-lg font-medium bg-muted text-muted-foreground">
                      {appointment.service}
                    </span>
                    {appointment.date && (
                      <span className="flex items-center gap-1.5 font-heebo text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                        <Calendar className="w-3.5 h-3.5" />
                        {new Date(appointment.date).toLocaleDateString('he-IL', { weekday: 'short', year: 'numeric', month: 'long', day: 'numeric' })}
                      </span>
                    )}
                    {appointment.time && (
                      <span className="flex items-center gap-1.5 font-heebo text-xs text-muted-foreground bg-muted/50 px-3 py-1.5 rounded-lg">
                        <Clock className="w-3.5 h-3.5" /> {appointment.time}
                      </span>
                    )}
                  </div>

                  {appointment.notes && (
                    <div className="mt-3 p-3 bg-muted/40 rounded-xl">
                      <p className="font-heebo text-sm text-muted-foreground flex items-start gap-2">
                        <FileText className="w-4 h-4 mt-0.5 flex-shrink-0" />
                        {appointment.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex gap-3 mt-4 pt-4 border-t border-border/30">
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={appointment.status === 'אושר'}
                      onClick={() => handleStatusChange(appointment.id, 'אושר')}
                      className="font-heebo text-green-600 border-green-200 hover:bg-green-50 rounded-full"
                    >
                      <CheckCircle className="w-4 h-4 ml-1" /> אשר
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      disabled={appointment.status === 'בוטל'}
                      onClick={() => handleStatusChange(appointment.id, 'בוטל')}
                      className="font-heebo text-red-500 border-red-200 hover:bg-red-50 rounded-full"
                    >
                      <XCircle className="w-4 h-4 ml-1" /> בטל
                    </Button>
                    <Button
                      size="sm"
                      variant="ghost"
                      disabled={appointment.status === 'ממתין'}
                      onClick={() => handleStatusChange(appointment.id, 'ממתין')}
                      className="font-heebo text-muted-foreground rounded-full"
                    >
                      החזר לממתין
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="hidden">
          <Loader2 />
        </div>
      </div>
    </div>
  );
}
