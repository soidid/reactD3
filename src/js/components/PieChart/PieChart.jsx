/** @jsx React.DOM */
var React = require('react/addons');
var d3 = require("d3");
var Chart = require('../Chart/Chart.jsx');

var PieChart = React.createClass({

  propTypes: {
    colorRange: React.PropTypes.array.isRequired
  }, 

  getInitialState() {
    return {
      colorRange: this.props.colorRange,
      arcRadius: Math.min(this.props.width, this.props.height) / 2,
    };
  },
  
  _me: null,

  _color() {
    var rangeData = [];
    var dataLength = this.props.data.length;
    var colorLength = this.state.colorRange.length;
    for(var i = 0; i < colorLength; i++){
      rangeData.push(dataLength * i / colorLength);
    }
    return d3.scale.linear()
    .domain(rangeData)
      .range(this.state.colorRange); 
  },

  //arc 只是 group 的概念，像是 rect, path
  _arc() {
    return d3.svg.arc()
      .outerRadius(this.state.arcRadius - 10)
      .innerRadius(this.state.arcRadius/2);
  },

  //把 data 轉成實際上可以畫的數據
  _pie(data) {
    return d3.layout.pie()
      .sort(null)
      .value(function(d) { return d.quantity; }).call(null,data);
  },

   _pieStart(data) {
    return d3.layout.pie()
      .sort(null)
      .value(function(d) { return 1; }).call(null,data);
  },

  _renderGraph () {
    var _this = this;
    var data = this.props.data;
    
    
  
    // this._me = d3.select(this.getDOMNode()).append('g')
    //              .attr("transform", "translate(" +
    //                this.props.width / 2 + "," + this.props.height / 2 + ")"
    //              ); 
   

    //console.log(this._pie(data));
    var _pie = this._pie(data);
    var _arc = this._arc;

    var g =  d3.select(this.getDOMNode())
               .selectAll("path")
               
               .transition().duration(1000)
               .style("fill", function(d, i) { 
                  return _this._color().call(null, i);
                })
               
               .attr("d", function(v,index){
                  var d = _arc().call(null, _pie[index]);
                  return d;

                });
     
   

    
    console.log(g);

    // var g = this._me.selectAll(".arc")
    //   .data(this._pie(data))
    //   .enter().append("g")
    //   .attr("class", "arc");

    // g.append("path")
    // .attr("d", this._arc())
    // .style("fill", function(d, i) { 
    //     return _this._color().call(null, i);
    //   });
      
      // 
      // 

    // g.append("text")
    //   .attr("transform", function(d) {
    //     return "translate(" + _this._arc().centroid(d) + ")";
    //   })
    //   .attr("dy", ".35em")
    //   .style("text-anchor", "middle")
    //   .text(function(d) { return d.data.text; });
  },

  componentDidMount () {
    this._renderGraph();
  },

  componentDidUpdate () {
    console.log("component update!");
    this._renderGraph();
  },

  // shouldComponentUpdate (nextProps) {
  //   this._renderGraph();
  //   return false;
  // },

  render() {
    var { width,
          height,
          data } = this.props;

    var pieData = this._pie(data);
    var pieStartData = this._pieStart(data);

    var _arc = this._arc;
    var _color = this._color;

    var arcItems = pieData.map((e,key)=>{
        var d1 = _arc().call(null,e);
        var d = _arc().call(null, pieStartData[key]);
        console.log(pieStartData[key]);
        console.log(e);

        var c = _color().call(null, key);
        var centroid = _arc().centroid.call(null,e);
        
        
        var style = {
          "text-anchor" : "middle"
        };
        //<path fill={c} data={d}/>
        return (
          <g className="arc"
             data={e.data}>
              <path fill={c} d={d}/>
              <text transform={"translate("+centroid[0]+","+centroid[1]+")"}
                    dy={".35em"}
                    style={style}>1234</text>
          </g>
        )
        
    });
    return (
      <svg width={width} height={height}>
          <g transform={"translate(" + width/2 + "," + height/2 + ")"}>
             {arcItems}
          </g>
      </svg>
    );
  }
});


module.exports = PieChart;


