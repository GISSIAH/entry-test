import React, { Component } from "react";
import styled from "styled-components";
import ProductList from "../components/product/productList";
import { client } from "../api/apiClient";
import { gql } from "@apollo/client";
import { setProducts } from "../redux/reducer/shopping/shopping-actions";
import { connect } from "react-redux";
class Home extends Component {
  state = {
    category: "all",
    categories: [],
    categoryMenu: false,
  };
  getAllProducts = async () => {
    const res = await client.query({
      query: gql`
        query GetClothes {
          category(input: { title: "all" }) {
            products {
              id
              name
              brand
              gallery
              prices {
                amount
                currency {
                  symbol
                }
              }
              attributes {
                name
                type
                items {
                  value
                }
              }
            }
          }
        }
      `,
    });

    return res;
  };

  componentDidMount = async () => {
    this.getAllProducts().then((res) => {
      this.props.setProducts(res.data.category.products);
    });
    const response = await client.query({
      query: gql`
        query GetCategories {
          categories {
            name
          }
        }
      `,
    });

    this.setState({
      categories: response.data.categories,
    });
  };
  handleDropDown = () => {
    this.setState({ categoryMenu: !this.state.categoryMenu });
  };
  render() {
    console.log(this.props.cartOpen);
    const PageContainer = styled.div`
      background: white;
      z-index: 0px;
    `;
    const Overlay = styled.div`
      position: fixed; /* Sit on top of the page content */
      display: none; /* Hidden by default */
      width: 1000px; /* Full width (cover the whole page) */
      height: 700px; /* Full height (cover the whole page) */
      background: red ;//rgba(57, 55, 72, 0.22);
      //background-color: rgba(0, 0, 0, 0.5); /* Black background with opacity */
      z-index: 100;
    `;
    const CategoryMenu = styled.div`
      display: flex;
      flex-direction: column;
    `;
    const CategoryTitleWrapper = styled.div`
      display: flex;
      gap: 20px;
      align-items: center;
    `;
    const CategoryList = styled.div`
      display: flex;
      gap: 10px;
      padding-left: 170px;
    `;
    const CategoryTitle = styled.h2`
      padding-left: 170px;
      font-weight: 400;
      font-size: 42px;
    `;

    const CategoryListItemWrapper = styled.div`
      border-style: solid;
      border-color: #9e9e9e;
      width: 135px;
      border-radius: 9999px;
      text-align: center;
      border-width: thin;
      cursor: pointer;
      &:hover {
        background: #cdf3ff;
      }
    `;
    const CategoryListItem = styled.p`
      font-size: 18px;
      font-weight: 600;
    `;
    return (
      <PageContainer 
      //cartOpen={this.props.cartOpen}
      >
        {this.props.cartOpen ? <Overlay></Overlay> : null }
        
        <CategoryMenu>
          <CategoryTitleWrapper>
            <CategoryTitle>{"Category : " + this.state.category}</CategoryTitle>
          </CategoryTitleWrapper>
          <CategoryList>
            {this.state.categories.map((item) => {
              return (
                <CategoryListItemWrapper
                  onClick={() => {
                    this.setState({ category: item.name });
                  }}
                >
                  <CategoryListItem>{item.name}</CategoryListItem>
                </CategoryListItemWrapper>
              );
            })}
          </CategoryList>
        </CategoryMenu>

        <ProductList
          currency={this.props.currency}
          category={this.state.category}
        />
      </PageContainer>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    setProducts: (data) => dispatch(setProducts(data)),
  };
};

export default connect(null, mapDispatchToProps)(Home);
