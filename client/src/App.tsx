import React from "react";

import Game from "./features/Game/Game";
import Navigation from "./features/Navigation/Navigation";

const App: React.FunctionComponent = () => {
    return (
        <React.Fragment>
            <Navigation />
            <Game />
        </React.Fragment>
    );
};

export default App;
