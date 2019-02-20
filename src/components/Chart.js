import React, {Component} from 'react';
import '../App.css';
import * as d3 from "d3";

class Chart extends Component {

    constructor(props) {
        super(props)

        this.state = {
            height: 300, 
            width: 700,
            data: [12, 55, 6, 6, 9, 10, 15, 30],
            largestNumber: null
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

          return d3Scale(length)
      }

      drawChart() {
        const data = [12, 55, 6, 6, 9, 10, 15, 30];

        const largestNumber = Math.max(...data)

        console.log(this.state.largestNumber)

        const h = this.state.height
        const w = this.state.width
        
        const svg = d3.select("#chart")
        .append("svg")
        .attr("width", this.state.width)
        .attr("height", this.state.height)
        //.style("margin-left", 100);
                      
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