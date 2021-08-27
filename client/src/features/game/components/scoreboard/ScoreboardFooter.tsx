import React from "react";
import { makeStyles, TableBody, TableCell, TableRow } from "@material-ui/core";
import Player from "cys/models/game/player";
import ScoreboardEmptyRow from "./ScoreboardEmptyRow";

const useStyles = makeStyles((theme) => ({}));

interface Props {
    players: Player[];
}

const ScoreboardFooter: React.FunctionComponent<Props> = ({ players }: Props) => {
    return (
        <TableBody>
            <TableRow>
                <TableCell padding="checkbox" variant="head" />
                <TableCell size="small">
                    <b>Total</b>
                </TableCell>
                {players.map((player) => (
                    <TableCell key={player.playerId} align="right" size="small">
                        <b>{player.score}</b>
                    </TableCell>
                ))}
            </TableRow>
            <ScoreboardEmptyRow playerColumnCount={players.length} />
            <TableRow>
                <TableCell padding="checkbox" variant="head" />
                <TableCell size="small">
                    <b>Rolls</b>
                </TableCell>
                {players.map((player) => (
                    <TableCell key={player.playerId} align="right" size="small">
                        <b>{player.rolls}</b>
                    </TableCell>
                ))}
            </TableRow>
        </TableBody>
    );
};

export default ScoreboardFooter;
