import Head from "next/head";
import Logo from "../_icons/Logo";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-black-200 bg-purple-50 ">
      <Logo className="w-1/2 h-20 " />
      <h1 className="h-12 text-xl">Es momento de Comprar de manera Virtual</h1>
      <form>
        <div>
          <label className="flex flex-col font-semibold text-black">
            DNI:
            <input
              className="px-4 py-2 my-2 text-black border border-gray-400 rounded-full"
              name="dni"
            />
          </label>
          <span className="text-xs text-red-500">
            {/* {errors?.email && errors?.email?.message} */}
          </span>
        </div>
        <button
          className="px-20 py-2 my-4 font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar Session
        </button>
      </form>
    </div>
  );
}
