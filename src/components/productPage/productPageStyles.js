import styled from "styled-components"

export const PageContainer = styled.div`
      padding-left: 50px;
      padding-right: 50px;
      padding-top: 40px;
    `;
export const ProductContainer = styled.div`
      display: flex;
      justify-content: center;
      gap: 300px;
    `;
export const LeftWrapper = styled.div`
      display: flex;
      gap:70px;
      width: 500px;
      height: 500px;
    `;
export const LargeImagePreview = styled.img`
      aspect-ratio: 1/1;
    `;
export const ThumbnailContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;
export const ImageThumbanail = styled.img`
      width: 100px;
      height: 90px;
      &:hover {
        box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
      }
    `;
export const ProductDetailsContainer = styled.div`
      display: flex;
      flex-direction: column;
    `;
export const ProductDetailsTop = styled.div`
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;
export const ProductBrand = styled.p`
      margin: 0px;
      font-size: 30px;
      font-weight: 600;
    `;
export const ProductName = styled.p`
      margin: 0px;
      font-size: 30px;
      font-weight: 400;
    `;
export const Attributes = styled.div`
      margin-top: 30px;
      display: flex;
      flex-direction: column;
      gap: 20px;
    `;

export const AtributeContainer = styled.div`
      display: flex;
      flex-direction: column;
      gap: 10px;
    `;
export const AttributeTitle = styled.p`
      font-weight: 700;
      font-size: 18px;
      font-family: "Roboto Condensed", sans-serif;
      margin: 0px;
    `;
export const AttributeValueList = styled.div`
      display: flex;
      gap: 10px;
    `;
//non swatch
export const AttributeValueContainer = styled.div`
      width: fit-content;
      height: fit-content;
      padding-left: 2px;
      padding-right: 2px;
      border: 2px solid;
      cursor: pointer;
      ${({ check }) => check && `
      background: black;
      color:white;
      padding: 0px 2px 0px 2px;
      `}
    `;
export const SwatchAttributeItem = styled.div`
      width: 36px;
      height: 36px;
      cursor: pointer;
      background: ${(props) => props.color};
      ${({ check }) => check && `
      border:2px solid #5ECE7B;;
      `}
    `;
export const PriceSection = styled.div`
      margin-top: 30px;
    `;
export const Price = styled.p`
      margin: 0;
      font-weight: 700;
      font-size: 18px;
      font-family: "Roboto Condensed", sans-serif;
      margin: 0px;
    `;
export const PriceAmount = styled.p`
      font-size: 24px;
      font-weight: 700;
      margin: 0px;
    `;
export const AddToCartBtn = styled.button`
      margin-top: 30px;
      cursor: pointer;
      background: #5ece7b;
      height: 50px;
      border: none;
      color: white;
      font-size: 16px;
      font-weight: 600;
      &:hover {
        background: #78DF93;
      }
    `;
export const Description = styled.p`
      margin: 0;
      margin-top: 30px;
      font-size: 16px;
      font-weight: 400;
      font-family: "Roboto", sans-serif;
    `;