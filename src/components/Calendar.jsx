import React, { useState, useEffect } from 'react';
import { startOfMonth, endOfMonth, eachDayOfInterval, format, isToday as dateFnsIsToday } from 'date-fns'; // Import isToday from date-fns
import EventItem from './EventItem';
import EventModal from './EventModal';
import { loadEventsFromLocalStorage } from '../utils/dateUtils';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [events, setEvents] = useState(loadEventsFromLocalStorage());
    const [showModal, setShowModal] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [eventToEdit, setEventToEdit] = useState(null); // New state to store the event being edited

    const handleMonthChange = (direction) => {
        setCurrentDate(direction === 'next' ? addMonths(currentDate, 1) : subMonths(currentDate, 1));
    };

    const handleDayClick = (day) => {
        setSelectedDate(day);
        setShowModal(true);
    };

    const handleEditEvent = (event) => {
        setEventToEdit(event);  // Store the event being edited
        setShowModal(true); // Open the modal
    };

    const daysInMonth = eachDayOfInterval({
        start: startOfMonth(currentDate),
        end: endOfMonth(currentDate),
    });

    const isToday = (date) => dateFnsIsToday(date); // Use the imported isToday function from date-fns

    return (
        <div>
            <div>
                <button onClick={() => handleMonthChange('prev')}>Previous</button>
                <span>{format(currentDate, 'MMMM yyyy')}</span>
                <button onClick={() => handleMonthChange('next')}>Next</button>
            </div>
            <div className="calendar-grid">
                {daysInMonth.map((day) => (
                    <div
                        key={day}
                        className={`calendar-day ${isToday(day) ? 'today' : ''}`}
                        onClick={() => handleDayClick(day)}
                    >
                        <span>{format(day, 'd')}</span>
                        {events.filter(event => format(new Date(event.date), 'yyyy-MM-dd') === format(day, 'yyyy-MM-dd'))
                            .map(event => (
                                <EventItem key={event.id} event={event} onEdit={handleEditEvent} />
                            ))}
                    </div>
                ))}
            </div>
            {showModal && (
                <EventModal
                    selectedDate={selectedDate}
                    events={events}
                    setEvents={setEvents}
                    setShowModal={setShowModal}
                    eventToEdit={eventToEdit} // Pass the event being edited
                    setEventToEdit={setEventToEdit} // Function to update the event being edited
                />
            )}
        </div>
    );
};

export default Calendar;
