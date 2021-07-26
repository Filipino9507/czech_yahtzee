import React from "react";
import { makeStyles } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
}));

const Navigation: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">Yahtzee</Typography>
                    <Button variant="text" color="secondary">
                        Home
                    </Button>
                    <Button variant="text" color="secondary">
                        Settings
                    </Button>
                    <Button variant="text" color="secondary">
                        Logout
                    </Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;
