import React from "react";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core";
import { AppBar, Toolbar, Typography, Button } from "@material-ui/core";
import CasinoIcon from "@material-ui/icons/Casino";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
    },
    titleIcon: {
        width: "5vh",
        height: "5vh",
    },
}));

/**
 * Navigation bar containing basic options for places to go
 */
const Navigation: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <Typography className={classes.title} variant="h6">
                        Yahtzee
                    </Typography>
                    {/* <Button variant="text" color="secondary" component={Link} to="/matchmaker">
                        Join Game
                    </Button>
                    <Button variant="text" color="secondary" component={Link} to="/settings">
                        Settings
                    </Button>
                    <Button variant="text" color="secondary">
                        Logout
                    </Button> */}
                </Toolbar>
            </AppBar>
        </div>
    );
};

export default Navigation;
