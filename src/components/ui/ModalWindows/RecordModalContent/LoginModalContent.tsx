import React, { useState } from 'react';
import { RecordContentLogin } from '@/types/recordContent';
import useForm from '@/hooks/useForm';

interface ModalLoginProps {
    defaultContent: RecordContentLogin | null;
    onSubmit: (data: RecordContentLogin) => Promise<void>;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ defaultContent, onSubmit }) => {
    const { formData, handleChange, setFormData } = useForm<RecordContentLogin>(defaultContent || {
        login: '',
        password: ''
    });

    return (
        <div className="modal-content">
            <input
                type="text"
                name="login"
                placeholder="Login"
                value={formData.login}
                onChange={handleChange}
                className="modal-input"
            />
            <input
                type="text"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleChange}
                className="modal-input"
            />
            <button className="modal-button" onClick={
                async () => { await onSubmit(formData) }
            }>
                Submit
            </button>
        </div>
    );
};

export default ModalLogin;
