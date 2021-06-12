import React, { Component } from 'react';
import { w3cwebsocket as W3CWebSocket } from "websocket";
import * as moment from 'moment';
import Charts from './component/chartData.js'
import './App.css'
const client = new W3CWebSocket('ws://city-ws.herokuapp.com/');
class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      dataFromServer: []
    }
    this.onColorChange = this.onColorChange.bind(this)
  }

  componentWillMount() {
    client.onopen = () => {
      console.log('WebSocket Client Connected');
    };
    client.onmessage = (message) => {
      const dataFromServer = JSON.parse(message.data);
      this.setState({
        dataFromServer
      });
    };
  }
  onColorChange(each, index) {
    let color = ''
    let date = new Date()
    if(Math.round(each.aqi) <= 50) {
      color = 'green';
    }
    if(Math.round(each.aqi) <= 100 && Math.round(each.aqi) >= 51) {
      color = 'lightgreen'
    }
    if(Math.round(each.aqi) <= 200 && Math.round(each.aqi) >= 101) {
      color = 'yellow'
    }
    if(Math.round(each.aqi) <= 300 && Math.round(each.aqi) >= 201) {
      color = 'orange'
    }
    if(Math.round(each.aqi) <= 400 && Math.round(each.aqi) >= 301) {
      color = 'red'
    }
    if(Math.round(each.aqi) <= 500 && Math.round(each.aqi) >= 401) {
      color = 'brown'
    }


    return (
                  <tr key={index} style={{backgroundColor: color}}>
                      <td>{each.city}</td>
                      <td>{each.aqi.toFixed(2)}</td>
                      <td>{moment(date).format('MMMM Do YYYY, h:mm:ss a')}</td>
                  </tr>
    )
  }
  render() {
    const {dataFromServer} = this.state
    return (
      <div>
        <table>
          <thead>
            <tr>
              <th>City</th>
              <th>Reading</th>
              <th>Last Update</th>
            </tr>
            
          </thead>
          <tbody>
           
              {
                dataFromServer.map((each, index ) => {
                  return this.onColorChange(each, index)
                })
              }
          </tbody>
        </table>

          <div className="chatsDarta"> 
                    <h1>Air Quality Chart</h1>
                    <Charts dataFromServer={dataFromServer}  />
                  </div>
      </div>
    );
  }
}

export default App;