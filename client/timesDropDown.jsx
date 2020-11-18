/* eslint-disable no-plusplus */
import React from 'react';

const Times = ({ selectedDate, bookings, type }) => {
  const availableTimes = {
    0: 'Choose a time', 900: '9:00 AM', 930: '9:30 AM', 1000: '10:00 AM', 1030: '10:30 AM', 1100: '11:00 AM', 1130: '11:30 AM', 1200: '12:00 PM', 1230: '12:30 PM', 1300: '1:00 PM', 1330: '1:30 PM', 1400: '2:00 PM', 1430: '2:30 PM', 1500: '3:00 PM', 1530: '3:30 PM', 1600: '4:00 PM', 1630: '4:30 PM', 1700: '5:00 PM', 1730: '5:30 PM', 1800: '6:00 PM', 1830: '6:30 PM', 1900: '7:00 PM',
  };
  let newAvailable = {};
  const timeDropdown = [];
  const today = new Date();

  console.log('timeDropdown today time cutoff', today);

  const formattedDate = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;

  if (selectedDate === formattedDate) {
    console.log('chosen date is today');
    let time = `${today.getHours() + 2}${today.getMinutes()}`;

    for (let key in availableTimes) {
      if (key !== '0' && parseInt(key) <= parseInt(time)) {
        delete availableTimes[key];
      } else {
        newAvailable[availableTimes[key]] = 1;
      }
    }
  }

  console.log(newAvailable);

  if (bookings) {
    for (let i = 0; i < bookings.length; i++) {
      // console.log(bookings[i].date, selectedDate);
      if (bookings[i].date === selectedDate && bookings[i].type === type) {
        if (newAvailable[bookings[i].time]) {
          delete newAvailable[bookings[i].time];
        }
      }
    }
  }

  for (const key in newAvailable) {
    timeDropdown.push(<option value={key} key={key}>{key}</option>);
  }
  return timeDropdown;
};

export default Times;
