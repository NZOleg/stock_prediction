import React, { Component } from 'react';
import './App.css';
import StockSelector from './StockSelector.js';
import CandleStickChart from './Chart';
import { getData, parseData } from "./utils"

class App extends Component {

    state = {
        passwords: [],
        stock: 'AAPL',
        prediction: '1',
        data: null,
        chartData: null,
        days: 30
    };

    stockList = [
        { value: 'AAPL', label: 'Apple' },
        { value: 'MSFT', label: 'Microsoft' },
        { value: 'AMZN', label: 'Amazon' },
        { value: 'TSLA', label: 'Tesla' },
        { value: 'GOOGL', label: 'Google' },
    ];
    predictionList = [{ value: '1', label: '1' },
        { value: '3', label: '3' },
        { value: '7', label: '7' }
        ];
    dayList = [{ value: 15, label: '15' },
        { value: 30, label: '30' },
        { value: 60, label: '60' },
        { value: 90, label: '90' }
    ];

    onStockChange = (stock) => {
        this.setState({'stock':stock}, () => {
            this.getData();
        });
    };
    onPredictionChange = (prediction) => {
        this.setState({'prediction':prediction}, () => {
            this.getData();
        });
    };
    onDayChange = (days) => {
        this.setState({'days':days}, () => {
            this.getData();
        });

    };

    getData = () => {
        console.log('/api/'+this.state.stock+'/'+this.state.prediction)
        fetch('/api/'+this.state.stock+'/'+this.state.prediction)
            .then(res => res.json())
            .then(data => this.setState({data:data}))
            .then(()=>{
                this.processData();
            })
            .then(()=>{
                let chartData = {
                    labels: this.state.Date,
                    datasets: [
                        {
                            label: "Actual Data",
                            fillColor: "rgba(220,220,220,0.2)",
                            strokeColor: "rgba(220,220,220,1)",
                            pointColor: "rgba(220,220,220,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(220,220,220,1)",
                            data: this.state.Close
                        },
                        {
                            label: "Prediction",
                            fillColor: "rgba(151,187,205,0.2)",
                            strokeColor: "rgba(151,187,205,1)",
                            pointColor: "rgba(151,187,205,1)",
                            pointStrokeColor: "#fff",
                            pointHighlightFill: "#fff",
                            pointHighlightStroke: "rgba(151,187,205,1)",
                            data: this.state.Prediction
                        }
                    ]
                };
                this.setState({chartData:chartData});
            });
    };

    componentDidMount() {
        this.getData();

    }



    processData = () =>{
        let data = this.state.data;
            let Date = [];
            let Close = [];
            let Prediction = [];
            for(var i=data.length-this.state.days; i<data.length; i++){
                Date.push(data[i]['Date'].toString());
                Close.push(data[i]['close']);
                Prediction.push(data[i]['prediction']);
            }

        this.setState({Date:Date, Close:Close, Prediction:Prediction})
        };

    render() {
        if (this.state.data == null || this.state.chartData == null) {
            return <div>Loading...</div>
        }
        //if (this.state.data != null) this.setState({data: this.processData()});
            ///Boolean - Whether grid lines are shown across the chart
         var chartOptions = {  scaleShowGridLines : true,

                //String - Colour of the grid lines
                scaleGridLineColor : "rgba(0,0,0,.05)",

            //Number - Width of the grid lines
            scaleGridLineWidth : 1,

            //Boolean - Whether to show horizontal lines (except X axis)
            scaleShowHorizontalLines: true,

            //Boolean - Whether to show vertical lines (except Y axis)
            scaleShowVerticalLines: true,

            //Boolean - Whether the line is curved between points
            bezierCurve : true,

            //Number - Tension of the bezier curve between points
            bezierCurveTension : 0.4,

            //Boolean - Whether to show a dot for each point
            pointDot : true,

            //Number - Radius of each point dot in pixels
            pointDotRadius : 4,

            //Number - Pixel width of point dot stroke
            pointDotStrokeWidth : 1,

            //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
            pointHitDetectionRadius : 20,

            //Boolean - Whether to show a stroke for datasets
            datasetStroke : true,

            //Number - Pixel width of dataset stroke
            datasetStrokeWidth : 2,

            //Boolean - Whether to fill the dataset with a colour
            datasetFill : true,

            //Boolean - Whether to horizontally center the label and point dot inside the grid
            offsetGridLines : false,
             responsive: true,
             maintainAspectRatio: true,
         };

        var LineChart = require("react-chartjs").Line;


        return (
            <div id='app'>
                <div id='selectors'>
                     <StockSelector className='selector' selectedValue={this.state.stock} selection={this.stockList} onStockChange={this.onStockChange.bind(this)}/>
                    <StockSelector className='selector' selectedValue={this.state.prediction} selection={this.predictionList} onStockChange={this.onPredictionChange.bind(this)}/>
                    <StockSelector className='selector' selectedValue={this.state.days} selection={this.dayList} onStockChange={this.onDayChange.bind(this)}/>
                    <LineChart data={this.state.chartData} options={chartOptions} />
                </div>
            </div>
        )

        // return (
        //     <div id='app'>
        //     <h1></h1>
        //     <StockSelector selection={this.stockList} onStockChange={this.onStockChange.bind(this)}/>
        //     <StockSelector selection={this.predictionList} onStockChange={this.onPredictionChange.bind(this)}/>
        //     <CandleStickChart type='hybrid' data={this.state.data} />
        //     </div>
        // )
    }
}

export default App;