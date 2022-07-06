import * as actionTypes from "./shopping-types";

export const setProducts = (payload) => ({
  type: actionTypes.SET_PRODUCTS,
  payload,
});
export const addToCart = (itemD,attributes) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemD,
      attributes:attributes
    },
  };
};

export const removeFromCart = (itemD,attributes) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemD,
      attributes:attributes
    },
  };
};

export const changeQuantity = (itemId,attributes, value) => {
  return {
    type: actionTypes.CHANGE_QUANITY,
    payload: {
      id: itemId,
      attributes:attributes,
      qty: value,
    },
  };
};

export const getTotal = (payload)=>{
  return{
    type:actionTypes.GET_TOTAL,
    payload
  }
}

