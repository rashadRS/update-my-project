'use client';

import { useApp } from '@/providers/app-context';

export default function AboutPage() {
  const { t } = useApp();
  return (
    <div className="max-w-3xl space-y-4">
      <h1 className="text-3xl font-bold">{t.about.title}</h1>
      <p className="text-slate-600 dark:text-slate-300">{t.about.desc}</p>
    </div>
  );
}
