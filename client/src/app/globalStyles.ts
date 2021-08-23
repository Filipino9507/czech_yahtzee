import { makeStyles, Theme } from "@material-ui/core";

const useGlobalStyles = makeStyles((theme) => ({
    smallMargin: {
        margin: theme.spacing(0.5),
    },
    mediumMargin: {
        margin: theme.spacing(1),
    },
    largeMargin: {
        margin: theme.spacing(2),
    },
}));

export default useGlobalStyles;
