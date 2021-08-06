import Dice, { getDefaultDice } from "./dice";
import Player from "./player";

export default interface Game {
    playerCount: number;
    playerTurn: number;
    players: Player[];
    diceCount: number;
    dice: Dice[];
    roomId: string;
}

export const getDefaultGame = (
    roomId: string,
    config: GameConfig = { diceCount: 6, playerCount: 2 },
): Game => {
    const dice = new Array<Dice>(config.diceCount);
    for (let i = 0; i < config.diceCount; ++i) {
        dice[i] = getDefaultDice(i);
    }
    return {
        playerCount: config.playerCount,
        playerTurn: 0,
        players: [],
        diceCount: config.diceCount,
        dice,
        roomId: roomId ?? "",
    };
};

export interface GameConfig {
    playerCount: number;
    diceCount: number;
}
