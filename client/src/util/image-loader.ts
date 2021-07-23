import { DiceValue } from "models/dice";

import dice1 from "../images/dice-1.png";
import dice2 from "../images/dice-2.png";
import dice3 from "../images/dice-3.png";
import dice4 from "../images/dice-4.png";
import dice5 from "../images/dice-5.png";
import dice6 from "../images/dice-6.png";

import selectedDice1 from "../images/selected-dice-1.png";
import selectedDice2 from "../images/selected-dice-2.png";
import selectedDice3 from "../images/selected-dice-3.png";
import selectedDice4 from "../images/selected-dice-4.png";
import selectedDice5 from "../images/selected-dice-5.png";
import selectedDice6 from "../images/selected-dice-6.png";

export const loadDiceImage = (value: DiceValue, selected: boolean) => {
    switch (value) {
        case 1:
            return selected ? selectedDice1 : dice1;
        case 2:
            return selected ? selectedDice2 : dice2;
        case 3:
            return selected ? selectedDice3 : dice3;
        case 4:
            return selected ? selectedDice4 : dice4;
        case 5:
            return selected ? selectedDice5 : dice5;
        case 6:
            return selected ? selectedDice6 : dice6;
        default:
            throw new Error("Invalid parameters for dice image.");
    }
};
