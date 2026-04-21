'use client';

import Image from 'next/image';
import { advisors } from '@/data/advisors';
import { useApp } from '@/providers/app-context';

export default function ContactPage() {
  const { t, locale } = useApp();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.contact.title}</h1>
      <div className="grid gap-5 md:grid-cols-2">
        {advisors.map((advisor) => (
          <article key={advisor.id} className="rounded-2xl border bg-white p-5 shadow-soft dark:bg-slate-900">
            <div className="relative mb-4 h-48 overflow-hidden rounded-xl">
              <Image src={advisor.image} alt={advisor.nameEn} fill className="object-cover" />
            </div>
            <h3 className="text-xl font-semibold">{locale === 'ar' ? advisor.nameAr : advisor.nameEn}</h3>
            <p className="mb-3 text-slate-500">{t.contact.advisorRole}</p>
            <a href={`https://wa.me/${advisor.whatsapp}`} target="_blank" rel="noreferrer" className="rounded-full bg-green-500 px-4 py-2 text-white">
              {t.contact.whatsapp}
            </a>
          </article>
        ))}
      </div>
    </div>
  );
}
