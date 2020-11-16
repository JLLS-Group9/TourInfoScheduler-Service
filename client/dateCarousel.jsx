import React from 'react';
import dc from './dateStyles.css';

const retrieveDates = (eventListener) => {
  const now = new Date();
  const startDate = new Date();
  const tempDate = new Date();
  const dateHTML = [];

  // if past 5PM pacific time, then default start date to next day
  if (now.getHours() >= 19) {
    startDate.setDate(now.getDate() + 1);
  }

  // create array of next 6 days
  for (let i = 0; i < 6; i++) {
    tempDate.setDate(startDate.getDate() + i);
    const month = tempDate.toLocaleString('default', { month: 'short' });
    const weekday = tempDate.toLocaleString('default', { weekday: 'short' });
    const currentDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;
    console.log(tempDate);
    dateHTML.push(
      <button type="button" key={i} value={currentDate} onClick={() => eventListener(event)}>
        <span>{weekday}</span>
        <span>{tempDate.getDate()}</span>
        <span>{month}</span>
      </button>,
    );
  }
  return dateHTML;
};

const Dates = ({ toggleDates }) => (
  <div>
    {retrieveDates(toggleDates)}
  </div>
);

export default Dates;
