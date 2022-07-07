import React, { Component } from "react";
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
import logo from "../../logo/svg 3.svg"
import {NavWrapper,NavLeftGroup,NavItem,NavRightGroup,CurrencySwitcher,CurrencyListContainer,CurrencyListItemContainer,CurrencyListItem,Cart,CartIconContainer,CartHeader,CheckButton, CartItemCount,CartMenuContainer,TotalContainer,ActionButtonsContainer,ViewButton} from "./navbarStyles"
import { calculateQty, calculateTotal } from "../../redux/helpers/helper";
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
  constructor(props){
    super(props)
    this.wrapperRef = React.createRef();
    this.handleClickOutside = this.handleClickOutside.bind(this);
  }
  componentDidMount = () => {
    this.props.parentCallback({
      symbol: "$",
      name: "USD",
    });
    this.props.cartCallback(false);
    document.addEventListener("mousedown", this.handleClickOutside);
    
  };
  componentWillUnmount() {
    document.removeEventListener("mousedown", this.handleClickOutside);
  }
  selectCurrency = (name) => {
    this.props.parentCallback(name);
  };
  handleClickOutside(event) {
    if (this.wrapperRef && !this.wrapperRef.current.contains(event.target)) {
      this.setState({ currencyMenu: !this.state.currencyMenu, });
    }
  }
  handleDropDown = () => {
    this.setState({ currencyMenu: !this.state.currencyMenu });
  };
  render() {
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
                {navItem.title}
              </NavItem>
            );
          })}
        </NavLeftGroup>
        <div>
          <img src={logo} height="50px" width="50px" alt="logo"/>
        </div>
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
              <CurrencyListContainer ref={this.wrapperRef}>
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
              <CartItemCount>{this.props.getQtyTotal(this.props.cart)}</CartItemCount>
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
                {this.props.cart.slice(0,2).map((item, i) => {
                  return <MiniCartItem key={i} item={item} currency ={this.state.symbol} />;
                })}
                <TotalContainer><p style={{ fontWeight: 500 }}>Total:</p><p style={{ fontWeight: 700 }}>{this.state.symbol+""+this.props.getTotal(this.props.cart,this.state.symbol)}</p> </TotalContainer>
                <ActionButtonsContainer>
                  <ViewButton title="View Cart"
                    onClick={() => {
                      this.props.cartCallback(!this.state.cartMenu);
                      this.setState({ cartMenu: !this.state.cartMenu });
                    }}
                  >
                    <Link to="/cart" style={{textDecoration:"none",color:'black'}}>View Bag</Link>
                  </ViewButton>
                  <CheckButton title="Checkout"
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
    getTotal:calculateTotal,
    getQtyTotal:calculateQty
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
