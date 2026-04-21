'use client';

import { DeviceCard } from '@/components/device-card';
import { devices } from '@/data/devices';
import { useApp } from '@/providers/app-context';

export default function TrustedDevicesPage() {
  const { t } = useApp();

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.trusted.title}</h1>
      <p className="text-slate-600 dark:text-slate-300">{t.trusted.sub}</p>
      <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
        {devices.map((device) => <DeviceCard key={device.id} device={device} />)}
      </div>
    </div>
  );
}
