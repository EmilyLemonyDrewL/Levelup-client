import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import { getSingleEvent } from '../../../utils/data/eventData';
import EventForm from '../../../components/event/EventForm';

export default function EditEvent() {
  const [eventEdit, setEventEdit] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    getSingleEvent(id).then(setEventEdit);
  }, [id]);

  // useEffect(() => {
  //   getSingleEvent(id).then((obj) => {
  //     obj.organizerId = obj.organizer;
  //     obj.game = obj.game_id;
  //     setEventEdit(obj);
  //   });
  // }, [id]);

  return (
    <>
      <h2>Edit Event</h2>
      <div>
        <EventForm obj={eventEdit} />
      </div>
    </>
  );
}
