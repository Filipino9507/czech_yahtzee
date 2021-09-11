import React, { useState } from "react";
import { Box, Card, makeStyles } from "@material-ui/core";
import MatchmakerIdle from "./components/MatchmakerIdle";
import MatchmakerCreateNewGame from "./components/MatchmakerCreateNewGame";
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
        switch (matchmakerState) {
            case "IDLE":
                return (
                    <MatchmakerIdle
                        onCreateNewGame={() => setMatchmakerState("CREATE_NEW_GAME")}
                        onJoinExistingGame={() => setMatchmakerState("JOIN_EXISTING_GAME")}
                    />
                );
            case "CREATE_NEW_GAME":
                return <MatchmakerCreateNewGame onGoBack={() => setMatchmakerState("IDLE")} />;
            case "JOIN_EXISTING_GAME":
                return <MatchmakerJoinExistingGame onGoBack={() => setMatchmakerState("IDLE")} />;
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
                    {getMatchmakerContent()}
                </Box>
            </Box>
        </Card>
    );
};

export default Matchmaker;
