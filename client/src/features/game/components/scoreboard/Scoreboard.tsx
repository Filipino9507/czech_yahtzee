import React from "react";
import {
    Table,
    TableContainer,
    Paper,
} from "@material-ui/core";

import { useAppSelector } from "@app/hooks";
import { playersSelector } from "../../GameReducer";
import ScoreboardHeader from "./ScoreboardHeader";
import ScoreboardBody from "./ScoreboardBody";
import ScoreboardFooter from "./ScoreboardFooter";

const Scoreboard: React.FunctionComponent = () => {
    const players = useAppSelector(playersSelector);
    return (
        <TableContainer component={Paper}>
            <Table>
                <ScoreboardHeader players={players} />
                <ScoreboardBody players={players} />
                <ScoreboardFooter players={players} />
            </Table>
        </TableContainer>
    );
};

export default Scoreboard;
