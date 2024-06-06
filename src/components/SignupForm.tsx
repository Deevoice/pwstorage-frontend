import React, { useState } from 'react';
import Router from 'next/router';
import { TextField, Button, Box, Typography } from '@mui/material';
import { createUser } from '@/api/user';
import { ErrorData } from '@/types/error';

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
        const user = await createUser({ name: formData.name, email: formData.email, password: formData.password });
        const errorData = (user as ErrorData);
        if (errorData.error_code) {
            if (errorData.error_code === 'UserEmailAlreadyExistsException') {
                setErrors({ ...errors, email: errorData.detail, confirmPassword: '' });
            }
        } else {
            setErrors({ name: '', email: '', password: '', confirmPassword: '' })
            console.log('User registered:', user);
            Router.push('/login');
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
