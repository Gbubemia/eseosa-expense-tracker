import React, { createContext, useReducer, useEffect } from 'react';
import AppReducer from './AppReducer';

// initial state
const initialState = {
 transactions: []
};

// Create context
export const GlobalContext = createContext(initialState);

// Provider Component
export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(AppReducer, initialState, () => {
    const localData = localStorage.getItem('transactions');
    return localStorage ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    console.log('we have used useEffect');
    
    localStorage.setItem('transactions', JSON.stringify(state));
  }, [state]);

  // Actions
  function deleteTransaction(id) {
    dispatch({
      type: 'DELETE_TRANSACTION',
      payload: id
    });
  }

  function addTransaction(transaction) {
    dispatch({
      type: 'ADD_TRANSACTION',
      payload: transaction
    });
  }

  return (<GlobalContext.Provider value={{
   transactions: state.transactions,
   deleteTransaction: deleteTransaction,
   addTransaction: addTransaction
  }}>
   {children}
  </GlobalContext.Provider>);
}

