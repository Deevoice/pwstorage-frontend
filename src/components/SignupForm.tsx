import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';
import { registerUser } from '@/lib/auth';
import { useFingerprint } from '@/context/FingerprintContext';

const SignupForm: React.FC = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const [errors, setErrors] = useState({
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    });
    const { setFingerprint } = useFingerprint();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.password !== formData.confirmPassword) {
            setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
            return;
        }
        try {
            const user = await registerUser(formData.name, formData.email, formData.password);
            console.log('User registered:', user);
            setFingerprint('some-fingerprint'); // Установите fingerprint
            // Redirect or perform additional actions on successful registration
        } catch (error) {
            console.error('Registration failed:', error);
            // Handle registration error
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit}>
            <Typography variant="h4">Sign Up</Typography>
            <TextField
                label="Name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                error={!!errors.name}
                helperText={errors.name}
                fullWidth
                margin="normal"
            />
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
            <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleChange}
                error={!!errors.confirmPassword}
                helperText={errors.confirmPassword}
                fullWidth
                margin="normal"
            />
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Sign Up
            </Button>
        </Box>
    );
};

export default SignupForm;
