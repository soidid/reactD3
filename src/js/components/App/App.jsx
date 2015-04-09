/** @jsx React.DOM */

var React = require('react/addons');
var BarChart = require('../BarChart/BarChart.jsx');

// var AppStore = require('../../stores/AppStore');
// var AppActions = require('../../actions/AppActions');
require('./App.css');

var App = React.createClass({

  getInitialState(){
    return {
      data: []
    }
  },
  
  componentWillMount () {
    this._onRandomData();
  },
 
  _onRandomData(){
    var newArray = [];
    for(var i=0;i<5;i++){
       // 產生 0-9 的隨機數字
       var value = Math.floor(Math.random() * 10);
       var label = "item"+i;
       newArray.push({
           label : label,
           value : value
       });
    } 
    this.setState({
       data: newArray
    });
    
  },

  render () {
    var data = this.state.data;
    var tooltip = {
        "hidden" : false,
        "top" : "10px",
        "left" : "100px",
        "html" : "hello"
        };

    return (
      <div className="App">

        <BarChart width={400}
                  height={300}
                  data={data}
                  tooltip={tooltip} />
        <div><button onClick={this._onRandomData}>Change!</button></div>
      </div>
    );
  }
});

module.exports = App;


