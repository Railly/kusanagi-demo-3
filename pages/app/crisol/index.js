import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Crisol() {
  const router = useRouter();

  const [pedidos, setPedidos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window
      .fetch(
        `${process.env.NEXT_PUBLIC_URL}/api/messages/crisol_response/peek`,
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
        if (res.success) {
          setPedidos(res.data.reverse());
        }
        setLoading(false);
      });
  }, []);

  return (
    <>
      <header className="flex flex-row items-center justify-between px-4 py-6 bg-gray-100">
        <Image src="/images/crisol.png" width={630 / 4} height={320 / 4} />
        <div className="flex flex-row items-center">
          <h1 className="text-2xl font-bold text-gray-700">Ventas</h1>
        </div>
        <div>
          <button
            className="px-4 py-2 mr-8 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              router.push("/app/crisol/crear");
            }}
          >
            Crear producto
          </button>
          <button
            className="px-4 py-2 font-bold text-white bg-red-600 rounded-md hover:bg-red-700"
            onClick={() => {
              window.localStorage.removeItem("user");
              router.push("/login");
            }}
          >
            Cerrar sesión
          </button>
        </div>
      </header>
      <main>
        <div className="flex flex-col justify-between px-4 py-6 bg-gray-100">
          <div className="flex flex-col items-center w-full h-full">
            {loading ? (
              <svg
                className="w-12 h-12 mr-3 -ml-1 text-black animate-spin"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              pedidos &&
              pedidos.map((pedido) => (
                <article
                  key={pedido.code}
                  className="flex flex-col w-9/12 mb-8 bg-white shadow-lg"
                >
                  <header className="flex justify-center p-4 bg-gray-900 rounded-md">
                    <h1 className="text-xl font-bold text-white">
                      Pedido {pedido.id}
                    </h1>
                  </header>
                  <main className="p-8">
                    {pedido.books.map((videogame, index) => (
                      <div
                        key={`${pedido.code}-${index}`}
                        className="flex justify-between pb-4 mb-4 border-b border-gray-900 rounded-md "
                      >
                        <div>
                          <Image
                            src={videogame.img}
                            width={200 / 2}
                            height={300 / 2}
                          />
                        </div>
                        <div className="w-full pl-8">
                          <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold text-gray-700">
                              Libro {index + 1}:
                            </h1>
                            <h1 className="text-lg font-semibold text-gray-700">
                              {videogame.name}
                            </h1>
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold text-gray-700">
                              ISBN:
                            </h1>
                            <h1 className="text-lg font-semibold text-gray-700">
                              {videogame.ISBN}
                            </h1>
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold text-gray-700">
                              Descripcion:
                            </h1>
                            <h1 className="text-lg font-semibold text-gray-700 truncate">
                              {videogame.description}
                            </h1>
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold text-gray-700">
                              Código:
                            </h1>
                            <h1 className="text-lg font-semibold text-gray-700">
                              {videogame.code}
                            </h1>
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold text-gray-700">
                              Editorial:
                            </h1>
                            <h1 className="text-lg font-semibold text-gray-700">
                              {videogame.publisher}
                            </h1>
                          </div>
                          <div className="flex items-center justify-between">
                            <h1 className="text-lg font-bold text-gray-700">
                              Precio:
                            </h1>
                            <h1 className="text-lg font-semibold text-gray-700">
                              {videogame.price}
                            </h1>
                          </div>
                        </div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between">
                      <h1 className="text-lg font-bold text-gray-700">DNI:</h1>
                      <h1 className="text-lg font-semibold text-gray-700">
                        {pedido.dni}
                      </h1>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <h1 className="text-2xl font-bold text-gray-700">IGV:</h1>
                      <h1 className="text-2xl font-bold text-gray-700">
                        S/. {(+pedido.cost * 0.18).toFixed(2)}
                      </h1>
                    </div>
                    <div className="flex items-center justify-between mt-4">
                      <h1 className="text-2xl font-bold text-gray-700">
                        Total:
                      </h1>
                      <h1 className="text-2xl font-bold text-gray-700">
                        $ {(+pedido.cost).toFixed(2)}
                      </h1>
                    </div>
                  </main>
                </article>
              ))
            )}
          </div>
        </div>
      </main>
    </>
  );
}
