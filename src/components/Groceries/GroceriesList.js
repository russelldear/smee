import React from 'react';

import './GroceriesList.css';

const GroceriesList = props => {
  return (
    <section className="groceries-list">
      <h2>Groceries</h2>
      <ul>
        {props.groceries.map(ig => (
          <li key={ig.id} onClick={props.onRemoveItem.bind(this, ig.id)}>
            <span>{ig.title}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default GroceriesList;
