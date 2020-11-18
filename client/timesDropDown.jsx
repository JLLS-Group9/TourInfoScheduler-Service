/* eslint-disable no-plusplus */
import React from 'react';

const Times = ({ selectedDate, bookings, type }) => {
  const availableTimes = {
    900: '9:00 AM', 930 : '9:30 AM', 1000: '10:00 AM', 1030: '10:30 AM', 1100: '11:00 AM', 1130: '11:30 AM', 1200: '12:00 PM', 1230: '12:30 PM', 1300: '1:00 PM', 1330: '1:30 PM', 1400: '2:00 PM', 1430: '2:30 PM', 1500: '3:00 PM', 1530: '3:30 PM', 1600: '4:00 PM', 1630: '4:30 PM', 1700: '5:00 PM', 1730: '5:30 PM', 1800: '6:00 PM', 1830: '6:30 PM', 1900: '7:00 PM',
  };
  const timeDropdown = [];
  const todaysDate = new Date();
  console.log('timeDropdown today time cutoff', todaysDate.getHours() + 2);

  if (bookings) {
    for (let i = 0; i < bookings.length; i++) {
      console.log(bookings);
      if (bookings[i].date === selectedDate) {
        if (availableTimes[bookings[i].time]) {
          delete availableTimes[bookings[i].time];
        }
      }
    }
  }

  for (const key in availableTimes) {
    timeDropdown.push(<option value={key} key={key}>{availableTimes[key]}</option>);
  }
  return timeDropdown;
};

export default Times;
