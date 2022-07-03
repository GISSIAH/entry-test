import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import CartPageItem from "../components/cart/cartPageItem";

class CartPage extends Component {
  render() {
  
    const PageContainer = styled.div`
      padding-left: 170px;
      padding-right: 170px;
      padding-top: 40px;
    `;
    const Header = styled.h1`
      font-weight: 700;
      font-size: 42px;
    `;

    const ItemList = styled.div`
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;

    return (
      <PageContainer>
        <Header>CART</Header>
        <ItemList>
        {this.props.cart.map((cartItem, index) => {
           return <CartPageItem product={cartItem} key={index} />;
          })}
        </ItemList>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(CartPage);
