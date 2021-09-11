import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "@app/store";

/**
 * State
 */
export interface AlertState {
    isOpen: boolean;
    title: string | null;
    contentText: string | null;
}

const initialState: AlertState = {
    isOpen: false,
    title: null,
    contentText: null,
};

/**
 * Selectors
 */
export const isOpenSelector = (state: RootState) => state.alert.isOpen;
export const titleSelector = (state: RootState) => state.alert.title;
export const contentTextSelector = (state: RootState) => state.alert.contentText;

/**
 * Slice
 */
const AlertSlice = createSlice({
    name: "alert",
    initialState,
    reducers: {
        closeAlert(state: AlertState) {
            state.isOpen = false;
            state.title = null;
            state.contentText = null;
        },
        // To-client socket.io actions
        displayAlert(state: AlertState, action: PayloadAction<{
            title: string;
            contentText: string;
        }>) {
            const { title, contentText } = action.payload;
            state.isOpen = true;
            state.title = title;
            state.contentText = contentText;
        }
    }
});

export const { closeAlert } = AlertSlice.actions;
export default AlertSlice.reducer;