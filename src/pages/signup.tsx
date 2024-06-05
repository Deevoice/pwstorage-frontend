import React from 'react';
import AuthLayout from '@/layouts/AuthLayout';
import SignupForm from '@/components/SignupForm';

const SignupPage: React.FC = () => {
    return (
        <AuthLayout>
            <SignupForm />
        </AuthLayout>
    );
};

export default SignupPage;
