import ShoppingContextProvider from "context/ShoppingContext";
import "tailwindcss/tailwind.css";
import "styles/global.css";

function MyApp({ Component, pageProps }) {
  return (
    <ShoppingContextProvider>
      <Component {...pageProps} />
    </ShoppingContextProvider>
  );
}

export default MyApp;
