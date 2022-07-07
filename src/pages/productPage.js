import { Component } from "react";
import { PageContainer, ProductContainer, LeftWrapper, ThumbnailContainer, ImageThumbanail, LargeImagePreview, ProductDetailsContainer, ProductDetailsTop, ProductBrand, ProductName, Attributes, AttributeTitle, AtributeContainer, AttributeValueList, SwatchAttributeItem, AttributeValueContainer, PriceSection, Price, PriceAmount, AddToCartBtn, Description } from "../components/productPage/productPageStyles"
import { useParams } from "react-router-dom";
import { connect } from "react-redux"
import { addToCart, setProducts } from "../redux/reducer/shopping/shopping-actions";
import { getProduct, getAllProducts } from "../api/requests";
class ProductPage extends Component {
  state = {
    product: [],
    selectedImage: "",
    selectedAttr: []
  };
  componentDidMount = () => {
    getProduct(this.props.params.id).then((response) => {
      var selectedDefaults = []
      response.data.product.attributes.forEach(element => {
        selectedDefaults.push({
          name: element.name,
          value: element.items[0].value
        })
      });
      this.setState({
        product: [response.data.product],
        selectedImage: response.data.product.gallery[0],
        selectedAttr: selectedDefaults
      });
      getAllProducts().then(res => {
        this.props.setProducts(res.data.category.products)
      })
    })
      .catch((err) => {
        alert(err);
      });
  };
  render() {

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
                                      this.setState({ selectedAttr: tempArr })
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
                <AddToCartBtn title="Add to Cart" onClick={() => {
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
    addToCart: (id, attributes) => dispatch(addToCart(id, attributes)),
    setProducts: data => dispatch(setProducts(data))
  }
}
export default connect(null, mapDispatchToProps)(withParams(ProductPage));