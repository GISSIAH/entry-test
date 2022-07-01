import React, { Component } from 'react'
import styled from 'styled-components'
import CartPageItem from '../components/cart/cartPageItem'

export default class CartPage extends Component {
    render() {
        const PageContainer = styled.div`
                padding-left:170px;
                padding-right:170px;
                padding-top:40px;
            `
        const Header = styled.h1`
            font-weight: 700;
            font-size: 42px; 
        `

        const ItemList = styled.div`
            display:flex;
            flex-direction:column;
            gap:20px;
        `
        const product = {

            "__typename": "Product",
            "id": "huarache-x-stussy-le",
            "name": "Nike Air Huarache Le",
            "brand": "Nike x Stussy",
            "description": "<p>Great sneakers for everyday use!</p>",
            "gallery": [
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_2_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_1_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_3_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_5_720x.jpg?v=1612816087",
                "https://cdn.shopify.com/s/files/1/0087/6193/3920/products/DD1381200_DEOA_4_720x.jpg?v=1612816087"
            ],
            "attributes": [
                {
                    "__typename": "AttributeSet",
                    "name": "Size",
                    "type": "text",
                    "items": [
                        {
                            "__typename": "Attribute",
                            "displayValue": "40",
                            "value": "40"
                        },
                        {
                            "__typename": "Attribute",
                            "displayValue": "41",
                            "value": "41"
                        },
                        {
                            "__typename": "Attribute",
                            "displayValue": "42",
                            "value": "42"
                        },
                        {
                            "__typename": "Attribute",
                            "displayValue": "43",
                            "value": "43"
                        }
                    ]
                }
            ],
            "prices": [
                {
                    "__typename": "Price",
                    "amount": 144.69,
                    "currency": {
                        "__typename": "Currency",
                        "symbol": "$"
                    }
                },
                {
                    "__typename": "Price",
                    "amount": 104,
                    "currency": {
                        "__typename": "Currency",
                        "symbol": "£"
                    }
                },
                {
                    "__typename": "Price",
                    "amount": 186.65,
                    "currency": {
                        "__typename": "Currency",
                        "symbol": "A$"
                    }
                },
                {
                    "__typename": "Price",
                    "amount": 15625.24,
                    "currency": {
                        "__typename": "Currency",
                        "symbol": "¥"
                    }
                },
                {
                    "__typename": "Price",
                    "amount": 10941.76,
                    "currency": {
                        "__typename": "Currency",
                        "symbol": "₽"
                    }
                }
            ]

        }
        return (
            <PageContainer>
                <Header>
                    CART
                </Header>
                <ItemList>
                    <CartPageItem
                        product={product}
                    />

                </ItemList>

            </PageContainer>
        )
    }
}
