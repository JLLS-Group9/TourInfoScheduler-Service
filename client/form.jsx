/* eslint-disable import/extensions */
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
      type: 'In-Person',
      dateView: 'left',
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

  componentDidMount() {
    const now = new Date();
    const startDate = new Date();
    let placeholderDate = '';
    // if past 5PM pacific time, then default start date to next day
    if (now.getHours() >= 17 || (now.getHours() >= 16 && now.getMinutes() >= 30)) {
      startDate.setDate(now.getDate() + 1);
    }

    placeholderDate = `${startDate.getFullYear()}-${startDate.getMonth() + 1}-${startDate.getDate()}`;

    this.setState ({
      date: placeholderDate,
    });
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value,
    });
    console.log('handle input', event.target.name, this.state[event.target.name]);
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
    const {
      property: {
        address, city, state, zipCode,
      },
    } = this.props;
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
    console.log('check should indicate schedule', this.state.type);
    const { type } = this.state;
    const scheduler = [];
    const buttons = ['In-Person', 'Video'];
    const newStyle = [];
    if (type === 'In-Person') {
      newStyle.push(styles.InPersonSelected, styles.Video);
    } else {
      newStyle.push(styles.InPerson, styles.VideoSelected);
    }
    buttons.forEach((element, index) => scheduler.push(
      <button className={newStyle[index]} name="type" type="button" value={element} key={index} onClick={this.handleInput}>{element}</button>,
    ));
    return scheduler;
  }

  renderStandardInputs(finLabel, isScheduleOn) {
    const params = ['name', 'phone', 'email'];
    let rows = [];
    rows.push(
      <div key={0} className={styles.fieldsContainer}>
        <input
          name={params[0]}
          className={styles.formFields}
          onChange={this.handleInput}
          placeholder={params[0].charAt(0).toUpperCase() + params[0].slice(1)}
        />
        <input
          name={params[1]}
          className={styles.formFields}
          onChange={this.handleInput}
          placeholder={params[1].charAt(0).toUpperCase() + params[1].slice(1)}
        />
      </div>,
    );

    rows.push(
      <input
        name={params[2]}
        className={styles.formEmail}
        onChange={this.handleInput}
        placeholder={params[2].charAt(0).toUpperCase() + params[2].slice(1)}
      />,
    );

    if (!isScheduleOn) {
      rows.push(this.renderMessageBox());
    }
    rows = rows.concat([
      <div className={styles.finBox}>
        <input type="checkbox" id="checkbox" key="checkbox" className={styles.finCheckBox} onClick={this.toggleFinancing} />
        <label key="fin" htmlFor="checkbox" className={styles.finLabel}>{finLabel}</label>
      </div>,
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
      dateView,
      type,
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
        <span className={styles.tourTypeText}>Tour Type</span>,
        <div name="tourType" className={styles.tourType}>
          {this.renderScheduler()}
        </div>,
        <Dates selectedDate={date} toggleDates={this.toggleDates} dateView={dateView} />,
        <select name="time" className={styles.Times}>
          {' '}
          <Times selectedDate={date} bookings={bookings} type={type} />
          {' '}
        </select>,
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
      <div className={styles.mainContainer}>
        <div className={styles.Header}>
          <button className={isScheduleOn ? styles.topButtonselected : styles.topButton} type="button" name="schedule" onClick={() => { toggle(event); }}>Schedule a Tour</button>
          <button className={isScheduleOn ? styles.topButton : styles.topButtonselected} type="button" name="info" onClick={() => { toggle(event); }}>Request Info</button>
        </div>
        <div className={styles.formContainer}>
          <form onSubmit={this.handleSubmit} className={styles.Form}>
            {formDisplay}
          </form>
        </div>
      </div>
    );
  }
}

export default Form;
