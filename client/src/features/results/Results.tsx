import React from "react";
import { makeStyles, Typography, Button, Box, Card, Divider } from "@material-ui/core";

import useGlobalStyles from "@app/globalStyles";
import { useAppSelector, useAppDispatch } from "@app/hooks";
import { setGameStatusIdle } from "@features/matchmaker/MatchmakerReducer";
import { playersSelector } from "@features/game/GameReducer";

const useStyles = makeStyles((theme) => ({
    rootContainer: {
        width: "100%",
        height: "100vh",
    },
    root: {
        padding: theme.spacing(4),
    },
}));

const Results: React.FunctionComponent = () => {
    const players = useAppSelector(playersSelector);

    const dispatch = useAppDispatch();

    const classes = useStyles();
    const globalClasses = useGlobalStyles();
    return (
        <Card className={classes.rootContainer}>
            <Box
                className={classes.root}
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="100%"
                display="flex"
            >
                <Box display="flex" flexDirection="column">
                    <Typography className={globalClasses.mediumMargin} variant="h4">
                        Results
                    </Typography>
                    <Divider className={globalClasses.mediumMargin} />
                    <Box>
                        {players.map((player) => (
                            <Typography className={globalClasses.smallMargin} variant="h6">
                                {player.displayedName}: {player.score} points
                            </Typography>
                        ))}
                    </Box>
                    <Divider className={globalClasses.mediumMargin} />
                    <Button
                        className={globalClasses.mediumMargin}
                        color="secondary"
                        variant="contained"
                        disabled
                    >
                        Play Again
                    </Button>
                    <Button
                        className={globalClasses.mediumMargin}
                        color="primary"
                        variant="text"
                        onClick={() => dispatch(setGameStatusIdle())}
                    >
                        Cancel
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default Results;
