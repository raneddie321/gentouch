const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import ServiceCard from './ServiceCard';
import { getServiceSettings } from '@/lib/serviceSettings';

export default function ServicesSection() {
  const services = getServiceSettings();

  return (
    <section id="services" dir="rtl" className="py-24 md:py-32 px-4 bg-secondary/30">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-heebo text-primary text-sm tracking-[0.2em] uppercase mb-3">פירוט הטיפולים</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
            טיפולים מקצועיים
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-6" />
          <p className="font-heebo text-muted-foreground text-lg max-w-2xl mx-auto">
            מגוון טיפולי עיסוי בהתאמה אישית, עם דגש על הקשבה, מקצועיות ותוצאה שמרגישים בגוף.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {services.map((service, i) => (
            <ServiceCard
              key={service.id}
              title={service.label}
              description={service.desc}
              image={service.image}
              imageClassName={service.imageClassName}
              href={`/services/${service.id}`}
              index={i}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
