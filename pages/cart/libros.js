import { ShoppingContext } from "context/ShoppingContext";
import { useContext, useState } from "react";
import Image from "next/image";
import ShoppingCart from "components/_icons/ShoppingCart";
import Logo from "components/_icons/Logo";
import { v4 as uuidv4 } from "uuid";

export default function Cart() {
  const { shoppingCartLibro, setShoppingCartLibro } =
    useContext(ShoppingContext);
  const [status, setStatus] = useState(false);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckout = () => {
    const cartUuid = uuidv4();

    setLoading(true);

    const messages = [
      {
        body: {
          code: cartUuid,
          dni: JSON.parse(localStorage.getItem("user")).numero,
          books: shoppingCartLibro.map((item) => item.id),
          quantities: shoppingCartLibro.map((item) => item.quantity),
        },
        contentType: "application/json",
      },
    ];

    window
      .fetch(`${process.env.NEXT_PUBLIC_URL}/api/messages`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          messages,
          queueName: "crisol",
        }),
      })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setStatus("success");
        } else {
          console.log(data.error);
          setStatus("error");
          setError(data.error);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        console.log(err);
        setLoading(false);
      });
  };
  return (
    <main className="flex items-center justify-center w-full h-screen">
      <section className="flex flex-col flex-wrap items-center w-full h-full pt-4 bg-gray-100">
        <h1 className="flex flex-col items-center text-2xl font-bold text-gray-800">
          <Logo />
          <div className="flex items-center mt-2 text-xl font-bold text-gray-800">
            <ShoppingCart
              className="ml-6 text-indigo-600 fill-current"
              width={35}
              height={35}
            />
            <span className="ml-2 text-indigo-600"> Carrito de compras</span>
          </div>
        </h1>
        <div className="w-8/12 py-6 mt-4 overflow-y-scroll h-4/6">
          {shoppingCartLibro.map((libro) => (
            <div
              key={libro.id}
              className="flex flex-row items-center justify-between p-4 mx-8 mt-6 ml-4 transition-transform bg-white rounded-lg shadow-md h-max"
            >
              {/* Create an X icon */}
              <div className="flex items-center justify-center w-8 h-8 mr-4 text-red-500 fill-current">
                <svg
                  onClick={() => {
                    setShoppingCartLibro(
                      shoppingCartLibro.filter((item) => item.id !== libro.id)
                    );
                  }}
                  className="w-6 h-6 cursor-pointer"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    // x path
                    d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
              <div className="flex flex-row justify-around w-full">
                {libro.img && (
                  <div className="flex items-center mr-4">
                    <Image
                      height={75}
                      width={50}
                      src={libro.img}
                      alt={libro.name}
                    />
                  </div>
                )}
                <div className="flex flex-col px-4 py-2">
                  <div className="flex justify-between">
                    <h3 className="text-lg font-bold text-gray-700">
                      {libro.name}
                    </h3>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm font-semibold text-gray-700">
                      {libro?.author || libro?.brand}
                    </span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-500">
                      Precio unitario: {`S/. ${libro.price}`}
                    </span>
                  </div>
                </div>
                <div className="flex items-center justify-between px-4">
                  <button
                    onClick={() => {
                      setShoppingCartLibro(
                        shoppingCartLibro.map((item) => {
                          if (item.id === libro.id) {
                            if (item.quantity > 0) {
                              return { ...item, quantity: item.quantity - 1 };
                            } else {
                              return item;
                            }
                          } else {
                            return item;
                          }
                        })
                      );
                    }}
                    disabled={libro.quantity === 0}
                    className="flex items-center px-2 pb-1 text-xl font-bold text-gray-700 bg-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    -
                  </button>
                  <span className="flex items-center justify-center w-8 h-8 mx-4 font-bold text-white bg-red-500 rounded-full">
                    {libro.quantity}
                  </span>
                  <button
                    onClick={() => {
                      setShoppingCartLibro(
                        shoppingCartLibro.map((item) => {
                          if (item.id === libro.id) {
                            if (item.quantity < libro.stock) {
                              return { ...item, quantity: item.quantity + 1 };
                            } else {
                              return item;
                            }
                          } else {
                            return item;
                          }
                        })
                      );
                    }}
                    disabled={libro.quantity === libro.stock}
                    className="flex items-center px-2 pb-1 text-xl font-bold text-gray-700 bg-gray-300 rounded-lg disabled:bg-gray-100 disabled:text-gray-400"
                  >
                    +
                  </button>
                </div>
                <div className="flex flex-col justify-center px-4">
                  <span className="font-bold text-blue-800 text-md">
                    Precio total
                  </span>
                  <span className="text-lg font-bold text-gray-700">
                    {`S/. ${(libro.price * libro.quantity).toFixed(2)}`}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="flex flex-row justify-between px-4 mt-6">
            <span className="text-lg font-bold text-blue-800">
              Total a pagar
            </span>
            <span className="text-lg font-bold text-gray-700">
              {`: S/. ${shoppingCartLibro
                .reduce((acc, item) => {
                  return acc + item.price * item.quantity;
                }, 0)
                .toFixed(2)}`}
            </span>
          </div>
        </div>
        <div className="flex justify-center mt-6">
          <button
            onClick={handleCheckout}
            className="flex items-center justify-center px-4 py-2 text-lg font-bold text-white transition-colors bg-indigo-700 rounded-lg bg-text-300 disabled:bg-gray-200 disabled:text-gray-400"
            disabled={
              shoppingCartLibro.reduce((acc, item) => {
                return acc + item.price * item.quantity;
              }, 0) === 0 || loading
            }
          >
            Comprar
          </button>
        </div>
      </section>
    </main>
  );
}
