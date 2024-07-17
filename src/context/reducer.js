
export const reducer = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCT_SUCCESS": {
            return {
                ...state,
                products: action.payload.data,
                loading: false
            };
        }
        case "GET_PRODUCT_FAILURE":
            return {
                ...state,
                products: action.payload.data,
                loading: false
            };

        case "EDIT_PRODUCT_SUCCESS":
            return {
                ...state,
                products: [...state.products, [action.payload.data.id]],
                loading: false
            };
        case "EDIT_PRODUCT_FAILURE":
            return {
                ...state,
                products: action.payload.data,
                loading: false
            };
        default:
            throw new Error();
    }
};
