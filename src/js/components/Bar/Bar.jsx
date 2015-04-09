/** @jsx React.DOM */

var React = require('react/addons');
var d3 = require("d3");
$ = require('jquery');

var Bar = React.createClass({
  getDefaultProps: function() {
    return {
      width: 400,
      height: 300,
      offset: 0
    }
  },

  getInitialState: function(){
    return {
      hover: false
    }
  },

  componentDidMount: function() {
    this._renderGraph();  
  },
  componentDidUpdate: function() {
    this._renderGraph();  
  },

  _renderGraph: function () {
    //Animation
    var height = this.props.height;
    d3.select(this.getDOMNode())
      .select("rect")
      .transition().duration(1000)
      .attr('y', this.props.availableHeight - height)
      .attr('height', height);

      // TODO: label animation
      // console.log(this.getDOMNode());
      // d3.select(this.getDOMNode())
      //   .append('text')
      //   .attr('x', this.props.offset)
      //   .attr('y', this.props.availableHeight - this.props.height)
      //   .attr('dy', "0.35em")
      //   .text("hello");c  
  },

  _onMouseEnter(){
      this.setState({
        hover:true
      });

  },
  _onMouseLeave(){
      this.setState({
        hover:false
      });

  },
  render: function() {
  
    var label = this.props.value 
    
    //FONT X OFFSET
    var xOffset = (this.props.value >= 10) ? 
    ($(window).width() > 400)? 
    (this.props.offset + this.props.width/2 - 19) : (this.props.offset + this.props.width/2 - 14) : 
    ($(window).width() > 400)?
    (this.props.offset + this.props.width/2 - 16) : (this.props.offset + this.props.width/2 - 10);
    
    xOffset = (($(window).width() > 400) ? xOffset+7 : xOffset+5);

    var fontSize = $(window).width() > 400 ? "20px" : "14px";
    var strokeWidth = $(window).width() > 400 ? "1.2" : "0.8";
    



    // Fill Color
    var color = (this.state.hover) ? "rgb(135,184,37)" : this.props.color;
    return (
      <g>
          <rect fill={color}
                width={this.props.width} 
                height="0"
                x={this.props.offset} 
                y={this.props.availableHeight - 0} 
                onMouseEnter={this._onMouseEnter}
                onMouseLeave={this._onMouseLeave}/>
          
          <text x={xOffset} 
                y={this.props.availableHeight - 10}
                fontSize={fontSize}
                fill="black"
                stroke="black"
                strokeWidth={strokeWidth} >{label}</text>
      </g>
    );
    // return (
    //   <rect fill={this.props.color}
    //     width={this.props.width} height={this.props.height}
    //     x={this.props.offset} y={this.props.availableHeight - this.props.height} />
    // );
  }
});

module.exports = Bar;


