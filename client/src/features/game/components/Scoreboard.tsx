import React from "react";
import { makeStyles } from "@material-ui/core";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
} from "@material-ui/core";
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { ScoreboardDataKey } from "cys/models/game/score";
import Player from "cys/models/game/player";
import { getDisplayedScoringRuleName } from "@util/displayed-strings";

import { useAppSelector } from "@app/hooks";
import { playersSelector } from "../GameReducer";

const useStyles = makeStyles((theme) => ({
    useScoreButton: {
        maxHeight: "100%",
    },
}));

const Scoreboard: React.FunctionComponent = () => {
    const players = useAppSelector(playersSelector);

    const classes = useStyles();

    const renderScoreboardHead = () => (
        <TableHead>
            <TableRow>
                <TableCell size="small">
                    <b>Player</b>
                </TableCell>
                {players.map((player) => (
                    <TableCell key={player.playerId} align="right" size="small">
                        <b>{player.displayedName}</b>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );

    const renderScoreboardBody = () => {
        const shouldBeRed = (player: Player, scoringRuleName: ScoreboardDataKey) => {
            const score = player.scoreboardData[scoringRuleName];
            return !score.scored && score.value !== 0;
        };

        return (
            <TableBody>
                {Object.keys(players[0].scoreboardData).map(
                    (scoringRuleName: ScoreboardDataKey) => (
                        <TableRow key={scoringRuleName}>
                            <TableCell size="small">
                                <b>{getDisplayedScoringRuleName(scoringRuleName)}</b>
                            </TableCell>
                            {players.map((player) => {
                                const isRed = shouldBeRed(player, scoringRuleName);
                                return (
                                    <TableCell
                                        key={player.playerId}
                                        align="right"
                                        size="small"
                                        style={{
                                            color: isRed ? "red" : "white",
                                        }}
                                    >
                                        {player.scoreboardData[scoringRuleName].value}
                                        {isRed && (
                                            <IconButton className={classes.useScoreButton}>
                                                {/* <CheckCircleIcon /> */}
                                            </IconButton>
                                        )}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    )
                )}
            </TableBody>
        );
    };

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderScoreboardHead()}
                {renderScoreboardBody()}
            </Table>
        </TableContainer>
    );
};

export default Scoreboard;
