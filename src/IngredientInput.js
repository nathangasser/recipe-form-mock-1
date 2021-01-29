import React, { useState } from 'react';

const IngredientInput = React.forwardRef(({ id, value, handleTyping, checkEnterTab }, ref) => {
  const [text, setText] = useState(value);

  return (
    <div className="row mt-1" key={id}>
      <div className="col-2 gx-1">
        <div className="form-floating">
          <input
            type="text"
            className="form-control"
            id="amt-1"
            placeholder="0"
          />
          <label htmlFor="amt-1">Amt</label>
        </div>
      </div>
      <div className="col-2 gx-1">
        <div className="form-floating">
          <input
            list="unt-opts-1"
            className="form-control"
            id="unt-1"
            placeholder="..."
          />
          <datalist id="unt-opts-1">
            <option value="Tbsp" />
            <option value="tsp" />
            <option value="cup" />
            <option value="fl oz" />
            <option value="lb" />
            <option value="oz" />
            <option value="g" />
            <option value="L" />
            <option value="each" />
          </datalist>
          <label htmlFor="unt-1">Unit</label>
        </div>
      </div>
      <div className="col-8 gx-1">
        <div className="form-floating">
          <input
            ref={ref}
            type="text"
            className="form-control"
            id="ing-1"
            placeholder="Ingredient"
            value={text}
            onChange={(e) => {
              setText(e.target.value);
              handleTyping(id, e.target.value);
            }}
            onKeyDown={(e) => {
              checkEnterTab(e, id);
            }}
          />
          <label htmlFor="ing-1">Ingredient</label>
        </div>
      </div>
    </div>
  );
});

export default IngredientInput;