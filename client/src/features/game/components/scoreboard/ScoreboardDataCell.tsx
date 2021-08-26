import React from "react";
import { makeStyles, TableCell, Link } from "@material-ui/core";
import { ScoreboardDataKey } from "cys/models/game/score";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { canPlaySelector, finishTurn, roomIdSelector } from "../../GameReducer";
import { playerIdxSelector } from "@features/matchmaker/MatchmakerReducer";

const useStyles = makeStyles((theme) => ({
    link: {
        cursor: "pointer",
    },
}));

interface Props {
    scoringRuleName: ScoreboardDataKey;
    scored: boolean;
    value: number;
    cellPlayerIdx: number;
}

const ScoreboardDataCell: React.FunctionComponent<Props> = ({
    scoringRuleName,
    scored,
    value,
    cellPlayerIdx,
}: Props) => {
    const roomId = useAppSelector(roomIdSelector);
    const playerIdx = useAppSelector(playerIdxSelector);
    const canPlay = useAppSelector(canPlaySelector(playerIdx));

    const dispatch = useAppDispatch();
    const onFinishTurn = () => dispatch(finishTurn({ roomId, scoringRuleName }));

    const canFinishTurn = !scored && playerIdx === cellPlayerIdx && canPlay;
    const classes = useStyles();
    return (
        <TableCell align="right" size="small">
            {canFinishTurn ? (
                <Link
                    className={classes.link}
                    style={{ textDecoration: "none" }}
                    onClick={onFinishTurn}
                >
                    <b>{value}</b>
                </Link>
            ) : (
                value
            )}
        </TableCell>
    );
};

export default ScoreboardDataCell;
