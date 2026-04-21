'use client';

import { useEffect, useState } from 'react';
import { DeviceCard } from '@/components/device-card';
import { storage } from '@/lib/storage';
import { Device } from '@/lib/types';
import { getRecommendationReason } from '@/lib/recommendation';
import { useApp } from '@/providers/app-context';

export default function ResultsPage() {
  const { t, locale } = useApp();
  const [results, setResults] = useState<Device[]>([]);
  const [major, setMajor] = useState('');

  useEffect(() => {
    setResults(storage.getResults());
    setMajor(storage.getQuiz()?.major || 'student');
  }, []);

  if (!results.length) {
    return <div className="text-center text-slate-500">{t.results.empty}</div>;
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.results.title}</h1>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {results.map((device, index) => (
          <DeviceCard key={device.id} device={device} match={95 - index * 4} reason={getRecommendationReason(major, device, locale)} />
        ))}
      </div>
    </div>
  );
}
