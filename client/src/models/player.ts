export interface Scoreboard {
    ones: number;
    twos: number;
    threes: number;
    fours: number;
    fives: number;
    sixes: number;

    small: number;
    large: number;
    odd: number;
    even: number;
    doubles: number;
    triples: number;

    smallTriangle: number;
    largeTriangle: number;
    run: number;
    poker: number;
    general: number;
}

export default interface Player {
    rolls: number;
    extraRolls: number;
    scoreboard: Scoreboard;
}