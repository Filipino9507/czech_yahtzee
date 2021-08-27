import { TableCell, TableRow } from "@material-ui/core";
import React from "react";

interface Props {
    playerColumnCount: number;
}

const ScoreboardEmptyRow: React.FunctionComponent<Props> = ({ playerColumnCount }: Props) => {
    const tableCells = new Array(playerColumnCount + 2).fill(<TableCell />);
    return <TableRow>{tableCells}</TableRow>;
};

export default ScoreboardEmptyRow;
