import { gql } from "@apollo/client";
import { Component } from "react";
import styled from "styled-components";
import { client } from "../api/apiClient";
import { useParams } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
import { connect } from "react-redux"
import { addToCart, setProducts } from "../redux/reducer/shopping/shopping-actions";
class ProductPage extends Component {
  state = {
    product: [],
    selectedImage: "",
    selectedAttr: []
  };
  getAllProducts = async () => {
    const res = await client
      .query({
        query: gql`
        query GetClothes{
            category(input: { title: "all" }) {
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
                  name
                  type
                  items{
                    value
                  }
                }
                }
            }
            }
        `,
      })

    return res

  }
  componentDidMount = () => {

    //const { id } = this.props
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
        this.setState({
          product: [response.data.product],
          selectedImage: response.data.product.gallery[0],
        });
        this.getAllProducts().then(res => {

          this.props.setProducts(res.data.category.products)
        })

      })
      .catch((err) => {
        alert(err);
      });
  };
  render() {
    const PageContainer = styled.div`
      padding-left: 50px;
      padding-right: 50px;
      padding-top: 40px;

    `;
    const ProductContainer = styled.div`
      display: flex;
      justify-content: center;
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
      cursor: pointer;
      ${({ check }) => check && `
      background: black;
      color:white;
      padding: 0px 2px 0px 2px;
      `}
    `;
    const SwatchAttributeItem = styled.div`
      width: 36px;
      height: 36px;
      cursor: pointer;
      background: ${(props) => props.color};
      ${({ check }) => check && `
      border:2px solid #5ECE7B;;
      `}
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
        background: #78DF93;
      }
    `;
    const Description = styled.p`
      margin: 0;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 400;
      font-family: "Roboto", sans-serif;
    `;
    return (
      <PageContainer>
        {this.state.product.map((product, i) => {
          const selectedCurrencyPrice = product.prices.filter(
            (price) => price.currency.symbol === this.props.currency.symbol
          );
          return (
            <ProductContainer key={i}>
              <LeftWrapper>
                <ThumbnailContainer>
                  {product.gallery.map((img, key) => {
                    return (
                      <ImageThumbanail
                        key={key}
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
                  {product.attributes.map((attribute, index) => {

                    if (attribute.type === "swatch") {
                      return (
                        <AtributeContainer key={index}>
                          <AttributeTitle>
                            {attribute.name.toUpperCase()}
                          </AttributeTitle>
                          <AttributeValueList>
                            {attribute.items.map((attrset, swatchKey) => {
                              return (
                                <SwatchAttributeItem
                                  check={checkSelected({
                                    name: attribute.name,
                                    value: attrset.value
                                  }, this.state.selectedAttr)}
                                  onClick={() => {
                                    const attr = {
                                      name: attribute.name,
                                      value: attrset.value
                                    }
                                    if (containsObject(attr, this.state.selectedAttr)) {
                                      const tempArr = this.state.selectedAttr.map(attribute => attribute.name === attr.name ? attr : attribute)
                                      this.setState({ selectedAttr: tempArr })
                                    } else {
                                      this.setState({ selectedAttr: [...this.state.selectedAttr, attr] })
                                    }
                                  }}
                                  color={attrset.value}
                                  key={swatchKey}
                                ></SwatchAttributeItem>
                              );
                            })}
                          </AttributeValueList>
                        </AtributeContainer>
                      );
                    } else {
                      return (
                        <AtributeContainer key={index}>
                          <AttributeTitle>
                            {attribute.name.toUpperCase()}
                          </AttributeTitle>
                          <AttributeValueList>
                            {attribute.items.map((attrset, attributeKey) => {
                              return (
                                <AttributeValueContainer
                                  onClick={() => {
                                    const attr = {
                                      name: attribute.name,
                                      value: attrset.value
                                    }
                                    if (containsObject(attr, this.state.selectedAttr)) {
                                      const tempArr = this.state.selectedAttr.map(attribute => attribute.name === attr.name ? attr : attribute)
                                      this.setState({selectedAttr:tempArr})
                                    } else {
                                      this.setState({ selectedAttr: [...this.state.selectedAttr, attr] })
                                    }
                                  }}
                                  key={attributeKey}
                                  check={checkSelected({
                                    name: attribute.name,
                                    value: attrset.value
                                  }, this.state.selectedAttr)}
                                >
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
                <AddToCartBtn onClick={() => {
                  console.log(this.state.selectedAttr);
                  this.props.addToCart(product.id, this.state.selectedAttr)
                }
                }>ADD TO CART</AddToCartBtn>
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

function containsObject(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].name === obj.name) {
      return true;
    }
  }
  return false;
}

function checkSelected(obj, list) {
  var i;
  for (i = 0; i < list.length; i++) {
    if (list[i].value === obj.value) {
      return true;
    }
  }
  return false;
}


function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const mapDispatchToProps = dispatch => {
  return {
    addToCart: (id,attributes) => dispatch(addToCart(id,attributes)),
    setProducts: data => dispatch(setProducts(data))
  }
}
export default connect(null, mapDispatchToProps)(withParams(ProductPage));
