import {SetStateAction, MouseEvent, Dispatch} from "react";
import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box, Typography} from "@mui/material";
import {IEventInfo} from "./EventCalendar";

interface IProps {
    open: boolean,
    handleClose: Dispatch<SetStateAction<void>>
    onDeleteEvent: (e: MouseEvent<HTMLButtonElement>) => void
    currentEvent: IEventInfo || null
}

const EventInfoModal = {( open, handleClose, onDeleteEvent, currentEvent)}: IProps) => {
    const onClose = () => {
        handleClose()
    }
}

return (

)