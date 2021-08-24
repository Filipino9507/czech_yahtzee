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
} from "@material-ui/core";
import { ScoreboardDataKey } from "cys/models/game/score";
import { getDisplayedScoringRuleName } from "@util/displayed-strings";
import ScoreboardCell from "./ScoreboardCell";

import { useAppSelector } from "@app/hooks";
import { playersSelector, canPlaySelector } from "../GameReducer";
import { playerIdxSelector } from "@features/matchmaker/MatchmakerReducer";

const useStyles = makeStyles((theme) => ({}));

const Scoreboard: React.FunctionComponent = () => {
    const players = useAppSelector(playersSelector);

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

    const renderScoreboardBody = () => (
        <TableBody>
            {Object.keys(players[0].scoreboardData).map((scoringRuleName: ScoreboardDataKey) => (
                <TableRow key={scoringRuleName}>
                    <TableCell size="small">
                        <b>{getDisplayedScoringRuleName(scoringRuleName)}</b>
                    </TableCell>
                    {players.map((player, playerIdx) => (
                        <ScoreboardCell
                            key={player.playerId}
                            cellPlayerIdx={playerIdx}
                            scoringRuleName={scoringRuleName}
                            scored={player.scoreboardData[scoringRuleName].scored}
                            value={player.scoreboardData[scoringRuleName].value}
                        />
                    ))}
                </TableRow>
            ))}
        </TableBody>
    );

    const renderScoreboardFoot = () => (
        <TableBody>
            <TableRow>
                <TableCell size="small">
                    <b>Total</b>
                </TableCell>
                {players.map((player) => (
                    <TableCell align="right" size="small">
                        <b>{player.score}</b>
                    </TableCell>
                ))}
            </TableRow>
            {renderEmptyRow()}
            <TableRow>
                <TableCell size="small">
                    <b>Rolls</b>
                </TableCell>
                {players.map((player) => (
                    <TableCell align="right" size="small">
                        <b>{player.rolls}</b>
                    </TableCell>
                ))}
            </TableRow>
        </TableBody>
    );

    const renderEmptyRow = () => (
        <TableRow>
            <TableCell />
            <TableCell />
            <TableCell />
        </TableRow>
    );

    return (
        <TableContainer component={Paper}>
            <Table>
                {renderScoreboardHead()}
                {renderScoreboardBody()}
                {renderScoreboardFoot()}
            </Table>
        </TableContainer>
    );
};

export default Scoreboard;
