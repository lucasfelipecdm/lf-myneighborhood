import React from 'react'
import axios from 'axios'
import './App.css'

class App extends React.Component {

  state = {
    venues: []
  }


  componentDidMount(){
    this.getVenues()
  }

  renderMap = ()=> {
    loadScripts("https://maps.googleapis.com/maps/api/js?key=AIzaSyBVGaI4iQj53OoM6-gWYfSKJgWtTEJUqq4&callback=initMap")
    window.initMap = this.initMap 
  }

  getVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "VZRRHHM4G1UNL0NUAHDLAARKYKCYSQETWF3NCBP2H1RK5GT3",
      client_secret: "EX135RA5DWRQ14PUTX1MN2XI1S4YRMLCVMU5BANVIWWDOGZK",
      query: "food",
      near: "Sydney",
      v: "20190723"
    }

    axios.get(endPoint+new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          venues: response.data.response.groups[0].items
        }, this.renderMap())
      })
      .catch(error => {
        console.log(`Error: ${error}`)
      })
  }

  initMap = ()=> {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      center: {lat: -34.397, lng: 150.644},
      zoom: 8
    });

    this.state.venues.map(venue => {
      var marker = new window.google.maps.Marker({
        position: {lat: venue.venue.location.lat, lng: venue.venue.location.lng},
        map: map,
        title: venue.venue.name
      });
    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
      </main>
    )
  }
}



/* 
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
*/

function loadScripts(url){
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.defer = true
  script.async = true
  index.parentNode.insertBefore(script, index)
}

export default App;
