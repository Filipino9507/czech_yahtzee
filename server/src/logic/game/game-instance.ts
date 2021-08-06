import { Socket } from "socket.io";
import Game, { getDefaultGame } from "cys/models/game/game";
import { DiceValue } from "cys/models/game/dice";
import Player, { getDefaultPlayer } from "cys/models/game/player";

export default class GameInstance {
    private playerMap: Map<string, Player>;

    public game: Game;
    public get hasStarted(): boolean {
        return this.game.playerCount === this.game.players.length;
    }

    public constructor(roomId: string) {
        this.game = getDefaultGame(roomId);
        this.playerMap = new Map();
    }

    public addPlayer(socket: Socket, userId?: string): void {
        socket.join(this.game.roomId);
        const player = getDefaultPlayer(userId);
        this.playerMap.set(socket.id, player);
        this.game.players.push(player);
    }

    public removePlayer(socket: Socket): void {
        socket.leave(this.game.roomId);
        const player = this.playerMap.get(socket.id);
        this.playerMap.delete(socket.id);
        if (player) {
            const idx = this.game.players.indexOf(player);
            this.game.players.splice(idx, 1);
        }
    }

    public rollDice(): void {
        for (const dice of this.game.dice) {
            if (dice.rollState !== "LOCKED_IN") {
                dice.value = (Math.floor(Math.random() * 6) + 1) as DiceValue;
                dice.rollState = "ROLLED";
            }
        }
    }

    public toggleSelectDice(diceId: number, selected?: boolean): void {
        this.game.dice[diceId].selected = !this.game.dice[diceId].selected;
    }

    public lockInDice(lockedIn: boolean): void {
        for (const dice of this.game.dice) {
            if (dice.selected) {
                dice.rollState = lockedIn ? "LOCKED_IN" : "IDLE";
            }
        }
    }

    public switchTurn(): void {
        this.game.playerTurn = (this.game.playerTurn + 1) % this.game.playerCount;
    }

    public score(): void {
        /**
         * Score
         */
    }

    public resetDice(): void {
        for (const dice of this.game.dice) {
            dice.rollState = "IDLE";
            dice.value = 1;
            dice.selected = false;
        }
    }
}