import React from 'react';

function SideBar(props) {
    const btnHamburguer = document.getElementById('hamburger-button');
    const sidebar = document.getElementById('sidebar');
    const olMarkers = document.getElementsByTagName('ol');
    while (olMarkers.firstChild) {
        olMarkers.removeChild(olMarkers.firstChild);
    }
    console.log(olMarkers);
    const toggleClass = () => {
        sidebar.classList.contains('open') ? sidebar.classList.remove('open') : sidebar.classList.add('open');
        btnHamburguer.classList.contains('open') ? btnHamburguer.classList.remove('open') : btnHamburguer.classList.add('open');
    }

    const createInfoWindow = (marker) => {
        var content = props.venues.map((venue) => {
            if(venue.venue.name === marker){
                var content = `<h1>${venue.venue.name}</h1>
                <p>Address: ${venue.venue.location.address}</p>
                <p>City: ${venue.venue.location.city}</p>
                <p>Country: ${venue.venue.location.country}</p>
                <p>Categoria: ${venue.venue.categories[0].name}</p>`
            }
            return content
        })
        return content.toString();
    }

    return (<menu>
        <button onClick={e => toggleClass()} id="hamburger-button">
            <div className="bar-hamburger-button1"></div>
            <div className="bar-hamburger-button2"></div>
            <div className="bar-hamburger-button3"></div>
        </button>
        <div className="menu" id="sidebar">
            <div id="search-div">
                <form>
                    <label forhtml="search">Search:</label>
                    <input type="search" id="search" onChange={(e) => props.searchVenues(e.target.value)}></input>
                </form>
            </div>
            <div id="markers-list-div">
                <ol>
                    {props.markers.map(marker => (
                        <li onClick={(e) => {
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