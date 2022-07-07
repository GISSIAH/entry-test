import styled from "styled-components"

export const NavWrapper = styled.nav`
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      padding-left: 170px;
      padding-right: 170px;
    `;
export const NavItem = styled.p`
      font-weight: 600;
      font-size: 16px;
      line-height: 19.2px;
      text-align: center;
    `;
export const NavLeftGroup = styled.div`
      display: flex;
      gap: 32px;
    `;
export const NavRightGroup = styled.div`
      display: flex;
      justify-content: center;
      align-items: center;
      gap: 22px;
    `;
export const CurrencySwitcher = styled.div`
      display: flex;
      flex-direction: column;
    `;

export const CurrencyListContainer = styled.ul`
      position: absolute;
      margin-top: 40px;
      padding: 0px;
      display: flex;
      flex-direction: column;
      z-index: 9999px;
      box-shadow: 0 8px 8px -4px lightblue;
    `;
export const CurrencyListItemContainer = styled.div`
      display: flex;
      gap: 5px;
      justify-content: center;
      cursor: pointer;
      &:hover {
        background: #eeeeee;
      }
    `;
export const CurrencyListItem = styled.p`
      font-size: 18px;
      font-weight: 500;
    `;
export const Cart = styled.div`
      display: flex;
      flex-direction: column;
    `;
export const CartItemCount = styled.div`
      z-index: 9999px;
      position: absolute;
      color: white;
      border-radius: 50%;
      background: black;
      width: 20px;
      height: 20px;
      display: flex;
      justify-content: center;
      text-align: center;
      top: 0;
      right: 0;
      display: flex;
    `;
export const CartIconContainer = styled.div`
      position: relative;
      cursor: pointer;
      width: 40px;
    `;
export const CartMenuContainer = styled.div`
      display: flex;
      flex-direction: column;
      background: white;
      right: 100px;
      background:white ;
      z-index: 9999;
      position: absolute;
      margin-top: 40px;
      width: 400px;
      //height: 500px;
      display: block;
      padding-left: 4px;
      padding-right: 4px;
      padding-bottom: 10px ;
      box-shadow: 0 10px 13px -6px lightblue;

    `;

export const CartHeader = styled.div`
      display: flex;
      gap: 15px;
    `;
export const TotalContainer = styled.div`
      display: flex;
      justify-content: space-between;
    `;

export const ActionButtonsContainer = styled.div`
      display: flex;
      margin-top: 10px;
      justify-content: space-between;
    `;

export const ViewButton = styled.button`
      background: white;
      color: black;
      border: 1px solid black;
      width: 40%;
      font-size: 16px;
      height: 30px;
      cursor: pointer;
      &:hover {
        background: lightslategray;
      }
    `;
export const CheckButton = styled.button`
      cursor: pointer;
      background: #5ece7b;
      height: 30px;
      border: none;
      color: white;
      width: 40%;
      font-size: 16px;
      font-weight: 600;
      &:hover {
        background: #78df93;
      }
    `;