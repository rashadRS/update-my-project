'use client';

import { SectionCard } from '@/components/section-card';
import { useApp } from '@/providers/app-context';

export default function LearnBasicsPage() {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.learn.title}</h1>
      <SectionCard>
        <h2 className="mb-4 text-xl font-semibold">{t.learn.mistakes}</h2>
        <ul className="list-inside list-disc space-y-2 leading-relaxed">
          <li>{t.learn.m1}</li>
          <li>{t.learn.m2}</li>
          <li>{t.learn.m3}</li>
          <li>{t.learn.m4}</li>
        </ul>
      </SectionCard>
      <SectionCard>
        <h2 className="mb-4 text-xl font-semibold">{t.learn.compare}</h2>
        <ul className="list-inside list-disc space-y-2 leading-relaxed">
          <li>{t.learn.w1}</li>
          <li>{t.learn.w2}</li>
          <li>{t.learn.w3}</li>
        </ul>
      </SectionCard>
    </div>
  );
}
