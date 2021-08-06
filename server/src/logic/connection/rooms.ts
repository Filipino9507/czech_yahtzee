import SocketIOState from "./socket-io-state";

const GAME_ID_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GAME_ID_CHARACTER_SET_SIZE = GAME_ID_CHARACTER_SET.length;
const GAME_ID_LENGTH = 4;

export const generateRoomId = (ioState: SocketIOState) => {
    let roomId;
    do {
        roomId = "";
        for (let i = 0; i < GAME_ID_LENGTH; ++i) {
            roomId += GAME_ID_CHARACTER_SET.charAt(
                Math.floor(Math.random() * GAME_ID_CHARACTER_SET_SIZE)
            );
        }
    } while (ioState.hasRoom(roomId));
    return roomId;
};

export type Room = Set<string>;
