import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Typography, Button } from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";
import DoneSharpIcon from "@material-ui/icons/DoneSharp";

import { useAppDispatch } from "app/hooks";
import { addPlayerToNewRoom } from "../GameReducer";
import { ScoreboardData } from "app/models";

const useStyles = makeStyles((theme) => ({
    actionButton: {
        width: "8vh",
        height: "8vh",
        margin: theme.spacing(1),
    },
    actionButtonIcon: {
        width: "7vh",
        height: "7vh",
    },
    actionText: {
        margin: theme.spacing(1),
    },
}));

const DiceActions: React.FunctionComponent = () => {
    const dispatch = useAppDispatch();

    const classes = useStyles();
    return (
        <Box>
            <Typography className={classes.actionText} variant="h6">
                [PLAYER_NAME]'s Turn
            </Typography>
            <Typography className={classes.actionText} variant="h6">
                Rolls: 3
            </Typography>
            <Box display="flex" flexDirection="row">
                <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    onClick={() => dispatch(addPlayerToNewRoom({
                        rolls: 1,
                        extraRolls: 1,
                        scoreboardData: {} as ScoreboardData
                    }))}
                >
                    <CasinoIcon className={classes.actionButtonIcon} />
                </Button>
                <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                >
                    <DoneSharpIcon className={classes.actionButtonIcon} />
                </Button>
            </Box>
        </Box>
    );
};

export default DiceActions;
