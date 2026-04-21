'use client';

import ar from '@/locales/ar.json';
import en from '@/locales/en.json';
import { storage } from '@/lib/storage';
import { Locale, User } from '@/lib/types';
import { createContext, ReactNode, useContext, useEffect, useMemo, useState } from 'react';

type Dictionary = typeof ar;

type Ctx = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: Dictionary;
  isDark: boolean;
  toggleTheme: () => void;
  user: User | null;
  setUser: (user: User | null) => void;
};

const AppContext = createContext<Ctx | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('ar');
  const [isDark, setIsDark] = useState(true);
  const [user, setUserState] = useState<User | null>(null);

  useEffect(() => {
    const storedLocale = storage.getLocale();
    const storedTheme = storage.getTheme();
    setLocaleState(storedLocale);
    setIsDark(storedTheme === 'dark');
    setUserState(storage.getUser());
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = locale === 'ar' ? 'rtl' : 'ltr';
  }, [locale]);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const setLocale = (newLocale: Locale) => {
    setLocaleState(newLocale);
    storage.setLocale(newLocale);
  };

  const toggleTheme = () => {
    const next = !isDark;
    setIsDark(next);
    storage.setTheme(next ? 'dark' : 'light');
  };

  const setUser = (newUser: User | null) => {
    setUserState(newUser);
    storage.setUser(newUser);
  };

  const value = useMemo(
    () => ({ locale, setLocale, t: locale === 'ar' ? ar : en, isDark, toggleTheme, user, setUser }),
    [locale, isDark, user]
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used inside AppProvider');
  }
  return context;
}
