import React, { useEffect } from "react";
import { makeStyles } from "@material-ui/core";
import { Card, Box } from "@material-ui/core";
import DiceArea from "./components/DiceArea";
import DiceActions from "./components/DiceActions";
import Scoreboard from "./components/scoreboard/Scoreboard";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import { playerIdxSelector, requestStoredGame } from "@features/matchmaker/MatchmakerReducer";
import { roomIdSelector, playerSelector, gameLoadedSelector } from "./GameReducer";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        height: "100vh",
    },
    contentBox: {
        padding: theme.spacing(2),
    },
}));

const Game: React.FunctionComponent = () => {
    const storedPlayerIdx = useAppSelector(playerIdxSelector);
    const storedPlayer = useAppSelector(playerSelector(storedPlayerIdx));
    const storedRoomId = useAppSelector(roomIdSelector);

    const dispatch = useAppDispatch();
    useEffect(() => {
        dispatch(requestStoredGame({
            roomId: storedRoomId,
            playerId: storedPlayer.playerId,
        }))
    }, []);

    const classes = useStyles();
    return (
        <Card className={classes.root}>
            <Box height="100%" display="flex" flexDirection="row">
                <Box flex={1} display="flex" flexDirection="column">
                    <Box className={classes.contentBox} height="100%" flex={7}>
                        <DiceArea />
                    </Box>
                    <Box className={classes.contentBox} height="100%" flex={3}>
                        <DiceActions />
                    </Box>
                </Box>
                <Box className={classes.contentBox} flex={1}>
                    <Scoreboard />
                </Box>
            </Box>
        </Card>
    );
};

const GameLoadingWrapper: React.FunctionComponent = () => {
    const gameLoaded = useAppSelector(gameLoadedSelector);
    if (!gameLoaded) {
        return (
            <div>LOADING</div>
        );
    }
    return <Game />;
};
 
export default GameLoadingWrapper;
