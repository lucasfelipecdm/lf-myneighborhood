import React from 'react';

function SideBar (props) {
    const btnHamburguer = document.getElementById('hamburger-button');
    const sidebar =  document.getElementById('sidebar');
    const toggleClass = () => {
        sidebar.classList.contains('open') ? sidebar.classList.remove('open') : sidebar.classList.add('open');
        btnHamburguer.classList.contains('open') ? btnHamburguer.classList.remove('open') : btnHamburguer.classList.add('open');
    }

    return (<menu>
        <button onClick={e => toggleClass()} id="hamburger-button">
                <div className="bar-hamburger-button1"></div>
                <div className="bar-hamburger-button2"></div>
                <div className="bar-hamburger-button3"></div>
        </button>
        <div className="menu" id="sidebar">
            <form>
                <label forhtml="search">Search:</label>
                <input id="search" onChange={(e) => props.searchVenues(e.target.value)}></input>
            </form>
        </div>
    </menu>);
}

export default SideBar