import React from 'react'
import styles from './style.css'
// import Agents from './agentsList.jsx'

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

  renderCondtl(schedule) {
    if (!schedule) {
      console.log('check should indicate info')
      return (
      <span>
        <textarea name="message" onChange={this.handleInput}></textarea><label>Message</label>
      </span>)
    } else {
      console.log('check should indicate schedule')
    }
  }

  render() {
    const {
      property,
      property: { agentsInfo, booking, requestInfo },
      toggle,
      view
    } = this.props;

    const {
      financing,
    } = this.state;

    let isScheduleOn = view === 'schedule' ? true : false;
    let finLabel = '';
    let scheduleDisplay;

    if (!isScheduleOn) {
    } else {
      scheduleDisplay =
        <span>
          <label>Tour Type</label><select name="type">
            <option value="In Person">In Person</option>
            <option value="In Person">Video</option>
          </select>
          <input name="date" onChange={this.handleInput}></input><label>Date</label>
          <input name="time" onChange={this.handleInput}></input><label>Time</label>
        </span>
    }

    if (financing) {
      finLabel = 'A licensed lender will contact you shortly.'
    } else {
      finLabel = 'I want to talk about financing.'
    }

    return (
      <div>
        <button onClick={() => { toggle() }}>Schedule a Tour</button>
        <button onClick={() => { toggle() }}>Request Info</button>
        <form onSubmit={this.handleSubmit}>
          {scheduleDisplay}
          {isScheduleOn ? this.renderCondtl(isScheduleOn) : null}
          {this.renderStandardInputs()}
          {isScheduleOn ? null : this.renderCondtl(isScheduleOn)}
          <input type="checkbox" onClick={this.toggleFinancing}></input><label>{finLabel}</label>
          <button type="submit">{isScheduleOn ? 'Schedule a Tour' : 'Request Info'}</button>
          {/* {isScheduleOn ? null : <Agents agents={agentsInfo} />} */}
        </form>
      </div>
    )
  }
}



export default Form;
