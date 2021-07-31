import React from "react";
import { Box, Button } from "@material-ui/core";
import useGlobalStyles from "@app/globalStyles";

interface Props {
    onCreateNewGame: () => void;
    onJoinExistingGame: () => void;
}

const MatchmakerIdle: React.FunctionComponent<Props> = ({
    onCreateNewGame,
    onJoinExistingGame,
}: Props) => {
    const classes = useGlobalStyles();
    return (
        <Box display="flex" flexDirection="column">
            <Button
                className={classes.mediumMargin}
                variant="contained"
                color="secondary"
                onClick={onCreateNewGame}
            >
                Create a new game
            </Button>
            <Button
                className={classes.mediumMargin}
                variant="contained"
                color="secondary"
                onClick={onJoinExistingGame}
            >
                Join an existing game
            </Button>
        </Box>
    );
};

export default MatchmakerIdle;
