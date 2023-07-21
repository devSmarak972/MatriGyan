import React from 'react'

const EventContent = ({info}) => {
  const { event } = info;
  return (
    <div>
      <p>{event.title}</p>
    </div>
  );
}

export default EventContent