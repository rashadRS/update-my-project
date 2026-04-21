'use client';

import Link from 'next/link';
import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/providers/app-context';

export default function SignupPage() {
  const { t, setUser } = useApp();
  const router = useRouter();
  const [form, setForm] = useState({ name: '', email: '', password: '', university: '', major: '' });
  const [error, setError] = useState('');

  const onSubmit = (event: FormEvent) => {
    event.preventDefault();
    if (Object.values(form).some((v) => !v.trim())) {
      setError(t.auth.required);
      return;
    }
    const raw = localStorage.getItem('studytech_users') || '[]';
    const users = JSON.parse(raw) as Array<{ email: string }>;
    if (users.some((u) => u.email === form.email)) {
      setError(t.auth.emailExists);
      return;
    }
    localStorage.setItem('studytech_users', JSON.stringify([...users, form]));
    setUser(form);
    router.push('/dashboard');
  };

  return (
    <div className="mx-auto max-w-md rounded-2xl border p-6">
      <h1 className="mb-4 text-2xl font-bold">{t.auth.signupTitle}</h1>
      <form className="space-y-3" onSubmit={onSubmit}>
        <input className="w-full rounded-xl border p-3" placeholder={t.auth.name} value={form.name} onChange={(event) => setForm((prev) => ({ ...prev, name: event.target.value }))} />
        <input className="w-full rounded-xl border p-3" placeholder={t.auth.email} value={form.email} onChange={(event) => setForm((prev) => ({ ...prev, email: event.target.value }))} />
        <input className="w-full rounded-xl border p-3" placeholder={t.auth.password} type="password" value={form.password} onChange={(event) => setForm((prev) => ({ ...prev, password: event.target.value }))} />
        <input className="w-full rounded-xl border p-3" placeholder={t.auth.university} value={form.university} onChange={(event) => setForm((prev) => ({ ...prev, university: event.target.value }))} />
        <input className="w-full rounded-xl border p-3" placeholder={t.auth.major} value={form.major} onChange={(event) => setForm((prev) => ({ ...prev, major: event.target.value }))} />
        {error ? <p className="text-sm text-red-500">{error}</p> : null}
        <button className="w-full rounded-xl bg-brand-600 p-3 text-white" type="submit">{t.auth.submitSignup}</button>
      </form>
      <p className="mt-3 text-sm">{t.auth.haveAccount} <Link href="/login" className="text-brand-600">{t.nav.login}</Link></p>
    </div>
  );
}
