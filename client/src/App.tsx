import React from "react";
import {
    BrowserRouter,
    Switch,
    Route,
    Redirect,
} from "react-router-dom";
import Navigation from "@features/Navigation/Navigation";
import Game from "@features/Game/Game";
import Matchmaker from "@features/Matchmaker/Matchmaker";

const App: React.FunctionComponent = () => {

    return (
        <React.Fragment>
            <BrowserRouter>
                <Navigation />
                <Switch>
                    <Route exact path="/game">
                        <Game />
                    </Route>
                    <Route exact path="/matchmaker">
                        <Matchmaker />
                    </Route>
                    <Route path="/">
                        <Redirect to="/matchmaker" />
                    </Route>
                </Switch>
            </BrowserRouter>
        </React.Fragment>
    );

};

export default App;
