import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import createSocketIoMiddleware from "redux-socket.io";
import io from "socket.io-client";
import GameReducer from "@features/game/GameReducer";
import MatchmakerReducer from "@features/matchmaker/MatchmakerReducer";

const socket = io("http://localhost:80");
const socketIoMiddleware = createSocketIoMiddleware(socket, "server/");

// @ts-ignore
const loggerMiddleware = (store) => (next) => (action) => {
    console.group(action.type);
    console.info("dispatching", action);
    let result = next(action);
    console.log("next state", store.getState());
    console.groupEnd();
    return result;
};

export const store = configureStore({
    reducer: {
        game: GameReducer,
        matchmaker: MatchmakerReducer,
    },
    // middleware: [socketIoMiddleware, loggerMiddleware],
    middleware: (getDefaultMiddleware) => getDefaultMiddleware()
        .concat([socketIoMiddleware, loggerMiddleware])
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
