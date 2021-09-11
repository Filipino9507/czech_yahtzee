import { Socket } from "socket.io";
import Game, { getDefaultGame } from "cys/models/game/game";
import { DiceValue } from "cys/models/game/dice";
import { ScoreboardDataKey, SCORING_RULE_COUNT } from "cys/models/game/score";
import Player, { getDefaultPlayer } from "cys/models/game/player";
import { generatePlayerId } from "@logic/connection/id";
import { peekScores, setScore, calculateTotalScore } from "./scoring/scoring";

export default class GameInstance {
    // socketId -> Player
    private playerMap: Map<string, Player>;
    private game: Game;
    private hostSocketId: string | null;
    private turnsUntilEnd: number;

    public get gameData(): Game {
        return JSON.parse(JSON.stringify(this.game));
    }
    public get currentPlayerCount(): number {
        return this.game.players.length;
    }
    public get playerCount(): number {
        return this.game.playerCount;
    }
    public set playerCount(value: number) {
        this.game.playerCount = value;
    }
    public isHostSocket(socket: Socket): boolean {
        return this.hostSocketId === socket.id;
    }

    public constructor(roomId: string) {
        this.game = getDefaultGame(roomId);
        this.playerMap = new Map();
        this.hostSocketId = null;
        this.turnsUntilEnd = 0;
    }

    public initializeTurnsUntilEnd(): void {
        this.turnsUntilEnd = this.game.players.length * SCORING_RULE_COUNT;
    }

    /**
     * Tries to reinclude player after page reload on client-side
     * @param playerId id of the player
     * @returns whether this game contains the player
     */
    public reincludePlayer(socket: Socket, playerId: string): boolean {
        const newSocketId = socket.id;
        for (const oldSocketId of Array.from(this.playerMap.keys())) {
            const player = this.playerMap.get(oldSocketId);
            if (player && player.playerId === playerId) {
                socket.join(this.game.roomId);
                this.playerMap.delete(oldSocketId);
                this.playerMap.set(newSocketId, player);
                if (this.hostSocketId === oldSocketId) {
                    this.hostSocketId = newSocketId;
                }
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
    public addPlayer(socket: Socket, isHost: boolean, userId?: string): number {
        socket.join(this.game.roomId);
        const playerId = generatePlayerId(this.playerMap);
        const displayedName = userId === undefined ? `Guest_${playerId}` : `User_${userId}`;
        const player = getDefaultPlayer(displayedName, playerId, userId);
        this.playerMap.set(socket.id, player);
        this.game.players.push(player);
        if (isHost) {
            this.hostSocketId = socket.id;
        }
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

    public giveStartingRolls(): void {
        this.game.players[this.game.playerTurn].rolls += 3;
    }

    public rollDice(): void {
        if (this.game.players[this.game.playerTurn].rolls === 0) {
            return;
        }
        --this.game.players[this.game.playerTurn].rolls;
        for (const dice of this.game.dice) {
            if (dice.rollState !== "LOCKED_IN") {
                dice.value = (Math.floor(Math.random() * 6) + 1) as DiceValue;
                dice.rollState = "IDLE";
            }
        }
        const diceValues = this.game.dice.map((d) => d.value);
        const scoreboardData = this.game.players[this.game.playerTurn].scoreboardData;
        peekScores(diceValues, scoreboardData);
    }

    public toggleLockInDice(diceId: number): void {
        const dice = this.game.dice[diceId];
        dice.rollState = dice.rollState === "LOCKED_IN" ? "IDLE" : "LOCKED_IN";
    }

    /**
     *
     * @param scoringRuleName Scoreboard data key determining what scoring rule was chosen
     * @returns whether or not game is over
     */
    public endTurn(scoringRuleName: ScoreboardDataKey): boolean {
        const currentPlayer = this.game.players[this.game.playerTurn];
        setScore(scoringRuleName, currentPlayer.scoreboardData);
        currentPlayer.score = calculateTotalScore(
            currentPlayer.scoreboardData,
            currentPlayer.rolls
        );
        for (const dice of this.game.dice) {
            dice.rollState = "IDLE";
            dice.value = 1;
        }
        this.game.playerTurn = (this.game.playerTurn + 1) % this.game.playerCount;
        if (--this.turnsUntilEnd === 0) {
            return true;
        }
        this.giveStartingRolls();
        return false;
    }
}
