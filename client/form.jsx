import React from 'react'

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
    this.handleReset = this.handleReset.bind(this)
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
    this.props.submit(this.state)
    this.handleReset()
  }

  handleReset() {
    Array.from(document.querySelectorAll('input')).forEach(
      input => input.value = '')
    this.setState ({
    })

  }

  toggleFinancing () {
    let checked = !this.state.financing;
    this.setState({
      financing: checked
    })
  }

  render () {
    let label = '';
    let finLabel = '';
    if (this.props.view === 'info') {
      label = 'Request Info'
    } else {
      label = 'Schedule a Tour'
    }

    if (this.state.financing) {
      finLabel = 'A licensed lender will contact you shortly.'
    } else {
      finLabel = 'I want to talk about financing.'
    }



    return (
      <form onSubmit={this.handleSubmit}>
        <input name="name" onChange={this.handleInput}></input><label>Name</label>
        <input name="email" onChange={this.handleInput}></input><label>Email</label>
        <input name="phone" onChange={this.handleInput}></input><label>Phone</label>
        <input type="checkbox" onClick={this.toggleFinancing}></input><label>{finLabel}</label>
        <button><label>{label}</label></button>
      </form>
    )
  }
}



export default Form;
