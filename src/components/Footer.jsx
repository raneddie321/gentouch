import React from 'react';

export default function Footer() {
  return (
    <footer dir="rtl" className="bg-foreground text-background py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="text-center md:text-right">
            <h3 className="font-playfair text-2xl font-bold mb-2">דוד לוי — בנגיעה אחת רכה</h3>
            <p className="font-heebo text-background/60 text-sm">מטפל מוסמך מכון וינגייט</p>
          </div>
          <div className="font-heebo text-background/40 text-sm">
            © {new Date().getFullYear()} דוד לוי — בנגיעה אחת רכה — כל הזכויות שמורות
          </div>
        </div>
      </div>
    </footer>
  );
}