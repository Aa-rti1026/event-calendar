import React, { useState, useEffect } from 'react';
import { format } from 'date-fns';

const EventModal = ({ selectedDate, events, setEvents, setShowModal, eventToEdit, setEventToEdit }) => {
    const [event, setEvent] = useState(eventToEdit || {
        title: '',
        description: '',
        date: format(selectedDate, 'yyyy-MM-dd'),
        time: '09:00',
        recurrence: 'None',
        color: '#ff6347',
    });

    useEffect(() => {
        if (eventToEdit) {
            setEvent(eventToEdit); // Populate the form with the event details if we're editing
        }
    }, [eventToEdit]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const updatedEvents = events.map((e) => (e.id === event.id ? event : e)); // Update the edited event in the list
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents)); // Save updated events to localStorage
        setShowModal(false); // Close the modal
    };

    const handleChange = (e) => {
        setEvent({
            ...event,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>{eventToEdit ? 'Edit Event' : 'Add Event'} on {format(selectedDate, 'MMMM dd, yyyy')}</h2>
                <label>Title</label>
                <input
                    type="text"
                    name="title"
                    value={event.title}
                    onChange={handleChange}
                />
                <label>Description</label>
                <textarea
                    name="description"
                    value={event.description}
                    onChange={handleChange}
                />
                <label>Time</label>
                <input
                    type="time"
                    name="time"
                    value={event.time}
                    onChange={handleChange}
                />
                <label>Recurrence</label>
                <select
                    name="recurrence"
                    value={event.recurrence}
                    onChange={handleChange}
                >
                    <option value="None">None</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <label>Color</label>
                <input
                    type="color"
                    name="color"
                    value={event.color}
                    onChange={handleChange}
                />
                <button type="submit">{eventToEdit ? 'Save Changes' : 'Save Event'}</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    );
};

export default EventModal;
