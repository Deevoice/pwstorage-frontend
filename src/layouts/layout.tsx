import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import '@/styles/globals.css';
import AddIcon from '@mui/icons-material/Add';

const roboto = Roboto({ subsets: ['latin'], weight: ['400', '500', '700'] });

export const metadata: Metadata = {
    title: 'PasswordStorage',
    description: 'Password storage',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang='en'>
            <body className={roboto.className}>{children}</body>
        </html>
    );
}
