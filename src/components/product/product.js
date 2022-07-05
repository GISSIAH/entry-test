import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import styled from "styled-components"
import { FiShoppingCart } from "react-icons/fi"
import { addToCart } from '../../redux/reducer/shopping/shopping-actions'
import { connect } from 'react-redux'
 class Product extends Component {
    render() {
        const Product = styled.div`
            display: flex;
            flex-direction: column;
            margin-bottom: 30px;
            padding:1 5px ;
            &:hover{
               box-shadow: rgba(0, 0, 0, 0.35) 1px 5px 15px; 
            }

        `
        const ProductHead = styled.div`
            display:flex;
            justify-content:space-between;

        `
        const ProductTitle = styled.p`
            font-weight:300;
            font-size:18px;
            padding-left: 10px;
        `
        const ProductImage = styled.img`
            aspect-ratio: 1 / 1;
            //width:100%;
            //height:330px;
        `
        const AddToCart = styled.div`
            z-index:99;
            width:50px;
            display:flex;
            justify-content:center;
            align-items:center ;
            height:50px;
            border-radius:50%;
            background:#5ece7b;
        `
        const ProductPrice = styled.p`
            font-weight:500;
            font-size:18px ;
            padding-left: 10px;
        `
        const selectedCurrencyPrice = this.props.product.prices.filter(price => price.currency.symbol === this.props.currency.symbol)

        return (
            <Link to={"/product/" + this.props.product.id} style={{ textDecoration: 'none', color: 'black' }}>
                <Product>
                    <ProductImage src={this.props.product.gallery[0]} />
                    <ProductHead>
                        <ProductTitle>{this.props.product.name}</ProductTitle>
                        <AddToCart onClick={()=>{
                            this.props.addToCart(this.props.product.id)
                        }}>
                            <FiShoppingCart size={28} color="white" />
                        </AddToCart>

                    </ProductHead>

                    <ProductPrice>{selectedCurrencyPrice[0].currency.symbol + " " + selectedCurrencyPrice[0].amount}</ProductPrice>
                </Product>
            </Link>
        )
    }
}

const mapDispatchToProps = dispatch => {
    return {
        addToCart: (id) => dispatch(addToCart(id))
    }
}
export default connect(null, mapDispatchToProps)(Product);
