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
    this.retrievePropertyInfo = this.retrievePropertyInfo.bind(this)
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
    axios.put(`/api/homes/${this.state.property.propertyId}/scheduleTour`, {
      input,
    })
      .then((response) => {

      });
  }

  requestInfo(input) {
    axios.put(`/api/homes/${this.state.property.propertyId}/requestInfo`, {
      input,
    })
      .then((response) => {

      });
  }

  submitRequest(input) {
    console.log(input);
    if (this.state.currentView === 'schedule') {
      this.scheduleTour(input);
    } else {
      this.requestInfo(input);
    }
  }

  toggleView(event) {
    const click = event.target.name;
    if (this.state.currentView !== click) {
      this.setState({
        currentView: click,
      });
    }
    console.log('toggleView', this.state.currentView);
  }

  render() {
    return (
      <div>
        Hello World, this is the App of TourInfo front-end
        <Form
          submit={this.submitRequest}
          view={this.state.currentView}
          property={this.state.property}
          toggle={this.toggleView}
        />
      </div>
    );
  }
}

export default App;
