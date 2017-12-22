import React, { Component } from 'react'
import PropTypes from 'prop-types'
import canUseDom from 'can-use-dom'
import * as d3 from 'd3' 
import styled from 'styled-components'
import { prop } from 'styled-tools'

const l = (str) => str.toLowerCase()
const Svg = styled.svg`
.bar {
  fill: ${prop('color')};
}
`

class Chart extends Component {
  x(el){
    const { xTitle } = this.props
    return el[l(xTitle)]
  }
  
  y(el){
    const { yTitle } = this.props
    return el[l(yTitle)]
  }
  
  iprop(name){
    return parseInt(this.props[name])
  }
  
  __width(){
    const width = this.iprop('width')
    if(!this.__el){ return width; }
    const pwidth = this.__el.parentElement.clientWidth
    if (width > pwidth) {
      return pwidth
    }
    return width
  }

  __height(){
    const width = this.iprop('width')
    const height = this.iprop('height')

    const ratio = width / height

    const w = this.__width()
    if(width > w){
      return height * ratio
    }
    return height
  }

  width(){
    const width = this.__width() 
    const marginRight = this.iprop('marginRight')
    const marginLeft = this.iprop('marginLeft')
    return width - marginLeft - marginRight
  }

  height(){
    const height = this.__height()
    const marginTop = this.iprop('marginTop')
    const marginBottom = this.iprop('marginBottom')
    return height - marginBottom - marginTop
  }
  
  xScale(){
    const scale = d3.scaleBand().rangeRound([0, this.width()]).padding(0.1)
    return scale.domain(this.data.map(el => this.x(el)))
  }
  
  yScale(){
    const scale = d3.scaleLinear().rangeRound([this.height(), 0])
    return scale.domain([0, d3.max(this.data, el => this.y(el))])
  }
  
  drawChart(ref){
    this.__el = ref
    const { yDivide, yUnit, yTitle, marginTop, marginLeft } = this.props
    const $svg = d3.select(ref)
    $svg
      .attr('width', this.__width())
      .attr('height', this.__height())

    const xScale = this.xScale()
    const yScale = this.yScale()
    const h = this.height()
    const _yDivide = parseInt(yDivide)   
    let $g = $svg.append('g')
    $g.attr('transform', `translate(${marginLeft}, ${marginTop})`)
    $g.selectAll('.bar')
      .data(this.data)
      .enter()
        .append('rect')
        .attr('class', 'bar')
        .attr("x", el => xScale(this.x(el)))
        .attr("y", el => yScale(this.y(el)))
        .attr("width", xScale.bandwidth())
        .attr("height", el => (h - yScale(this.y(el))));

    $g.append("g")
      .attr("class", "axis axis--x")
      .attr("transform", `translate(0,${h})`)
      .call(d3.axisBottom(xScale));

    $g.append("g")
        .attr("class", "axis axis--y")
        .call(d3.axisLeft(yScale).ticks(yDivide, yUnit))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 6)
        .attr("dy", "0.71em")
        .attr("text-anchor", "end")
        .text(yTitle);
  }

  render(){
    const {
      width,
      height,
      color,
      xData,
      yData,
      xTitle,
      yTitle,
    } = this.props
    
    const _xData = xData.split(',')
    const _yData = yData.split(',')
    const useFloat = _yData[0].match(/^\d*.\d+/) != null
    const parseY = useFloat != null ? parseFloat : parseInt
    this.data = _xData.map((x,i) => {
      const obj = {}
      obj[l(xTitle)] = x
      obj[l(yTitle)] = parseY(_yData[i])
      return obj
    })
    return (
      <Svg
        color={color}
        width={width}
        height={height}
        innerRef={(ref)=>this.drawChart(ref)}
      />
    )
  }
}

Chart.defaultProps = {
  xTitle: 'X Serie',
  yTitle: 'Y Serie',
  yDivide: '10'
}

export default Chart
