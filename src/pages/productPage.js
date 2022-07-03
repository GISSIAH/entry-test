import { gql } from "@apollo/client";
import { Component } from "react";
import styled from "styled-components";
import { client } from "../api/apiClient";
import { useParams } from "react-router-dom";
//import { useDispatch, useSelector } from "react-redux";
import {connect} from "react-redux"
import { addToCart, setProducts } from "../redux/reducer/shopping/shopping-actions";
class ProductPage extends Component {
  state = {
    product: [],
    selectedImage: "",
  };
  getAllProducts= async ()=>{
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
                }
            }
            }
        `,
      })

      return  res
      
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
        this.getAllProducts().then(res=>{
           
          this.props.setProducts(res.data.category.products)
      })
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
        {this.state.product.map((product,i) => {
          const selectedCurrencyPrice = product.prices.filter(
            (price) => price.currency.symbol === this.props.currency.symbol
          );
          //console.log(this.props.currency);
          return (
            <ProductContainer key={i}>
              <LeftWrapper>
                <ThumbnailContainer>
                  {product.gallery.map((img,key) => {
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
                  {product.attributes.map((attribute,index) => {
                    if (attribute.type === "swatch") {
                      return (
                        <AtributeContainer key={index}>
                          <AttributeTitle>
                            {attribute.name.toUpperCase()}
                          </AttributeTitle>
                          <AttributeValueList>
                            {attribute.items.map((attrset,swatchKey) => {
                              return (
                                <SwatchAttributeItem
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
                            {attribute.items.map((attrset,attributeKey) => {
                              return (
                                <AttributeValueContainer key={attributeKey}>
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
                <AddToCartBtn onClick={()=>{
                  console.log("pressed",product.id);
                    this.props.addToCart(product.id)}
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

function withParams(Component) {
  return (props) => <Component {...props} params={useParams()} />;
}

const mapDispatchToProps = dispatch =>{
  return {
    addToCart: (id) => dispatch(addToCart(id)),
    setProducts: data => dispatch(setProducts(data))
  }
}
export default connect(null,mapDispatchToProps)(withParams(ProductPage));
