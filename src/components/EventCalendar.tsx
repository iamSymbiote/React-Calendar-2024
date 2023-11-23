import { useState, MouseEvent} from "react";
import { Box, Button, ButtonGroup, Card, CardContent, CardHeader, Container, Divider} from "@mui/material";

import { Calendar, type Event, dateFnsLocalizer } from "react-big-calendar"

import format from "date-fns/format"
import parse from "date-fns/parse"
import startOfWeek from "date-fns/startOfWeek"
import getDay from "date-fns/getDay"
import enUS from "date-fns/locale/en-US"

import "react-big-calendar/lib/css/react-big-calendar.css"

import EventInfo from "./EventInfo"
import AddEventModal from "./AddEventModal"
import EventInfoModal from "./EventInfoModal"
import { AddTodoModal } from "./AddTodoModal"
import AddDatePickerEventModal from "./AddDatePickerEventModal"

const locales = {
  "en-US": enUS
}

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales
})

/* Defining Data Models */
export interface ITodo {
    _id: string
    title: string
    color?: string
}


export interface IEventInfo extends Event {
    _id: string
    description: string
    todoId?: string
}

export interface EventFormData {
    description: string
    todoId?: string
}

export interface DatePickerEventFormData {
    description: string
    todoId?: string
    allDay: boolean
    start?: Date
    end?: Date
}

export const generateId = () => (Math.floor(Math.random() * 10000) + 1).toString()

const initialEventFormState: EventFormData = {
    description: "",
    todoId: undefined
}

const initialDatePickerEventFormData: DatePickerEventFormData = {
    description: "",
    todoId: undefined,
    allDay: false,
    start: undefined,
    end: undefined
}

/* Managing States Section */

const [openSlot, setOpenSlot] = useState(false)
const [openDatepickerModal, setOpenDatepickerModal] = useState(false)
const [openTodoModal, setOpenTodoModal] = useState(false)
const [currentEvent, setCurrentEvent] = useState<Event | IEventInfo | null>(null)

const [eventInfoModal, setEventInfoModal] = useState(false)

const [events, setEvents] = useState<IEventInfo[]>([])
const [todos, setTodos] = useState<ITodo[]>([])

const [eventFormData, setEventFormData] = useState<EventFormData>(initialEventFormState)

const [datePickerEventFormData, setDatePickerEventFormData] =
    useState<DatePickerEventFormData>(initialDatePickerEventFormData)


/* Event Handling and Modal Section  */
const handleSelectSlot = (event: Event) => {
    setOpenSlot(true)
    setCurrentEvent(event)
}

const handleSelectEvent = (event: IEventInfo) => {
    setEventInfoModal(true)
    setCurrentEvent(event)
}

const handleClose = () => {
    setEventFormData(initialEventFormState)
    setOpenSlot(false)
}

const handleDatePickerClose = () => {
    setDatePickerEventFormData(initialDatePickerEventFormData)
    setOpenDatepickerModal(false)
}


/* Adding new events "LOGIC" starts here  */

const onAddEvent = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const data: IEventInfo = {
        ...eventFormData,
        _id: generateId(),
        start: currentEvent?.start,
        end: currentEvent?.end
    }

    const newEvents = [...events, data]

    setEvents(newEvents)
    handleClose()
}

const onAddEventFromDatePicker = (e: MouseEvent<HTMLButtonElement>) => {
    e.preventDefault()

    const addHours = (date: Date | undefined, hours: number) => {
        return date ? date.setHours(date.getHours() + hours) : undefined
    }

    const setMinToZero = (date: any) => {
        date.setSeconds(0)

        return date
    }

    const data: IEventInfo = {
        ...datePickerEventFormData,
        _id: generateId(),
        start: setMinToZero(datePickerEventFormData.start),
        end: datePickerEventFormData.allDay
            ? addHours(datePickerEventFormData.start, 12)
            : setMinToZero(datePickerEventFormData.end),
    }

    const newEvents = [...events, data]

    setEvents(newEvents)
    setDatePickerEventFormData(initialDatePickerEventFormData)
}

const onDeleteEvent = () => {
    setEvents(() => [...events].filter((e) => e._id !== (currentEvent as IEventInfo)._id!))
    setEventInfoModal(false)
}
