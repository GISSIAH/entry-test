import React, { Component } from 'react'
//import "../../styles/navbar.css"
import styled from "styled-components"
import { FiShoppingCart } from "react-icons/fi"
import { BsCurrencyDollar } from "react-icons/bs"
import { MdOutlineArrowDropDown } from "react-icons/md"
import { RiArrowDropUpLine } from "react-icons/ri"
export default class Navbar extends Component {
    state={
        menuOpen:false
    }
    currencies = [
        {
            symbol:"$",
            name: "USD",
        },
       {
           symbol: "£",
           name: "EUR"
       },
       {
           symbol:"¥",
           name:"JPY"
       }
    ]
    componentDidMount = ()=>{
        this.props.parentCallback({
            symbol:"$",
            name:"USD"
        })
    }
    selectCurrency = (name)=>{
        this.props.parentCallback(name)
    }
    handleDropDown = ()=>{
        this.setState({ menuOpen: !this.state.menuOpen })
    }

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

        const CurrencySwitcher = styled.div`
        display:flex;
        flex-direction:column;
    `
        
    const CurrencyListContainer = styled.ul`
        position:absolute ;
        margin-top:40px ;
        display:flex;
        flex-direction:column;
        z-index:9999;
        background: #eee;
        box-shadow: 0 8px 8px -4px lightblue;
    `
    const CurrencyListItem = styled.p`
        font-size: 18px;
        font-weight: 500;
    `

        const navItemList = [{ title: "WOMEN" }, { title: "MEN" }, { title: "KIDS" }]



        return (
            <NavWrapper>
                <NavLeftGroup>
                    {
                        navItemList.map(navItem => {
                            return (
                                <NavItem>{navItem.title}</NavItem>
                            )
                        })
                    }
                </NavLeftGroup>
                <div>logo</div>
                <NavRightGroup>
                    <CurrencySwitcher>
                        <div style={{display:'flex',gap:2}}>
                            <BsCurrencyDollar size={26} />
                            {this.state.menuOpen ? <RiArrowDropUpLine size={26} onClick={this.handleDropDown} /> : <MdOutlineArrowDropDown size={26} onClick={this.handleDropDown}/> }
                        </div>
                        {this.state.menuOpen ? <CurrencyListContainer>
                            {
                                this.currencies.map(item=>{
                                    return(
                                        <CurrencyListItem onClick={()=>{
                                            this.selectCurrency(item)
                                        }
                                            
                                        }>{item.name}</CurrencyListItem>
                                    )
                                })
                            }
                        </CurrencyListContainer> :
                    
                        <div></div>
                    }
                        

                    </CurrencySwitcher>

                    <FiShoppingCart size={26} />
                </NavRightGroup>

            </NavWrapper>
        )
    }
}
