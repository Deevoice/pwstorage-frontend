import React from 'react';
import { RecordData } from '@/types/record';

const Record: React.FC<RecordData> = (data) => {
    return (
        <li key={data.id}>
            <h3>{data.title}</h3>
            <p>{data.content}</p>
            <p>Type: {data.recordType}</p>
            {data.folderId && <p>Folder ID: {data.folderId}</p>}
            <p>Favorite: {data.isFavorite ? 'Yes' : 'No'}</p>
        </li>
    );
};

export default Record;
