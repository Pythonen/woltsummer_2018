import React, {useState} from 'react';
import './App.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import video from './wolt_logo.mp4'
import marker from './marker.svg'
import marker_me from './marker_me.svg'
import L from 'leaflet'
import Restaurant from './Restaurant'

const resIcon = L.icon({
  iconUrl: marker,
  iconSize: [30, 45]
});
const myIcon = L.icon({
  iconUrl: marker_me,
  iconSize: [30, 45]
});

function App() {
  const [location, setLocation] = useState({
    lat: null,
    lng: null
  })
  const zoom = 5
  const success = (pos) => {
    setLocation({
      lat: pos.coords.latitude,
      lng: pos.coords.longitude
    })
  }
  //const searchComponent = (props) => <ReactLeafletSearch position="topleft" provider="OpenStreetMap" providerOptions={{ region: "fi" }} />;;
  const denied = _ => {
    fetch('http://ip-api.com/json/')
    .then(res => res.json())
    .then(pos => {
      setLocation({
        lat: pos.lat,
        lng: pos.lon
      })
    })
  }
  navigator.geolocation.getCurrentPosition(success, denied)
  return (
    <div className="App">
      {location.lat === null && location.lng === null ? 
        <video loop autoPlay src={video} muted type="video/mp4"/>
        : 
        
        <Map className='map'
          zoom={zoom}
          center={location}>
          <TileLayer
            attribution="&amp;copy <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <Marker position={location} icon={myIcon}>
            <Popup>
              <p className="blue"><strong>It's you! Hi!</strong></p>
              <p>Not accurate? <span className='onHover'>Here's more info</span></p>
            </Popup>
          </Marker>
          <Restaurant icon={resIcon}/>
        </Map>
        }
    </div>
  );
}

export default App;
