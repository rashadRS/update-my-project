'use client';

import Image from 'next/image';
import { Device } from '@/lib/types';
import { useApp } from '@/providers/app-context';
import { storage } from '@/lib/storage';

export function DeviceCard({ device, reason, match }: { device: Device; reason?: string; match?: number }) {
  const { t } = useApp();

  const saveToFavorites = () => {
    const existing = storage.getFavorites();
    if (existing.find((item) => item.id === device.id)) return;
    storage.setFavorites([...existing, device]);
    alert(t.results.saved);
  };

  return (
    <article className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-soft dark:border-slate-700 dark:bg-slate-900">
      <div className="relative h-44 w-full">
        <Image src={device.image} alt={device.model} fill className="object-cover" />
      </div>
      <div className="space-y-3 p-4">
        <h3 className="text-lg font-semibold">{device.brand} {device.model}</h3>
        {match ? <p className="text-sm text-accent-teal">{t.results.match}: {match}%</p> : null}
        {reason ? <p className="text-sm text-slate-600 dark:text-slate-300">{t.results.reason}: {reason}</p> : null}
        <ul className="space-y-1 text-sm">
          <li>{t.results.cpu}: {device.cpu}</li>
          <li>{t.results.ram}: {device.ram}</li>
          <li>{t.results.storage}: {device.storage}</li>
          <li>{t.results.gpu}: {device.gpu}</li>
          <li>{t.results.battery}: {device.battery}</li>
          <li>{t.results.price}: MYR {device.price}</li>
        </ul>
        <div className="flex gap-2">
          <a href={device.buy_link} target="_blank" rel="noreferrer" className="rounded-full bg-brand-600 px-3 py-2 text-sm text-white">{t.results.view}</a>
          <button onClick={saveToFavorites} className="rounded-full border px-3 py-2 text-sm">{t.results.save}</button>
        </div>
      </div>
    </article>
  );
}
