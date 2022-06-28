import React, { useReducer, useEffect, useCallback, useMemo } from 'react';

import GroceriesForm from './GroceriesForm';
import GroceriesList from './GroceriesList';
import ErrorModal from '../UI/ErrorModal';
import Search from './Search';
import useHttp from '../../hooks/http';

const groceriesReducer = (currentGroceries, action) => {
  switch (action.type) {
    case 'SET':
      return action.groceries;
    case 'ADD':
      return [...currentGroceries, action.groceries];
    case 'DELETE':
      return currentGroceries.filter(ing => ing.id !== action.id);
    default:
      throw new Error('Should not get there!');
  }
};

const Groceries = () => {
  const [userGroceries, dispatch] = useReducer(groceriesReducer, []);
  const {
    isLoading,
    error,
    data,
    sendRequest,
    reqExtra,
    reqIdentifer,
    clear
  } = useHttp();

  useEffect(() => {
    if (!isLoading && !error && reqIdentifer === 'REMOVE_GROCERIES') {
      dispatch({ type: 'DELETE', id: reqExtra });
    } else if (!isLoading && !error && reqIdentifer === 'ADD_GROCERIES') {
      dispatch({
        type: 'ADD',
        groceries: { id: data.name, ...reqExtra }
      });
    }
  }, [data, reqExtra, reqIdentifer, isLoading, error]);

  const filteredGroceriesHandler = useCallback(filteredGroceries => {
    dispatch({ type: 'SET', groceries: filteredGroceries });
  }, []);

  const addGroceriesHandler = useCallback(groceries => {
    sendRequest(
      'https://rustyshops-71d6f-default-rtdb.firebaseio.com/groceries.json',
      'POST',
      JSON.stringify(groceries),
      groceries,
      'ADD_GROCERIES'
    );
  }, [sendRequest]);

  const removeGroceriesHandler = useCallback(
    groceriesId => {
      sendRequest(
        `https://rustyshops-71d6f-default-rtdb.firebaseio.com/groceries/${groceriesId}.json`,
        'DELETE',
        null,
        groceriesId,
        'REMOVE_GROCERIES'
      );
    },
    [sendRequest]
  );

  const groceriesList = useMemo(() => {
    return (
      <GroceriesList
        groceries={userGroceries}
        onRemoveItem={removeGroceriesHandler}
      />
    );
  }, [userGroceries, removeGroceriesHandler]);

  return (
    <div className="App">
      {error && <ErrorModal onClose={clear}>{error}</ErrorModal>}

      <GroceriesForm
        onAddGroceries={addGroceriesHandler}
        loading={isLoading}
      />

      <section>
        <Search onLoadGroceries={filteredGroceriesHandler} />
        {groceriesList}
      </section>
    </div>
  );
};

export default Groceries;
