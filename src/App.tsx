import React from 'react';
import './App.css';
import {WeatherDataModel} from "./model/WeatherDataModel";

export class App extends React.Component<any, any> {

    state: State = { weatherData: null };
    apiUrl:string="http://51.38.131.247:8080/?";
    defaultCity:string="midmar";

    componentDidMount(){ this.gatherData(this.defaultCity); }

    render() { return this.displayData() }

    displayData = (): any => {

        if (this.state.weatherData == null) {
            return (<div className="dimmer ui active ">
                        <div className="ui loader">
                        </div>
                    </div>)
        }

        return (
            <div id="weather-data" className="ui raised very padded text container ui center aligned">
                <div className="ui segments center aligned">
                    <h1 className="ui center aligned header">{this.state.weatherData.stationName}</h1>
                    {
                        Object.values(this.state.weatherData).map((value: any, key: any) => {
                            return <div className="ui segment center aligned compact blue">{value}</div>;})
                    }
                    <select id="pick-city" onChange={this.grabValue}>
                        <option value="select city">select city</option>
                        <option value="midmar">midmar</option>
                        <option value="gosport">gosport</option>
                    </select>
                </div>

            </div>
        )
    };

    grabValue = (event: any): any =>{ this.gatherData(event.target.value);};

    gatherData = (paramValue: any): any =>{

        this.setState({weatherData: null});

        let url = new URL(this.apiUrl);
        let params = {cityName:paramValue};
        url.search = new URLSearchParams("cityName=".concat(params.cityName.valueOf())).toString();

        fetch(url.toString())
            .then(res => (res.json()))
            .then((data) => { this.setState({weatherData: data});
                console.log("weatherDataState is: " + this.state.weatherData)})
            .catch(console.log)
    };

}

    interface State { weatherData: null | WeatherDataModel }