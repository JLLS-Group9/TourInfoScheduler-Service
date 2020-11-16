/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Form from './form.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentView: 'schedule',
      property: {},
    };

    this.submitRequest = this.submitRequest.bind(this);
    this.toggleView = this.toggleView.bind(this);
    this.retrievePropertyInfo = this.retrievePropertyInfo.bind(this);
  }

  componentDidMount() {
    this.retrievePropertyInfo();
  }

  retrievePropertyInfo() {
    console.log('retrieving info');
    axios.get(`${window.location.href}/bookings`)
      .then((response) => {
        this.setState({
          property: response.data[0],
        });
        console.log(response.data[0]);
      });
  }

  scheduleTour(input) {
    const { property } = this.state;
    axios.put(`/api/homes/${property.propertyId}/scheduleTour`, {
      input,
    })
      .then((response) => {
        console.log('schedule response', response);
      });
  }

  requestInfo(input) {
    const { property } = this.state;
    axios.put(`/api/homes/${property.propertyId}/requestInfo`, {
      input,
    })
      .then((response) => {
        console.log(response);
      });
  }

  submitRequest(input) {
    const { currentView } = this.state;
    console.log(input);
    if (currentView === 'schedule') {
      this.scheduleTour(input);
    } else {
      this.requestInfo(input);
    }
  }

  toggleView(event) {
    const { currentView } = this.state;
    const click = event.target.name;
    if (currentView !== click) {
      this.setState({
        currentView: click,
      });
    }
    console.log('toggleView', currentView);
  }

  render() {
    const {
      currentView,
      property,
    } = this.state;
    return (
      <div>
        Hello World, this is the App of TourInfo front-end
        <Form
          submit={this.submitRequest}
          view={currentView}
          property={property}
          toggle={this.toggleView}
        />
      </div>
    );
  }
}

export default App;
