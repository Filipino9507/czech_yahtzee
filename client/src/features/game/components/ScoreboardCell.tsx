import React from "react";
import { makeStyles, TableCell, Link } from "@material-ui/core";
import { ScoreboardDataKey } from "cys/models/game/score";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { finishTurn, roomIdSelector } from "../GameReducer";

const useStyles = makeStyles((theme) => ({}));

interface Props {
    scoringRuleName: ScoreboardDataKey;
    scored: boolean;
    value: number;
}

const ScoreboardCell: React.FunctionComponent<Props> = ({
    scoringRuleName,
    scored,
    value,
}: Props) => {
    const roomId = useAppSelector(roomIdSelector);

    const dispatch = useAppDispatch();
    const onFinishTurn = () => dispatch(finishTurn({ roomId, scoringRuleName }));

    const isPeeked = !scored && value !== 0;
    return (
        <TableCell align="right" size="small">
            {isPeeked ? <Link onClick={onFinishTurn}>{value}</Link> : value}
        </TableCell>
    );
};

export default ScoreboardCell;
