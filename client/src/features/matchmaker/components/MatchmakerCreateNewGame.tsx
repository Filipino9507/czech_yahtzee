import React, { useEffect } from "react";
import useGlobalStyles from "@app/globalStyles";
import { Box, Typography, Button, Divider } from "@material-ui/core";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
    addPlayerToNewRoom,
    removePlayerFromExistingRoom,
    roomIdSelector,
} from "../MatchmakerReducer";

interface Props {
    onGoBack: () => void;
}

const MatchmakerCreateNewGame: React.FunctionComponent<Props> = ({ onGoBack }: Props) => {
    const roomId = useAppSelector(roomIdSelector);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(addPlayerToNewRoom({}));
    }, []);

    const handleCancel = () => {
        dispatch(removePlayerFromExistingRoom({ roomId }));
        onGoBack();
    };

    const classes = useGlobalStyles();
    return (
        <Box display="flex" flexDirection="column">
            <Typography className={classes.smallMargin} variant="h6">
                Share this code with your opponent:
            </Typography>
            <Typography className={classes.mediumMargin} variant="h4" align="center">
                {roomId}
            </Typography>
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

export default MatchmakerCreateNewGame;
