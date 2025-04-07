import React from 'react';
import { Calendar as BigCalendar, momentLocalizer, Views } from 'react-big-calendar';
import withDragAndDrop from 'react-big-calendar/lib/addons/dragAndDrop';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';

const localizer = momentLocalizer(moment);
const DragAndDropCalendar = withDragAndDrop(BigCalendar);

const CalendarView = ({ user, events, view, setView, onSelectEvent, onEventDrop }) => {
  return (
    <DragAndDropCalendar
      localizer={localizer}
      events={events}
      defaultView={Views.MONTH}
      view={view}
      onView={setView}
      views={['month', 'week', 'day', 'agenda']}
      startAccessor="start"
      endAccessor="end"
      onSelectEvent={onSelectEvent}
      onEventDrop={onEventDrop}
      draggableAccessor={() => user.role === 'admin' || user.role === 'editor'}
      style={{ height: '75vh' }}
    />
  );
};

export default CalendarView;
