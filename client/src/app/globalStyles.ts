import { makeStyles } from "@material-ui/core";

const useGlobalStyles = makeStyles((theme) => ({
    buttonSmallMargin: {
        margin: theme.spacing(0.5),
    },
    buttonMediumMargin: {
        margin: theme.spacing(1),
    },
    buttonLargeMargin: {
        margin: theme.spacing(2),
    }
}));

export default useGlobalStyles;