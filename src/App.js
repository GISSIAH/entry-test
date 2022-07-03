import "./App.css";
import React, { Component } from "react";
import { BrowserRouter, Routes, Route, Outlet } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import Home from "./pages/home";
import { client } from "./api/apiClient";
import Navbar from "./components/nav/navbar";
import ProductPage from "./pages/productPage";

import { Provider } from "react-redux";
import CartPage from "./pages/cart";

import store from './redux/store/store';

export default class App extends Component {
  state = {
    currency: {
      symbol: "$",
      currency: "USD",
    },
  };
  //store = configureStore(Reducer)
  render() {
    //console.log(this.state.currency);

    return (
      <Provider store={store}>
        <ApolloProvider client={client}>
          <BrowserRouter>
            <Routes>
              <Route
                path="/"
                element={
                  <div>
                    <Navbar parentCallback={this.handleCallback} />
                    <Outlet />
                  </div>
                }
              >
                <Route
                  index
                  element={<Home name="SKI" currency={this.state.currency} />}
                />
                <Route
                  exact
                  path="/product/:id"
                  element={<ProductPage currency={this.state.currency} />}
                />
                <Route exact path="/cart" element={<CartPage />} />
              </Route>
            </Routes>
          </BrowserRouter>
        </ApolloProvider>
      </Provider>
    );
  }
  handleCallback = (childData) => {
    this.setState({ currency: childData });
  };
}
