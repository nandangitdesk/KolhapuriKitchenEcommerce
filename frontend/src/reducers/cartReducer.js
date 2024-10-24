import { ADD_TO_CART , REMOVE_CART_ITEM ,SAVE_SHIPPING_INFO} from "../constants/cartConstants";

const initialState = {
  cartItems: [],
  shippingInfo: {},
};

export const cartReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_TO_CART:
            const item = action.payload;
            const isItemExist = state.cartItems.find((x) => x.product === item.product);
            if (isItemExist) {  
                return {
                    ...state,
                    cartItems: state.cartItems.map((x) =>
                        x.product === isItemExist.product ? item : x
                    ),
                };
            } else {
                return {
                    ...state,
                    cartItems: [...state.cartItems, item],
                };
            }
            
        case REMOVE_CART_ITEM:
            return {
                ...state,
                cartItems: state.cartItems.filter((x) => x.product!== action.payload),
            };
        
        case SAVE_SHIPPING_INFO:
            return {
                ...state,
                shippingInfo: action.payload,
            };
            
            
            
        default:
            return state;
    }

    };

// In the cartReducer, we first check the type of action. If it's ADD_TO_CART, we perform the following steps: