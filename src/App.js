import React from 'react'
import SideBar from './components/SideBar'
import axios from 'axios'
import './App.css'

class App extends React.Component {

  state = {
    venues: [],
    firstRender: true,
    map: '',
    markers: '',
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
          }, () => {
            if(this.state.firstRender){
              this.renderMap();
              this.setState({
                firstRender: false
              })
            } else {
              this.placeMarkers();
            }
          })
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
    this.setState({
      map: map,
    }, () => this.placeMarkers())
  }

  placeMarkers = () => {
    if(this.state.markers) {
      this.state.markers.forEach(marker => {
        marker.setMap(null);
      })
    }

    

    const markers = this.state.venues.map(venue => {
      var contentString = `<h1>${venue.venue.name}</h1>`;
      var infowindow = new window.google.maps.InfoWindow();
      var marker = new window.google.maps.Marker({
        position: { lat: venue.venue.location.lat, lng: venue.venue.location.lng },
        title: venue.venue.name
      });
      marker.addListener('click', function () {
        infowindow.setContent(contentString);
        infowindow.open(this.state.map, marker);
      });
      marker.setMap(this.state.map);
      console.log(marker);
      return marker;
    })
    this.setState({
      markers: markers,
    })
  }

  render() {
    return (
      <main>
        <div id="map"></div>
        <SideBar searchVenues={this.state.searchVenues} venues={this.state.venues}></SideBar>
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
