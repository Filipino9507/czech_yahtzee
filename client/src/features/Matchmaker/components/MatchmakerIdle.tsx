import React from "react";
import { Button, makeStyles } from "@material-ui/core";
import useGlobalStyles from "@app/globalStyles";

const useStyles = makeStyles((theme) => ({
    
}));

const MatchmakerIdle: React.FunctionComponent = () => {
    const classes = { ...useStyles(), ...useGlobalStyles() };
    return (
        <React.Fragment>
            <Button className={classes.button} variant="contained" color="secondary">
                Create a new game
            </Button>
            <Button className={classes.button} variant="outlined" color="secondary">
                Join an existing game
            </Button>
        </React.Fragment>
    );
};

export default MatchmakerIdle;