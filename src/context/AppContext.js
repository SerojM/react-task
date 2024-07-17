import React, {createContext, useContext, useReducer} from "react";
import {initialState, reducer} from "./reducer";

const AppContext = createContext({});

export const AppProvider = ({ children }) => {
    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider  value={{ state, dispatch }}>
            {children}
        </AppContext.Provider>
    );
}



export const useAppContext = () => {
    return useContext(AppContext)
}
