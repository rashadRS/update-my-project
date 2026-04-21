import { ReactNode } from 'react';
import { Navbar } from '@/components/navbar';
import { WhatsAppFloatingButton } from '@/components/whatsapp-floating';

export function LayoutShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-slate-950 dark:text-slate-50">
      <Navbar />
      <main className="mx-auto max-w-7xl px-4 py-10">{children}</main>
      <WhatsAppFloatingButton />
    </div>
  );
}
