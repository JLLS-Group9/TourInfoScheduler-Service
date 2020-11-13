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

    this.handleSubmit = this.handleSubmit.bind(this)
  }

  componentDidMount () {

  }

  handleSubmit () {
    event.preventDefault()
    this.props.submit(this.state)
  }

  render () {
    let label = '';
    if (this.props.view === 'info') {
      label = 'Request Info'
    } else {
      label = 'Schedule a Tour'
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <input ></input>
        <button><label>{label}</label></button>
      </form>
    )
  }
}



export default Form;