import React from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import Navigation from "@features/navigation/Navigation";
import Game from "@features/game/Game";
import Matchmaker from "@features/matchmaker/Matchmaker";

import { useAppSelector } from "@app/hooks";
import { inGameSelector } from "@features/matchmaker/MatchmakerReducer";

const App: React.FunctionComponent = () => {
    const inGame = useAppSelector(inGameSelector);
    
    /**
     * @test
     */
    // const inGame = true;

    return (
        <React.Fragment>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route exact path="/game">
                        {inGame ? <Game /> : <Matchmaker />}
                    </Route>
                    <Route path="/">
                        <Redirect to="/game" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );
};

export default App;
