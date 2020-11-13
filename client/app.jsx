import React from 'react'

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  retrievePropertyInfo (id) {
    axios.get(`/api/homes/${id}/bookings`)
    .then((response) => {
      console.log(response.data)
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



  render() {
    return (
      <div>Hello World, this is the App of TourInfo</div>
    )
  }
}


export default App;