import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FolderState {
    folders: any[];
}

const initialState: FolderState = {
    folders: [],
};

const folderSlice = createSlice({
    name: 'folders',
    initialState,
    reducers: {
        setFolders(state, action: PayloadAction<any[]>) {
            state.folders = action.payload;
        },
        addFolder(state, action: PayloadAction<any>) {
            state.folders.push(action.payload);
        },
        updateFolder(state, action: PayloadAction<any>) {
            const index = state.folders.findIndex(folder => folder.id === action.payload.id);
            if (index !== -1) {
                state.folders[index] = action.payload;
            }
        },
        deleteFolder(state, action: PayloadAction<string>) {
            state.folders = state.folders.filter(folder => folder.id !== action.payload);
        },
    },
});

export const { setFolders, addFolder, updateFolder, deleteFolder } = folderSlice.actions;
export default folderSlice.reducer;
