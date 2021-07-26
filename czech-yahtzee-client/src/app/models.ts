/**
 * User models
 */
import UserDTO from "czech-yahtzee-shared/models/user/user-dto";
export type User = UserDTO;

/**
 * Player models
 */
import PlayerDTO from "czech-yahtzee-shared/models/player/player-dto";
export type Player = PlayerDTO;
export type { default as ScoreboardData } from "czech-yahtzee-shared/models/player/scoreboard-data";
export type { default as Score } from "czech-yahtzee-shared/models/player/score";

/**
 * Dice models
 */
import DiceDTO from "czech-yahtzee-shared/models/dice/dice-dto";
export type Dice = DiceDTO & { selected: boolean };
export type { default as DiceValue } from "czech-yahtzee-shared/models/dice/dice-value";
export type { default as DiceRollState } from "czech-yahtzee-shared/models/dice/dice-roll-state";

/**
 * Loading enum
 */
export enum Loading { IDLE, LOADING, FULLFILLED, REJECTED };
