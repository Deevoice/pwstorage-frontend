import React from 'react';

const AuthLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <div>
            <main>{children}</main>
        </div>
    );
};

export default AuthLayout;
