import React, { useEffect, useState } from 'react';
import { RecordData } from '@/types/record';
import { JSONStringToInterface } from '@/utils/interfaceUtils';
import DeleteIcon from '@mui/icons-material/Delete';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import StarIcon from '@mui/icons-material/Star';
import { deleteRecord } from '@/api/record';
import { RecordContentBase } from '@/types/recordContent';
import RecordModal from '@/components/ui/ModalWindows/RecordModal';
import { format } from 'date-fns';

// interface RecordProps {
//     data: RecordData;
// };

// const Record: React.FC<RecordProps> = ({ data }) => {
//     const { fingerprint } = useFingerprint();
//     const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
//     const [content, setRecordContent] = useState<RecordContentBase | null>(null);

//     const handleClickOutside = (event: React.MouseEvent<HTMLDivElement>) => {
//         if (event.target === event.currentTarget) {
//             setIsModalOpen(false);
//         }
//     };

//     useEffect(() => {
//         const fetchData = async () => {
//             const recordData = await getRecordById(fingerprint, data.id);
//             setRecordContent((recordData as RecordData).content);
//         };

//         if (content) { return; }
//         if (isModalOpen) { fetchData(); }
//     }, [isModalOpen])

//     return (
//         <div className="">
//             <li className='vault-item' onClick={() => { setIsModalOpen(true) }}
//                 key={data.id}>
//                 <div className="vault-item_main">
//                     <p>{data.isFavorite ?
//                         <button>
//                             {/* <StarIcon /> */}
//                         </button> :
//                         <button>
//                             <StarBorderIcon sx={{ color: 'yellow' }} />
//                         </button>
//                     }</p>
//                     <h3>{data.title}</h3>
//                 </div>
//                 {data.folderId && <p>Folder ID: {data.folderId}</p>}
//                 <button onClick={async () => { await deleteRecord(fingerprint, data.id) }}>
//                     <DeleteIcon sx={{ color: '#d9dae0' }} />
//                 </button>
//             </li>

//             {isModalOpen ? (
//                 <RecordModal recordId={data.id} />
//                 // <div className="vault-modal" onClick={handleClickOutside}>
//                 //     <div className="vault-modal_content">
//                 //         <div className="modal-header">
//                 //             <h3 className='modal-header__title'>{data.title} | {data.recordType}</h3>
//                 //             <span className="modal-close-button" onClick={() => { setIsModalOpen(false) }}>
//                 //                 &times;
//                 //             </span>
//                 //         </div>
//                 //         <p>{data.content}</p>
//                 //     </div>
//                 // </div>
//             ) : ''}
//         </div>
//     );
// };

// export default Record;

interface RecordProps {
    record: RecordData;
    onClick: (id: number) => void;
}

const Record: React.FC<RecordProps> = ({ record, onClick }) => {
    return (
        <div className="record">
            <li className='vault-item' onClick={() => onClick(record.id)}>
                <div className="">
                    <p>{record.isFavorite ?
                        <button>
                            <StarIcon sx={{ color: '#f1f2f3' }} />
                        </button> :
                        <button>
                            <StarBorderIcon sx={{ color: '#f1f2f3' }} />
                        </button>
                    }</p>
                    <h3 className='vault-item__title'>{record.title}</h3>
                </div>
                <p>{format(record.updatedAt, 'dd.MM.yyyy HH:mm:ss')}</p>
            </li>
            <button onClick={async () => { await deleteRecord(record.id) }}>
                <DeleteIcon sx={{ color: '#d9dae0' }} />
            </button>
        </div>
    );
};

export default Record;

