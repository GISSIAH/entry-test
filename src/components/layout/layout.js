import React, { Component } from 'react'
import { Outlet } from 'react-router-dom'
import Navbar from '../nav/navbar'

export default class Layout extends Component {
  render() {
    return (
      <div>
        <Navbar/>
        <Outlet/>
      </div>
    )
  }
}
