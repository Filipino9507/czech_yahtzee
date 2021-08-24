import { DiceValue } from "cys/models/game/dice";

// @ts-ignore
import dice1 from "../images/dice-1.png";
// @ts-ignore
import dice2 from "../images/dice-2.png";
// @ts-ignore
import dice3 from "../images/dice-3.png";
// @ts-ignore
import dice4 from "../images/dice-4.png";
// @ts-ignore
import dice5 from "../images/dice-5.png";
// @ts-ignore
import dice6 from "../images/dice-6.png";


export const loadDiceImage = (value: DiceValue) => {
    switch (value) {
        case 1:
            return dice1;
        case 2:
            return dice2;
        case 3:
            return dice3;
        case 4:
            return dice4;
        case 5:
            return dice5;
        case 6:
            return dice6;
        default:
            throw new Error("Invalid parameters for dice image.");
    }
};
