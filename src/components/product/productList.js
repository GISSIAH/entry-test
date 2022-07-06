import React, { Component } from "react";
import styled from "styled-components";
import Product from "./product";
import { getProducts } from "../../api/requests";
export default class ProductList extends Component {
  state = {
    products: [],
    category: this.props.category,
  };
  componentDidMount = async () => {
    this.getProducts(this.props.category);
  };
  getProducts = async (category) => {
    const response = await getProducts(category)
    this.setState({
      products: response.data.category.products,
    });
  };
  componentWillUpdate(nextProps, nextState) {
    if (this.state.category !== nextProps.category) {
      this.getProducts(nextProps.category);
      this.setState({ category: nextProps.category });
    }
  }

  render() {
    const ProductList = styled.div`
      display: grid;
      grid-gap: 2rem;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      padding-left: 15vw;
      padding-right: 15vw;
      margin-top: 60px;
    `;
    return (
      <ProductList>
        {this.state.products.map((prod) => {
          return <Product product={prod} currency={this.props.currency} />;
        })}
      </ProductList>
    );
  }
}
