import React from 'react'
import axios from 'axios'
import Form from './form.jsx'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'schedule',
      property: {}
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
      this.setState ({
        property: response.data[0]
      })
    })
  }

  scheduleTour (input) {
    axios.put(`/api/homes/${this.state.property.propertyId}/scheduleTour`)
    .then((response) => {

    })
  }

  requestInfo (input) {
    axios.put(`/api/homes/${this.state.property.propertyId}/requestInfo`)
    .then((response) => {

    })
  }

  submitRequest(input) {
    if (this.state.currentView === 'schedule') {
      this.scheduleTour(input);
    } else {
      this.requestInfo(input);
    }
    console.log('request submitted!', this.state.property.propertyId)
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