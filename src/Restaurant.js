import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Marker, Popup } from 'react-leaflet';

const Restaurant = ({ icon }) => {
    const [restaurants, setRestaurants] = useState([])
    useEffect(() => {
        axios.get('https://raw.githubusercontent.com/woltapp/summer2018/master/restaurants.json')
        .then(response => setRestaurants(response.data))},[])
    return(
        <>
            {restaurants.map(rest => 
            <Marker key={rest.id} position={rest.location} icon={icon}>
                <Popup>
                <p className="blue"><strong>{rest.name}</strong></p>{rest.description}<br/> 
                {rest.phone_number}
                </Popup>
            </Marker> )}
        </>
    )
}

export default Restaurant