import * as actionTypes from "./shopping-types";

export const setProducts = (payload) => ({
  type: actionTypes.SET_PRODUCTS,
  payload,
});
export const addToCart = (itemD) => {
  return {
    type: actionTypes.ADD_TO_CART,
    payload: {
      id: itemD,
    },
  };
};

export const removeFromCart = (itemD) => {
  return {
    type: actionTypes.REMOVE_FROM_CART,
    payload: {
      id: itemD,
    },
  };
};

export const changeQuantity = (itemId, value) => {
  return {
    type: actionTypes.CHANGE_QUANITY,
    payload: {
      id: itemId,
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

