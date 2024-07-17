import Navbar from '@/components/Navbar';
import { cn } from '@/lib/utils';
import { Inter } from 'next/font/google';
import Providers from '@/components/Providers';
import { Toaster } from '@/components/ui/Toaster';

import '@/styles/globals.css';
import { ThemeProvider } from '@/components/providers/theme-provider';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
    title: 'Scronme',
    description: 'A community forum built with Next.js and TypeScript.',
};

export default function RootLayout({
    children,
    authModal,
}: {
    children: React.ReactNode;
    authModal: React.ReactNode;
}) {
    return (
        <html
            lang="en"
            className={cn('text-slate-900 antialiased', inter.className)}
            suppressHydrationWarning
        >
            <body className="min-h-screen pt-12 antialiased bg-white dark:bg-[#1d1d1d]">
                <Providers>
                    {/* @ts-expect-error Server Component */}
                    <Navbar />
                    {authModal}

                    <div className="container max-w-7xl mx-auto h-full pt-12">
                        <ThemeProvider
                            attribute="class"
                            defaultTheme="light"
                            enableSystem
                            storageKey="scronme-theme"
                        >
                            {children}
                        </ThemeProvider>
                    </div>
                </Providers>
                <Toaster />
            </body>
        </html>
    );
}
