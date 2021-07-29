import React from "react";
import { Box, Button, makeStyles, TextField, Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    button: {
        theme.spacing(1),
    },
    textField: {
        margin: theme.spacing(1),
    },
    typography: {
        margin: theme.spacing(0.5),
    },
}));

const MatchmakerJoinExistingGame: React.FunctionComponent = () => {
    const classes = useStyles();
    return (
        <Box display="flex" flexDirection="column">
            <Button className={classes.button} variant="contained" color="secondary">
                Create a new game
            </Button>
            <Button className={classes.button} variant="outlined" color="secondary">
                Join an existing game
            </Button>

            <Typography className={classes.typography} variant="h5">
                Enter code:
            </Typography>
            <TextField
                className={classes.textField}
                value="ANCD"
                onChange={() => {}}
                variant="outlined"
            />
            <Button className={classes.button} variant="contained" color="secondary">
                Create a game
            </Button>
        </Box>
    );
};

export default MatchmakerJoinExistingGame;
