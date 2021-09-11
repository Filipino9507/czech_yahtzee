import React from "react";
import { makeStyles, TableBody, TableCell, TableRow, Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import Player from "cys/models/game/player";
import ScoreboardEmptyRow from "./ScoreboardEmptyRow";
import { getDisplayedScoringRuleDescription } from "@util/displayed-strings";

const useStyles = makeStyles((theme) => ({
    infoIconTableCell: {
        paddingLeft: theme.spacing(1),
        paddingRight: theme.spacing(1),
        paddingTop: 0,
        paddingBottom: 0,
    },
}));

interface Props {
    players: Player[];
}

const ScoreboardFooter: React.FunctionComponent<Props> = ({ players }: Props) => {
    const classes = useStyles();
    return (
        <TableBody>
            <TableRow>
                <TableCell className={classes.infoIconTableCell} padding="checkbox" size="small">
                    <Tooltip title={getDisplayedScoringRuleDescription("total")} arrow>
                        <InfoIcon />
                    </Tooltip>
                </TableCell>
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
