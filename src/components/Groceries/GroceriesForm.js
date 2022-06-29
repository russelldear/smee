import React, { useState } from 'react';

import Card from '../UI/Card';
import LoadingIndicator from '../UI/LoadingIndicator';
import './GroceriesForm.css';

const GroceriesForm = React.memo(props => {
  const [enteredTitle, setEnteredTitle] = useState('');

  const submitHandler = event => {
    event.preventDefault();

    if (enteredTitle) {
      props.onAddGroceries({ title: enteredTitle });
      setEnteredTitle('');
    }
  };

  return (
    <section className="groceries-form">
      <Card>
        <form onSubmit={submitHandler}>
          <div className='form-control-container'>
            <div className="form-control">
              <label htmlFor="title">Item:</label>
              <input
                type="text"
                id="title"
                size={50}
                value={enteredTitle}
                onChange={event => {
                  setEnteredTitle(event.target.value);
                }}
              />
            </div>
            <div className="groceries-form__actions">
              <button type="submit">Add</button>
              {props.loading && <LoadingIndicator />}
            </div>
          </div>
        </form>
      </Card>
    </section>
  );
});

export default GroceriesForm;
