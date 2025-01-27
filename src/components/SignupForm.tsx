import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { TextField, Button, IconButton, Input, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { createUser } from '@/api/user';
import { ErrorData } from '@/types/error';
import useForm from '@/hooks/useForm';

const SignupForm: React.FC = () => {
    const initialData = {
        name: '',
        email: '',
        password: '',
        confirmPassword: ''
    };
    const { formData, handleChange } = useForm(initialData);
    const [errors, setErrors] = useState(initialData);
    const [showPassword1, setShowPassword1] = useState<boolean>(false);
    const [showPassword2, setShowPassword2] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (formData.password !== formData.confirmPassword) {
            return setErrors({ ...errors, confirmPassword: 'Passwords do not match' });
        }

        const user = await createUser({
            name: formData.name,
            email: formData.email,
            password: formData.password
        });

        const errorData = user as ErrorData;
        if (errorData.error_code) {
            if (errorData.error_code === 'UserEmailAlreadyExistsException') {
                setErrors({ ...errors, email: errorData.detail, confirmPassword: '' });
            }
        } else {
            setErrors({ name: '', email: '', password: '', confirmPassword: '' });
            Router.push('/login');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-block" onSubmit={handleSubmit}>
                <h2 className="auth-block__title">SIGN UP</h2>
                <div className="auth-main">
                    <div className="auth-forms">
                        <TextField
                            className="auth-main__input"
                            name="name"
                            value={formData.name}
                            variant="standard"
                            onChange={handleChange}
                            error={!!errors.name}
                            helperText={errors.name}
                            label="Name"
                        />
                    </div>

                    <div className="auth-forms">
                        <TextField
                            className="auth-main__input"
                            name="email"
                            type="email"
                            variant="standard"
                            value={formData.email}
                            onChange={handleChange}
                            error={!!errors.email}
                            helperText={errors.email}
                            label="Email"
                        />
                    </div>

                    <FormControl className="auth-forms" sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                        <Input
                            className="auth-main__input"
                            id="standard-adornment-password"
                            name="password"
                            type={showPassword1 ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{ color: '#fff' }}
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword1((show) => !show)}
                                        onMouseDown={(e) => { e.preventDefault() }}
                                    >
                                        {showPassword1 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <FormControl className="auth-forms" sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Confirm Password</InputLabel>
                        <Input
                            className="auth-main__input"
                            id="standard-adornment-password"
                            name="confirmPassword"
                            type={showPassword2 ? 'text' : 'password'}
                            value={formData.confirmPassword}
                            onChange={handleChange}
                            error={!!errors.confirmPassword}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{ color: '#fff' }}
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword2((show) => !show)}
                                        onMouseDown={(e) => { e.preventDefault() }}
                                    >
                                        {showPassword2 ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button className="auth-btn" type="submit">
                        Sign Up
                    </Button>
                    <Link className="another-auth" href="/login">
                        Already registered? Log In
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignupForm;
