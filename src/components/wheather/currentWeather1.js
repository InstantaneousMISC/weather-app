import React from 'react';



function CurrentWeather1 (props){
    if(props.icon && props.fTemp){
    return(
        <div className="cur-weather-disp full-width">
            <img src={props.icon} alt="" className="weather-icon"></img>
            <p>{props.city}</p>
            <h2>Current Weather</h2>
            <h4>{props.fTemp}&#176;</h4>
        </div>
    )
    }else{
        return(
            <div className="cur-weather-disp full-width">
                
            </div>
        )
    }
};

export default CurrentWeather1;