import React from "react";
import { Box, Divider, Grid, makeStyles } from "@material-ui/core";
import { useAppSelector } from "@app/hooks";

import Dice from "./Dice";
import { diceSelector } from "../GameReducer";

const useStyles = makeStyles((theme) => ({
    diceArea: {
        padding: theme.spacing(2),
    },
    diceSubarea: {
        width: "100%",
        height: theme.spacing(20),
    },
}));

const DiceArea: React.FunctionComponent = () => {
    const idleDice = useAppSelector(diceSelector({ rollState: "IDLE", sorted: true }));
    const rolledDice = useAppSelector(diceSelector({ rollState: "ROLLED", sorted: true }));
    const lockedInDice = useAppSelector(diceSelector({ rollState: "LOCKED_IN", sorted: true }));
    const classes = useStyles();
    return (
        <Box className={classes.diceArea} border={3} borderColor="primary.main">
            <Grid className={classes.diceSubarea}>
                {idleDice.map((d) => (
                    <Dice key={d.id} id={d.id} value={d.value} selected={d.selected} />
                ))}
            </Grid>
            <Divider />
            <Grid className={classes.diceSubarea}>
                {rolledDice.map((d) => (
                    <Dice key={d.id} id={d.id} value={d.value} selected={d.selected} />
                ))}
            </Grid>
            <Divider />
            <Grid className={classes.diceSubarea}>
                {lockedInDice.map((d) => (
                    <Dice key={d.id} id={d.id} value={d.value} selected={d.selected} />
                ))}
            </Grid>
        </Box>
    );
};

export default DiceArea;
