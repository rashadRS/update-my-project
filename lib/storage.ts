import { Device, Locale, QuizAnswers, User } from '@/lib/types';

const keys = {
  locale: 'studytech_locale',
  theme: 'studytech_theme',
  user: 'studytech_user',
  favorites: 'studytech_favorites',
  quiz: 'studytech_quiz',
  results: 'studytech_results'
};

export const storage = {
  getLocale: (): Locale => (localStorage.getItem(keys.locale) as Locale) || 'ar',
  setLocale: (locale: Locale) => localStorage.setItem(keys.locale, locale),
  getTheme: () => localStorage.getItem(keys.theme) || 'dark',
  setTheme: (theme: string) => localStorage.setItem(keys.theme, theme),
  getUser: (): User | null => {
    const raw = localStorage.getItem(keys.user);
    return raw ? (JSON.parse(raw) as User) : null;
  },
  setUser: (user: User | null) => {
    if (!user) {
      localStorage.removeItem(keys.user);
      return;
    }
    localStorage.setItem(keys.user, JSON.stringify(user));
  },
  getFavorites: (): Device[] => {
    const raw = localStorage.getItem(keys.favorites);
    return raw ? (JSON.parse(raw) as Device[]) : [];
  },
  setFavorites: (items: Device[]) => localStorage.setItem(keys.favorites, JSON.stringify(items)),
  setQuiz: (quiz: QuizAnswers) => localStorage.setItem(keys.quiz, JSON.stringify(quiz)),
  getQuiz: (): QuizAnswers | null => {
    const raw = localStorage.getItem(keys.quiz);
    return raw ? (JSON.parse(raw) as QuizAnswers) : null;
  },
  setResults: (items: Device[]) => localStorage.setItem(keys.results, JSON.stringify(items)),
  getResults: (): Device[] => {
    const raw = localStorage.getItem(keys.results);
    return raw ? (JSON.parse(raw) as Device[]) : [];
  }
};
