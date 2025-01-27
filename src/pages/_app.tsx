import React from 'react';
import { AppProps } from 'next/app';
import '@/styles/globals.css';
import '@/styles/reset.css';
import '@/styles/auth.css'
import '@/styles/lk.css';
import '@/styles/sidebar.css'
import '@/styles/additem.css';
import '@/styles/settings.css'

const MyApp: React.FC<AppProps> = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
    );
};

export default MyApp;
