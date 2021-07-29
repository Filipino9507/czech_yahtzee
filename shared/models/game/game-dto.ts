import Dice from "./dice";
import Player from "./player";
import ScoreboardData from "./scoreboard-data";

export interface GameConfig {
    playerCount: number;
    diceCount: number;
}

export default class GameDTO {
    public playerCount: number;
    public playerTurn: number;
    public playerStates: Player[];

    public diceCount: number;
    public dice: Dice[];

    public constructor(
        playerIds: Array<string | undefined>,
        config: GameConfig = { playerCount: 2, diceCount: 6 }
    ) {
        this.playerCount = config.playerCount;
        this.playerTurn = 0;

        if (playerIds.length !== this.playerCount) {
            throw new Error("Length of playerIds must be the same as playerCount.");
        }
        this.playerStates = new Array(this.playerCount);
        for (let i = 0; i < this.playerCount; i++) {
            this.playerStates[i] = {
                rolls: 0,
                extraRolls: 0,
                scoreboardData: new ScoreboardData(),
                userId: playerIds[i],
            };
        }

        this.diceCount = config.diceCount;
        this.dice = new Array(this.diceCount);
        for (let i = 0; i < this.diceCount; i++) {
            this.dice[i] = {
                id: 0,
                value: 1,
                rollState: "IDLE",
            };
        }
    }
}
