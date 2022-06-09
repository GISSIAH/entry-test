import { gql } from '@apollo/client'
import React, { Component } from 'react'
import styled from "styled-components"
import { client } from '../../api/apiClient'
import Product from './product'
export default class ProductList extends Component {
    state = {
        clothes: [],
        category: this.props.category
    }
    componentDidMount = async () => {
        console.log(this.props.category);
        this.getProducts(this.props.category)   
    }
    getProducts =async (category)=>{
        const response = await client.query({
            query: gql`query GetClothes{
                category(input: { title: "${category}" }) {
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
    componentWillUpdate(nextProps, nextState) {
        console.log(nextProps);
        console.log(nextState);
        if (
            this.state.category !==
            nextProps.category
        ) {
            console.log(false);
            this.getProducts(nextProps.category)
            this.setState({ category: nextProps.category })
        }
    }

    render() {
        const ProductList = styled.div`
            display:flex;
            flex-wrap:wrap;
            gap:180px;
            padding-left: 170px;
            padding-right: 170px;
            margin-top: 60px;
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
