export const loadEventsFromLocalStorage = () => {
    const savedEvents = localStorage.getItem('events');
    return savedEvents ? JSON.parse(savedEvents) : [];
};

export const saveEventsToLocalStorage = (events) => {
    localStorage.setItem('events', JSON.stringify(events));
};
  