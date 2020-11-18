/* eslint-disable no-plusplus */
import React from 'react';

const Times = ({ selectedDate, bookings }) => {
  const availableTimes = {
    'Choose a time': 1, '9:00 AM': 1, '9:30 AM': 1, '10:00 AM': 1, '10:30 AM': 1, '11:00 AM': 1, '11:30 AM': 1, '12:00 PM': 1, '12:30 PM': 1, '1:00 PM': 1, '1:30 PM': 1, '2:00 PM': 1, '2:30 PM': 1, '3:00 PM': 1, '3:30 PM': 1, '4:00 PM': 1, '4:30 PM': 1, '5:00 PM': 1, '5:30 PM': 1, '6:00 PM': 1, '6:30 PM': 1, '7:00 PM': 1, '7:30 PM': 1, '8:00 PM': 1, '8:30 PM': 1, '9:00 PM': 1,
  };
  const timeDropdown = [];
  const todaysDate = new Date();
  console.log(todaysDate.getHours() + 2);
  if (bookings) {
    for (let i = 0; i < bookings.length; i++) {
      if (bookings[i].date === selectedDate) {
        if (availableTimes[bookings[i].time]) {
          delete availableTimes[bookings[i].time];
        }
      }
    }
  }

  for (const key in availableTimes) {
    timeDropdown.push(<option value={key} key={key}>{key}</option>);
  }
  return timeDropdown;
};

export default Times;
