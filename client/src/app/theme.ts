import { createTheme } from "@material-ui/core/styles";
import { amber, indigo } from "@material-ui/core/colors";

const theme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: amber[500],
        },
        secondary: {
            main: indigo[500],
        },
    },
    overrides: {
        MuiTooltip: {
            tooltip: {
                fontSize: "1em"
            }
        },
        MuiTableCell: {
            root: {
                fontSize: "1.1em",
            }
        }
    }
});

export default theme;
