import React, {Component} from 'react';
import Cloud1 from '../animations/cloud1';
import Loading1 from '../loading/loading1';

function Weather (props){
    if(props.cTemp && props.fTemp){
    return(    
        <div className="weather-container col-xs-6 full-width">
            <div className="details">
                <i className="fas fa-thermometer-quarter"></i><p>Cur Temp: <strong>{props.cTemp}</strong>&#176;c/ <strong>{props.fTemp}</strong>&#176;f </p><br/>
                <i className="far fa-signal-alt-3"></i><p>Temp Range: <strong>{props.tempRange}</strong></p><br/>
                <i className="fas fa-sort-amount-up"></i><p>High: <strong>{props.highC}</strong>&#176;c/<strong>{props.highF}</strong>&#176;f</p><br/>
                <i className="fas fa-sort-amount-down"></i><p>Low: <strong>{props.lowC}</strong>&#176;c/<strong>{props.lowF}</strong>&#176;f</p><br/>
                <i className="fas fa-humidity"></i><p>Humidity: <strong>{props.humidity}</strong></p><br/>
                <i className="fa fa-info"></i><p>Description: <strong>{props.description}</strong></p><br/>
            </div>
        </div>
    )
    }else if(props.loading == true){
        return(
            <Loading1></Loading1>
        )
    }
    else{
        return(
        <div className=" col-xs-6 full-width">
            <div>
                Enter a zip to retrieve weather or click use location button
            </div>
            <Cloud1/>
        </div>
        
        )
    }
};

export default Weather;