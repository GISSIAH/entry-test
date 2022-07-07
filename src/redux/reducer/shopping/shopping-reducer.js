import * as actionTypes from "./shopping-types";

const INITIAL_STATE = {
  products: [], //getProducts(),
  cart: [],
};

const shopReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };
    case actionTypes.ADD_TO_CART:
      const item = state.products.find((prod) => prod.id === action.payload.id);

      const inCart = state.cart.find((item) =>
        (item.id === action.payload.id && compareArrays(item.selectedAttributes, action.payload.attributes))
          ?
          true
          :
          false
      );
      return {
        ...state,
        cart: inCart
          ? state.cart.map((item) =>
            (item.id === action.payload.id && compareArrays(item.selectedAttributes, action.payload.attributes))

              ? { ...item, qty: item.qty + 1 }
              : item
          )
          :
          [...state.cart, { ...item, selectedAttributes: action.payload.attributes, qty: 1 }],
      };
    case actionTypes.REMOVE_FROM_CART:


      return {
        ...state,
        cart: state.cart.filter((item) => ((item.id !== action.payload.id || item.id === action.payload.id) && !(item.id === action.payload.id && compareArrays(item.selectedAttributes, action.payload.attributes)) )),
      };





    case actionTypes.CHANGE_QUANITY:
      return {
        ...state,
        cart: state.cart.map((item) =>
          (item.id === action.payload.id && compareArrays(item.selectedAttributes, action.payload.attributes))
            ? { ...item, qty: action.payload.qty }
            : item
        ),
      };

    default:
      return state;
  }
};


function compareArrays(arr1, arr2) {
  var matches

  for (let i = 0; i < arr1.length; i++) {
    const keys1 = Object.values(arr1[i])
    const keys2 = Object.values(arr2[i])
    for (let k = 0; k < arr2.length; k++) {
      if (keys1[0] === keys2[0] && keys1[1] === keys2[1]) {
        matches = true
      } else {
        matches = false
        i = arr1.length
        k = arr2.length
      }
    }
  }

  console.log(matches);
  return matches
}


export default shopReducer;
