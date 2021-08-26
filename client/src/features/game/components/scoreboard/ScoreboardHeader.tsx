import React from "react";
import { makeStyles, TableCell, TableHead, TableRow } from "@material-ui/core";
import Player from "cys/models/game/player";

const useStyles = makeStyles((theme) => ({}));

interface Props {
    players: Player[];
}

const ScoreboardHeader: React.FunctionComponent<Props> = ({ players }: Props) => {
    const classes = useStyles();
    return (
        <TableHead>
            <TableRow>
                <TableCell padding="checkbox" variant="head" />
                <TableCell variant="head" size="small">
                    <b>Player</b>
                </TableCell>
                {players.map((player) => (
                    <TableCell variant="head" key={player.playerId} align="right" size="small">
                        <b>{player.displayedName}</b>
                    </TableCell>
                ))}
            </TableRow>
        </TableHead>
    );
};

export default ScoreboardHeader;
