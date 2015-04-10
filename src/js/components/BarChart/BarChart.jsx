/** @jsx React.DOM */
var React = require('react/addons');
var d3 = require("d3");
var Chart = require('../Chart/Chart.jsx');
var Bar = require('../Bar/Bar.jsx');
var Axis = require('../Axis/Axis.jsx');
var Tooltip = require('../Tooltip/Tooltip.jsx');

var DataSeries = React.createClass({
  
  render: function() {
    
    var { data,
          width,
          height,
          xScale,
          yScale } = this.props;

    var yScale = d3.scale.linear()
                   .domain([0, d3.max(data)])
                   .range([0, height]);

    var xScale = d3.scale.ordinal()
                   .domain(d3.range(data.length))
                   .rangeRoundBands([0, width], 0.05);

    /*
      range(5)
        =>[0, 1, 2, 3, 4]

      rangeRoundBands(range interval [, padding] )
        => 類似 rangeBands，但是算出來的會是整數

      xScale.rangeBand()
        => 算出長條圖的寬度

      xScale.range()
        => 給出各個 initial x 的值，結束的值可以
    
    */
   
    var color = "#F2DB5D";
    var props = this.props;

    var bars = data.map(function(point, i) {
          
          var boundHandler = props.tooltipHandler.bind(null, point);
          return (
             <Bar value={point}
                  height={yScale(point)} 
                  width={xScale.rangeBand()} 
                  offset={xScale(i)} 
                  availableHeight={height} 
                  color={color} 
                  key={i}
                  tooltipHandler={boundHandler}
                  tooltipOff={props.tooltipOff} />
          )
        });
       

    return (
      <g transform={"translate(30,30)"}>{bars}</g>
    );
  }
});

var BarChart = React.createClass({

  getInitialState(){
    return {
      tooltip : {}
    }
  },

  componentWillMount(){
    this.setState({
      tooltip: this.props.tooltip
    })
  },

  _onChangeTooltip(i, event){
    
    var tooltip = this.state.tooltip;
    tooltip.html = i;
    tooltip.top = event.clientY;
    tooltip.left = event.screenX;
    tooltip.hidden = false;
    //console.log(tooltip.top + "," + tooltip.left);

    this.setState({
      tooltip: tooltip
    })

  },

  _onLeaveTooltip(i, event){
    
    var tooltip = this.state.tooltip;
    tooltip.hidden = true;
    this.setState({
      tooltip: tooltip
    })

  },
  
  render() {
    var { data, width, height} = this.props;
    var { tooltip } = this.state;

   

    //
    var values = data.map((item,key)=>{
        return item.value;
    });

    var labels = data.map((item,key)=>{
        return item.label;
    });

    /*
      margin 是用來放 label 的位置
    */
    var margin = 30;
    var yScale = d3.scale.linear()
                   .domain([0, d3.max(values)])
                   .range([height-margin*2, 0]);
   
    var xScale = d3.scale.ordinal()
                   //.domain(d3.range(data.length)) // 沒有 label 的話
                   .domain(labels)
                   .rangeRoundBands([0, width-margin], 0.05);
    

    
    return (
      <Chart width={width} 
             height={height}>
          
          <DataSeries 
             data={values} 
             width={width-margin}
             height={height-margin*2}
             tooltipHandler={this._onChangeTooltip}
             tooltipOff={this._onLeaveTooltip} />
          
          <Axis scale={xScale}
                width={width}
                height={height-margin}
                type="x-axis"
                margin={margin} />

          <Axis scale={yScale}
                width={width}
                height={height-margin*2}
                type="y-axis"
                margin={margin} />

          <Tooltip
               hidden={tooltip.hidden}
               top={tooltip.top}
               left={tooltip.left}
               html={tooltip.html}/>

          
      </Chart>
      
    );
  }
});


module.exports = BarChart;


