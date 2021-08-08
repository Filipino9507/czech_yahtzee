import { Socket } from "socket.io";
import Game, { getDefaultGame } from "cys/models/game/game";
import { DiceValue } from "cys/models/game/dice";
import Player, { getDefaultPlayer } from "cys/models/game/player";
import { generatePlayerId } from "@logic/connection/id";

export default class GameInstance {
    // socketId -> Player
    private playerMap: Map<string, Player>;

    public game: Game;
    public get hasStarted(): boolean {
        return this.game.playerCount === this.game.players.length;
    }
    public get playerCount(): number {
        return this.game.players.length;
    }
    
    public constructor(roomId: string) {
        this.game = getDefaultGame(roomId);
        this.playerMap = new Map();
    }

    /**
     * Tries to reinclude player after page reload on client-side
     * @param playerId id of the player
     * @returns whether this game contains the player
     */
    public reincludePlayer(socket: Socket, playerId: string): boolean {
        for (const socketId of Array.from(this.playerMap.keys())) {
            const player = this.playerMap.get(socketId);
            if (player && player.playerId === playerId) {
                socket.join(this.game.roomId);
                this.playerMap.set(socket.id, player);
                this.playerMap.delete(socketId);
                return true;
            }
        }
        return false;
    }

    /**
     *
     * @param socket socket of the player to add
     * @param playerId if the player reloaded the page, this allows 
     * the server to identify them
     * @param userId potential userId if the player is not a guest
     * @returns index of the player for determining order
     */
    public addPlayer(socket: Socket, userId?: string): number {
        socket.join(this.game.roomId);
        const playerId = generatePlayerId(this.playerMap);
        const displayedName = userId === undefined ? `Guest_${playerId}` : `User_${userId}`;
        const player = getDefaultPlayer(displayedName, playerId, userId);
        this.playerMap.set(socket.id, player);
        this.game.players.push(player);
        return this.game.players.length - 1;
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
        this.generateScores();
    }

    public toggleSelectDice(diceId: number): void {
        this.game.dice[diceId].selected = !this.game.dice[diceId].selected;
    }

    public lockInDice(lockedIn: boolean): void {
        for (const dice of this.game.dice) {
            if (dice.selected) {
                dice.rollState = lockedIn ? "LOCKED_IN" : "IDLE";
            }
        }
    }

    public endTurn(): void {
        this.score();
        for (const dice of this.game.dice) {
            dice.rollState = "IDLE";
            dice.value = 1;
            dice.selected = false;
        }
        this.game.playerTurn = (this.game.playerTurn + 1) % this.game.playerCount;
        this.game.players[this.game.playerTurn].rolls += 3;
    }

    private generateScores(): void {

    }

    private score(): void {
        /**
         * Score
         */
    }
}
