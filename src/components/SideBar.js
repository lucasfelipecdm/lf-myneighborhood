import React from 'react';
import '../App.css'

function SideBar(props) {
    const btnHamburguer = document.getElementById('hamburger-button');
    const sidebar = document.getElementById('sidebar');
    const toggleClass = () => {
        sidebar.classList.contains('open') ? sidebar.classList.remove('open') : sidebar.classList.add('open');
        btnHamburguer.classList.contains('open') ? btnHamburguer.classList.remove('open') : btnHamburguer.classList.add('open');
    }

    const createInfoWindow = (marker) => {
        var content = props.venues.map((venue) => {
            if(venue.venue.name === marker){
                var content = `<h1 id="info-h1">${venue.venue.name}</h1>
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
            return content;
        })
        return content.toString();
    }

    return (<menu>
        <button tabindex="0" onClick={e => toggleClass()} id="hamburger-button">
            <div className="bar-hamburger-button1"></div>
            <div className="bar-hamburger-button2"></div>
            <div className="bar-hamburger-button3"></div>
        </button>
        <div className="menu" id="sidebar">
            <div id="search-div">
                <form>
                    <label forhtml="filter">Filter:</label>
                    <input type="search" id="filter" onChange={(e) => props.searchVenues(e.target.value)}></input>
                </form>
            </div>
            <div id="markers-list-div">
                <ol>
                    {props.markers.map(marker => (
                        <li tabindex='0' onClick={(e) => {
                                marker.setAnimation(window.google.maps.Animation.BOUNCE);
                                var contentString = createInfoWindow(marker.title);
                                props.infoWindow.setContent(contentString);
                                props.infoWindow.open(props.map, marker)
                            }} key={marker.title}>
                            {marker.title}
                        </li>
                    ))}
                </ol>
            </div>
        </div>
    </menu>);
}

export default SideBar