import React from 'react'
import Link from 'next/link'
import Head from 'next/head'
import Nav from '../components/Navbar'
import Map from './map'
import { Provider } from 'react-redux';
import { initStore } from "../store"
const MapView = () => (

   // <Provider store={initStore}>
      <Map />
   // </Provider>
)

export default MapView
