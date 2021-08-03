import SerializableConvertible from "../seriazable-convertible";
import ScoreboardData, { ScoreboardDataSerializable } from "./scoreboard-data";

export interface PlayerSerializable {
    rolls: number;
    extraRolls: number;
    scoreboardData: ScoreboardDataSerializable;
    roomId: string;
    userId?: string;
}

export default class Player implements SerializableConvertible<PlayerSerializable> {
    public rolls: number;
    public extraRolls: number;
    public scoreboardData: ScoreboardData;
    public roomId: string;
    public userId?: string;

    public constructor(roomId: string, userId?: string) {
        this.rolls = 0;
        this.extraRolls = 0;
        this.scoreboardData = new ScoreboardData();
        this.roomId = roomId;
        this.userId = userId;
    }

    public toSerializable(): PlayerSerializable {
        return {
            ...this,
            scoreboardData: this.scoreboardData.toSerializable(),
        } as PlayerSerializable;
    }
}
