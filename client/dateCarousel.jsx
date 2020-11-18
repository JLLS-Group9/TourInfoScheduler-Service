/* eslint-disable no-plusplus */
import React from 'react';
import dc from './dateStyles.css';

const retrieveDates = (date, eventListener) => {
  const now = new Date();
  const startDate = new Date();
  const tempDate = new Date();
  const dateHTML = [];

  // if past 5PM pacific time, then default start date to next day
  if (now.getHours() >= 17 || (now.getHours() >= 16 && now.getMinutes() >= 30)) {
    startDate.setDate(now.getDate() + 1);
  }

  // create array of next 6 days
  for (let i = 0; i < 7; i++) {
    tempDate.setDate(startDate.getDate() + i);
    const month = tempDate.toLocaleString('default', { month: 'short' });
    const weekday = tempDate.toLocaleString('default', { weekday: 'short' });
    const currentDate = `${tempDate.getFullYear()}-${tempDate.getMonth() + 1}-${tempDate.getDate()}`;

    dateHTML.push(
      <div className={dc.democontent}>
        <button type="button" key={i} className={dc.dateUnselected} value={currentDate} onClick={() => eventListener(event)}>
          <span className={dc.details}>{weekday}</span>
          {' '}
          <span className={dc.details}>{tempDate.getDate()}</span>
          {' '}
          <span className={dc.details}>{month}</span>
        </button>
      </div>,
    );
  }
  return dateHTML;
};

const Dates = ({ selectedDate, toggleDates, dateView }) => (
  <div className={dc.main}>
    <div className={dc.carousel}>
      <input type="radio" id="left" name="activator" checked="checked" className={dc.carousel_activator} />
      <input type="radio" id="right" name="activator" className={dc.carousel_activator} />
    </div>
    <div className={dc.carousel__controls}>
      <label htmlFor="right" className={dc.carousel__control}></label>
      &#8249;
    </div>
    <div className={dc.carousel__controls}>
      <label htmlFor="left" className={dc.carousel__control}></label>
      &#8250;
    </div>
    <div className={dc.carousel__screen}>
      <div className={dc.carousel__track}>
        <div className={dc.carousel__item}>{retrieveDates(selectedDate, toggleDates)}</div>
      </div>
    </div>
  </div>
);

export default Dates;
