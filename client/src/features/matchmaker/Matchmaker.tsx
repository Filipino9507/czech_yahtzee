import React, { useEffect, useState } from "react";
import { Box, Card, makeStyles } from "@material-ui/core";
import MatchmakerIdle from "./components/MatchmakerIdle";
import MatchmakerCreateNewGame from "./components/MatchmakerCreateNewGame";
import MatchmakerJoinExistingGame from "./components/MatchmakerJoinExistingGame.tsx";

import { useAppSelector } from "@app/hooks";
import { isHostSelector, gameStatusSelector } from "./MatchmakerReducer";

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
    rootContainer: {
        width: "100%",
        height: "100vh",
    },
    root: {
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

    const isHost = useAppSelector(isHostSelector);
    const gameStatus = useAppSelector(gameStatusSelector);
    useEffect(() => {
        if (gameStatus === "WAITING") {
            setMatchmakerState(isHost ? "CREATE_NEW_GAME" : "JOIN_EXISTING_GAME");
        }
    }, []);

    const classes = useStyles();
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
                <Box width="30%" height="50%">
                    {getMatchmakerContent()}
                </Box>
            </Box>
        </Card>
    );
};

export default Matchmaker;
