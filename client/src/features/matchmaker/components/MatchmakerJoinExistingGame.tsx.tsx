import React, { useState } from "react";
import useGlobalStyles from "@app/globalStyles";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
    addPlayerToExistingRoom,
    currentPlayerCountSelector,
    isNonHostWaitingSelector,
    playerCountSelector,
} from "../MatchmakerReducer";

interface Props {
    onGoBack: () => void;
}

const MatchmakerJoinExistingGame: React.FunctionComponent<Props> = ({ onGoBack }: Props) => {
    const playerCount = useAppSelector(playerCountSelector);
    const currentPlayerCount = useAppSelector(currentPlayerCountSelector);
    const isNonHostWaiting = useAppSelector(isNonHostWaitingSelector);

    const dispatch = useAppDispatch();

    const [roomId, setRoomId] = useState<string>("");
    const handleRoomIdChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = event.target.value.toUpperCase();
        if (newValue.length <= 4 && /^[A-Z]*$/.test(newValue)) {
            setRoomId(newValue);
        }
    };

    const handleJoinGame = () => {
        if (roomId.length !== 4) {
            alert("Game codes must consist of exactly 4 letters.");
            return;
        }
        dispatch(addPlayerToExistingRoom({ roomId }));
    };

    const handleCancel = () => {
        if (isNonHostWaiting) {
            // Send abort to server via Redux
        }
        onGoBack();
    };

    const classes = useGlobalStyles();

    const renderEnterCodeScreen = () => (
        <React.Fragment>
            <Typography className={classes.smallMargin} variant="h5">
                Enter code:
            </Typography>
            <TextField
                className={classes.mediumMargin}
                value={roomId}
                onChange={handleRoomIdChange}
                variant="outlined"
                inputProps={{
                    style: { textAlign: "center", fontSize: 30 },
                }}
            />
            <Button
                className={classes.mediumMargin}
                variant="contained"
                color="secondary"
                onClick={handleJoinGame}
            >
                Join game
            </Button>
        </React.Fragment>
    );

    const renderWaitingScreen = () => (
        <React.Fragment>
            <Typography className={classes.smallMargin} variant="h5">
                {currentPlayerCount === playerCount
                    ? "Waiting for host..."
                    : "Waiting for other players to join"}
            </Typography>
            <Typography className={classes.smallMargin} variant="body1">
                (In game: {currentPlayerCount}/{playerCount})
            </Typography>
        </React.Fragment>
    );

    return (
        <Box display="flex" flexDirection="column">
            {isNonHostWaiting ? renderWaitingScreen() : renderEnterCodeScreen()}
            <Divider />
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

export default MatchmakerJoinExistingGame;
