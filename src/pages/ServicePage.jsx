import React from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import { ArrowRight, Calendar, CheckCircle, Clock } from 'lucide-react';
import { getServiceSettings } from '@/lib/serviceSettings';
import { SERVICE_DETAILS } from '@/lib/serviceDetails';

export default function ServicePage() {
  const { serviceId } = useParams();
  const service = getServiceSettings().find((item) => item.id === serviceId);
  const details = SERVICE_DETAILS[serviceId];

  if (!service || !details) return <Navigate to="/Home" replace />;

  return (
    <main dir="rtl" className="min-h-screen bg-background font-heebo text-foreground">
      <section className="relative min-h-[72vh] flex items-end overflow-hidden px-4 pb-14 pt-28">
        <img
          src={service.image}
          alt={service.label}
          className={`absolute inset-0 w-full h-full object-cover ${service.imageClassName}`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/45 to-black/25" />

        <div className="relative z-10 max-w-6xl mx-auto w-full text-white">
          <Link
            to="/Home#services"
            className="inline-flex items-center gap-2 text-sm font-medium text-white/80 hover:text-white mb-8"
          >
            <ArrowRight className="w-4 h-4" />
            חזרה לשירותים
          </Link>
          <p className="text-[#cc93c0] text-sm md:text-base tracking-[0.2em] mb-4">{details.subtitle}</p>
          <h1 className="font-playfair text-5xl md:text-7xl font-bold mb-5">{service.label}</h1>
          <p className="text-lg md:text-2xl text-white/85 max-w-3xl leading-relaxed">{details.intro}</p>
        </div>
      </section>

      <section className="px-4 py-16 md:py-24">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-[1fr_360px] gap-10 lg:gap-16">
          <div>
            <h2 className="font-playfair text-3xl md:text-4xl font-bold mb-6">מה כולל הטיפול?</h2>
            <p className="text-xl leading-relaxed text-foreground/80 mb-10">{details.process}</p>

            <div className="grid sm:grid-cols-2 gap-4 mb-12">
              {details.benefits.map((benefit) => (
                <div key={benefit} className="flex items-start gap-3 bg-white/35 border border-white/30 rounded-2xl p-5">
                  <CheckCircle className="w-5 h-5 text-primary mt-1 shrink-0" />
                  <p className="text-lg text-foreground/85">{benefit}</p>
                </div>
              ))}
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              {details.gallery.map((image) => (
                <img
                  key={image}
                  src={image}
                  alt={service.label}
                  className="w-full aspect-[4/3] object-cover rounded-2xl shadow-lg"
                />
              ))}
            </div>
          </div>

          <aside className="lg:sticky lg:top-24 h-fit bg-white/40 backdrop-blur border border-white/40 rounded-2xl p-6 shadow-lg">
            <h3 className="font-playfair text-2xl font-bold mb-5">פרטי השירות</h3>
            <div className="space-y-4 mb-7">
              <div className="flex items-center gap-3">
                <Clock className="w-5 h-5 text-primary" />
                <span>{service.duration}</span>
              </div>
              <div className="flex items-center gap-3">
                <Calendar className="w-5 h-5 text-primary" />
                <span>{service.price}</span>
              </div>
            </div>
            <Link
              to="/Book"
              className="inline-flex w-full items-center justify-center rounded-full bg-primary px-6 py-3 text-primary-foreground font-medium hover:opacity-90 transition-opacity"
            >
              קביעת תור
            </Link>
          </aside>
        </div>
      </section>
    </main>
  );
}
