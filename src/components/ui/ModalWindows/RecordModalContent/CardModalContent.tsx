import React, { useState } from 'react';
import { RecordContentCard } from '@/types/recordContent';
import { ErrorData } from '@/types/error';
import useForm from '@/hooks/useForm';

interface ModalCardProps {
    defaultContent: RecordContentCard | null;
    onSubmit: (data: RecordContentCard) => Promise<void>;
};

const ModalCard: React.FC<ModalCardProps> = ({ defaultContent, onSubmit }) => {
    const { formData, handleChange, setFormData } = useForm<RecordContentCard>(defaultContent || {
        number: '',
        month: '',
        year: '',
        cvv: '',
        pin: ''
    });

    const handleNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value.replace(/\s/g, '');
        if (value.length > 16) {
            value = value.slice(0, 16);
        }
        let formattedValue = '';
        for (let i = 0; i < value.length; i++) {
            if (i > 0 && i % 4 === 0) {
                formattedValue += ' ';
            }
            formattedValue += value[i];
        }
        setFormData({ ...formData, number: formattedValue });
    };

    const handleFieldChange = (
        e: React.ChangeEvent<HTMLInputElement>,
        setter: React.Dispatch<React.SetStateAction<string>>,
        maxLength: number
    ) => {
        let value = e.target.value;
        if (value.length > maxLength) {
            value = value.slice(0, maxLength);
        }
        setter(value);
        if (value.length === maxLength) {
            const nextInput = e.target.nextElementSibling as HTMLInputElement;
            if (nextInput) {
                nextInput.focus();
            }
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
        if (e.key === ' ') {
            e.stopPropagation();
        }
    };

    return (
        <div className="modal" onKeyDown={handleKeyDown}>
            <div className="modal-content">
                <div className="card-group">
                    <div className="cardline"></div>
                    <div className="cardinput-group">
                        <input
                            type="text"
                            name="number"
                            placeholder="Card Number"
                            value={formData.number}
                            onChange={handleNumberChange}
                            className="modal-input"
                        />
                        <div className="input-group">
                            <div>
                                <input
                                    type="text"
                                    name="month"
                                    placeholder="Month"
                                    value={formData.month}
                                    onChange={handleChange}
                                    className="modal-input"
                                    maxLength={2}
                                />
                                <input
                                    type="text"
                                    name="year"
                                    placeholder="Year"
                                    value={formData.year}
                                    onChange={handleChange}
                                    className="modal-input"
                                    maxLength={2}
                                />
                            </div>

                            <input
                                type="text"
                                name="cvv"
                                placeholder="CVV"
                                value={formData.cvv}
                                onChange={handleChange}
                                className="modal-input cvv-input"
                                maxLength={3}
                            />
                        </div>

                        <input
                            type="text"
                            name="pin"
                            placeholder="PIN"
                            value={formData.pin}
                            onChange={handleChange}
                            className="modal-input input-group__pin"
                            maxLength={4}
                        />
                    </div>
                </div>

                <div className="button-group">
                    <button className="modal-button" onClick={
                        async () => { await onSubmit(formData) }
                    }>Submit</button>
                </div>
            </div>
        </div>
    );
};

export default ModalCard;
