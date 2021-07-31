import React, { useState } from "react";
import useGlobalStyles from "@app/globalStyles";
import { Box, Button, Divider, TextField, Typography } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { addPlayerToExistingRoom, roomIdSelector } from "../MatchmakerReducer";

interface Props {
    onGoBack: () => void;
}

const MatchmakerJoinExistingGame: React.FunctionComponent<Props> = ({ onGoBack }: Props) => {
    const dispatch = useAppDispatch();

    const [roomId, setRoomId] = useState<string>("");

    const handleCodeChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
        // Send abort to server via Redux
        onGoBack();
    };

    const classes = useGlobalStyles();
    return (
        <Box display="flex" flexDirection="column">
            <Typography className={classes.smallMargin} variant="h5">
                Enter code:
            </Typography>
            <TextField
                className={classes.mediumMargin}
                value={roomId}
                onChange={handleCodeChange}
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
