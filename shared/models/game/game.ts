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
    playerCount = 2,
): Game => {
    const dice = new Array<Dice>(6);
    for (let i = 0; i < dice.length; ++i) {
        dice[i] = getDefaultDice(i);
    }
    return {
        playerCount,
        playerTurn: 0,
        players: [],
        diceCount: dice.length,
        dice,
        roomId: roomId ?? "",
    };
};
