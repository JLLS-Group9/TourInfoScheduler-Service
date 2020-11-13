import React from 'react'
import axios from 'axios'
import Form from './form.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'schedule',
      property: []
    }

    this.submitRequest = this.submitRequest.bind(this)
  }

  componentDidMount() {
    this.retrievePropertyInfo(1)
  }

  retrievePropertyInfo (id) {
    console.log('retrieving info')
    axios.get(`/api/homes/${id}/bookings`)
    .then((response) => {
      console.log(response.data)
      this.setState ({
        property: response.data
      })
    })
  }

  scheduleTour (id) {
    axios.put(`/api/homes/${id}/scheduleTour`)
    .then((response) => {

    })
  }

  requestInfo (id) {
    axios.put(`/api/homes/${id}/requestInfo`)
    .then((response) => {

    })
  }

  submitRequest(event) {
    console.log('request submitted!')
    this.requestInfo();
  }



  render() {
    return (
      <div>
        Hello World, this is the App of TourInfo front-end
        <Form submit={this.submitRequest} view={this.state.currentView} />
      </div>
    )
  }
}


export default App;