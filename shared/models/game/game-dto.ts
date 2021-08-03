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
        players: Player[],
        config: GameConfig = { playerCount: 2, diceCount: 6 }
    ) {
        this.playerCount = config.playerCount;
        this.playerTurn = 0;

        if (players.length !== this.playerCount) {
            throw new Error("Length of playerIds must be the same as playerCount.");
        }
        this.playerStates = players;

        this.diceCount = config.diceCount;
        this.dice = new Array(this.diceCount);
        for (let i = 0; i < this.diceCount; i++) {
            this.dice[i] = {
                id: i,
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
