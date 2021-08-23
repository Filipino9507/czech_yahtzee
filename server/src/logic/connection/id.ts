import Player from "cys/models/game/player";
import SocketIOState from "./socket-io-state";

const ROOM_ID_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const ROOM_ID_CHARACTER_SET_SIZE = ROOM_ID_CHARACTER_SET.length;
const ROOM_ID_LENGTH = 4;

export const generateRoomId = (ioState: SocketIOState) => {
    let roomId;
    do {
        roomId = "";
        for (let i = 0; i < ROOM_ID_LENGTH; ++i) {
            roomId += ROOM_ID_CHARACTER_SET.charAt(
                Math.floor(Math.random() * ROOM_ID_CHARACTER_SET_SIZE)
            );
        }
    } while (ioState.hasRoom(roomId));
    return roomId;
};

const PLAYER_ID_CHARACTER_SET = "0123456789";
const PLAYER_ID_CHARACTER_SET_SIZE = PLAYER_ID_CHARACTER_SET.length;
const PLAYER_ID_LENGTH = 8;

export const generatePlayerId = (playerMap: Map<string, Player>) => {
    const getPlayerIds = () => Array.from(playerMap.values(), (player) => player.playerId);
    let playerId;
    do {
        playerId = "";
        for (let i = 0; i < PLAYER_ID_LENGTH; ++i) {
            playerId += PLAYER_ID_CHARACTER_SET.charAt(
                Math.floor(Math.random() * PLAYER_ID_CHARACTER_SET_SIZE)
            );
        }
    } while (getPlayerIds().includes(playerId));
    return playerId;
};
