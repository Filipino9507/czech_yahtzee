const GAME_ID_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const GAME_ID_CHARACTER_SET_SIZE = GAME_ID_CHARACTER_SET.length;
const GAME_ID_LENGTH = 4;

export const generateRoomId = (rooms: Rooms) => {
    let roomId;
    do {
        roomId = "";
        for (let i = 0; i < GAME_ID_LENGTH; ++i) {
            roomId += GAME_ID_CHARACTER_SET.charAt(
                Math.floor(Math.random() * GAME_ID_CHARACTER_SET_SIZE)
            );
        }
    } while (rooms.has(roomId));
    return roomId;
};

export type Rooms = Map<string, Set<string>>;