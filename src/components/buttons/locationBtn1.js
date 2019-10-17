import React, {Component} from 'react';

const LocationButton1 = (props) => {
    return(
        <button onClick={props.getCurrentLocation} className="btn-main get-location-btn">Get Weather By Location <i className="far fa-location"></i></button>
        )
}

export default LocationButton1;