import React, { useState } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import { TextField, Button, IconButton, Input, InputLabel, InputAdornment, FormControl } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { loginUser } from '@/api/auth';
import { ErrorData } from '@/types/error';
import useForm from '@/hooks/useForm';
import { getFingerprint } from '@/api/apiHelper';

const LoginForm: React.FC = () => {
    const initialData = { email: '', password: '' };
    const { formData, handleChange } = useForm(initialData);
    const [errors, setErrors] = useState(initialData);
    const [showPassword, setShowPassword] = useState<boolean>(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const fingerprint = await getFingerprint();
        const user = await loginUser({
            email: formData.email,
            password: formData.password,
            fingerprint: fingerprint
        });

        if ((user as ErrorData).error_code) {
            console.log((user as ErrorData).error_code);
        } else {
            Router.push('/lk');
        }
    };

    return (
        <div className="auth-container">
            <form className="auth-block" onSubmit={handleSubmit}>
                <h2 className="auth-block__title">LOGIN</h2>
                <div className="auth-main">
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
                            type={showPassword ? 'text' : 'password'}
                            value={formData.password}
                            onChange={handleChange}
                            error={!!errors.password}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        sx={{ color: '#fff' }}
                                        aria-label="toggle password visibility"
                                        onClick={() => setShowPassword((show) => !show)}
                                        onMouseDown={(e) => { e.preventDefault() }}
                                    >
                                        {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                    </FormControl>

                    <Button className="auth-btn" type="submit">
                        Login
                    </Button>
                    <Link className="another-auth" href="/signup">
                        Don't have an account? Sign Up
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default LoginForm;
