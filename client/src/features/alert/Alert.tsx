import React from "react";
import {
    makeStyles,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
} from "@material-ui/core";

import { useAppSelector, useAppDispatch } from "@app/hooks";
import { closeAlert, isOpenSelector, titleSelector, contentTextSelector } from "./AlertReducer";

const useStyles = makeStyles((theme) => ({}));

const Alert: React.FunctionComponent = () => {
    const isOpen = useAppSelector(isOpenSelector);
    const title = useAppSelector(titleSelector);
    const contentText = useAppSelector(contentTextSelector);

    const dispatch = useAppDispatch();

    const handleClose = () => dispatch(closeAlert());

    const classes = useStyles();
    return (
        <Dialog open={isOpen} onClose={handleClose}>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText>{contentText}</DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} variant="text" color="primary">
                    OK
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default Alert;
