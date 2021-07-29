import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import GameReducer from "../features/Game/GameReducer";

const socket = io("http://localhost:80");
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

export const store = configureStore({
    reducer: {
        game: GameReducer,
    },
    middleware: [socketIoMiddleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
