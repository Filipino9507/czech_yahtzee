import React from "react";
import io from "socket.io-client";

import Game from "./features/Game/Game";
import Navigation from "./features/Navigation/Navigation";

const socket = io("http://localhost:80");

const App: React.FunctionComponent = () => {

    return (
        <React.Fragment>
            <Navigation />
            <Game />
        </React.Fragment>
    );

};

export default App;
