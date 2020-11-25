/* eslint-disable import/extensions */
/* eslint-disable no-console */
import React from 'react';
import axios from 'axios';
import Form from './form.jsx';
import as from './appStyles.css';

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
    axios.get(`${window.location.pathname}bookings`)
      .then((response) => {
        console.log('got info', response.data[0], window.location.href);
        this.setState({
          property: response.data[0],
        });
      });
  }

  scheduleTour(input) {
    const { property: { propertyId } } = this.state;
    console.log('scheduler', propertyId, input);
    const request = {
      email: input.email,
      financing: input.financing,
      name: input.name,
      phone: input.phone,
      date: input.date,
      type: input.type,
      time: input.time,
    };
    axios.put(`/api/homes/${propertyId}/scheduleTour`, {
      request,
    })
      .then((response) => {
        this.setState({
          property: response.data,
        });
        console.log(response);
      });
  }

  requestInfo(input) {
    const { property } = this.state;
    const request = {
      name: input.name,
      email: input.email,
      financing: input.financing,
      phone: input.phone,
      message: input.message,
      agent: input.agent,
    };
    console.log(request, input);
    axios.put(`/api/homes/${property.propertyId}/requestInfo`, {
      request,
    })
      .then((response) => {
        console.log(response.data);
        this.setState({
          property: response.data,
        });
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
    event.stopPropagation();
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
      <div className={as.mainContainer}>
        <div className={as.formContainer}>
        <img src="https://housephotostrulia.s3-us-west-1.amazonaws.com/static/2_under_GALLERY_next_to_TOUR.jpg" />
          <Form
            submit={this.submitRequest}
            view={currentView}
            property={property}
            toggle={this.toggleView}
          />
        </div>
      </div>
    );
  }
}

export default App;
