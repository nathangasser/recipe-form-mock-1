import React, { useState } from 'react';

import IngredientInput from './IngredientInput';
import './recipe.css';


function App() {
  // preloaded ingredients for testing
  const [ingredientList, setIngredientList] = useState([
    {
      id: 1,
      value: "Onions",
    },
    {
      id: 2,
      value: "Carrots",
    },
    {
      id: 3,
      value: "Garlic",
    },
    {
      id: 4,
      value: "",
    },
  ]);

  // helper function to call to make sure we're cleaning up extra inputs
  const cleanExtraInput = (arr) => {
    let extraInputExists = true;
    while (extraInputExists === true) {
      // check if last two inputs are blank
      if (
        arr[arr.length - 1].value === "" &&
        arr[arr.length - 2].value === ""
      ) {
        // remove the last input and it's ref
        arr.pop();
        inputRefs.pop();
        // set focus on the last empty input
        inputRefs[inputRefs.length - 1].current.focus();
      } else {
        // break out of loop
        extraInputExists = false;
      }
    }
    return arr;
  };

  // this is called every time a key is pressed inside any input
  const handleTyping = (id, text) => {
    const copyList = [...ingredientList];
    // if user is typing on last input then create a
    // blank object to be automatically rendered below
    if (id === copyList.length) {
      copyList.push({ id: copyList.length + 1, value: "" });
    }
    // set the value of the typed text to the correct element in the array
    copyList[id - 1].value = text;
    // we don't ever want two blank inputs at the
    // bottom of the input field
    setIngredientList(cleanExtraInput(copyList));
  };

  // check if key press was Enter button and then move to next line
  const checkEnterTab = (event, id) => {
    if (event.key === "Enter" && inputRefs[id]) {
      inputRefs[id].current.focus();
    }
  };

  // init array of refs
  const inputRefs = [];
  // create inputs from piece of state
  const renderInputs = ingredientList.map((item) => {
    // create ref for each element
    inputRefs[item.id - 1] = React.createRef();
    return (
      <IngredientInput
        ref={inputRefs[item.id - 1]}
        id={item.id}
        value={item.value}
        handleTyping={handleTyping}
        checkEnterTab={checkEnterTab}
      />
    );
  });

  return (
    <div className="py-5 text-center">
      <div className="form-recipe border shadow-lg">
        <h4 className="mb-4">Recipe Title</h4>
        {renderInputs}
      </div>
    </div>
  );
}

export default App;
