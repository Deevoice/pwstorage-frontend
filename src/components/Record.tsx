import React, { useEffect, useState } from 'react';
import { RecordData } from '@/types/record';
import { JSONStringToInterface } from '@/utils/interfaceUtils';

const Record: React.FC<RecordData> = (data: RecordData, decryptionKey: string) => {
    const [content, setRecordContent] = useState<string>('');

    useEffect(() => {
        if (data.content) {
            const recordContent = JSONStringToInterface<any>(data.content, decryptionKey);
            setRecordContent(recordContent);
        }
    }, [data.content, decryptionKey]);

    return (
        <li key={data.id}>
            <h3>{data.title}</h3>
            <p>{content}</p>
            <p>Type: {data.recordType}</p>
            {data.folderId && <p>Folder ID: {data.folderId}</p>}
            <p>Favorite: {data.isFavorite ? 'Yes' : 'No'}</p>
        </li>
    );
};

export default Record;
