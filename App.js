import React, { Component } from 'react';
import './App.scss';
import { InlineLoading } from 'carbon-components-react';
import { Content } from 'carbon-components-react/lib/components/UIShell';

import AppHeader from './components/header/index';
import axios from 'axios';
import * as _ from 'lodash';
class App extends Component {
  constructor() {
    super()
    this.state = {
      city: null,
      temp: {},
      isLoaded: false,
      max: null,
      min: null
    }

    this.getTempData = this.getTempData.bind(this);
  }

  componentDidMount() {
    this.getTempData();
  }

  getTempData() {
    axios.get('https://cors-anywhere.herokuapp.com/https://api.openweathermap.org/data/2.5/forecast?appid=9723f3d0a2a6b10bb72a092e2df13c25&id=1259229&units=metric')
      .then(response => {
        let _max = _.max(response.data.list.map( (x) => Number(x.main.temp) )).toFixed(0);
        let _min = _.min(response.data.list.map( (x) => Number(x.main.temp) )).toFixed(0);
        this.setState({ city: response.data.city, temp: response.data.list, isLoaded: true, max: _max, min: _min })
      })
  }

  kelvinToCelsius(data){
    return (Number(data) - 273.15).toFixed(1);
  }

  getIconClass(icon) {
    // Check https://openweathermap.org/weather-conditions for more details
    let response = '';
    switch (true) {
      case (icon >= 200 && icon <= 299):
        response = 'wi-night-alt-snow-thunderstorm';
        break;
      case (icon >= 300 && icon <= 399):
        response = 'wi-day-showers';
        break;
      case (icon >= 400 && icon <= 499):
        response = 'wi-day-sunny';
        break;
      case (icon >= 500 && icon <= 599):
        response = 'wi-day-thunderstorm';
        break;
      case (icon >= 600 && icon <= 699):
        response = 'wi-snow';
        break;
      case (icon >= 700 && icon <= 799):
        response = 'wi-smog';
        break;
      case (icon == 800):
        response = 'wi-day-sunny';
        break;
      case (icon >= 801 && icon <= 899):
        response = 'wi-cloud';
        break;
      default:
        response = 'wi-night-sleet'
    }
    return response;
  }

  render() {
    const { max, min, city, temp, isLoaded } = this.state;

    if (!isLoaded) {
      return (<Content className='flex-col'><InlineLoading /> </Content>)
    } else {
      return (
        <>
          {/* <AppHeader /> */}
          <Content className='flex-col'>
            <h3 className='f-md'>{city.name}</h3>
            <div className='capitalize'>{temp[0].weather[0].description} | {temp[0].main.temp}°C</div>
            <div className='flex-row mb-s'>
              <h2 className='mb-xs bold'>{max}</h2>
              <h3 className='mb-s'>°C</h3>
            </div>
            <i className={'wi lg ' + this.getIconClass(temp[0].weather[0].id)}></i>
            <div className='flex-row mt-s'>
              <h2 className='mb-xs bold'>{min}</h2>
              <h3 className='mb-s'>°C</h3>
            </div>
          </Content>
          <hr className='mb-s'/>
          <div className='flex-row space-around'>
            <div className='flex-col'>
              <p className='mb-xs'>11:00</p>
              <i className='wi wi-cloud'></i>
              <p className='mt-xs'>14°C</p>
            </div>
            <div className='flex-col'>
              <p className='mb-xs'>11:00</p>
              <i className='wi wi-cloud'></i>
              <p className='mt-xs'>14°C</p>
            </div>
            <div className='flex-col'>
              <p className='mb-xs'>11:00</p>
              <i className='wi wi-cloud'></i>
              <p className='mt-xs'>14°C</p>
            </div>
            <div className='flex-col'>
              <p className='mb-xs'>11:00</p>
              <i className='wi wi-cloud'></i>
              <p className='mt-xs'>14°C</p>
            </div>
            <div className='flex-col'>
              <p className='mb-xs'>11:00</p>
              <i className='wi wi-cloud'></i>
              <p className='mt-xs'>14°C</p>
            </div>
          </div>
        </>
      )
    }
  }
}

export default App;
