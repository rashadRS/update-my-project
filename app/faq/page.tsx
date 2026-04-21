'use client';

import { SectionCard } from '@/components/section-card';
import { useApp } from '@/providers/app-context';

export default function FAQPage() {
  const { t } = useApp();
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.faq.title}</h1>
      <SectionCard>
        <h2 className="font-semibold">{t.faq.q1}</h2>
        <p className="text-slate-600 dark:text-slate-300">{t.faq.a1}</p>
      </SectionCard>
      <SectionCard>
        <h2 className="font-semibold">{t.faq.q2}</h2>
        <p className="text-slate-600 dark:text-slate-300">{t.faq.a2}</p>
      </SectionCard>
    </div>
  );
}
