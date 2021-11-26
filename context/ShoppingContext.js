import { createContext, useState } from "react";

export const ShoppingContext = createContext();

const ShoppingContextProvider = (props) => {
  const [shoppingCartLibro, setShoppingCartLibro] = useState([]);
  const [shoppingCartVideojuego, setShoppingCartVideojuego] = useState([]);

  return (
    <ShoppingContext.Provider
      value={{
        shoppingCartLibro,
        setShoppingCartLibro,
        shoppingCartVideojuego,
        setShoppingCartVideojuego,
      }}
    >
      {props.children}
    </ShoppingContext.Provider>
  );
};

export default ShoppingContextProvider;
