import SideBar from './components/SideBar'
import React from 'react'
import axios from 'axios'
import './App.css'

class App extends React.Component {

  state = {
    initVenues: [],
    filterVenues: [],
    firstRender: true,
    map: '',
    markers: [],
    infoWindow: '',
  }

  componentDidMount() {
    this.initVenues();
  }

  initVenues = () => {
    const endPoint = "https://api.foursquare.com/v2/venues/explore?"
    const parameters = {
      client_id: "VZRRHHM4G1UNL0NUAHDLAARKYKCYSQETWF3NCBP2H1RK5GT3",
      client_secret: "EX135RA5DWRQ14PUTX1MN2XI1S4YRMLCVMU5BANVIWWDOGZK",
      query: 'top',
      near: "Pouso Alegre",
      limit: 10,
      v: "20190723"
    }
    axios.get(endPoint + new URLSearchParams(parameters))
      .then(response => {
        this.setState({
          initVenues: response.data.response.groups[0].items
        }, () => {
          if (this.state.firstRender) {
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
        window.alert("Ops, we have a problem, here, please, verify your internet connection and reload the page")
      })
  }

  searchVenues = (query) => {
    if(!query) {
      this.placeMarkers(this.state.initVenues)
    } else {
      console.log(query)
    const filterVenues = this.state.initVenues
      .filter(venue => venue.venue.name.toLowerCase().includes(query));
      this.setState({
        filterVenues: filterVenues
      }, () => this.placeMarkers(filterVenues))
    }
  }


  renderMap = () => {
    loadScripts("https://maps.googleapis.com/maps/api/js?key=AIzaSyBVGaI4iQj53OoM6-gWYfSKJgWtTEJUqq4&callback=initMap")
    window.initMap = this.initMap
  }

  initMap = () => {
    const map = new window.google.maps.Map(document.getElementById('map'), {
      mapTypeControl: false,
      center: { lat: -22.2292377, lng: -45.9382979 },
      zoom: 14
    });
    this.setState({
      map: map,
    }, () => this.placeMarkers(this.state.initVenues))
  }

  placeMarkers = (venues) => {
    if (this.state.markers) {
      this.state.markers.forEach(marker => {
        marker.setMap(null);
      })
    }
    const markers = this.createMarkers(venues);
    this.setState({
      markers: markers,
    })
  }

  createInfoWindow = (venue) => {
    return `<h1 id="info-h1">${venue.venue.name}</h1>
    <div id="info-div">
      <p><span>Address:</span> ${venue.venue.location.address}</p>
      <p><span>City:</span> ${venue.venue.location.city}</p>
      <p><span>Country:</span> ${venue.venue.location.country}</p>
      <p><span>Categoria:</span> ${venue.venue.categories[0].name}</p>
    </div>
    <div id="info-foursquare">
      <p>Info by <a href="https://pt.foursquare.com/"><span>Foursquare</span></a>
    </div>`
  }

  createMarkers = (venues) => {
    const that = this;
    const infowindow = new window.google.maps.InfoWindow();
    this.setState({
      infoWindow: infowindow,
    })
    const markers = venues.map(venue => {
      var contentString = this.createInfoWindow(venue);
      var marker = new window.google.maps.Marker({
        position: { lat: venue.venue.location.lat, lng: venue.venue.location.lng },
        title: venue.venue.name,
        animation: window.google.maps.Animation.DROP,
      });
      marker.addListener('click', function () {
        infowindow.setContent(contentString);
        infowindow.open(that.state.map, marker);
        if (marker.getAnimation() !== null) {
          marker.setAnimation(null);
        } else {
          marker.setAnimation(window.google.maps.Animation.BOUNCE);
        }
      });
      marker.setMap(this.state.map);
      return marker;
    })
    return markers;
  }

  render() {
    return (
      <main>
        <SideBar infoWindow={this.state.infoWindow} map={this.state.map} searchVenues={this.searchVenues} venues={this.state.initVenues} markers={this.state.markers}></SideBar>
        <div tabindex='-1' id="map"></div>
      </main>
    )
  }
}

function loadScripts(url) {
  var index = window.document.getElementsByTagName("script")[0]
  var script = window.document.createElement("script")
  script.src = url
  script.defer = true
  script.async = true
  index.parentNode.insertBefore(script, index)
}

export default App;
