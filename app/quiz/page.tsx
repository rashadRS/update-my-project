'use client';

import { useMemo, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useApp } from '@/providers/app-context';
import { storage } from '@/lib/storage';
import { recommendDevices } from '@/lib/recommendation';

type Option = { value: string; ar: string; en: string };

const options = {
  major: [
    { value: 'cs', ar: 'علوم الحاسوب', en: 'Computer Science' },
    { value: 'engineering', ar: 'الهندسة', en: 'Engineering' },
    { value: 'design', ar: 'التصميم', en: 'Design' },
    { value: 'business', ar: 'إدارة الأعمال', en: 'Business' },
    { value: 'medicine', ar: 'الطب', en: 'Medicine' },
    { value: 'architecture', ar: 'العمارة', en: 'Architecture' }
  ],
  budget: [
    { value: '3000', ar: 'حتى 3000 رنجت', en: 'Up to MYR 3000' },
    { value: '5000', ar: 'حتى 5000 رنجت', en: 'Up to MYR 5000' },
    { value: '7000', ar: 'حتى 7000 رنجت', en: 'Up to MYR 7000' },
    { value: '9000', ar: 'حتى 9000 رنجت', en: 'Up to MYR 9000' }
  ],
  usage: [
    { value: 'coding', ar: 'برمجة', en: 'Coding' },
    { value: '3d', ar: 'تصميم ثلاثي الأبعاد', en: '3D/Rendering' },
    { value: 'office', ar: 'مهام دراسية يومية', en: 'Daily coursework' },
    { value: 'editing', ar: 'مونتاج وفيديو', en: 'Video editing' }
  ],
  preference: [
    { value: 'performance', ar: 'الأداء', en: 'Performance' },
    { value: 'battery', ar: 'عمر البطارية', en: 'Battery life' },
    { value: 'portability', ar: 'خفة الوزن', en: 'Portability' },
    { value: 'display', ar: 'جودة الشاشة', en: 'Display quality' }
  ]
};

export default function QuizPage() {
  const { t, locale } = useApp();
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({ major: '', budget: '', usage: '', preference: '' });
  const [custom, setCustom] = useState({ major: '', budget: '', usage: '', preference: '' });

  const questions = useMemo(
    () => [
      { key: 'major', text: t.quiz.q_major, choices: options.major },
      { key: 'budget', text: t.quiz.q_budget, choices: options.budget },
      { key: 'usage', text: t.quiz.q_usage, choices: options.usage },
      { key: 'preference', text: t.quiz.q_pref, choices: options.preference }
    ],
    [t]
  );

  const active = questions[step];
  const selected = answers[active.key as keyof typeof answers];
  const progress = ((step + 1) / questions.length) * 100;

  const onNext = () => {
    if (step < questions.length - 1) setStep((v) => v + 1);
  };

  const onSubmit = () => {
    const finalAnswers = {
      major: answers.major === 'other' ? custom.major : answers.major,
      budget: answers.budget === 'other' ? custom.budget : answers.budget,
      usage: answers.usage === 'other' ? custom.usage : answers.usage,
      preference: answers.preference === 'other' ? custom.preference : answers.preference
    };
    storage.setQuiz(finalAnswers);
    const result = recommendDevices(finalAnswers);
    storage.setResults(result);
    router.push('/results');
  };

  const showOtherInput = selected === 'other';

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <h1 className="text-3xl font-bold">{t.quiz.title}</h1>
      <p className="text-slate-600 dark:text-slate-300">{t.quiz.helper}</p>
      <div className="h-2 overflow-hidden rounded-full bg-slate-200 dark:bg-slate-700">
        <div className="h-full rounded-full bg-brand-600" style={{ width: `${progress}%` }} />
      </div>
      <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-soft dark:border-slate-700 dark:bg-slate-900">
        <h2 className="mb-4 text-xl font-semibold">{active.text}</h2>
        <div className="grid gap-3">
          {active.choices.map((choice: Option) => {
            const label = locale === 'ar' ? choice.ar : choice.en;
            return (
              <button
                key={choice.value}
                onClick={() => setAnswers((prev) => ({ ...prev, [active.key]: choice.value }))}
                className={`rounded-xl border p-3 text-start ${selected === choice.value ? 'border-brand-600 bg-brand-50 dark:bg-brand-600/20' : 'border-slate-200 dark:border-slate-700'}`}
              >
                {label}
              </button>
            );
          })}
          <button
            onClick={() => setAnswers((prev) => ({ ...prev, [active.key]: 'other' }))}
            className={`rounded-xl border p-3 text-start ${selected === 'other' ? 'border-brand-600 bg-brand-50 dark:bg-brand-600/20' : 'border-slate-200 dark:border-slate-700'}`}
          >
            {t.quiz.other}
          </button>
        </div>
        {showOtherInput ? (
          <input
            className="mt-3 w-full rounded-xl border border-slate-300 bg-transparent p-3"
            placeholder={t.quiz.otherPlaceholder}
            value={custom[active.key as keyof typeof custom]}
            onChange={(event) => setCustom((prev) => ({ ...prev, [active.key]: event.target.value }))}
          />
        ) : null}
        <div className="mt-6 flex justify-between">
          <button onClick={() => setStep((v) => Math.max(v - 1, 0))} className="rounded-full border px-4 py-2">{t.quiz.prev}</button>
          {step === questions.length - 1 ? (
            <button onClick={onSubmit} className="rounded-full bg-brand-600 px-4 py-2 text-white">{t.quiz.submit}</button>
          ) : (
            <button onClick={onNext} className="rounded-full bg-brand-600 px-4 py-2 text-white">{t.quiz.next}</button>
          )}
        </div>
      </div>
    </div>
  );
}
