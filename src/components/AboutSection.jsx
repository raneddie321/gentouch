const db = globalThis.__B44_DB__ || { auth:{ isAuthenticated: async()=>false, me: async()=>null }, entities:new Proxy({}, { get:()=>({ filter:async()=>[], get:async()=>null, create:async()=>({}), update:async()=>({}), delete:async()=>({}) }) }), integrations:{ Core:{ UploadFile:async()=>({ file_url:'' }) } } };

import React from 'react';
import { motion } from 'framer-motion';
import { Award, Heart, Quote, Shield, Sparkles } from 'lucide-react';

const highlights = [
  { icon: Award, label: 'מוסמך מכון וינגייט' },
  { icon: Shield, label: 'טיפול מקצועי ובטוח' },
  { icon: Heart, label: 'גישה אישית לכל מטופל' },
  { icon: Sparkles, label: 'ניסיון וידע מקצועי' },
];

const testimonials = [
  'דוד קשוב, מקצועי ומדויק. כבר אחרי טיפול אחד הרגשתי הקלה משמעותית בגב.',
  'הטיפול היה רגוע ונעים, עם הסבר ברור והתאמה מלאה למה שהגוף שלי היה צריך.',
];

export default function AboutSection() {
  return (
    <section id="about" dir="rtl" className="py-24 md:py-32 px-4 bg-background">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="font-heebo text-primary text-sm tracking-[0.2em] uppercase mb-3">אודות</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-bold text-foreground mb-6">
            בנגיעה אחת רכה
          </h2>
          <div className="w-16 h-0.5 bg-primary mx-auto mb-8" />
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-center">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-heebo text-foreground/80 text-xl md:text-2xl leading-relaxed mb-6">
              אני דוד לוי, מטפל מוסמך מכון וינגייט בעיסוי שוודי קלאסי, עיסוי רפואי, טיפולי ספא ועיסוי ספורטאים. בעבודה שלי אני משלב ידע מקצועי עם הקשבה רגועה ומדויקת למה שהגוף מבקש באותו רגע.
            </p>
            <p className="font-heebo text-foreground/80 text-xl md:text-2xl leading-relaxed mb-8">
              כל מפגש מתחיל בשיחה קצרה, הבנת הרקע הרלוונטי והתאמת עוצמת המגע למטרה: שחרור כאב, הורדת עומס, התאוששות מאימון או רגיעה עמוקה. הניסיון הטיפולי שלי מתמקד בעבודה בטוחה, נעימה ומכבדת, כדי שתצאו מהטיפול עם גוף קל יותר ונשימה פתוחה יותר.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {highlights.map((item, i) => (
                <motion.div
                  key={item.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50"
                >
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <item.icon className="w-5 h-5 text-primary" />
                  </div>
                  <span className="font-heebo text-sm font-medium text-foreground/80">{item.label}</span>
                </motion.div>
              ))}
            </div>

            <div className="mt-8 grid gap-4">
              {testimonials.map((text) => (
                <div key={text} className="bg-card border border-border/50 rounded-2xl p-5">
                  <Quote className="w-5 h-5 text-primary mb-3" />
                  <p className="font-heebo text-sm md:text-base leading-relaxed text-foreground/75">{text}</p>
                  <p className="font-heebo text-xs text-muted-foreground mt-3">עדות מטופל/ת</p>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden aspect-square">
              <img
                src="https://i.ibb.co/qFrzgggk/Chat-GPT-Image-Mar-31-2026-04-27-47-PM.png"
                alt="דוד לוי - מטפל מוסמך בעיסוי"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <div className="absolute -bottom-6 -right-6 w-32 h-32 rounded-2xl bg-primary/10 -z-10" />
            <div className="absolute -top-6 -left-6 w-24 h-24 rounded-2xl bg-accent/50 -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
