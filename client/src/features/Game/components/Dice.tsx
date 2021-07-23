import React, { useMemo } from "react";
import { Box, ImageListItem, makeStyles } from "@material-ui/core";
import { DiceValue } from "models/dice";
import { loadDiceImage } from "util/image-loader";

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
    const diceImg = useMemo(() => loadDiceImage(value, selected), []);
    const classes = useStyles();
    return <img className={classes.image} src={diceImg} draggable="false" />;
};

export default Dice;
