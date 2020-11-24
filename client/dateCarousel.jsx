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

    if (currentDate === date) {
      dateHTML.push(
        <div className={dc.buttonContainer}>
          <button type="button" key={i} className={`${dc.dateButton} ${dc.dateButtonSelected}`} value={currentDate} onClick={() => eventListener(currentDate)}>
            <span className={dc.buttonDetails}>{weekday}</span>
            <span className={`${dc.buttonDetails} ${dc.dateSpecific}`}>{tempDate.getDate()}</span>
            <span className={dc.buttonDetails}>{month}</span>
          </button>
        </div>,
      );
    } else {
      dateHTML.push(
        <div className={dc.buttonContainer}>
          <button type="button" key={i} className={`${dc.dateButton} ${dc.dateButtonUnselected}`} value={currentDate} onClick={() => eventListener(currentDate)}>
            <span className={dc.buttonDetails}>{weekday}</span>
            <span className={`${dc.buttonDetails} ${dc.dateSpecific}`}>{tempDate.getDate()}</span>
            <span className={dc.buttonDetails}>{month}</span>
          </button>
        </div>,
      );
    }
  }
  return dateHTML;
};

const Dates = ({
  selectedDate, toggleDates, dateView, slideDates,
}) => (
  <div className={dc.main}>
    <div className={dc.carousel__controls}>
      <button
        type="button"
        onClick={slideDates}
        className={
          `${dc.carousel__control} ${dc['carousel__control--backward']}
          ${dateView === 'right' ? dc.carousel__control__selected : dc.carousel__control__unselected}`
}
      >
        <span className={dc.carousel__btn__container}>
          &#8249;
        </span>
      </button>
    </div>
    <div className={dc.carousel__controls}>
      <button
        type="button"
        onClick={slideDates}
        className={`${dc.carousel__control}
          ${dc['carousel__control--forward']}
          ${dateView === 'left' ? dc.carousel__control__selected : dc.carousel__control__unselected}`}
      >
        <span className={dc.carousel__btn__container}>
          &#8250;

        </span>
      </button>
    </div>
    <div className={dc.carousel__screen} key="carousel_screen">
      <div id="track" className={dc.carousel__track} key="track">
        <div className={dc.carousel__item}>{retrieveDates(selectedDate, toggleDates)}</div>
      </div>
    </div>
  </div>
);

export default Dates;
