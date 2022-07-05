import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { changeQuantity, removeFromCart } from "../../redux/reducer/shopping/shopping-actions";
class MiniCartItem extends Component {
  render() {
    const ItemContainer = styled.div`
      display: flex;
      gap:10px;
    `;
    const DetailsContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 5px;
    `;
    const ItemText = styled.p`
      margin: 0px;
      font-size: 16px;
      font-weight: 300;
    `;

    const ItemPrice = styled.p`
      margin: 0px;
      font-size: 16px;
      font-weight: 500;
    `;
    const Attributes = styled.div`
      margin-top: 10px;
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
      font-weight: 300;
      font-size: 18px;
      margin: 0px;
    `;
    const AttributeValueList = styled.div`
      display: flex;
      gap: 5px;
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
    const RightWrapper = styled.div`
      display: flex;
    `;
    const QuantityControlContainer = styled.div`
      display: flex;
      flex-direction: column;
    `;
    const QuantityControl = styled.div`
      display: flex;
      height: 20px;
      width: 30px;

      border: 1px solid black;
      text-align: center;
      justify-content: center;
      font-size: 30px;
      cursor: pointer;
      height: 50px;
      &:hover {
        border: 1px solid lightslategray;
        background: lightslategray;
      }
    `;
    const ImageContainer = styled.div`
      display: flex;
      width: auto;
      height: 180px;
    `;
    const ItemImage = styled.img`
      aspect-ratio: 1/1;
    `;
    const selectedCurrencyPrice = this.props.item.prices.filter(
      (price) => price.currency.symbol === this.props.currency
    );
    return (
      <ItemContainer>
        <DetailsContainer>
          <ItemText>{this.props.item.brand}</ItemText>
          <ItemText>{this.props.item.name}</ItemText>
          <ItemPrice>
            {this.props.currency +
              "" +
              selectedCurrencyPrice[0].amount}
          </ItemPrice>
          <Attributes>
            {this.props.item.attributes.map((attribute) => {
              if (attribute.type === "swatch") {
                return (
                  <AtributeContainer>
                    <AttributeTitle>{attribute.name}</AttributeTitle>
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
                    <AttributeTitle>{attribute.name}</AttributeTitle>
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
        </DetailsContainer>
        <RightWrapper>
          <QuantityControlContainer>
            <QuantityControl onClick={() => {
              this.props.changeQuantity(this.props.item.id, this.props.item.qty + 1)
            }}
            >
              +
            </QuantityControl>
            <p>{this.props.item.qty}</p>
            <QuantityControl onClick={() => {
              if (this.props.item.qty - 1 <= 0) {
                this.props.removeFromCart(this.props.item.id);
              } else {
                this.props.changeQuantity(this.props.item.id, this.props.item.qty - 1)
              }

            }}>-</QuantityControl>
          </QuantityControlContainer>
          <ImageContainer>
            <ItemImage src={this.props.item.gallery[0]} />
          </ImageContainer>
        </RightWrapper>
      </ItemContainer>
    );
  }
}


const mapStateToProps = (dispatch) => {
  return {
    changeQuantity: (id, value) => dispatch(changeQuantity(id, value)),
    removeFromCart: (id) => dispatch(removeFromCart(id)),
  };
};
export default connect(null, mapStateToProps)(MiniCartItem);



