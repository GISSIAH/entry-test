import React, { Component } from 'react'
import styled from "styled-components"
import ProductList from '../components/product/productList'
export default class Home extends Component {
    state = {
        category:"all"
    }
    render() {
        const CategoryTitle = styled.h2`
            padding-left: 170px;
            font-weight: 400;
            font-size: 42px;
        `
        return (
            <div>
                <CategoryTitle>
                    {this.state.category}  
                </CategoryTitle>
                <ProductList currency={this.props.currency}/>
            </div>
        )
    }
}
