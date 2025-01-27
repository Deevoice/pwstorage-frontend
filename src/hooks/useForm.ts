import { useState } from 'react';

type FormData = {
    [key: string]: any;
};

const useForm = <T extends FormData>(initialData: T) => {
    const [formData, setFormData] = useState<T>(initialData);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, checked, type } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    return {
        formData,
        handleChange,
        setFormData
    };
};

export default useForm;
