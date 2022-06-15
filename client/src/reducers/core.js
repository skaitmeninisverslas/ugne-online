import React, { createContext, useMemo, useReducer } from "react";

export const CoreReducerContext = createContext();

const initialData = {};

const reducer = (state, action) => {
  switch (action.type) {
    case action.type:
      return (
        action.id && action.call
          ? action.call(action.id, action.payload)
          : !action.id && action.call
          ? action.call(action.payload)
          : null,
        { ...state, ...action.payload }
      );
    default:
      return state;
  }
};

export const CoreReducerProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialData);

  const contextValue = useMemo(() => {
    return { state, dispatch };
  }, [state, dispatch]);

  return (
    <CoreReducerContext.Provider value={contextValue}>
      {children}
    </CoreReducerContext.Provider>
  );
};
