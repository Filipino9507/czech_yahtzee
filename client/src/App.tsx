import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "@features/navigation/Navigation";
import Game from "@features/game/Game";
import Matchmaker from "@features/matchmaker/Matchmaker";
import Results from "@features/results/Results";
import Alert from "@features/alert/Alert";

import { useAppSelector } from "@app/hooks";
import { gameStatusSelector } from "@features/matchmaker/MatchmakerReducer";

const App: React.FunctionComponent = () => {
    const gameStatus = useAppSelector(gameStatusSelector);

    /**
     * @test
     */
    // const inGame = true;

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
