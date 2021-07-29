import React, { useState } from "react";
import { Box, Button, Card, makeStyles } from "@material-ui/core";
import MatchmakerJoinExistingGame from "./components/MatchmakerJoinExistingGame.tsx";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    root: {
        width: "100%",
        height: "100vh",
    },
    rootContainer: {
        padding: theme.spacing(4),
    },
}));

const Matchmaker: React.FunctionComponent = () => {
    const [matchmakerState, setMatchmakerState] = useState<
        "IDLE" | "CREATE_NEW_GAME" | "JOIN_EXISTING_GAME"
    >("IDLE");
    const getMatchmakerContent = () => {
        switch(matchmakerState) {
            case "IDLE":
                return <div />;
        }
    };

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Box
                className={classes.rootContainer}
                width="100%"
                height="100%"
                justifyContent="center"
                alignItems="100%"
                display="flex"
            >
                <Box width="30%" height="50%">
                    <Button className={classes.button} variant="contained" color="secondary">
                        Create a new game
                    </Button>
                    <Button className={classes.button} variant="outlined" color="secondary">
                        Join an existing game
                    </Button>
                </Box>
            </Box>
        </Card>
    );
};

export default Matchmaker;
