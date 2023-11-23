import { ChangeEvent, Dispatch, MouseEvent, SetStateAction } from 'react'

import {
    TextField,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Button,
    Autocomplete,
    Box
} from "@mui/material";

import { EventFormData, ITodo } from "./EventCalendar";


interface IProps {
    open: boolean
    handleClose: Dispatch<SetStateAction<void>>
    eventFormData: EventFormData
    setEventFormData: Dispatch<SetStateAction<EventFormData>>
    onAddEvent: (event: MouseEvent<HTMLButtonElement>) => void
    todos: ITodo[]
}
