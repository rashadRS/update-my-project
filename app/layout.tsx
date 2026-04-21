import './globals.css';
import { AppProvider } from '@/providers/app-context';
import { LayoutShell } from '@/components/layout-shell';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'StudyTech Advisor',
  description: 'Bilingual laptop recommendation platform for students in Malaysia.'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ar" dir="rtl" className="dark">
      <body>
        <AppProvider>
          <LayoutShell>{children}</LayoutShell>
        </AppProvider>
      </body>
    </html>
  );
}
