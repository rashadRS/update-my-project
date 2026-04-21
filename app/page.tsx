'use client';

import Link from 'next/link';
import { SectionCard } from '@/components/section-card';
import { useApp } from '@/providers/app-context';

export default function HomePage() {
  const { t } = useApp();

  return (
    <div className="space-y-8">
      <section className="rounded-3xl bg-gradient-to-br from-slate-900 via-brand-600 to-slate-900 px-6 py-16 text-center text-white shadow-soft md:px-16">
        <p className="mb-3 text-sm text-accent-teal">{t.home.trust}</p>
        <h1 className="mx-auto max-w-2xl text-3xl font-bold leading-tight md:text-5xl">{t.home.headline}</h1>
        <p className="mx-auto mt-4 max-w-2xl text-sm text-slate-100 md:text-base">{t.home.sub}</p>
        <div className="mt-8 flex justify-center gap-3">
          <Link href="/quiz" className="rounded-full bg-white px-5 py-2 text-sm font-semibold text-slate-900">{t.home.startQuiz}</Link>
          <Link href="/learn-basics" className="rounded-full border border-white px-5 py-2 text-sm">{t.home.learnBasics}</Link>
        </div>
      </section>

      <SectionCard>
        <h2 className="mb-4 text-xl font-semibold">{t.home.featuresTitle}</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <div>{t.home.f1}</div>
          <div>{t.home.f2}</div>
          <div>{t.home.f3}</div>
        </div>
      </SectionCard>
    </div>
  );
}
