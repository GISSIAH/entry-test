import React, { Component } from "react";
import styled from "styled-components";
import { BsChevronLeft, BsChevronRight } from "react-icons/bs";
import {
  changeQuantity,
  removeFromCart,
} from "../../redux/reducer/shopping/shopping-actions";
import { connect } from "react-redux";
class CartPageItem extends Component {
  state = {
    counter: 1,
    currentImage: 0,
  };
  render() {
    const Divider = styled.hr`
      width: 100%;
      border-top: 1px solid lightslategray;
    `;
    const CartPageItemContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    const ItemContent = styled.div`
      display: flex;
      justify-content: space-between;
    `;
    const RightWrapper = styled.div`
      display: flex;
      gap: 20px;
      z-index: 0;
      height: 180px;
    `;
    const ImageContainer = styled.div`
      z-index: 0;
      display: flex;
      height: 180px;
      width: 140px;
      position: relative;
    `;
    const ImageArrowContainer = styled.div`
      z-index: 9999px;
      position: absolute;
      bottom: 0;
      right: 0;
      display: flex;
      gap: 10px;
    `;

    const ImageArrow = styled.button`
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      background: rgba(0, 0, 0, 0.73);
      width: 30px;
      height: 30px;

      ${({ active }) =>
        active &&
        `
            background: rgba(0, 0, 0, 0.25);
        `}
    `;
    const QuantityControlContainer = styled.div`
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
    `;
    const QuantityControl = styled.div`
      border: 1px solid black;
      width: 50px;
      text-align: center;
      font-size: 40px;
      cursor: pointer;
      height: 50px;
      &:hover {
        border: 1px solid lightslategray;
        background: lightslategray;
      }
    `;
    const Quantity = styled.p`
      margin: 0px;
      font-size: 20px;
      font-weight: 600;
      text-align: center;
    `;

    const ItemImage = styled.img`
      aspect-ratio: 1/1;
    `;

    const TextContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 5px;
    `;
    const ProductBrand = styled.p`
      margin: 0px;
      font-size: 30px;
      font-weight: 600;
    `;
    const ProductName = styled.p`
      margin: 0px;
      font-size: 30px;
      font-weight: 400;
    `;
    const PriceAmount = styled.p`
      font-size: 24px;
      font-weight: 700;
      margin: 0px;
    `;
    const Attributes = styled.div`
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;

    const AtributeContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
    const AttributeTitle = styled.p`
      font-weight: 700;
      font-size: 18px;
      font-family: "Roboto Condensed", sans-serif;
      margin: 0px;
    `;
    const AttributeValueList = styled.div`
      display: flex;
      gap: 10px;
    `;
    //non swatch
    const AttributeValueContainer = styled.div`
      width: fit-content;
      height: fit-content;
      padding-left: 2px;
      padding-right: 2px;

      border: 2px solid;
    `;
    const SwatchAttributeItem = styled.div`
      width: 36px;
      height: 36px;
      background: ${(props) => props.color};
    `;
    const selectedCurrencyPrice = this.props.product.prices.filter(
      (price) => price.currency.symbol === this.props.currency.symbol
    );
    return (
      <CartPageItemContainer>
        <Divider />
        <ItemContent>
          <TextContainer>
            <ProductBrand>{this.props.product.brand}</ProductBrand>
            <ProductName>{this.props.product.name}</ProductName>
            <PriceAmount>{selectedCurrencyPrice[0].currency.symbol +
              " " +
              selectedCurrencyPrice[0].amount}</PriceAmount>
            <Attributes>
              {this.props.product.attributes.map((attribute) => {
                if (attribute.type === "swatch") {
                  return (
                    <AtributeContainer>
                      <AttributeTitle>
                        {attribute.name.toUpperCase()}
                      </AttributeTitle>
                      <AttributeValueList>
                        {attribute.items.map((attrset) => {
                          return (
                            <SwatchAttributeItem
                              color={attrset.value}
                            ></SwatchAttributeItem>
                          );
                        })}
                      </AttributeValueList>
                    </AtributeContainer>
                  );
                } else {
                  return (
                    <AtributeContainer>
                      <AttributeTitle>
                        {attribute.name.toUpperCase()}
                      </AttributeTitle>
                      <AttributeValueList>
                        {attribute.items.map((attrset) => {
                          return (
                            <AttributeValueContainer>
                              {attrset.value}
                            </AttributeValueContainer>
                          );
                        })}
                      </AttributeValueList>
                    </AtributeContainer>
                  );
                }
              })}
            </Attributes>
          </TextContainer>
          <RightWrapper>
            <QuantityControlContainer>
              <QuantityControl
                onClick={() => {
                  //this.setState({ counter: this.state.counter + 1 });
                  this.props.changeQuantity(
                    this.props.product.id,
                    this.props.product.qty + 1
                  );
                }}
              >
                +
              </QuantityControl>
              <Quantity>{this.props.product.qty}</Quantity>
              <QuantityControl
                onClick={() => {
                  if (this.props.product.qty - 1 <= 0) {
                    this.props.removeFromCart(this.props.product.id);
                  } else {
                    this.props.changeQuantity(
                      this.props.product.id,
                      this.props.product.qty - 1
                    );
                  }
                }}
              >
                -
              </QuantityControl>
            </QuantityControlContainer>
            <ImageContainer>
              <ImageArrowContainer>
                <ImageArrow
                  active={this.state.currentImage === 0 ? true : false}
                  onClick={() => {
                    if (this.state.currentImage !== 0) {
                      this.setState({
                        currentImage: this.state.currentImage - 1,
                      });
                    }
                  }}
                >
                  <BsChevronLeft size={20} color="white" />
                </ImageArrow>
                <ImageArrow
                  active={
                    this.state.currentImage ===
                      this.props.product.gallery.length - 1
                      ? true
                      : false
                  }
                  onClick={() => {
                    if (
                      this.state.currentImage !==
                      this.props.product.gallery.length - 1
                    ) {
                      this.setState({
                        currentImage: this.state.currentImage + 1,
                      });
                    }
                  }}
                >
                  <BsChevronRight size={20} color="white" />
                </ImageArrow>
              </ImageArrowContainer>
              <ItemImage
                src={this.props.product.gallery[this.state.currentImage]}
              />
            </ImageContainer>
          </RightWrapper>
        </ItemContent>
        <Divider />
      </CartPageItemContainer>
    );
  }
}

const mapStateToProps = (dispatch) => {
  return {
    changeQuantity: (id, value) => dispatch(changeQuantity(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};
export default connect(null, mapStateToProps)(CartPageItem);
