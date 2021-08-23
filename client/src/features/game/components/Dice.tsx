import React, { useMemo } from "react";
import { Box, ImageListItem, makeStyles } from "@material-ui/core";
import { loadDiceImage } from "@util/image-loader";
import { DiceValue } from "cys/models/game/dice";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { toggleSelectDice, roomIdSelector } from "../GameReducer";

const useStyles = makeStyles((theme) => ({
    image: {
        width: theme.spacing(10),
        height: theme.spacing(10),
    },
}));

interface Props {
    id: number;
    value: DiceValue;
    selected: boolean;
}

const Dice: React.FunctionComponent<Props> = ({ id, value, selected }: Props) => {
    const roomId = useAppSelector(roomIdSelector);
    console.log(selected);
    const unselectedImg = useMemo(() => loadDiceImage(value, false), []);
    const selectedImg = useMemo(() => loadDiceImage(value, true), []);
    const getImg = () => (selected ? selectedImg : unselectedImg);
    const dispatch = useAppDispatch();

    const classes = useStyles();
    return (
        <input
            className={classes.image}
            type="image"
            src={getImg()}
            draggable={false}
            unselectable="on"
            onClick={() => dispatch(toggleSelectDice({ roomId, diceId: id }))}
        />
    );
    // return <img className={classes.image} src={diceImg} draggable="false" />;
};

export default Dice;
