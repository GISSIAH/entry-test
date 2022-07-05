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

    const CheckoutItemContainer = styled.div`
      display:flex;
      gap:10px;
    `
    const OrderButton = styled.button`
    margin-top:20px ;
      cursor: pointer;
      background: #5ece7b;
      height: 30px;
      border: none;
      color: white;
      width: 120px;
      font-size: 16px;
      font-weight: 600;
      &:hover {
        background: #78df93;
      }
    `;
    const total = this.props.getTotal(this.props.cart, this.props.currency.symbol)
    return (
      <PageContainer>
        <Header>CART</Header>
        <ItemList>
        {this.props.cart.map((cartItem, index) => {
           return <CartPageItem product={cartItem} key={index} currency={this.props.currency} />;
          })}
        </ItemList>
        <CheckoutItemContainer>
          <p style={{fontWeight:400}}>Tax 21%</p>
          <p style={{ fontWeight: 700 }}>{this.props.currency.symbol + ""+((21*total)/100)}</p>
        </CheckoutItemContainer>
        <CheckoutItemContainer>
          <p style={{ fontWeight: 400 }}>Quantity:</p>
          <p style={{ fontWeight: 700 }}>{this.props.getQtyTotal(this.props.cart)}</p>
        </CheckoutItemContainer>
        <CheckoutItemContainer>
          <p style={{fontWeight:400}}>Total:</p>
          <p style={{fontWeight:700}}>{this.props.currency.symbol + "" + total}</p>
        </CheckoutItemContainer>
        <OrderButton>
          Order
        </OrderButton>
      </PageContainer>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
    getTotal: calculateTotal,
    getQtyTotal: calculateQty
  };
};

function calculateTotal(items, currency) {
  var total = 0
  items.forEach(element => {
    const selectedCurrencyPrice = element.prices.filter(
      (price) => price.currency.symbol === currency
    );
    const itemWithQty = selectedCurrencyPrice[0].amount * element.qty
    total += itemWithQty

  });
  return total
}

function calculateQty(item){
  var qty = 0
  item.forEach(element=>{
    qty += element.qty
  })
  return qty
}


export default connect(mapStateToProps)(CartPage);
