import React, { Component } from 'react'
//import "../../styles/navbar.css"
import styled from "styled-components"
import { FiShoppingCart } from "react-icons/fi"
import { BsCurrencyDollar } from "react-icons/bs"
export default class Navbar extends Component {
  render() {
    const NavWrapper = styled.nav`
        display: flex;
        flex-direction:row ;
        justify-content: space-between;
        padding-left: 170px;
        padding-right: 170px;
    `

    const NavItem = styled.p`
        font-weight: 600;
        font-size: 16px;
        line-height: 19.2px;
        text-align: center;
    
    `
    const NavLeftGroup = styled.div`
        display: flex;
        gap: 32px;
    `

    const NavRightGroup = styled.div`
        display: flex;
        justify-content: center;
        align-items:center;
        gap: 22px
    `

    const navItemList = [{title:"WOMEN"},{title:"MEN"},{title:"KIDS"}]



    return (
      <NavWrapper>
        <NavLeftGroup>
            {
                navItemList.map(navItem => {
                    return(
                        <NavItem>{navItem.title}</NavItem>
                    )
                })
            }
        </NavLeftGroup>
        <div>logo</div>
        <NavRightGroup>
            <BsCurrencyDollar size={26}/>
            <FiShoppingCart size={26}/>
        </NavRightGroup>
        
      </NavWrapper>
    )
  }
}
