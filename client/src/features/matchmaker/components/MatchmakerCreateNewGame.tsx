import React, { useEffect } from "react";
import useGlobalStyles from "@app/globalStyles";
import { Box, Typography, Button, Divider } from "@material-ui/core";
import { ToggleButton, ToggleButtonGroup } from "@material-ui/lab";
import PersonIcon from "@material-ui/icons/Person";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
    addPlayerToNewRoom,
    removePlayerFromExistingRoom,
    setPlayerCount,
    startGame,
    roomIdSelector,
    playerCountSelector,
    currentPlayerCountSelector,
} from "../MatchmakerReducer";

interface Props {
    onGoBack: () => void;
}

const MatchmakerCreateNewGame: React.FunctionComponent<Props> = ({ onGoBack }: Props) => {
    const roomId = useAppSelector(roomIdSelector);
    const playerCount = useAppSelector(playerCountSelector);
    const currentPlayerCount = useAppSelector(currentPlayerCountSelector);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(addPlayerToNewRoom({}));
    }, []);

    const handleCancel = () => {
        dispatch(removePlayerFromExistingRoom({ roomId, isHost: true }));
        onGoBack();
    };
    const handleSetPlayerCount = (_: React.MouseEvent, newPlayerCount: number) =>
        dispatch(setPlayerCount({ roomId, newPlayerCount }));
    const handleStartGame = () => dispatch(startGame({ roomId }));

    const classes = useGlobalStyles();
    return (
        <Box display="flex" flexDirection="column">
            <Typography className={classes.smallMargin} variant="h6">
                Select number of players:
            </Typography>
            <Box
                className={classes.mediumMargin}
                display="flex"
                flexDirection="row"
                justifyContent="center"
                alignItems="center"
            >
                <ToggleButtonGroup
                    className={classes.smallMargin}
                    value={playerCount}
                    exclusive
                    onChange={handleSetPlayerCount}
                >
                    <ToggleButton value={2}>
                        <PersonIcon /> ×2
                    </ToggleButton>
                    <ToggleButton value={3}>
                        <PersonIcon /> ×3
                    </ToggleButton>
                    <ToggleButton value={4}>
                        <PersonIcon /> ×4
                    </ToggleButton>
                </ToggleButtonGroup>
                <Typography className={classes.smallMargin} variant="body1">
                    (In game: {currentPlayerCount}/{playerCount})
                </Typography>
            </Box>
            <Divider className={classes.mediumMargin} />

            <Typography className={classes.smallMargin} variant="h6">
                Share this code with your opponent:
            </Typography>
            <Typography className={classes.mediumMargin} variant="h4" align="center">
                {roomId}
            </Typography>
            <Divider className={classes.mediumMargin} />

            <Button
                className={classes.mediumMargin}
                variant="contained"
                color="secondary"
                onClick={handleStartGame}
                disabled={currentPlayerCount !== playerCount}
            >
                Start Game
            </Button>
            <Button
                className={classes.mediumMargin}
                variant="text"
                color="primary"
                onClick={handleCancel}
            >
                Cancel
            </Button>
        </Box>
    );
};

export default MatchmakerCreateNewGame;
