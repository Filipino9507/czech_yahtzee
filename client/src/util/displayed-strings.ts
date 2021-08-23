import { ScoreboardDataKey } from "cys/models/game/score";

export const getDisplayedScoringRuleName = (scoreboardDataKey: ScoreboardDataKey) => {
    const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
    let splitKey = scoreboardDataKey.split(/(?=[A-Z])/);
    splitKey = splitKey.map((word) => capitalize(word));
    return splitKey.join(" ");
};
