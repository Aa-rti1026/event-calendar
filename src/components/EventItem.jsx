import React from 'react';

const EventItem = ({ event, onEdit }) => {
    return (
        <div
            style={{ backgroundColor: event.color }}
            className="event-item"
            onClick={() => onEdit(event)}
        >
            <span>{event.title}</span>
            <span>{event.time}</span>
        </div>
    );
};

export default EventItem;
