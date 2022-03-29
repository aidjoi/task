import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import './index.css'

export default class Home extends Component {
  render() {
    return (
      <Link className='router-start' to="/study"><p>Start App</p></Link>
    )
  }
}
