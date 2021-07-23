import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import GameReducer from "../features/Game/GameReducer";

export const store = configureStore({
    reducer: {
        game: GameReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
