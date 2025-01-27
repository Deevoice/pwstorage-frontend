import React, { useState, useEffect, useRef } from 'react';
import ModalNote from '@/components/ui/ModalWindows/RecordModalContent/NoteModalContent';
import ModalLogin from '@/components/ui/ModalWindows/RecordModalContent/LoginModalContent';
import ModalCard from '@/components/ui/ModalWindows/RecordModalContent/CardModalContent';
import { getRecordById, createRecord, updateRecord } from '@/api/record';
import { RecordType } from '@/types/enums/record';
import { interfaceToJSONString, JSONStringToInterface } from '@/utils/interfaceUtils';
import { RecordData, RecordCreateData, RecordUpdateData } from '@/types/record';
import { RecordContentBase } from '@/types/recordContent';
import { ErrorData } from '@/types/error';

interface RecordModalProps {
    isOpen: boolean;
    onClose: () => void;
    recordId: number | null;
    onSave: (data: RecordCreateData | RecordUpdateData) => void;
}

const RecordModal: React.FC<RecordModalProps> = ({ isOpen, onClose, recordId, onSave }) => {
    const [selectedType, setSelectedType] = useState<RecordType>(RecordType.NOTE);
    const [isTypeMenuOpen, setIsTypeMenuOpen] = useState<boolean>(false);
    const [data, setData] = useState<RecordCreateData | RecordUpdateData>({
        folderId: null,
        title: '',
        isFavorite: false,
        content: '',
        recordType: RecordType.NOTE,
    });
    const [recordContent, setRecordContent] = useState<any | null>();
    const modalRef = useRef<HTMLDivElement>(null);
    const typeMenuRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const fetchData = async () => {
            if (recordId !== null) {
                const recordData = await getRecordById(recordId);
                if ((recordData as ErrorData).error_code) {
                    setData({ ...data, title: (recordData as ErrorData).detail })
                    return;
                }
                setRecordContent(JSONStringToInterface((recordData as RecordData).content || ''));
                setSelectedType((recordData as RecordData).recordType);
                setData({ ...(recordData as RecordData) });
            } else {
                setData({
                    folderId: null,
                    title: '',
                    isFavorite: false,
                    content: '',
                    recordType: RecordType.NOTE,
                });
            }
        };

        if (isOpen) {
            fetchData();
        }
    }, [recordId, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setData(prevData => ({ ...prevData, [name]: value }));
    };

    const handleSave = () => {
        onSave(data);
        onClose();
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
        if (event.key === ' ') {
            event.stopPropagation();
        }
    };

    const handleTypeChange = (type: RecordType) => {
        setSelectedType(type);
        setIsTypeMenuOpen(false);
    };

    const toggleTypeMenu = () => {
        setIsTypeMenuOpen(prevState => !prevState);
    };

    const handleSubmit = async (contentData: RecordContentBase) => {
        try {
            const recordPayload = {
                content: interfaceToJSONString(contentData),
                folderId: data.folderId,
                isFavorite: data.isFavorite,
                title: data.title,
                recordType: selectedType,
            };

            if (recordId) {
                await updateRecord(recordId, recordPayload);
            } else {
                await createRecord(recordPayload);
            }
        } catch (error) {
            console.error('Failed to create or update record:', error);
        }
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (
                modalRef.current &&
                !modalRef.current.contains(event.target as Node) &&
                typeMenuRef.current &&
                !typeMenuRef.current.contains(event.target as Node)
            ) {
                onClose();
                setIsTypeMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside, { capture: true });

        return () => {
            document.removeEventListener('click', handleClickOutside, { capture: true });
        };
    }, [onClose]);

    if (!isOpen) return null;

    return (
        <div className="modal-wrapper" onKeyDown={handleKeyDown}>
            <div className="modal-container">
                <div className="modal-header">
                    <input
                        type="text"
                        name="title"
                        placeholder="Record title"
                        value={data.title}
                        onChange={handleChange}
                        className="modal-input"
                    />
                    <button className="modal-close-button" onClick={onClose}>
                        &times;
                    </button>
                </div>
                {recordId ? null : (
                    <div className="modal-type-wrapper" ref={typeMenuRef}>
                        <button className="modal-type-button" onClick={toggleTypeMenu}>
                            {selectedType.toString()}
                            <span className="modal-type-caret">{isTypeMenuOpen ? '▲' : '▼'}</span>
                        </button>
                        {isTypeMenuOpen && (
                            <div className="modal-type-menu">
                                <button className="modal-type-option" onClick={() => handleTypeChange(RecordType.NOTE)}>
                                    Note
                                </button>
                                <button className="modal-type-option" onClick={() => handleTypeChange(RecordType.LOGIN)}>
                                    Login
                                </button>
                                <button className="modal-type-option" onClick={() => handleTypeChange(RecordType.CARD)}>
                                    Card
                                </button>
                            </div>
                        )}
                    </div>
                )}
                {selectedType === RecordType.NOTE && <ModalNote defaultContent={recordContent} onSubmit={handleSubmit} />}
                {selectedType === RecordType.LOGIN && <ModalLogin defaultContent={recordContent} onSubmit={handleSubmit} />}
                {selectedType === RecordType.CARD && <ModalCard defaultContent={recordContent} onSubmit={handleSubmit} />}
            </div>
        </div>
    );
};

export default RecordModal;
