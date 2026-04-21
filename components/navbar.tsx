'use client';

import Link from 'next/link';
import { Moon, Sun } from 'lucide-react';
import { useApp } from '@/providers/app-context';

export function Navbar() {
  const { t, locale, setLocale, isDark, toggleTheme, user, setUser } = useApp();

  const links = [
    { href: '/', label: t.nav.home },
    { href: '/learn-basics', label: t.nav.learn },
    { href: '/quiz', label: t.nav.quiz },
    { href: '/trusted-devices', label: t.nav.trusted },
    { href: '/about', label: t.nav.about },
    { href: '/faq', label: t.nav.faq },
    { href: '/contact', label: t.nav.contact }
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-200/70 bg-white/80 backdrop-blur dark:border-slate-700 dark:bg-slate-950/80">
      <nav className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-4 py-3">
        <Link href="/" className="text-lg font-semibold text-brand-600 dark:text-brand-50">{t.app.name}</Link>
        <div className="flex flex-wrap items-center gap-3 text-sm">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="text-slate-600 transition hover:text-brand-500 dark:text-slate-200">
              {link.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setLocale(locale === 'ar' ? 'en' : 'ar')} className="rounded-full border px-3 py-1 text-sm">{t.nav.lang}</button>
          <button onClick={toggleTheme} className="rounded-full border p-2" aria-label={t.nav.theme}>
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          {user ? (
            <>
              <Link href="/dashboard" className="rounded-full bg-brand-600 px-3 py-1 text-sm text-white">{t.nav.dashboard}</Link>
              <button onClick={() => setUser(null)} className="rounded-full border px-3 py-1 text-sm">{t.nav.logout}</button>
            </>
          ) : (
            <>
              <Link href="/login" className="rounded-full border px-3 py-1 text-sm">{t.nav.login}</Link>
              <Link href="/signup" className="rounded-full bg-brand-600 px-3 py-1 text-sm text-white">{t.nav.signup}</Link>
            </>
          )}
        </div>
      </nav>
    </header>
  );
}
