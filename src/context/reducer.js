export const initialState = {
    products: [],
    loading: true,
    page: 1,
}

export const reducer = (state, action) => {
    switch (action.type) {
        case "GET_PRODUCT_SUCCESS": {
            return {
                ...state,
                products: [...state.products, ...action.payload.data],
                loading: false
            };
        }
        case "GET_PRODUCT_FAILURE":
            return {
                ...state,
                loading: false
            };

        case "CREATE_PRODUCT_SUCCESS": {

            return {
                ...state,
                loading: false,
                products: [action.payload.data, ...state.products]
            };
        }
        case "CREATE_PRODUCT_FAILURE":
            return {
                ...state,
                loading: false
            };

        case "EDIT_PRODUCT_SUCCESS": {
            const editedItem = state.products.map((item, key) => {
                if (item.id === action.payload.id) {
                    item = {...action.payload.data}
                }
                return item
            })

            return {
                ...state,
                products: [...editedItem],
                loading: false
            };
        }
        case "EDIT_PRODUCT_FAILURE":
            return {
                ...state,
                loading: false
            };

        case "DELETE_PRODUCT_SUCCESS": {
            const filteredItem = state.products.filter((item, key) => item.id !== action.payload.id)
            return {
                ...state,
                products: filteredItem,
                loading: false
            };
        }

        case "DELETE_PRODUCT_FAILURE":
            return {
                ...state,
                loading: false
            };

        case "GET_FILTERED_PRODUCT": {
            return {
                ...state,
                products: [...action.payload.data],
                loading: false
            };
        }

        default:
            throw new Error();
    }
};
