import styled from "styled-components"

export const PageContainer = styled.div`
      padding-left: 170px;
      padding-right: 170px;
      padding-top: 40px;
    `;
export const Header = styled.h1`
      font-weight: 700;
      font-size: 42px;
    `;
export const ItemList = styled.div`
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;
export const CheckoutItemContainer = styled.div`
      display:flex;
      gap:10px;
    `
export const OrderButton = styled.button`
    margin-top:20px ;
      cursor: pointer;
      background: #5ece7b;
      height: 30px;
      border: none;
      color: white;
      width: 120px;
      font-size: 16px;
      font-weight: 600;
      &:hover {
        background: #78df93;
      }
    `;