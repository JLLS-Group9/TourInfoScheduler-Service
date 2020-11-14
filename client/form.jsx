import React from 'react'
import styles from './style.css'

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

  componentDidMount () {

  }

  handleInput(event) {
    this.setState ({
      [event.target.name] : event.target.value
    })
    console.log(event.target.name, this.state[event.target.name])
  }

  handleSubmit () {
    event.preventDefault()
    console.log('handling submit')
    this.props.submit(this.state)
    this.handleReset()
  }

  handleReset() {
    console.log('entering handleReset')
    // let forms = Array.from(document.querySelectorAll('input'))
    // console.log(forms)
  }

  toggleForm() {
    console.log('toggle form')
    let view = this.props.view;

  }

  toggleFinancing () {
    console.log('toggling financing')
    let checked = !this.state.financing;
    this.setState({
      financing: checked
    })
  }

  render () {
    let label = '';
    let finLabel = '';
    let scheduleDisplay;
    let infoDisplay;
    let picDisplay;
    if (this.props.view === 'info') {
      label = 'Request Info'
      infoDisplay =
      <span>
      <input name="message" onChange={this.handleInput}></input><label>Message</label>
      </span>
      picDisplay =
      <span>
        <img url={this.props.agents[0].Picture}></img>
        <img url={this.props.agents[1].Picture}></img>

      </span>
    } else {
      label = 'Schedule a Tour'
      scheduleDisplay =
          <span>
          <input name="type" onChange={this.handleInput}></input><label>Tour Type</label>
          <input name="date" onChange={this.handleInput}></input><label>Date</label>
          <input name="time" onChange={this.handleInput}></input><label>Time</label>
          </span>
    }

    if (this.state.financing) {
      finLabel = 'A licensed lender will contact you shortly.'
    } else {
      finLabel = 'I want to talk about financing.'
    }


    return (
      <form onSubmit={this.handleSubmit}>
        <button></button>
        {scheduleDisplay}
        <input name="name" className={styles.test} onChange={this.handleInput}></input><label>Name</label>
        <input name="email" className={styles.test} onChange={this.handleInput}></input><label>Email</label>
        <input name="phone" className={styles.test}  onChange={this.handleInput}></input><label>Phone</label>
        {infoDisplay}
        <input type="checkbox" onClick={this.toggleFinancing}></input><label>{finLabel}</label>
        <button type="submit">{label}</button>
        {picDisplay}
      </form>
    )
  }
}



export default Form;
