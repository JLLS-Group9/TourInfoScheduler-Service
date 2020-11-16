/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import React from 'react';
import styles from './style.css';
import Agents from './agentsList.jsx';
import Dates from './dateCarousel.jsx';

class Form extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      type: '',
      date: '',
      time: '',
      name: '',
      phone: '',
      email: '',
      message: '',
      financing: false,
    };

    this.handleInput = this.handleInput.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.toggleFinancing = this.toggleFinancing.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log(event.target.name, this.state[event.target.name]);
  }

  handleSubmit() {
    const { submit } = this.props;
    console.log('Form- handle submit', this.state);
    submit(this.state);
    this.handleReset();
  }

  handleReset() {
    console.log('entering handleReset');
    // let forms = Array.from(document.querySelectorAll('input'))
    // console.log(forms)
  }

  toggleFinancing() {
    const { financing } = this.state;
    console.log('toggling financing');
    const checked = !financing;
    this.setState({
      financing: checked,
    });
  }

  renderStandardInputs(finLabel, isScheduleOn) {
    const params = ['name', 'phone', 'email'];
    let rows = [];
    for (let i = 0; i < params.length; i++) {
      rows.push(<span key={i}>
        <input name={params[i]} className={styles.test} onChange={this.handleInput} />
        <label>{params[i].charAt(0).toUpperCase() + params[i].slice(1)}</label>
      </span>);
    }
    rows = rows.concat([
      <input type="checkbox" key="checkbox" onClick={this.toggleFinancing} />,
      <label key="fin">{finLabel}</label>,
      <button type="submit">{isScheduleOn ? 'Schedule a Tour' : 'Request Info'}</button>,
    ]);
    return rows;
  }

  renderConditional(schedule) {
    if (!schedule) {
      console.log('check should indicate info');
      return (
        <span>
          <textarea name="message" onChange={this.handleInput} />
          <label>Message</label>
        </span>
      );
    }
    console.log('check should indicate schedule');
    const scheduler = [];
    const buttons = ['In-Person', 'Video'];
    scheduler.push(<label key="tourType">Tour Type</label>);
    buttons.forEach((element, index) => scheduler.push(
      <button name="type" key={index} onClick={this.handleInput}>{element}</button>,
    ));
    return scheduler;
  }

  renderTimeDropdown(selectedDate, bookings) {
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
  }

  render() {
    const {
      property: { agentsInfo, bookings, requestInfo },
      toggle,
      view,
    } = this.props;

    const {
      financing,
    } = this.state;

    const isScheduleOn = view === 'schedule';
    let finLabel = '';
    let formDisplay = [];

    if (financing) {
      finLabel = 'A licensed lender will contact you shortly.';
    } else {
      finLabel = 'I want to talk about financing.';
    }

    if (isScheduleOn) {
      formDisplay = [
        this.renderConditional(isScheduleOn),
        <Dates />,
        <select name="time">
          {' '}
          {this.renderTimeDropdown('2020-11-22', bookings)}
          {' '}
        </select>,
        this.renderStandardInputs(finLabel, isScheduleOn),
      ];
    } else {
      formDisplay = [
        this.renderStandardInputs(finLabel, isScheduleOn),
        this.renderConditional(isScheduleOn),
        <Agents agents={agentsInfo} />,
      ];
    }

    return (
      <div>
        <button name="schedule" onClick={() => { toggle(event); }}>Schedule a Tour</button>
        <button name="info" onClick={() => { toggle(event); }}>Request Info</button>
        <form onSubmit={this.handleSubmit}>
          {formDisplay}
        </form>
      </div>
    );
  }
}

export default Form;
