import React, { useState, useEffect } from 'react';

import InputLine from './components/InputLine';
import './recipe.css';


function App() {
  // preloaded ingredients for testing
  const [itemList, setItemList] = useState([
    {
      id: 1,
      ingredient: "Onions",
      amount: "2",
      unit: "each",
    },
    {
      id: 2,
      ingredient: "Carrots",
      amount: "1",
      unit: "ea",
    },
    {
      id: 3,
      ingredient: "Garlic",
      amount: "6",
      unit: "cloves",
    },
    {
      id: 4,
      ingredient: "",
      amount: "",
      unit: "",
    },
  ]);

  const [focusArr, setFocusArr] = useState([]);

  // initialize focusArr
  useEffect(() => {
    const arr = [];
    for (let i = 0; i++; i < (itemList.length - 1)) {
      arr[i] = false;
    }
    arr[itemList.length - 1] = true;
    setFocusArr(arr);
  }, []);

  useEffect(() => {
    const renderInputs = itemList.map((item) => {
      return (
        <InputLine
          item={item}
          key={item.id}
          handleTyping={handleTyping}
          isFocus={focusArr[item.id - 1]}
          handleFocus={handleFocus}
        />
      );
    });
  }, [focusArr.join(",")]);

  // Only amounts and ingredients are considered important input
  const allFieldsBlank = (item) => {
    if (item.amount === "" && item.ingredient === "") {
      return true;
    }
    else return false;
  };

  // helper function to call to make sure we're cleaning up extra inputs
  const cleanEmptyInputs = (arr) => {
    let extraInputExists = true;
    while (extraInputExists === true) {
      // check if last two inputs are blank
      if (allFieldsBlank(arr[arr.length - 1]) && allFieldsBlank(arr[arr.length - 2])) {
        // remove the last input and it's ref
        arr.pop();
      } else {
        // break out of loop
        extraInputExists = false;
      }
    }
    return arr;
  };

  const setRowFocus = (i) => {
    const tempArr = [...focusArr];
    tempArr.fill(false);
    tempArr[i] = true;
    setFocusArr(tempArr);
  };

  // this is called every time a key is pressed inside any input
  const handleTyping = (id, field, text) => {
    const copyList = [...itemList];
    // if user is typing on last input then create a
    // blank object to be automatically rendered below
    if (id === copyList.length) {
      copyList.push({
        id: copyList.length + 1, 
        ingredient: "",
        amount: "",
        unit: "",
      });
    }
    copyList[id - 1][field] = text;
    setRowFocus(id - 1);
    setItemList(cleanEmptyInputs(copyList));
  };

  const handleFocus = (id) => {
    setRowFocus(id - 1);
  };

  //     NEW RENDERINPUTS
  const renderInputs = itemList.map((item) => {
    return (
      <InputLine
        item={item}
        key={item.id}
        handleTyping={handleTyping}
        isFocus={focusArr[item.id - 1]}
        handleFocus={handleFocus}
      />
    )
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
