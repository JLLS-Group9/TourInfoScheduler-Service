import React from 'react'
import styles from './style.css'
import Agents from './agentsList.jsx'

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
    }

    this.handleInput = this.handleInput.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.toggleFinancing = this.toggleFinancing.bind(this)
  }

  handleInput(event) {
    this.setState({
      [event.target.name]: event.target.value
    })
    console.log(event.target.name, this.state[event.target.name])
  }

  handleSubmit() {
    event.preventDefault()
    console.log('Form- handle submit', this.state)
    this.props.submit(this.state)
    this.handleReset()
  }

  handleReset() {
    console.log('entering handleReset')
    // let forms = Array.from(document.querySelectorAll('input'))
    // console.log(forms)
  }

  toggleFinancing() {
    console.log('toggling financing')
    let checked = !this.state.financing;
    this.setState({
      financing: checked
    })
  }

  renderStandardInputs() {
    let params = ['name', 'phone', 'email'];
    let rows = [];
    for (let i = 0; i < params.length; i++) {
      rows.push(<span key={i}><input name={params[i]} className={styles.test} onChange={this.handleInput}></input><label>{params[i].charAt(0).toUpperCase() + params[i].slice(1)}</label></span>)
    }
    return rows;
  }

  renderConditional(schedule) {
    if (!schedule) {
      console.log('check should indicate info')
      return (
      <span>
        <textarea name="message" onChange={this.handleInput}></textarea><label>Message</label>
      </span>)
    } else {
      console.log('check should indicate schedule')
      let scheduler = [];
      let buttons = ['In-Person', 'Video']
      scheduler.push(<label key="tourType">Tour Type</label>);
      buttons.forEach((element, index) => scheduler.push(
      <button name="type" key={index} onClick={this.handleInput}>{element}</button>))
      return scheduler;
    }
  }

  renderTimeDropdown(selectedDate, bookings) {
    let availableTimes = {'Choose a time': 1, '9:00 AM': 1, '9:30 AM': 1, '10:00 AM': 1, '10:30 AM': 1, '11:00 AM': 1, '11:30 AM': 1, '12:00 PM': 1, '12:30 PM': 1, '1:00 PM': 1, '1:30 PM': 1, '2:00 PM': 1, '2:30 PM': 1, '3:00 PM': 1, '3:30 PM': 1, '4:00 PM': 1, '4:30 PM': 1, '5:00 PM': 1, '5:30 PM': 1, '6:00 PM': 1, '6:30 PM': 1, '7:00 PM': 1, '7:30 PM': 1, '8:00 PM': 1, '8:30 PM': 1,'9:00 PM': 1}
    let timeDropdown = [];
    console.log('bookings', bookings)
    if (bookings) {
      for (let i = 0; i < bookings.length; i++) {
        console.log('found date', bookings.date, bookings.time, selectedDate)
        if (bookings.date === selectedDate) {
          if (availableTimes[bookings.time]) {
            delete availableTimes[bookings.time];
          }
        }
      }
    }

    for (let key in availableTimes) {
      timeDropdown.push(<option value={key} key={key}>{key}</option>)
    }
    return timeDropdown;
  }

  render() {
    const {
      property: { agentsInfo, bookings, requestInfo },
      toggle,
      view
    } = this.props;

    const {
      financing,
    } = this.state;

    let isScheduleOn = view === 'schedule' ? true : false;
    let finLabel = '';
    let scheduleDisplay;

    if (financing) {
      finLabel = 'A licensed lender will contact you shortly.'
    } else {
      finLabel = 'I want to talk about financing.'
    }

    return (
      <div>
        <button name="schedule" onClick={() => { toggle(event) }}>Schedule a Tour</button>
        <button name="info" onClick={() => { toggle(event) }}>Request Info</button>
        <form onSubmit={this.handleSubmit}>
          {isScheduleOn ? this.renderConditional(isScheduleOn) : null}
          {scheduleDisplay}
          {isScheduleOn ? <select name="time"> {this.renderTimeDropdown('2020-11-20', bookings)} </select> : null}
          {this.renderStandardInputs()}
          {isScheduleOn ? null : this.renderConditional(isScheduleOn)}
          <input type="checkbox" onClick={this.toggleFinancing}></input><label>{finLabel}</label>
          <button type="submit">{isScheduleOn ? 'Schedule a Tour' : 'Request Info'}</button>
          {isScheduleOn ? null : <Agents agents={agentsInfo} />}
        </form>
      </div>
    )
  }
}



export default Form;
