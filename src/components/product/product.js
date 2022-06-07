import React, { Component } from 'react'
import styled from "styled-components"
export default class Product extends Component {
    render() {
        const Product = styled.div`
            display: flex;
            flex-direction: column;

        `
        const ProductTitle = styled.p`
            font-weight:300;
            font-size:18px;
        `
        const ProductImage = styled.img`
            width:354px;
            height:330px;
        `
        const ProductPrice = styled.p`
            font-weight:500;
            font-size:18px ;
        `
        const selectedCurrencyPrice = this.props.product.prices.filter(price => price.currency.symbol === this.props.currency.symbol)

        return (
            <Product>
                <ProductImage src={this.props.product.gallery[0]} />
                <ProductTitle>{this.props.product.name}</ProductTitle>
                <ProductPrice>{selectedCurrencyPrice[0].currency.symbol + " " + selectedCurrencyPrice[0].amount}</ProductPrice>
            </Product>
        )
    }
}
