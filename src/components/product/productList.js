import { gql } from '@apollo/client'
import React, { Component } from 'react'
import styled from "styled-components"
import { client } from '../../api/apiClient'
import Product from './product'
export default class ProductList extends Component {
    state = {
        clothes: [],
        category: "all"
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

        this.setState({
            clothes: response.data.category.products
        })
    }
    render() {
        const ProductList = styled.div`
            display:grid;
            grid-template-columns: repeat(3,1fr);
            padding-left: 170px;
            padding-right: 170px;
            margin-top: 90px;
        `
        return (
            <ProductList>
                {
                    this.state.clothes.map(cloth => {
                        return (
                            <Product product={cloth} currency={this.props.currency} />
                        )
                    })
                }
            </ProductList>
        )
    }
}
