import React, { useContext, useEffect, useState } from 'react'
import { formatDate } from '@fullcalendar/core'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import { INITIAL_EVENTS, createEventId } from './event-utils'
import GlobalContext from './components/customContext/GlobalContext'
import Modal from './modal'
import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
    .fc-day-today a {
      background-color: grey;
      color:white;
      border-radius:50px;
  }
    .fc-day-today {
    background:transparent !important;
  }
    .fc td a {
      padding:10px;
      font-weight:bolder;
  }
    .fc .fc-col-header {
    background-color:#1a252f;
    color:white;
  }
`;

const DemoApp = () => {

  const [currentEvents, setCurrentEvents] = useState([]);

  const { setModalShow, modalShow, dataArr, fun, setFun, setInfo, info } = useContext(GlobalContext);

  useEffect(() => {
    fun && handleDateSelect1()
  }, [fun])

  const renderSidebar = () => {
    return (
      <div className='demo-app-sidebar'>
        <div className='demo-app-sidebar-section'>
          <h2>All Events ({currentEvents.length})</h2>
          <ul>
            {currentEvents.map(renderSidebarEvent)}
          </ul>
        </div>
      </div>
    )
  }

  const handleDateSelect = (selectInfo) => {
    setModalShow(true)
    setInfo(selectInfo)
  }

  const handleDateSelect1 = () => {
    let selectInfo = info
    let calendarApi = selectInfo.view.calendar

    calendarApi.unselect()

    console.log('handleDateSelect1', info, dataArr)

    if (dataArr[0]) {
      calendarApi.addEvent({
        id: createEventId(),
        title: dataArr[0],
        color: dataArr[1] === undefined ? 'black' : dataArr[1],
        start: selectInfo.startStr,
        end: selectInfo.endStr,
        allDay: selectInfo.allDay
      })
    }

    setFun(false)
  }

  const handleEventClick = (clickInfo) => {
    if (window.confirm(`Are you sure you want to delete the event '${clickInfo.event.title}'`)) {
      clickInfo.event.remove()
    }
  }

  const handleEvents = (events) => {
    setCurrentEvents(events)
  }

  const renderEventContent = (eventInfo) => {
    return (
      <>
        <b>{eventInfo.timeText}</b>
        <i>{eventInfo.event.title}</i>
      </>
    )
  }

  const renderSidebarEvent = (event, i) => {
    return (
      <li key={event.id} style={{ backgroundColor: event.color }}>
        <span>{i + 1}{'. '}&nbsp;</span>
        <b style={{ color: event._def?.ui?.borderColor }}>{formatDate(event.start, { year: 'numeric', month: 'short', day: 'numeric' })}</b>
        {' - '}
        <i style={{ color: event.color }}>{event.title}</i>
      </li>
    )
  }

  return (
    <div className='demo-app'>
      {renderSidebar()}
      {modalShow && <Modal />}
      <div className='demo-app-main'>
        <StyleWrapper>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay'
            }}
            initialView='dayGridMonth'
            editable={true}
            selectable={true}
            selectMirror={true}
            dayMaxEvents={true}
            initialEvents={INITIAL_EVENTS}
            select={handleDateSelect}
            eventContent={renderEventContent}
            eventClick={handleEventClick}
            eventsSet={handleEvents}
          />
        </StyleWrapper>
      </div>
    </div>
  )
}

export default DemoApp;