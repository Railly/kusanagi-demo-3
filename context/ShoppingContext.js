import { createContext, useState } from "react";

export const ShoppingContext = createContext();

const ShoppingContextProvider = (props) => {
  const [shoppingCart, setShoppingCart] = useState([]);

  return (
    <ShoppingContext.Provider
      value={{
        shoppingCart,
        setShoppingCart,
      }}
    >
      {props.children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
