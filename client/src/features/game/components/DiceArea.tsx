import React from "react";
import { Box, Divider, Grid, makeStyles } from "@material-ui/core";
import LockIcon from '@material-ui/icons/Lock';
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
    const lockedInDice = useAppSelector(diceSelector({ rollState: "LOCKED_IN", sorted: true }));
    const classes = useStyles();
    return (
        <Box className={classes.diceArea} border={3} borderColor="primary.main">
            <Grid className={classes.diceSubarea}>
                {idleDice.map((d) => (
                    <Dice key={d.id} id={d.id} value={d.value} />
                ))}
            </Grid>
            <Divider />
            <Box display="flex" flexDirection="row">
                <Grid className={classes.diceSubarea}>
                    {lockedInDice.map((d) => (
                        <Dice key={d.id} id={d.id} value={d.value} />
                    ))}
                    
                </Grid>
                <Box alignSelf="center">
                    <LockIcon />
                </Box>
                
            </Box>     
        </Box>
    );
};

export default DiceArea;
