import React from 'react';
import '../App.css';
import Weather from '../components/wheather/weather.js';
import Title from '../components/Titles/title';
import Inputs from '../components/Forms/inputs'
import CurrentWeather1 from '../components/wheather/currentWeather1'
import LocationBtn1 from '../components/buttons/locationBtn1';

const API_KEY = '28eb4318df2cf5de5d110cc29bb82068';
let lat = "";
let lon = "";
let cords = "";

class App extends React.Component {
  state = {
    zip: '',
    city: '',
    state: '',
    temp: '',
    high: '',
    low: '',
    humidity: '',
    description: '',
    error: '',
    loading: false
  }

  //Get weather from location
  getCurrentLocation = async (e)=>{
    e.preventDefault();
    console.log("wud up dawg")
    this.setState({
      loading:true
    })

    if(navigator.geolocation){
      console.log("started")
      navigator.geolocation.getCurrentPosition(this.success, this.error)
    }else{
      this.setState({
        loading:false
      })
    }

    
    
    
  }

  success = async (response) =>{
    cords = response.coords;
    lat = cords.latitude;
    lon = cords.longitude;
    console.log('Lat: ' + lat + 'Lon: ' + lon)
    console.log('Coords in')
    const urlWeatherByCoords = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;

    
    console.log(urlWeatherByCoords)
    const req = await fetch(urlWeatherByCoords);
    const res = await req.json();
    console.log(res)

    //Set State
    this.setState({
      zip: '',
      city: res.name,
      state: '',
      cTemp: Number(res.main.temp).toFixed(2),
      fTemp: Number(res.main.temp * 9 / 5 + 32).toFixed(2),
      tempRange: '',
      highC: Number(res.main.temp_max).toFixed(2),
      highF: Number(res.main.temp_max * 9 / 5 + 32).toFixed(2),
      lowC: Number(res.main.temp_min).toFixed(2),
      lowF: Number(res.main.temp_min * 9 / 5 + 32).toFixed(2),
      humidity: res.main.humidity,
      description: res.weather[0].description,
      icon: 'https://openweathermap.org/img/w/' + res.weather[0].icon + '.png', //Icon will be based upon temp range
      error: '',
      loading: false
    })
    //Display and remove current weather icon based on weather pulled or not
    this.state.icon ? document.querySelector(".weather-icon").style.display = 'inline-block':document.querySelector(".weather-icon").style.display = 'none';
  }
  
  error = (res)=>{
    console.log(res)
  }

  //Get weather from zip
  getWeather = async (e) =>{
    e.preventDefault();
    const zip = e.target.elements.zip.value;
    //If zip entered is valid perform 
    if(zip.length === 5 && !zip.match(/[a-z]/i)){
      document.querySelector(".error-message").style.display = 'none';
      const url = `https://api.openweathermap.org/data/2.5/weather?zip=${zip},us&appid=${API_KEY}&units=metric`

      //FETCH results from API
      const req = await fetch(url);
      const res = await req.json();
      console.log(res.name);
      //Set State
      this.setState({
        zip: zip,
        city: res.name,
        state: '',
        cTemp: Number(res.main.temp).toFixed(2),
        fTemp: Number(res.main.temp * 9 / 5 + 32).toFixed(2),
        tempRange: '',
        highC: Number(res.main.temp_max).toFixed(2),
        highF: Number(res.main.temp_max * 9 / 5 + 32).toFixed(2),
        lowC: Number(res.main.temp_min).toFixed(2),
        lowF: Number(res.main.temp_min * 9 / 5 + 32).toFixed(2),
        humidity: res.main.humidity,
        description: res.weather[0].description,
        icon: 'https://openweathermap.org/img/w/' + res.weather[0].icon + '.png', //Icon will be based upon temp range
        error: ''
      })
      console.log(this.state.icon)

      //Display and remove current weather icon based on weather pulled or not
      this.state.icon ? document.querySelector(".weather-icon").style.display = 'inline-block':document.querySelector(".weather-icon").style.display = 'none';

      //set tempRange state according to current temp
      if(this.state.fTemp >= 70){
        this.setState(
          {
            tempRange: 'hight'
          }
        )
      }else if(this.state.fTemp < 70 && this.state.fTemp > 50){
        this.setState(
          {
            tempRange: 'mid'
          }
        )
      }else{
        this.setState(
          {
            tempRange: 'low'
          }
        )
      }
      console.log(this.state.temp)
    }//If zip entered is invalid
    else{
      this.setState({
        'error': "Please enter a 5 digit zip",
      })
      document.querySelector(".error-message").style.display = 'block';
      console.log(this.state.error)
    }
  }


  
  render() {
    return (
          <div className="weather-app-container">
                <div className="col-xs-12">
                  <Title></Title>
                  <Inputs getweather={this.getWeather} getcurrentlocation={this.getCurrentLocation}error={this.state.error} temp={this.state.high}></Inputs> 
                  <LocationBtn1 getCurrentLocation={this.getCurrentLocation}/>
                </div> 
                 <CurrentWeather1
                  icon={this.state.icon}
                  fTemp={this.state.fTemp}
                  city={this.state.city}
                />
                <Weather 
                  icon={this.state.icon}
                  cTemp={this.state.cTemp}
                  fTemp={this.state.fTemp}
                  tempRange={this.state.tempRange}
                  highC={this.state.highC}
                  highF={this.state.highF}
                  lowC={this.state.lowC}
                  lowF={this.state.lowF}
                  humidity={this.state.humidity}
                  description={this.state.description}
                  loading={this.state.loading}
                />
                
              </div>
    );
  }
}



export default App;
