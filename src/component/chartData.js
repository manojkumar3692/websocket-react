import React,{PureComponent, useEffect, useState} from 'react'
import { Bar } from 'react-chartjs-2';
import { PolarArea } from 'react-chartjs-2';

export default function Charts (props) {
    const [data, setData] = useState([])
    const [airIndex, setAirIndex] = useState([])
    const [cityArr, setCityArr] = useState([])
    useEffect( async () => {
        let airIndexArray = []
        let cityArray = []
        const airIndexArr = await props.dataFromServer.map((each) => airIndexArray.push(each.aqi))
        const cityIndexArr = await props.dataFromServer.map((each) => cityArray.push(each.city))
        setData(props.dataFromServer)
        setAirIndex(airIndexArray)
        setCityArr(cityArray)
    },[props.dataFromServer])
    const setBackgroundColor = (airIndex) => {
        let color = []
        airIndex.map((each) => {
              if(Math.round(each) <= 50) {
                color.push('green');
              }
              if(Math.round(each) <= 100 && Math.round(each) >= 51) {
                color.push('lightgreen');
              }
              if(Math.round(each) <= 200 && Math.round(each) >= 101) {
                color.push('yellow');
              }
              if(Math.round(each) <= 300 && Math.round(each) >= 201) {
                color.push('orange');
              }
              if(Math.round(each) <= 400 && Math.round(each) >= 301) {
                color.push('red');
              }
              if(Math.round(each) <= 500 && Math.round(each) >= 401) {
                color.push('brown');
              }
        })
        return color
    }
    const barData = {
        labels: cityArr,
        datasets: [
          {
            label: 'Air Quality Index',
            data: airIndex,
            backgroundColor: setBackgroundColor(airIndex),
            borderColor: [
              'rgba(255, 99, 132, 1)',
              'rgba(54, 162, 235, 1)',
              'rgba(255, 206, 86, 1)',
              'rgba(75, 192, 192, 1)',
              'rgba(153, 102, 255, 1)',
              'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
          },
        ],
      };
    const options = {
        scales: {
          yAxes: [
            {
              ticks: {
                beginAtZero: true,
              },
            },
          ],
        },
      };

      const polarData = {
        labels: cityArr,
        datasets: [
          {
            label: '# of Votes',
            data: airIndex,
            backgroundColor: setBackgroundColor(airIndex),
            borderWidth: 1,
          },
        ],
      };

    return (
        <div>
            <div  className="barGraph">
            <Bar data={barData} options={options} />
            </div>"
            <div className="polorGraph">
                <h1>Polar Representation</h1>
                <PolarArea data={polarData} />
            </div>
        </div>
    )
}