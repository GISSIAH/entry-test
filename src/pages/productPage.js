import { gql } from "@apollo/client";
import { Component } from "react";
import styled from "styled-components";
import { client } from "../api/apiClient";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

class ProductPage extends Component {
  state = {
    product: [],
    selectedImage: "",
  };
  componentDidMount = () => {
    //const { id } = this.props
    console.log(this.props);
    client
      .query({
        query: gql`query GetProduct{
                        product(id:"${this.props.params.id}") {
                            id
                            name
                            brand
                            description
                            gallery
                            attributes{
                              name
                              type
                              items{
                                displayValue
                                value
                              }
                            }
                            prices{
                                amount
                                currency{
                                symbol
                                }
                            }
                            
                            }
                        }
            `,
      })
      .then((response) => {
        console.log(response.data.product);
        this.setState({
          product: [response.data.product],
          selectedImage: response.data.product.gallery[0],
        });
      })
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    const PageContainer = styled.div`
      padding-left: 170px;
      padding-right: 170px;
      padding-top: 40px;
    `;
    const ProductContainer = styled.div`
      display: flex;
      //justify-content: space-around;
      gap: 300px;
    `;
    const LeftWrapper = styled.div`
      display: flex;
      gap:70px;
      width: 500px;
      height: 500px;
    `;
    const LargeImagePreview = styled.img`
      aspect-ratio: 1/1;
    `;
    const ThumbnailContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;
    const ImageThumbanail = styled.img`
      width: 100px;
      height: 90px;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
    `;
    const ProductDetailsContainer = styled.div`
      display: flex;
      flex-direction: column;
    `;
    const ProductDetailsTop = styled.div`
      display: flex;
      flex-direction: column;
      gap: 20px;
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
    const PriceSection = styled.div`
      margin-top: 30px;
    `;
    const Price = styled.p`
      margin: 0;
      font-weight: 700;
      font-size: 18px;
      font-family: "Roboto Condensed", sans-serif;
      margin: 0px;
    `;
    const PriceAmount = styled.p`
      font-size: 24px;
      font-weight: 700;
      margin: 0px;
    `;
    const AddToCartBtn = styled.button`
      margin-top: 30px;
      cursor: pointer;
      background: #5ece7b;
      height: 50px;
      border: none;
      color: white;
      font-size: 16px;
      font-weight: 600;
      &:hover {
        background: gray;
      }
    `;
    const Description = styled.p`
      margin: 0;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 400;
      font-family: "Roboto", sans-serif;
    `;

    //const cart = useSelector((state)=>state)
    return (
      <PageContainer>
        {this.state.product.map((product) => {
          const selectedCurrencyPrice = product.prices.filter(
            (price) => price.currency.symbol === this.props.currency.symbol
          );
          //console.log(this.props.currency);
          return (
            <ProductContainer>
              <LeftWrapper>
                <ThumbnailContainer>
                  {product.gallery.map((img) => {
                    return (
                      <ImageThumbanail
                        src={img}
                        onClick={() => {
                          this.setState({ selectedImage: img });
                        }}
                      />
                    );
                  })}
                </ThumbnailContainer>
                <LargeImagePreview src={this.state.selectedImage} />
              </LeftWrapper>

              <ProductDetailsContainer>
                <ProductDetailsTop>
                  <ProductBrand>{product.brand}</ProductBrand>
                  <ProductName>{product.name}</ProductName>
                </ProductDetailsTop>
                <Attributes>
                  {product.attributes.map((attribute) => {
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
                <PriceSection>
                  <Price>PRICE</Price>
                  <PriceAmount>
                    {selectedCurrencyPrice[0].currency.symbol +
                      " " +
                      selectedCurrencyPrice[0].amount}
                  </PriceAmount>
                </PriceSection>
                <AddToCartBtn>ADD TO CART</AddToCartBtn>
                <Description
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
              </ProductDetailsContainer>
            </ProductContainer>
          );
        })}
      </PageContainer>
    );
  }
}

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

export default withParams(ProductPage);
