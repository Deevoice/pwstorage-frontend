import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

interface FingerprintContextProps {
    fingerprint: string;
    setFingerprint: (fingerprint: string) => void;
}

const FingerprintContext = createContext<FingerprintContextProps | undefined>(undefined);

export const FingerprintProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [fingerprint, setFingerprint] = useState<string>('');

    useEffect(() => {
        const loadFingerprint = async () => {
            const fp = await FingerprintJS.load();
            const result = await fp.get();
            setFingerprint(result.visitorId);
        };

        loadFingerprint();
    }, []);

    return (
        <FingerprintContext.Provider value={{ fingerprint, setFingerprint }}>
            {children}
        </FingerprintContext.Provider>
    );
};

export const useFingerprint = () => {
    const context = useContext(FingerprintContext);
    if (!context) {
        throw new Error('useFingerprint must be used within a FingerprintProvider');
    }
    return context;
};
