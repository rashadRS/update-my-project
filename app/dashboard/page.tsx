'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useApp } from '@/providers/app-context';
import { storage } from '@/lib/storage';

export default function DashboardPage() {
  const { t, user } = useApp();
  const [favoriteCount, setFavoriteCount] = useState(0);

  useEffect(() => setFavoriteCount(storage.getFavorites().length), []);

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.dashboard.title}</h1>
      <p>{t.dashboard.welcome} {user?.name || t.dashboard.student}</p>
      <div className="grid gap-4 md:grid-cols-3">
        <Link href="/quiz" className="rounded-2xl border p-4">{t.dashboard.goQuiz}</Link>
        <Link href="/favorites" className="rounded-2xl border p-4">{t.nav.favorites}: {favoriteCount}</Link>
        <Link href="/profile" className="rounded-2xl border p-4">{t.nav.profile}</Link>
      </div>
    </div>
  );
}
