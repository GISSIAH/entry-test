import './App.css';
import React, { Component } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from './components/layout/layout';
import {
  ApolloProvider,
  useQuery,
  gql
} from "@apollo/client";
import Home from './pages/home';
import { client } from './api/apiClient';


export default class App extends Component {
  
  render() {
    return (
      <ApolloProvider client={client}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
            </Route>
          </Routes>
        </BrowserRouter>

      </ApolloProvider>


    )
  }
}
