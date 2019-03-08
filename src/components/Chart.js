import React, {Component} from 'react';
import '../App.css';
import * as d3 from "d3";

class Chart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            height: 300, 
            width: 700,
            data: [8, 12, 6, 7.5, 9, 15, 17, 22,4,10, 12],
            goal: 15,
            largestNumber: null,
            heightTreshold: 20,
        }
    }

    componentDidMount() {
        this.drawChart();

        this.setState({
            largestNumber: Math.max(...this.state.data)
        })

        console.log(this.state)
      }

      scaleHeight(length) {
          const largestNumber = Math.max(...this.state.data)

          const d3Scale = d3.scaleLinear()
                .domain([0, largestNumber])
                .range([0, this.state.height])
        
          console.log(d3Scale(length))

          return d3Scale(length) - this.state.heightTreshold
      }

      drawChart() {
        const data = this.state.data

        const largestNumber = Math.max(...data)

        console.log(this.state.largestNumber)

        const goalLineData = [ { "x": 0,   "y": this.state.height - this.scaleHeight(this.state.goal)}, 
                               { "x": this.state.width, "y": this.state.height - this.scaleHeight(this.state.goal)}];

        const lineFunction = d3.line()
                             .x(function(d) { return d.x; })
                             .y(function(d) { return d.y; })
                             .curve(d3.curveLinear);  

        const h = this.state.height
        const w = this.state.width
        
        const svg = d3.select("#chart")
        .append("svg")
        .attr("width", this.state.width)
        .attr("height", this.state.height)

        // Line Chart              
        svg.selectAll("rect")
          .data(data)
          .enter()
          .append("rect")
          .attr("x", (d, i) => i * (w / data.length))
          .attr('y', (d, i) => (this.state.height - this.scaleHeight(d)))
          //.attr("y", (d, i) => h - (h / d * 10))
          .attr("width", w / data.length)
          //.attr("height", (d, i) => h / d * 10)
          .attr("height", (d, i) => this.scaleHeight(d))
          //.attr("height", this.scale(d))
          .attr("fill", "green")
          .style("stroke", 'white')
          .style("stroke-width", 1);

        // Line Chart Text
        svg.selectAll('text')
            .data(data)
            .enter()
            .append('text')
            .text((d) => d)
            .attr("x", (d, i) => i * (w / data.length) + 5)
            .attr('y', (d, i) => (this.state.height - (this.scaleHeight(d))))
            .style('stroke', 'white')

        // Goal Line Target 
        svg.insert("path", "rect")
            .attr("d", lineFunction(goalLineData))
            .attr("stroke", "grey")
            .attr("stroke-width", 1)
            .attr("fill", "none");
      }

    render() {
        return(
            <div className="App">
                <div id="chart"></div>
            </div>
        )
    }


}

export default Chart;