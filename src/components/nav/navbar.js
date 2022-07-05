import React, { Component } from "react";
//import "../../styles/navbar.css"
import styled from "styled-components";
import { FiShoppingCart } from "react-icons/fi";
import {
  BsCurrencyDollar,
  BsCurrencyYen,
  BsCurrencyEuro,
} from "react-icons/bs";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { RiArrowDropUpLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import MiniCartItem from "../mini-cart/miniCartItem";

class Navbar extends Component {
  state = {
    currencyMenu: false,
    cartMenu: false,
    symbol: "$",
  };
  currencies = [
    {
      symbol: "$",
      name: "USD",
    },
    {
      symbol: "£",
      name: "EUR",
    },
    {
      symbol: "¥",
      name: "JPY",
    },
  ];
  componentDidMount = () => {
    this.props.parentCallback({
      symbol: "$",
      name: "USD",
    });
    this.props.cartCallback(false);
  };
  selectCurrency = (name) => {
    this.props.parentCallback(name);
  };
  handleDropDown = () => {
    this.setState({ currencyMenu: !this.state.currencyMenu });
  };

  render() {
    const NavWrapper = styled.nav`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 170px;
      padding-right: 170px;
    `;
    const NavItem = styled.p`
      font-weight: 600;
      font-size: 16px;
      line-height: 19.2px;
      text-align: center;
    `;
    const NavLeftGroup = styled.div`
      display: flex;
      gap: 32px;
    `;
    const NavRightGroup = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 22px;
    `;
    const CurrencySwitcher = styled.div`
      display: flex;
      flex-direction: column;
    `;

    const CurrencyListContainer = styled.ul`
      position: absolute;
      margin-top: 40px;
      padding: 0px;
      display: flex;
      flex-direction: column;
      z-index: 9999px;
      box-shadow: 0 8px 8px -4px lightblue;
    `;
    const CurrencyListItemContainer = styled.div`
      display: flex;
      gap: 5px;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #eeeeee;
      }
    `;
    const CurrencyListItem = styled.p`
      font-size: 18px;
      font-weight: 500;
    `;
    const Cart = styled.div`
      display: flex;
      flex-direction: column;
    `;
    const CartItemCount = styled.div`
      z-index: 9999px;
      position: absolute;
      color: white;
      border-radius: 50%;
      background: black;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      text-align: center;
      top: 0;
      right: 0;
      display: flex;
    `;
    const CartIconContainer = styled.div`
      position: relative;
      cursor: pointer;
      width: 40px;
    `;
    const CartMenuContainer = styled.div`
      display: flex;
      flex-direction: column;
      background: white;
      right: 100px;
      background:white ;
      z-index: 9999px;
      position: absolute;
      margin-top: 40px;
      width: 400px;
      height: 500px;
      display: block;
      padding-left: 10px;
      padding-right: 10px;
      box-shadow: 0 8px 8px -4px lightblue;
    `;

    const CartHeader = styled.div`
      display: flex;
      gap: 15px;
    `;
    const TotalContainer = styled.div`
      display: flex;
      justify-content: space-between;
    `;

    const ActionButtonsContainer = styled.div`
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
    `;

    const ViewButton = styled.button`
      background: white;
      color: black;
      border: 1px solid black;
      width: 40%;
      font-size: 16px;
      height: 30px;
      cursor: pointer;
      &:hover {
        background: lightslategray;
      }
    `;
    const CheckButton = styled.button`
      cursor: pointer;
      background: #5ece7b;
      height: 30px;
      border: none;
      color: white;
      width: 40%;
      font-size: 16px;
      font-weight: 600;
      &:hover {
        background: #78df93;
      }
    `;

    const navItemList = [
      { title: "WOMEN" },
      { title: "MEN" },
      { title: "KIDS" },
    ];
    return (
      <NavWrapper>
        <NavLeftGroup>
          {navItemList.map((navItem, navItemKey) => {
            return (
              <NavItem key={navItemKey}>
                <Link to="/cart">{navItem.title}</Link>
              </NavItem>
            );
          })}
        </NavLeftGroup>
        <div>logo</div>
        <NavRightGroup>
          <CurrencySwitcher>
            <div style={{ display: "flex", gap: 2 }}>
              <CurrencySymbol symbol={this.state.symbol} />
              {this.state.currencyMenu ? (
                <RiArrowDropUpLine size={26} onClick={this.handleDropDown} />
              ) : (
                <MdOutlineArrowDropDown
                  size={26}
                  onClick={this.handleDropDown}
                />
              )}
            </div>
            {this.state.currencyMenu ? (
              <CurrencyListContainer>
                {this.currencies.map((item, navMenuKey) => {
                  return (
                    <CurrencyListItemContainer
                      key={navMenuKey}
                      on
                      onClick={() => {
                        this.selectCurrency(item);
                        this.setState({
                          symbol: item.symbol,
                          currencyMenu: !this.state.currencyMenu,
                        });
                      }}
                    >
                      <CurrencyListItem>{item.symbol}</CurrencyListItem>
                      <CurrencyListItem>{item.name}</CurrencyListItem>
                    </CurrencyListItemContainer>
                  );
                })}
              </CurrencyListContainer>
            ) : (
              <div></div>
            )}
          </CurrencySwitcher>
          <Cart>
            <CartIconContainer
              onClick={() => {
                this.props.cartCallback(!this.state.cartMenu);
                this.setState({ cartMenu: !this.state.cartMenu });
              }}
            >
              <CartItemCount>{this.props.cart.length}</CartItemCount>
              <FiShoppingCart size={28} />
            </CartIconContainer>

            {this.state.cartMenu ? (
              <CartMenuContainer>
                <CartHeader>
                  <p style={{ fontWeight: 600, fontSize: "18px" }}>My Bag,</p>
                  <p style={{ fontSize: "18px" }}>
                    {this.props.cart.length + " items"}
                  </p>
                </CartHeader>

                {this.props.cart.map((item, i) => {
                  return <MiniCartItem key={i} item={item} currency ={this.state.symbol} />;
                })}
                <ActionButtonsContainer>
                  <ViewButton
                    onClick={() => {
                      this.props.cartCallback(!this.state.cartMenu);
                      this.setState({ cartMenu: !this.state.cartMenu });
                    }}
                  >
                    <Link to="/cart">View Bag</Link>
                  </ViewButton>
                  <CheckButton
                    onClick={() => {
                      this.props.cartCallback(!this.state.cartMenu);
                      this.setState({ cartMenu: !this.state.cartMenu });
                    }}
                  >
                    Checkout
                  </CheckButton>
                </ActionButtonsContainer>
              </CartMenuContainer>
            ) : null}
          </Cart>
        </NavRightGroup>
      </NavWrapper>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    cart: state.shop.cart,
  };
};

export default connect(mapStateToProps)(Navbar);

export class CurrencySymbol extends Component {
  render() {
    if (this.props.symbol === "$") {
      return <BsCurrencyDollar size={26} />;
    } else if (this.props.symbol === "¥") {
      return <BsCurrencyYen size={26} />;
    } else if (this.props.symbol === "£") {
      return <BsCurrencyEuro size={26} />;
    }
  }
}
