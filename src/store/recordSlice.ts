import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface RecordState {
    records: any[];
}

const initialState: RecordState = {
    records: [],
};

const recordSlice = createSlice({
    name: 'records',
    initialState,
    reducers: {
        setRecords(state, action: PayloadAction<any[]>) {
            state.records = action.payload;
        },
        addRecord(state, action: PayloadAction<any>) {
            state.records.push(action.payload);
        },
        updateRecord(state, action: PayloadAction<any>) {
            const index = state.records.findIndex(record => record.id === action.payload.id);
            if (index !== -1) {
                state.records[index] = action.payload;
            }
        },
        deleteRecord(state, action: PayloadAction<string>) {
            state.records = state.records.filter(record => record.id !== action.payload);
        },
    },
});

export const { setRecords, addRecord, updateRecord, deleteRecord } = recordSlice.actions;
export default recordSlice.reducer;
