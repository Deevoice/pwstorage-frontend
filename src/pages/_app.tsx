import React from 'react';
import { AppProps } from 'next/app';
import { FingerprintProvider } from '@/context/FingerprintContext';
import '@/styles/globals.css';

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <FingerprintProvider>
            <Component {...pageProps} />
        </FingerprintProvider>
    );
};

export default MyApp;
