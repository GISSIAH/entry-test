import React, { Component } from 'react'
import styled from 'styled-components'

export default class CartPageItem extends Component {
    state={
        counter:1
    }
    render() {
        const Divider = styled.hr`

        width:100% ;
        border-top: 1px solid lightslategray;
    `
        const CartPageItemContainer = styled.div`
        display:flex ;
        flex-direction:column;
        gap:10px;
    `
        const ItemContent = styled.div`
        display:flex;
        justify-content:space-between;
    `
        const ImageContainer = styled.div`
        display:flex;
        gap:20px;
    `
        const QuantityControlContainer = styled.div`
        display:flex;
        flex-direction:column;
        justify-content:space-evenly ;
    `
        const QuantityControl = styled.div`
        border: 1px solid black;
        width:50px;
        text-align:center;
        font-size: 40px ;
        cursor:pointer;
        height:50px;
        &:hover{
            border: 1px solid lightslategray ;
            background: lightslategray ;
        }
    `
        const Quantity = styled.p`
        margin:0px ;
        font-size:20px;
        font-weight:600;
        text-align:center ;
    `
        const ItemImage = styled.img`
        height:180px;
        width: 140px;
    `
        const TextContainer = styled.div`
        display:flex;
        flex-direction:column;
        gap: 5px;
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
        const PriceAmount = styled.p`
        font-size: 24px;
        font-weight:700 ;
        margin:0px;
    `
        const Attributes = styled.div`
        margin-top:30px ;
        display:flex;
        flex-direction:column ;
        gap:20px;
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
        const AttributeValueList = styled.div`
        display:flex;
        gap:10px;
    `
        //non swatch
        const AttributeValueContainer = styled.div`
        width:fit-content;
        height:fit-content;
        padding-left:2px;
        padding-right:2px ;
        
        border: 2px solid ;
    `
        const SwatchAttributeItem = styled.div`
                width:36px;
                height:36px;
                background:${(props) => props.color};
            `
        return (
            <CartPageItemContainer>
                <Divider />
                <ItemContent>
                    <TextContainer>
                        <ProductBrand>Apollo</ProductBrand>
                        <ProductName>Jean shorts</ProductName>
                        <PriceAmount>$50.00</PriceAmount>
                        <Attributes>
                            {
                                this.props.product.attributes.map(attribute => {
                                    if (attribute.type === "swatch") {
                                        return (
                                            <AtributeContainer>
                                                <AttributeTitle>{attribute.name.toUpperCase()}</AttributeTitle>
                                                <AttributeValueList>
                                                    {attribute.items.map(attrset => {
                                                        return (
                                                            <SwatchAttributeItem color={attrset.value}></SwatchAttributeItem>
                                                        )
                                                    })}
                                                </AttributeValueList>
                                            </AtributeContainer>
                                        )
                                    } else {
                                        return (
                                            <AtributeContainer>
                                                <AttributeTitle>{attribute.name.toUpperCase()}</AttributeTitle>
                                                <AttributeValueList>
                                                    {attribute.items.map(attrset => {
                                                        return (
                                                            <AttributeValueContainer>
                                                                {attrset.value}
                                                            </AttributeValueContainer>
                                                        )
                                                    })}
                                                </AttributeValueList>
                                            </AtributeContainer>
                                        )
                                    }

                                })
                            }
                        </Attributes>
                    </TextContainer>
                    <ImageContainer>
                        <QuantityControlContainer>
                            <QuantityControl onClick={()=>{this.setState({counter:this.state.counter+1})}}>+</QuantityControl>
                            <Quantity>{this.state.counter}</Quantity>
                            <QuantityControl onClick={() => { this.setState({ counter: this.state.counter -0 1 }) }}>-</QuantityControl>
                        </QuantityControlContainer>
                        <ItemImage src={this.props.product.gallery[0]} />
                    </ImageContainer>

                </ItemContent>
                <Divider />

            </CartPageItemContainer>
        )
    }
}
