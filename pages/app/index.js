import SearchBar from "components/SearchBar";
import Logo from "components/_icons/Logo";
import ShoppingCart from "components/_icons/ShoppingCart";
import { ShoppingContext } from "context/ShoppingContext";
import { useContext, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function App() {
  const {
    shoppingCartLibro,
    setShoppingCartLibro,
    shoppingCartVideojuego,
    setShoppingCartVideojuego,
  } = useContext(ShoppingContext);

  const [libros, setLibros] = useState([]);
  const [videojuegos, setVideojuegos] = useState([]);
  const [vista, setVista] = useState(true);

  useEffect(() => {
    window
      .fetch("http://kusanagi-api.herokuapp.com/api/books?from=0&limit=5", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setLibros(res);
      });
  }, []);

  useEffect(() => {
    window
      .fetch(
        "http://kusanagi-api.herokuapp.com/api/videogames?from=0&limit=5",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
        setVideojuegos(res);
      });
  }, []);
  return (
    <>
      <header className="flex flex-row pt-6 pl-4 bg-gray-100">
        <Logo />
        <SearchBar />
        <div className="flex flex-row items-center">
          <button
            className="px-4 py-2 ml-8 mr-8 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              setVista(!vista);
            }}
          >
            {vista ? "Videojuegos" : "Libros"}
          </button>
        </div>
        <div className="fixed right-0 flex flex-row items-center mx-4">
          <Link href={vista ? "/cart/libros" : "/cart/videojuegos"}>
            <a className="flex flex-row items-center">
              <ShoppingCart
                width={50}
                height={50}
                className="text-indigo-600 fill-current"
              />
              <span className="flex items-center justify-center w-8 h-8 font-bold text-white bg-red-500 rounded-full">
                {vista
                  ? shoppingCartLibro.reduce(
                      (acc, libro) => acc + libro.quantity,
                      0
                    )
                  : shoppingCartVideojuego.reduce(
                      (acc, videojuego) => acc + videojuego.quantity,
                      0
                    )}
              </span>
            </a>
          </Link>
        </div>
      </header>
      <main className="flex flex-row flex-wrap items-center justify-center bg-gray-100 ">
        {vista
          ? libros.map((libro) => (
              <div
                key={libro.id}
                className="flex flex-col p-4 mx-8 mt-6 ml-4 transition-transform bg-white rounded-lg shadow-md w-72 hover:scale-105"
              >
                <div className="flex flex-col">
                  {libro.img && (
                    <Image
                      src={libro.img}
                      alt={libro.name}
                      width={200}
                      height={300}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Nombre: </span>
                    <span className="text-gray-900">{libro.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Descripción: </span>
                    <span className="text-gray-900">{libro.description}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Autor: </span>
                    <span className="text-gray-900">{libro.author}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Precio: </span>
                    <span className="text-gray-900">${libro.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        shoppingCartLibro.find(
                          (element) => element.id === libro.id
                        )
                      ) {
                        console.log("entro");
                        setShoppingCartLibro(
                          shoppingCartLibro.map((element) => {
                            if (element.id === libro.id) {
                              console.log(element.id, libro.id);
                              element.quantity += 1;
                            }
                            return element;
                          })
                        );
                      } else {
                        console.log("obvio");
                        setShoppingCartLibro([
                          ...shoppingCartLibro,
                          { ...libro, quantity: 1 },
                        ]);
                      }
                    }}
                    className="flex justify-center p-2 mt-2 font-semibold text-white bg-indigo-600 rounded-md"
                  >
                    Agregar al carrito
                    <ShoppingCart fill="#fff" className="ml-2" />
                  </button>
                </div>
              </div>
            ))
          : videojuegos.map((videojuego) => (
              <div
                key={videojuego.id}
                className="flex flex-col p-4 mx-8 mt-6 ml-4 transition-transform bg-white rounded-lg shadow-md w-72 hover:scale-105"
              >
                <div className="flex flex-col">
                  {videojuego.img && (
                    <Image
                      src={videojuego.img}
                      alt={videojuego.name}
                      width={200}
                      height={300}
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2 py-2">
                  <div className="flex justify-between">
                    <span className="font-semibold">Nombre: </span>
                    <span className="text-gray-900">{videojuego.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Descripción: </span>
                    <span className="text-gray-900 truncate">
                      {videojuego.description}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Marca: </span>
                    <span className="text-gray-900">{videojuego.brand}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-semibold">Precio: </span>
                    <span className="text-gray-900">${videojuego.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      if (
                        shoppingCartVideojuego.find(
                          (element) => element.id === videojuego.id
                        )
                      ) {
                        console.log("entro");
                        setShoppingCartVideojuego(
                          shoppingCartVideojuego.map((element) => {
                            if (element.id === videojuego.id) {
                              console.log(element.id, videojuego.id);
                              element.quantity += 1;
                            }
                            return element;
                          })
                        );
                      } else {
                        console.log("obvio");
                        setShoppingCartVideojuego([
                          ...shoppingCartVideojuego,
                          { ...videojuego, quantity: 1 },
                        ]);
                      }
                    }}
                    className="flex justify-center p-2 mt-2 font-semibold text-white bg-indigo-600 rounded-md"
                  >
                    Agregar al carrito
                    <ShoppingCart fill="#fff" className="ml-2" />
                  </button>
                </div>
              </div>
            ))}
      </main>
      {/* <footer className="flex flex-row items-center justify-center bg-gray-100">
        <div className="flex flex-col gap-2">
          <div className="flex justify-center">
            <Link href="/">
              <a className="text-gray-900">
                <Home fill="#fff" className="w-8 h-8" />
              </a>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href="/libros">
              <a className="text-gray-900">
                <Book fill="#fff" className="w-8 h-8" />
              </a>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href="/videojuegos">
              <a className="text-gray-900">
                <Gamepad fill="#fff" className="w-8 h-8" />
              </a>
            </Link>
          </div>
          <div className="flex justify-center">
            <Link href="/carrito">
              <a className="text-gray-900">
                <ShoppingCart fill="#fff" className="w-8 h-8" />
              </a>
            </Link>
          </div>
        </div>
      </footer> */}
    </>
  );
}
