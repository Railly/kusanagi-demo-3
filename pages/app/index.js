import SearchBar from "components/SearchBar";
import Logo from "components/_icons/Logo";
import ShoppingCart from "components/_icons/ShoppingCart";
import { ShoppingContext } from "context/ShoppingContext";
import { useContext } from "react";
import Link from "next/link";

const libros = [
  {
    id: 1,
    name: "Producto 1",
    description: "Descripcion 1",
    ISBN: "Codigo 1",
    author: "Autor 1",
    publisher: "Editorial 1",
    details: "Detalle 1",
    price: 40,
    stock: 1,
    code: "Codigo 1",
    file: "https://picsum.photos/200/300",
    code: "Codigo 1",
  },
  {
    id: 2,
    name: "Producto 2",
    description: "Descripcion 2",
    ISBN: "Codigo 2",
    author: "Autor 2",
    publisher: "Editorial 2",
    file: "https://picsum.photos/200/300",
    details: "Detalle 2",
    stock: 2,
    price: 50,
    code: "Codigo 1",
  },
  {
    id: 3,
    name: "Producto 3",
    description: "Descripcion 3",
    ISBN: "Codigo 3",
    author: "Autor 3",
    publisher: "Editorial 1",
    file: "https://picsum.photos/200/300",
    details: "Detalle 3",
    stock: 3,
    price: 60,
    code: "Codigo 1",
  },
  {
    id: 4,
    name: "Producto 4",
    description: "Descripcion 4",
    ISBN: "Codigo 4",
    author: "Autor 4",
    publisher: "Editorial 1",
    file: "https://picsum.photos/200/300",
    details: "Detalle 4",
    stock: 4,
    price: 70,
    code: "Codigo 1",
  },
  {
    id: 5,
    name: "Producto 5",
    description: "Descripcion 5",
    ISBN: "Codigo 5",
    author: "Autor 5",
    publisher: "Editorial 1",
    file: "https://picsum.photos/200/300",
    details: "Detalle 5",
    stock: 5,
    price: 80,
    code: "Codigo 1",
  },
  {
    id: 6,
    name: "Producto 6",
    description: "Descripcion 6",
    ISBN: "Codigo 6",
    author: "Autor 6",
    publisher: "Editorial 1",
    file: "https://picsum.photos/200/300",
    details: "Detalle 6",
    stock: 6,
    price: 90,
    code: "Codigo 1",
  },
  {
    id: 7,
    name: "Producto 7",
    description: "Descripcion 7",
    ISBN: "Codigo 7",
    publisher: "Editorial 1",
    author: "Autor 7",
    file: "https://picsum.photos/200/300",
    details: "Detalle 7",
    stock: 7,
    price: 100,
    code: "Codigo 1",
  },
  {
    id: 8,
    name: "Producto 8",
    description: "Descripcion 8",
    ISBN: "Codigo 8",
    publisher: "Editorial 1",
    author: "Autor 8",
    file: "https://picsum.photos/200/300",
    details: "Detalle 8",
    stock: 8,
    price: 110,
    code: "Codigo 1",
  },
  {
    id: 9,
    name: "Producto 9",
    description: "Descripcion 9",
    ISBN: "Codigo 9",
    author: "Autor 9",
    publisher: "Editorial 1",
    file: "https://picsum.photos/200/300",
    details: "Detalle 9",
    stock: 9,
    price: 120,
    code: "Codigo 1",
  },
  {
    id: 10,
    name: "Producto 10",
    description: "Descripcion 10",
    ISBN: "Codigo 10",
    author: "Autor 10",
    publisher: "Editorial 1",
    file: "https://picsum.photos/200/300",
    details: "Detalle 10",
    stock: 10,
    price: 130,
    code: "Codigo 1",
  },
];

export default function App() {
  const { shoppingCart, setShoppingCart } = useContext(ShoppingContext);
  console.log(shoppingCart);
  return (
    <>
      <header className="flex flex-row pt-6 pl-4 bg-gray-100">
        <Logo />
        <SearchBar />
        <div className="fixed right-0 flex flex-row items-center mx-4">
          <Link href="/cart">
            <a className="flex flex-row items-center">
              <ShoppingCart
                width={50}
                height={50}
                className="text-indigo-600 fill-current"
              />
              <span className="flex items-center justify-center w-8 h-8 font-bold text-white bg-red-500 rounded-full">
                {shoppingCart.reduce((acc, libro) => acc + libro.quantity, 0)}
              </span>
            </a>
          </Link>
        </div>
      </header>
      <main className="flex flex-row flex-wrap items-center justify-center bg-gray-100 ">
        {libros.map((libro) => (
          <div
            key={libro.id}
            className="flex flex-col p-4 mx-8 mt-6 ml-4 transition-transform bg-white rounded-lg shadow-md w-72 hover:scale-105"
          >
            <div className="flex flex-col">
              <img src={libro.file} alt={libro.name} />
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
                  if (shoppingCart.find((element) => element.id === libro.id)) {
                    console.log("entro");
                    setShoppingCart(
                      shoppingCart.map((element) => {
                        if (element.id === libro.id) {
                          console.log(element.id, libro.id);
                          element.quantity += 1;
                        }
                        return element;
                      })
                    );
                  } else {
                    console.log("obvio");
                    setShoppingCart([
                      ...shoppingCart,
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
        ))}
      </main>
    </>
  );
}
