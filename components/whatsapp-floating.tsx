'use client';

import Link from 'next/link';
import { useApp } from '@/providers/app-context';

export function WhatsAppFloatingButton() {
  const { t } = useApp();
  return (
    <Link
      href="https://wa.me/60111111111"
      target="_blank"
      className="fixed bottom-6 end-6 rounded-full bg-green-500 px-4 py-3 text-sm font-semibold text-white shadow-soft"
    >
      {t.common.whatsapp}
    </Link>
  );
}
