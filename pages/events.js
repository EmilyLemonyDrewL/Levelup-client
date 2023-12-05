import React, { useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import { useRouter } from 'next/router';
import EventCard from '../components/event/EventCard';
import { getEvents } from '../utils/data/eventData';
import { useAuth } from '../utils/context/authContext';

function Events() {
  const [events, setEvents] = useState([]);
  // const [games, setGames] = useState([]);
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    getEvents(user.uid).then((data) => setEvents(data));
  }, [user]);
  const showEvents = () => {
    getEvents(user.uid).then((data) => setEvents(data));
  };

  return (
    <article className="events">
      <Button
        onClick={() => {
          router.push('/events/new');
        }}
      >
        New Event
      </Button>
      <h1>Events</h1>
      {events.map((event) => (
        <section key={`event--${event.id}`} className="event">
          <EventCard id={event.id} description={event.description} date={event.date} time={event.time} organizer={event.organizer} onUpdate={showEvents} joined={event.joined} />
        </section>
      ))}
    </article>
  );
}

export default Events;
