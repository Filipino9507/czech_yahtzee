import React from "react";
import { makeStyles } from "@material-ui/core";
import { Box, Typography, Button } from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";
import LockIcon from "@material-ui/icons/Lock";
import LockOpenIcon from "@material-ui/icons/LockOpen";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
    rollDice,
    lockInDice,
    roomIdSelector,
    canPlaySelector,
    currentPlayerSelector,
} from "../GameReducer";
import { playerIdxSelector } from "@features/matchmaker/MatchmakerReducer";

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
    const roomId = useAppSelector(roomIdSelector);
    const playerIdx = useAppSelector(playerIdxSelector);
    const canPlay = useAppSelector(canPlaySelector(playerIdx));
    const currentPlayer = useAppSelector(currentPlayerSelector);

    const dispatch = useAppDispatch();
    const onRollDice = () => dispatch(rollDice({ roomId }));
    const onLockInDice = (lockedIn: boolean) => dispatch(lockInDice({ roomId, lockedIn }));

    const classes = useStyles();
    return (
        <Box>
            <Typography className={classes.actionText} variant="h6">
                {currentPlayer.displayedName}'s Turn
            </Typography>
            <Typography className={classes.actionText} variant="h6">
                Rolls: 3
            </Typography>
            <Box display="flex" flexDirection="row">
                <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    disabled={!canPlay}
                    onClick={onRollDice}
                >
                    <CasinoIcon className={classes.actionButtonIcon} />
                </Button>
                <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    disabled={!canPlay}
                    onClick={() => onLockInDice(true)}
                >
                    <LockIcon className={classes.actionButtonIcon} />
                </Button>
                <Button
                    className={classes.actionButton}
                    variant="contained"
                    color="primary"
                    disabled={!canPlay}
                    onClick={() => onLockInDice(false)}
                >
                    <LockOpenIcon className={classes.actionButtonIcon} />
                </Button>
            </Box>
        </Box>
    );
};

export default DiceActions;
