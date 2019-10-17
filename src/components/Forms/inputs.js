import React, {Component} from 'react';
import WeatherButton1 from '../buttons/weatherButton1';

function Inputs (props){
    return(
        <div className="input-container col-xs-6 full-width">
            <form onSubmit={props.getweather} className="get-weather-form">
                <input type="text" name="zip" placeholder="Enter zip"></input>
                <WeatherButton1/>
            </form>
            <div className="error-message"><i className="fas fa-exclamation-circle"></i>{props.error}</div>
        </div>
    )
};

export default Inputs;