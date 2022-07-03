import React, { Component } from 'react'
import styled from "styled-components"
import ProductList from '../components/product/productList'
import { client } from '../api/apiClient'
import { gql } from '@apollo/client'
import { setProducts } from '../redux/reducer/shopping/shopping-actions'
import {connect} from "react-redux"
class Home extends Component {
    state = {
        category: "all",
        categories: [],
        categoryMenu: false
    }
    getAllProducts= async ()=>{
        const res = await client
          .query({
            query: gql`
            query GetClothes{
                category(input: { title: "all" }) {
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
    
          return  res
          
    }
    
    componentDidMount = async () => {

        this.getAllProducts().then(res=>{
           
            this.props.setProducts(res.data.category.products)
        })
        const response = await client.query({
            query: gql`query GetCategories{
                    categories{
                        name
                    }
                    }
            `,
        })

        this.setState({
            categories: response.data.categories
        })
    }
    handleDropDown = () => {
        this.setState({ categoryMenu: !this.state.categoryMenu })
    }
    render() {
        const CategoryMenu = styled.div`
            display:flex;
            flex-direction:column ;
        `
        const CategoryTitleWrapper = styled.div`
            display:flex;
            gap: 20px;
            align-items:center ;
        `
        const CategoryList = styled.div`
            display:flex;
            gap: 10px;
            padding-left:170px;
        `
        const CategoryTitle = styled.h2`
            padding-left: 170px;
            font-weight: 400;
            font-size: 42px;
        `

        const CategoryListItemWrapper = styled.div`
            border-style: solid;
            border-color:#9E9E9E;
            width:135px ;
            border-radius:9999px;
            text-align:center ;
            border-width:thin ;
            cursor:pointer ;
            &:hover{
                background: #CDF3FF;
            }
     
        `
        const CategoryListItem = styled.p`
            font-size:18px;
            font-weight:600;
            
        `
        return (
            <div>
                <CategoryMenu>
                    <CategoryTitleWrapper>
                        <CategoryTitle>
                            {"Category : " + this.state.category}
                        </CategoryTitle>
                    </CategoryTitleWrapper>
                    <CategoryList>
                        {
                            this.state.categories.map(item => {
                                return (

                                    <CategoryListItemWrapper onClick={() => {
                                        this.setState({ category: item.name })
                                    }
                                    }>
                                        <CategoryListItem >
                                            {item.name}
                                        </CategoryListItem>
                                    </CategoryListItemWrapper>

                                )
                            })
                        }
                    </CategoryList>
                </CategoryMenu>


                <ProductList currency={this.props.currency} category={this.state.category} />
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => {
    
    return {
        setProducts: data => dispatch(setProducts(data))
       
    }
 }

 export default connect(null,mapDispatchToProps)(Home)
