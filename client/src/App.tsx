import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "@features/navigation/Navigation";
import Game from "@features/game/Game";
import Matchmaker from "@features/matchmaker/Matchmaker";
import Results from "@features/results/Results";
import Alert from "@features/alert/Alert";

import { useAppDispatch, useAppSelector } from "@app/hooks";
import {
    gameStatusSelector,
    playerIdSelector,
    requestStoredGame,
    roomIdSelector,
} from "@features/matchmaker/MatchmakerReducer";

const App: React.FunctionComponent = () => {
    const gameStatus = useAppSelector(gameStatusSelector);

    const storedPlayerId = useAppSelector(playerIdSelector);
    const storedRoomId = useAppSelector(roomIdSelector);

    const dispatch = useAppDispatch();
    useEffect(() => {
        if (storedRoomId === null || storedPlayerId === null) {
            return;
        }
        dispatch(
            requestStoredGame({
                roomId: storedRoomId,
                playerId: storedPlayerId,
            })
        );
    }, []);

    const renderGameStatusScreen = () => {
        switch (gameStatus) {
            case "IDLE":
            case "WAITING":
                return <Matchmaker />;
            case "IN_GAME":
                return <Game />;
            case "IN_RESULTS":
                return <Results />;
        }
    };

    return (
        <React.Fragment>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route exact path="/game">
                        {renderGameStatusScreen()}
                    </Route>
                    <Route path="/">
                        <Redirect to="/game" />
                    </Route>
                </Switch>
            </BrowserRouter>
            <Alert />
        </React.Fragment>
    );
};

export default App;
