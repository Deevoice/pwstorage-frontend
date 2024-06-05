import React, { useState } from 'react';
import { TextField, Button, Link, Box, Typography } from '@mui/material';
import { loginUser } from '@/lib/auth';
import { useFingerprint } from '@/context/FingerprintContext';

const LoginForm: React.FC = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [errors, setErrors] = useState({ email: '', password: '' });
    const { fingerprint } = useFingerprint();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const expires_in = 43800;
            const user = await loginUser(formData.email, formData.password, fingerprint || '', expires_in);
            console.log('User authenticated:', user);
            // Redirect or perform additional actions on successful login
        } catch (error) {
            console.error('Authentication failed:', error);
            // Handle authentication error
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4">Login</Typography>
            <TextField
                label="Email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
                error={!!errors.email}
                helperText={errors.email}
                fullWidth
                margin="normal"
            />
            <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleChange}
                error={!!errors.password}
                helperText={errors.password}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Login
            </Button>
            <Link href="/signup">Don't have an account? Sign Up</Link>
        </Box>
    );
};

export default LoginForm;
