import { gql } from '@apollo/client'
import React, { Component } from 'react'
import styled from "styled-components"
import { client } from '../api/apiClient'

export default class Home extends Component {
    state = {
        clothes: []
    }
    componentDidMount = async () => {
        const response = await client.query({
            query: gql`query GetClothes{
  category(input: { title: "all" }) {
    name
    products {
      id
      name
      brand
      gallery
      prices{
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
     
        this.setState({
            clothes: response.data.category.products
        })
    }
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
        const CategoryTitle = styled.h2`
        padding-left: 170px;
        font-weight: 400;
        font-size: 42px;
    `
        const ProductList = styled.div`
        display:grid;
        grid-template-columns: repeat(3,1fr);
        padding-left: 170px;
        padding-right: 170px;
        margin-top: 90px;
    `
        return (
            <div>
                <CategoryTitle>
                    Clothes
                </CategoryTitle>
                <ProductList>
                    {
                        this.state.clothes.map(cloth=>{
                            const selectedCurrencyPrice = cloth.prices.filter(price => price.currency.symbol === this.props.currency.symbol)
                            return(
                                <Product>
                                    <ProductImage src={cloth.gallery[0]}/>
                                    <ProductTitle>{cloth.name}</ProductTitle>
                                    <ProductPrice>{selectedCurrencyPrice[0].currency.symbol + " " + selectedCurrencyPrice[0].amount}</ProductPrice>
                                </Product>
                            )
                        })
                    }
                </ProductList>
            </div>
        )
    }
}
