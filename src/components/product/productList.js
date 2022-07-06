import { gql } from "@apollo/client";
import React, { Component } from "react";
import styled from "styled-components";
import { client } from "../../api/apiClient";
import Product from "./product";
export default class ProductList extends Component {
  state = {
    clothes: [],
    category: this.props.category,
  };
  componentDidMount = async () => {
    this.getProducts(this.props.category);
  };
  getProducts = async (category) => {
    const response = await client.query({
      query: gql`query GetClothes{
                category(input: { title: "${category}" }) {
                    name
                    products {
                    id
                    name
                    brand
                    gallery
                    prices {
                        amount
                        currency{
                        symbol
                        }
                    }
                    attributes{
                        name,
                        items{
                          value
                        }
                      }
                    }
                }
                }
            `,
    });

    this.setState({
      clothes: response.data.category.products,
    });
  };
  componentWillUpdate(nextProps, nextState) {
    console.log(nextProps);
    console.log(nextState);
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
        {this.state.clothes.map((cloth) => {
          return <Product product={cloth} currency={this.props.currency} />;
        })}
      </ProductList>
    );
  }
}
