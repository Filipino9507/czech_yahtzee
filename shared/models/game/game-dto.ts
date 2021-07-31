import SerializableConvertible from "../seriazable-convertible";
import Dice from "./dice";
import Player, { PlayerSerializable } from "./player";
import GameConfig from "./game-config";

export interface GameDTOSerializable {
    playerCount: number;
    playerTurn: number;
    playerStates: PlayerSerializable[];
    diceCount: number;
    dice: Dice[];
}

export default class GameDTO implements SerializableConvertible<GameDTOSerializable> {
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
            this.playerStates[i] = new Player(playerIds[i]);
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

    public toSerializable(): GameDTOSerializable {
        const serializablePlayerStates = this.playerStates.map(
            (playerState) => playerState.toSerializable()
        );
        return {
            ...this,
            playerStates: serializablePlayerStates,
        } as GameDTOSerializable;
    }
}
