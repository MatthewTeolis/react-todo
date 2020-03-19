import React, { useState, createContext } from "react";

export const AppContext = createContext();

export const AppContextProvider = props => {
  const [categories, setCategories] = useState([]);

  const context = {
    categories,
    setCategories,
    removeList: id => {
      const newCategories = [...categories];
      newCategories.forEach(category => {
        category.lists = category.lists.filter(list => list.id !== id);
      });
      setCategories(newCategories);
    },
    addList: list => {
      const newCategories = [...categories];
      newCategories.forEach(category => {
        if (category.id === list.category_id) {
          category.lists.push(list);
        }
      });
      setCategories(newCategories);
    }
  };

  return <AppContext.Provider value={{ ...context }}>{props.children}</AppContext.Provider>;
};
