import React from 'react';
import { Button } from 'react-bootstrap';
import Card from 'react-bootstrap/Card';
import PropTypes from 'prop-types';
import { useRouter } from 'next/router';
import { joinEvent, leaveEvent, deleteEvent } from '../../utils/data/eventData';
import { useAuth } from '../../utils/context/authContext';

const EventCard = ({
  id,
  description,
  date,
  time,
  onUpdate,
  joined,
}) => {
  const deleteThisEvent = () => {
    if (window.confirm('Delete this Event?')) {
      deleteEvent(id).then(() => onUpdate());
    }
  };
  const router = useRouter();
  const { user } = useAuth();
  const leave = () => leaveEvent(id, user.uid).then(() => onUpdate());
  const join = () => joinEvent(id, user.uid).then(() => onUpdate());

  return (
    <Card className="text-center">
      <Card.Header>{description}</Card.Header>
      <Card.Body>
        <Card.Text>{date}</Card.Text>
        <Card.Text>at {time}</Card.Text>
      </Card.Body>
      <Button
        onClick={deleteThisEvent}
      >
        Delete
      </Button>
      <Button
        onClick={() => {
          router.push(`/events/edit/${id}`);
        }}
      >
        Edit Event
      </Button>
      {
        joined
          ? (
            <Button
              className="btn-success"
              onClick={leave}
            >Leave
            </Button>
          )
          : (
            <Button
              className="btn-success"
              onClick={join}
            >Join
            </Button>
          )
      }
    </Card>
  );
};

EventCard.propTypes = {
  id: PropTypes.number.isRequired,
  description: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  onUpdate: PropTypes.func.isRequired,
  joined: PropTypes.bool.isRequired,
};

export default EventCard;
