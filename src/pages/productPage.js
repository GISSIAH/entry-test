
import { gql } from '@apollo/client';
import { PureComponent } from 'react';
import { withRouter } from 'react-router-class-tools';
import styled from "styled-components"
import { client } from '../api/apiClient';


export default withRouter(
    class ProductPage extends PureComponent {
        state = {
            product: [],
            selectedImage: ""
        }
        componentDidMount = () => {
            const { id } = this.props.match.params

            client.query({
                query: gql`query GetProduct{
                        product(id:"${id}") {
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
            `

            }).then(response => {
                this.setState({
                    product: [response.data.product],
                    selectedImage: response.data.product.gallery[0]
                })
            }).catch(err => {
                alert(err)
            })


        }
        render() {
            const PageContainer = styled.div`
                padding-left:170px;
                padding-right:170px;
                padding-top:40px;
            `
            const ProductContainer = styled.div`
                display:flex;
                gap:200px;
            `
            const LargeImagePreview = styled.img`
                width: 550px;
                height: 500px;
            `
            const ThumbnailContainer = styled.div`
                display:flex;
                flex-direction:column;
                gap:20px;
            `
            const ImageThumbanail = styled.img`
                width: 100px;
                height: 90px ;
            `
            const ProductDetailsContainer = styled.div`
                display:flex;
                flex-direction:column;
            `
            const ProductDetailsTop = styled.div`
                display:flex;
                flex-direction:column;
                gap:20px ;
            `
            const ProductBrand = styled.p`
                margin:0px ;
                font-size:30px;
                font-weight:600;
            `
            const ProductName = styled.p`
                margin:0px ;
                font-size: 30px;
                font-weight:400 ;
            `

            const AtributeContainer = styled.div`
                display:flex;
                flex-direction:column;
                gap:10px;
            `
            const AttributeTitle = styled.p`
                font-weight:700;
                font-size:18px ;
                font-family: 'Roboto Condensed', sans-serif;
                margin:0px ;
            `

            const Attributes = styled.div`
                margin-top:30px ;
            `
            
            
            const AttributeValueList = styled.div`
                display:flex;
                gap:10px;
            ` 
            const AttributeValueContainer = styled.div`
                width:20px;
                height:20px;
                
                border-style:solid;
            `

            return (
                <PageContainer>
                    {
                        this.state.product.map(product => {
                            console.log(product);
                            return (
                                <ProductContainer>
                                    <ThumbnailContainer>
                                        {
                                            product.gallery.map(img => {
                                                return (
                                                    <ImageThumbanail src={img} onClick={() => { this.setState({ selectedImage: img }) }} />
                                                )
                                            })
                                        }
                                    </ThumbnailContainer>
                                    <LargeImagePreview src={this.state.selectedImage} />
                                    <ProductDetailsContainer>
                                        <ProductDetailsTop>
                                            <ProductBrand>{product.brand}</ProductBrand>
                                            <ProductName>{product.name}</ProductName>
                                        </ProductDetailsTop>
                                        <Attributes>
                                            {
                                                product.attributes.map(attribute => {
                                                    return (
                                                        <AtributeContainer>
                                                            <AttributeTitle>{attribute.name.toUpperCase()}</AttributeTitle>
                                                            <AttributeValueList>
                                                                {attribute.items.map(attrset=>{
                                                                    return(
                                                                        <AttributeValueContainer>
                                                                            {attrset.value}
                                                                        </AttributeValueContainer>
                                                                    )
                                                                })}
                                                            </AttributeValueList>
                                                        </AtributeContainer>
                                                    )
                                                })
                                            }
                                        </Attributes>

                                    </ProductDetailsContainer>
                                </ProductContainer>
                            )
                        })
                    }
                </PageContainer>

            );
        }
    }
);