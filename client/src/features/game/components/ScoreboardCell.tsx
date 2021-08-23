import React from "react";
import { makeStyles, TableCell, Link } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({}));

interface Props {
    scored: boolean;
    value: number;
}

const ScoreboardCell: React.FunctionComponent<Props> = ({ scored, value }: Props) => {
    const isPeeked = !scored && value !== 0;
    return (
        <TableCell
            align="right"
            size="small"
        >   
            {isPeeked ? <Link>{value}</Link> : value}
        </TableCell>
    );
};

export default ScoreboardCell;
