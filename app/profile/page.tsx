'use client';

import { useApp } from '@/providers/app-context';

export default function ProfilePage() {
  const { t, user } = useApp();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.profile.title}</h1>
      <div className="max-w-xl rounded-2xl border p-6">
        <p>{t.profile.name}: {user?.name || '-'}</p>
        <p>{t.profile.email}: {user?.email || '-'}</p>
        <p>{t.profile.university}: {user?.university || '-'}</p>
        <p>{t.profile.major}: {user?.major || '-'}</p>
      </div>
    </div>
  );
}
