import Search from "components/_icons/Search";
import { useForm } from "react-hook-form";

export default function SearchBar(props) {
  const { register, handleSubmit, watch } = useForm();
  const search = watch("search");

  const onSubmit = (data) => {
    console.log(data);
  };

  return (
    <div className="relative w-8/12 ml-8">
      <form className="relative flex w-full" onSubmit={handleSubmit(onSubmit)}>
        <input
          type="text"
          className="w-full h-full py-2 pl-10 mr-4 text-gray-500 rounded-r-none outline-none md:rounded focus-within:text-gray-900 focus:ring-blue-400 ring-2 ring-gray-300"
          placeholder="Buscar"
          name="search"
          {...register("search")}
        />
        <span className="absolute flex items-center h-8 pl-2 left-1 inset-y-1">
          <Search
            width={19}
            height={19}
            className="text-gray-400 fill-current"
          />
        </span>
        <button
          type="submit"
          disabled={search === ""}
          className="px-4 py-2 font-bold text-white bg-green-500 rounded w-96 hover:bg-blue-700 disabled:bg-green-200 disabled:cursor-not-allowed"
        >
          Buscar
        </button>
      </form>
    </div>
  );
}
