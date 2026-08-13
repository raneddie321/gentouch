import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function ServiceCard({ title, description, image, href, index, imageClassName = '' }) {
  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.15 }}
      className="group relative rounded-2xl overflow-hidden bg-card border border-border/50 hover:border-primary/30 transition-all duration-500 hover:shadow-xl"
    >
      <Link to={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-primary">
        <div className="aspect-[3/4] overflow-hidden">
          <img
            src={image}
            alt={title}
            className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${imageClassName}`}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        </div>

        <div className="absolute bottom-0 inset-x-0 p-6 md:p-8">
          <h3 className="font-playfair text-2xl md:text-3xl font-bold text-white mb-3">
            {title}
          </h3>
          <p className="font-heebo text-white/70 text-sm md:text-base leading-relaxed">
            {description}
          </p>
          <span className="font-heebo inline-block mt-4 text-sm font-medium text-white border border-white/40 rounded-full px-4 py-1.5">
            למידע נוסף
          </span>
        </div>
      </Link>
    </motion.article>
  );
}
