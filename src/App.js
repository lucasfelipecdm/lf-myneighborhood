import React from 'react'
import SideBar from './components/SideBar'
import axios from 'axios'
import './App.css'

class App extends React.Component {

  state = {
    venues: [],
    searchVenues: (query) => {
      const endPoint = "https://api.foursquare.com/v2/venues/explore?"
      const parameters = {
        client_id: "VZRRHHM4G1UNL0NUAHDLAARKYKCYSQETWF3NCBP2H1RK5GT3",
        client_secret: "EX135RA5DWRQ14PUTX1MN2XI1S4YRMLCVMU5BANVIWWDOGZK",
        query: query || 'top',
        near: "Pouso Alegre MG",
        v: "20190723"
      }
      axios.get(endPoint + new URLSearchParams(parameters))
        .then(response => {
          this.setState({
            venues: response.data.response.groups[0].items
          }, this.renderMap())
        })
        .catch(error => {
          console.log(`Error: ${error}`)
        })
    }
  }

  componentDidMount() {
    this.state.searchVenues('top')
  }

  renderMap = () => {
    loadScripts("https://maps.googleapis.com/maps/api/js?key=AIzaSyBVGaI4iQj53OoM6-gWYfSKJgWtTEJUqq4&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: { lat: -22.2292377, lng: -45.9382979},
      zoom: 14
    });

    var infowindow = new window.google.maps.InfoWindow();

    this.state.venues.map(venue => {
      var contentString = `<h1>${venue.venue.name}</h1>`;
      var marker = new window.google.maps.Marker({
        position: { lat: venue.venue.location.lat, lng: venue.venue.location.lng },
        map: map,
        title: venue.venue.name
      });
      marker.addListener('click', function () {
        infowindow.setContent(contentString);
        infowindow.open(map, marker);
      });
      return 0;
    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
        <SideBar searchVenues={this.state.searchVenues}></SideBar>
      </main>
    )
  }
}

/* 
  <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&callback=initMap"
    async defer></script>
*/

function loadScripts(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.defer = true
  script.async = true
  index.parentNode.insertBefore(script, index)
}

export default App;
