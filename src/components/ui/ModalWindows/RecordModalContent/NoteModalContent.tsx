import React, { useState } from 'react';
import { RecordContentNote } from '@/types/recordContent';
import useForm from '@/hooks/useForm';

interface ModalNotesProps {
    defaultContent: RecordContentNote | null;
    onSubmit: (data: RecordContentNote) => Promise<void>;
}

const ModalNote: React.FC<ModalNotesProps> = ({ defaultContent, onSubmit }) => {
    const { formData, handleChange, setFormData } = useForm<RecordContentNote>(defaultContent || {
        data: ''
    });

    const handleChangeTextarea = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({ ...formData, data: e.target.value});
    };

    return (
        <div className="modal-content">
            <textarea
                name="data"
                placeholder="Add your notes here"
                value={formData.data}
                onChange={handleChangeTextarea}
                className="modal-textarea"
            ></textarea>
            <button className="modal-button" onClick={async () => { await onSubmit(formData) }}>
                Submit
            </button>
        </div>
    );
};

export default ModalNote;
