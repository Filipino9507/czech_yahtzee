import React from "react";
import { makeStyles, TableBody, TableCell, TableRow, Tooltip } from "@material-ui/core";
import InfoIcon from "@material-ui/icons/Info";
import { ScoreboardDataKey } from "cys/models/game/score";
import Player from "cys/models/game/player";
import {
    getDisplayedScoringRuleDescription,
    getDisplayedScoringRuleName,
} from "@util/displayed-strings";
import ScoreboardDataCell from "./ScoreboardDataCell";

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

const ScoreboardBody: React.FunctionComponent<Props> = ({ players }: Props) => {
    const classes = useStyles();
    return (
        <TableBody>
            {Object.keys(players[0].scoreboardData).map((scoringRuleName: ScoreboardDataKey) => (
                <TableRow key={scoringRuleName}>
                    <TableCell
                        className={classes.infoIconTableCell}
                        padding="checkbox"
                        size="small"
                    >
                        <Tooltip title={getDisplayedScoringRuleDescription(scoringRuleName)} arrow>
                            <InfoIcon />
                        </Tooltip>
                    </TableCell>
                    <TableCell size="small">
                        <b>{getDisplayedScoringRuleName(scoringRuleName)}</b>
                    </TableCell>
                    {players.map((player, playerIdx) => (
                        <ScoreboardDataCell
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
};

export default ScoreboardBody;
