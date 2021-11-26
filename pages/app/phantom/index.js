import { useRouter } from "next/router";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Phantom() {
  const router = useRouter();

  const [pedidos, setPedidos] = useState([]);
  const [videojuegosIds, setVideojuegosIds] = useState([]);

  useEffect(() => {
    window
      .fetch(
        "https://kusanagi-demo-3.vercel.app/api/messages/phantom_response/peek",
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
          const pedidoResponse = res.data.map((pedido) => {
            window
              .fetch(
                "http://kusanagi-api.herokuapp.com/api/videogames/array/",
                {
                  method: "PUT",
                  headers: {
                    "Content-Type": "application/json",
                  },
                  body: JSON.stringify({
                    ids: pedido.videogames,
                  }),
                }
              )
              .then((res) => res.json())
              .then((res) => {
                console.log(res);
                if (res.success) {
                  pedido.videogames = res.data.ids;
                }
              });
            return pedido;
          });
          setPedidos(pedidoResponse);
        }
      });
  }, []);

  return (
    <>
      <header className="flex flex-row items-center justify-between px-4 py-6 bg-gray-100">
        <Image src="/images/phantom.png" width={630 / 4} height={320 / 4} />
        <div className="flex flex-row items-center">
          <h1 className="text-2xl font-bold text-gray-700">Ventas</h1>
        </div>
        <div>
          <button
            className="px-4 py-2 mr-8 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              router.push("/app/phantom/crear");
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
        <div className="flex flex-row justify-between px-4 py-6 bg-gray-100">
          <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold text-gray-700">
              Historial de pedidos
            </h1>
          </div>
          <div className="flex flex-col items-center">
            {pedidos.length > 0 &&
              pedidos.map((pedido) => (
                <div key={pedido.code} className="flex flex-col items-center">
                  <h1 className="text-2xl font-bold text-gray-700">
                    {pedido.dni}
                  </h1>
                  <h1 className="text-2xl font-bold text-gray-700">
                    {pedido.code}
                  </h1>
                  <h1 className="text-2xl font-bold text-gray-700">
                    {pedido.cost}
                  </h1>
                  {pedido.videogames.map((videogame) => (
                    <h1
                      key={videogame}
                      className="text-2xl font-bold text-gray-700"
                    >
                      {videogame}
                    </h1>
                  ))}
                </div>
              ))}
          </div>
        </div>
      </main>
    </>
  );
}
