//@ts-ignore
import dedent from "dedent-tabs";
import { ScoreboardDataKey } from "cys/models/game/score";

export const getDisplayedScoringRuleName = (scoreboardDataKey: ScoreboardDataKey) => {
    const capitalize = (word: string) => word.charAt(0).toUpperCase() + word.slice(1);
    let splitKey = scoreboardDataKey.split(/(?=[A-Z])/);
    splitKey = splitKey.map((word) => capitalize(word));
    return splitKey.join(" ");
};

export const getDisplayedScoringRuleDescription = (scoreboardDataKey: ScoreboardDataKey) => {
    switch (scoreboardDataKey) {
        case "ones":
            return dedent`
                Scores all dice which show a 1.
            `;
        case "twos":
            return dedent`
                Scores all dice which show a 2.
            `;
        case "threes":
            return dedent`
                Scores all dice which show a 3.
            `;
        case "fours":
            return dedent`
                Scores all dice which show a 4.
            `;
        case "fives":
            return dedent`
                Scores all dice which show a 5.
            `;
        case "sixes":
            return dedent`
                Scores all dice which show a 6.
            `;
        case "small":
            return dedent`
                Scores all dice which show a 1, 2 or 3.
            `;
        case "large":
            return dedent`
                Scores all dice which show a 4, 5 or 6.
            `;
        case "odd":
            return dedent`
                Scores all dice which show an odd value.
            `;
        case "even":
            return dedent`
                Scores all dice which show an even value.
            `;
        case "doubles":
            return dedent`
                Scores only if the dice show three pairs of values.
                (two pairs can consist of the same value)
            `;
        case "triples":
            return dedent`
                Scores only if the dice show two triplets of values.
                (two triplets can consist of the same value)
            `;
        case "smallTriangle":
            return dedent`
                Scores only if the dice show three consecutive values,
                with the lowest value being represented three times,
                the middle twice and the highest once.
            `;
        case "largeTriangle":
            return dedent`
                Scores only if the dice show three consecutive values,
                with the highest value being represented three times,
                the middle twice and the lowest once.
            `;
        case "run":
            return dedent`
                Scores only if the dice show six consecutive values (1-6).
            `;
        case "poker":
            return dedent`
                Scores only if five of the dice show the same value. Only
                scores those dice.
            `;
        case "general":
            return dedent`
                Scores only if all six of the dice show the same value.
            `;
        default:
            return "";
    }
};
