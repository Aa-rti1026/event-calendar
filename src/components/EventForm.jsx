export default function EventForm({ selectedDate, events, setEvents, setShowModal }) {
    const [event, setEvent] = useState({
        title: '',
        description: '',
        date: selectedDate,
        time: '09:00',
        recurrence: 'None',
        color: '#ff6347',
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        const newEvent = { ...event, id: new Date().getTime() };
        const updatedEvents = [...events, newEvent];
        setEvents(updatedEvents);
        localStorage.setItem('events', JSON.stringify(updatedEvents));
        setShowModal(false);
    };

    return (
        <div className="modal">
            <form onSubmit={handleSubmit}>
                <h2>Add Event on {format(selectedDate, 'MMMM dd, yyyy')}</h2>
                <label>Title</label>
                <input
                    type="text"
                    value={event.title}
                    onChange={(e) => setEvent({ ...event, title: e.target.value })}
                />
                <label>Description</label>
                <textarea
                    value={event.description}
                    onChange={(e) => setEvent({ ...event, description: e.target.value })}
                />
                <label>Time</label>
                <input
                    type="time"
                    value={event.time}
                    onChange={(e) => setEvent({ ...event, time: e.target.value })}
                />
                <label>Recurrence</label>
                <select
                    value={event.recurrence}
                    onChange={(e) => setEvent({ ...event, recurrence: e.target.value })}
                >
                    <option value="None">None</option>
                    <option value="Daily">Daily</option>
                    <option value="Weekly">Weekly</option>
                    <option value="Monthly">Monthly</option>
                </select>
                <label>Color</label>
                <input
                    type="color"
                    value={event.color}
                    onChange={(e) => setEvent({ ...event, color: e.target.value })}
                />
                <button type="submit">Save Event</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
            </form>
        </div>
    );
}