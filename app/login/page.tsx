'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/providers/app-context';

export default function LoginPage() {
  const { t, setUser } = useApp();
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    const raw = localStorage.getItem('studytech_users') || '[]';
    const users = JSON.parse(raw) as Array<{ email: string; password: string; name: string; university: string; major: string }>;
    const found = users.find((u) => u.email === email && u.password === password);
    if (!found) {
      setError(t.auth.invalid);
      return;
    }
    setUser(found);
    router.push('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border p-6">
      <h1 className="mb-4 text-2xl font-bold">{t.auth.loginTitle}</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full rounded-xl border p-3" placeholder={t.auth.email} value={email} onChange={(event) => setEmail(event.target.value)} />
        <input className="w-full rounded-xl border p-3" placeholder={t.auth.password} type="password" value={password} onChange={(event) => setPassword(event.target.value)} />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button className="w-full rounded-xl bg-brand-600 p-3 text-white" type="submit">{t.auth.submitLogin}</button>
      </form>
      <p className="mt-3 text-sm">{t.auth.noAccount} <Link href="/signup" className="text-brand-600">{t.nav.signup}</Link></p>
    </div>
  );
}
