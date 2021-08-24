import React, { useMemo } from "react";
import { Box, ImageListItem, makeStyles } from "@material-ui/core";
import { loadDiceImage } from "@util/image-loader";
import { DiceValue } from "cys/models/game/dice";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { toggleLockInDice, roomIdSelector } from "../GameReducer";

const useStyles = makeStyles((theme) => ({
    image: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

interface Props {
    id: number;
    value: DiceValue;
}

const Dice: React.FunctionComponent<Props> = ({ id, value }: Props) => {
    const roomId = useAppSelector(roomIdSelector);
    const img = loadDiceImage(value);
    const dispatch = useAppDispatch();

    const classes = useStyles();
    return (
        <input
            className={classes.image}
            type="image"
            src={img}
            draggable={false}
            unselectable="on"
            onClick={() => dispatch(toggleLockInDice({ roomId, diceId: id }))}
        />
    );
};

export default Dice;
