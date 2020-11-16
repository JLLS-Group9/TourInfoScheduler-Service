import React from 'react';
import dc from './dateStyles.css';

const retrieveDates = () => {
  const now = new Date();
  const startDate = new Date();
  if (now.getHours() >= 19) {
    startDate.setDate(now.getDate() + 1);
  }
  const endDate = new Date();
  endDate.setDate(startDate.getDate() + 6);
  console.log(startDate, endDate);
};

const Dates = ({ agents }) => (
  <span>
    Dates Carousel
    {retrieveDates()}
  </span>
);

export default Dates;
