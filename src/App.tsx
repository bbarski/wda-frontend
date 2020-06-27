import React from 'react';
import {WeatherDataModel} from "./model/WeatherDataModel";
import configuration from "./config/localConfiguration.json";
import './app.css';


export class App extends React.Component<any, any> {

    state: State = {weatherData: null, cities: null};
    apiUrl: string = `${configuration.backendUri}`;
    defaultCity: string = configuration.defaultCity;

    componentDidMount() {
        this.gatherCities();
        this.gatherData(this.defaultCity);
    }

    render() {
        return this.displayData()
    }

    displayData = (): any => {
        if (this.state.weatherData == null) {
            return (
                <div className="dimmer ui active ">
                    <div className="ui loader">
                    </div>
                </div>
            )
        }

        return (

            <div id="weather-data" className="centered cards raised very padded text container ui">
                <div className="ui centered card center aligned">

                                    <select id="pick-city" onChange={this.grabValue} className="center aligned">
                                        <option value="select city">select place</option>
                                        {this.state.cities.map(cities => <option value={cities}>{cities}</option>)};
                                    </select>
                            <br/>
                            <div className="ui centered card center aligned compact green">
                                {'Outside Temp'} : {this.state.weatherData.clientRawModelOutsideTempCelsius} &#8451;<br/>
                                {'Pressure'} : {this.state.weatherData.clientRawModelBarometerHPa} {'hPa'}<br/>
                                {'Weather Desc'} : {this.state.weatherData.clientRawModelWeatherDesc}<br/>
                                {'Humidity'} : {this.state.weatherData.clientRawModelOutsideHumidityPercent} &#37;<br/>
                                {'Wind Avg Speed'} : {this.state.weatherData.clientRawModelAvgSpeedKnots} {'knots'}<br/>
                                {'Place'} : {this.state.weatherData.geoCodeModelsPlace}<br/>
                            </div>
                            <br/>
                    <div className="image">
                        <img src="https://openweathermap.org/themes/openweathermap/assets/img/new-history-forecast-bulk.png" alt="bg"/>
                    </div>

                </div>

             </div>
        )
    };

    gatherCities = () : any =>{
        let url = new URL(this.apiUrl+"/weather/city");
        fetch(url.toString())
            .then(res => res.json())
            .then((data) => {
                this.setState({cities: data});
                console.log("cities: " + this.state.cities)
            })
            .catch(console.log)
        };

    grabValue = (event: any): any => {
        this.gatherData(event.target.value);
    };

    gatherData = (paramValue: any): any => {
        this.setState({weatherData: null});

        let url = new URL(this.apiUrl);
        let params = {cityName: paramValue};
        url.search = new URLSearchParams("cityName=".concat(params.cityName.valueOf())).toString();
        console.log(url.toString());
        fetch(url.toString())
            .then(res => (res.json()))
            .then((data) => {
                this.setState({weatherData: data});
                console.log("weatherDataState is: " + this.state.weatherData)
            })
            .catch(console.log)
    };

}

interface State {
    weatherData: null | WeatherDataModel,
    cities: []
}