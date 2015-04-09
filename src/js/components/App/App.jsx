/** @jsx React.DOM */

var React = require('react/addons');
var BarChart = require('../BarChart/BarChart.jsx');
var PieChart = require('../PieChart/PieChart.jsx');
// var AppStore = require('../../stores/AppStore');
// var AppActions = require('../../actions/AppActions');
require('./App.css');

var App = React.createClass({

  getInitialState(){
    return {
      data: [],
      pieData: []
    }
  },
  
  componentWillMount () {
    this._onRandomData();
  },
 
  _onRandomData(){
    var newArray = [];
    var newArrayPie = [];


    for(var i=0;i<5;i++){
      // 產生 0-9 的隨機數字
      var value = Math.floor(Math.random() * 10);
      var label = "item"+i;
      newArray.push({
          label : label,
          value : value
      });

      newArrayPie.push({
          text: label,
          quantity : value
      }); 
    }

    this.setState({
       data: newArray,
       pieData: newArrayPie
    });
    
  },

  render () {
    var { data, pieData } = this.state;
    var colorRange = ["#0b64a0", "#5098d8", "#80b2e0", "#afcfef", "#d4e6f9",  "#fcedd6", "#f7e3bf", "#fcce65", "#fec92d", "#f4b425"];

    var tooltip = {
        "hidden" : true,
        "top" : "10px",
        "left" : "100px",
        "html" : "hello"
        };
    console.log(pieData[0]);
    return (
      <div className="App">

        <BarChart width={400}
                  height={300}
                  data={data}
                  tooltip={tooltip} />
        <div><button onClick={this._onRandomData}>Change!</button></div>
        <br/>

        <PieChart colorRange={colorRange} data={pieData} width={300} height={300} />
      </div>
    );
  }
});

module.exports = App;


