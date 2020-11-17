/* eslint-disable no-console */
/* eslint-disable no-plusplus */
import React from 'react';
import styles from './formStyles.css';
import Agents from './agentsList.jsx';
import Dates from './dateCarousel.jsx';
import Times from './timesDropDown.jsx';
import Disclaimer from './disclaimer.jsx';

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
    this.toggleDates = this.toggleDates.bind(this);
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log('handle input', event.target.name);
  }

  handleSubmit(event) {
    const { submit } = this.props;
    event.preventDefault();
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

  toggleDates(event) {
    this.setState({
      date: event.target.value,
    });
    console.log(event.target.value);
  }

  renderMessageBox() {
    const { property: { address, city, state, zipCode } } = this.props;
    const defaultMessage = `I am interested in ${address}, ${city}, ${state} ${zipCode}.`;
    return (
      <div>
        <textarea
          className={styles.messageBox}
          name="message"
          onChange={this.handleInput}
          value={defaultMessage}
        />
      </div>
    );
  }

  renderScheduler() {
    console.log('check should indicate schedule');
    const scheduler = [];
    const buttons = ['In-Person', 'Video'];
    scheduler.push(<span name="tourType" className={styles.tourType}>Tour Type</span>);
    buttons.forEach((element, index) => scheduler.push(
      <button name="type" type="button" value={element} key={index} onClick={this.handleInput}>{element}</button>,
    ));
    return scheduler;
  }

  renderStandardInputs(finLabel, isScheduleOn) {
    const params = ['name', 'phone', 'email'];
    let rows = [];
    for (let i = 0; i < params.length; i++) {
      if (i < 2) {
        rows.push(
          <span key={i}>
            <input name={params[i]} className={styles.formFields} onChange={this.handleInput}
              placeholder={params[i].charAt(0).toUpperCase() + params[i].slice(1)}
            />
          </span>);
      } else {
        rows.push(
          <div key={i}>
            <input name={params[i]} className={styles.formEmail} onChange={this.handleInput}
              placeholder={params[i].charAt(0).toUpperCase() + params[i].slice(1)}
            />
          </div>);
      }
    }
    if (!isScheduleOn) {
      rows.push(this.renderMessageBox());
    }
    rows = rows.concat([
      <span className={styles.finBox}><input type="checkbox" key="checkbox" onClick={this.toggleFinancing} /></span>,
      <label key="fin" className={styles.finLabel}>{finLabel}</label>,
      <div><button type="submit" className={styles.bigButton}>{isScheduleOn ? 'Schedule a Tour' : 'Request Info'}</button></div>,
    ]);
    return rows;
  }

  render() {
    const {
      property: { agentsInfo, bookings, requestInfo },
      toggle,
      view,
    } = this.props;

    const {
      financing,
      date,
    } = this.state;

    const isScheduleOn = view === 'schedule';
    let finLabel = '';
    let formDisplay = [];

    if (financing) {
      finLabel = ' A licensed lender will contact you shortly.';
    } else {
      finLabel = ' I want to talk about financing.';
    }

    if (isScheduleOn) {
      formDisplay = [
        this.renderScheduler(),
        <Dates toggleDates={this.toggleDates} />,
        <div>
          <select name="time" className={styles.Times}>
            {' '}
            <Times selectedDate={date} bookings={bookings} />
            {' '}
          </select>
        </div>,
        this.renderStandardInputs(finLabel, isScheduleOn),
        <Disclaimer view={isScheduleOn} />,
      ];
    } else {
      formDisplay = [
        this.renderStandardInputs(finLabel, isScheduleOn),
        <Disclaimer view={isScheduleOn} />,
        <Agents agents={agentsInfo} />,
      ];
    }

    return (
      <div>
        <button className={styles.topButtons} type="button" name="schedule" onClick={() => { toggle(event); }}>Schedule a Tour</button>
        <button className={styles.topButtons} type="button" name="info" onClick={() => { toggle(event); }}>Request Info</button>
        <form onSubmit={this.handleSubmit}>
          {formDisplay}
        </form>
      </div>
    );
  }
}

export default Form;
