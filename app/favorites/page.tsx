'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { storage } from '@/lib/storage';
import { Device } from '@/lib/types';
import { useApp } from '@/providers/app-context';

export default function FavoritesPage() {
  const { t } = useApp();
  const [favorites, setFavorites] = useState<Device[]>([]);

  useEffect(() => setFavorites(storage.getFavorites()), []);

  const remove = (id: string) => {
    const next = favorites.filter((item) => item.id !== id);
    setFavorites(next);
    storage.setFavorites(next);
  };

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{t.favorites.title}</h1>
      {!favorites.length ? <p>{t.favorites.empty}</p> : null}
      <div className="grid gap-4 md:grid-cols-2">
        {favorites.map((item) => (
          <div key={item.id} className="flex gap-3 rounded-xl border p-3">
            <div className="relative h-24 w-32 overflow-hidden rounded-lg">
              <Image src={item.image} alt={item.model} fill className="object-cover" />
            </div>
            <div className="flex-1">
              <h3 className="font-semibold">{item.brand} {item.model}</h3>
              <p>MYR {item.price}</p>
              <button onClick={() => remove(item.id)} className="mt-2 rounded-full border px-3 py-1 text-sm">{t.favorites.remove}</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
