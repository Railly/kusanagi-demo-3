import Image from "next/image";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useForm } from "react-hook-form";
import { useState } from "react";

const schema = yup.object().shape({
  name: yup
    .string()
    .min(3, "El nombre debe tener al menos 3 caracteres")
    .required("El nombre es requerido"),
  description: yup
    .string()
    .min(3, "La descripcion debe tener al menos 3 caracteres")
    .required("La descripcion es requerida"),
  ISBN: yup
    .string()
    .matches(/^\d{10}$/, "El ISBN debe ser de 10 digitos")
    .required("El ISBN es requerido"),
  author: yup
    .string()
    .min(3, "El autor debe tener al menos 3 caracteres")
    .required("El autor es requerido"),
  price: yup
    .string()
    .matches(/^\d{1,3}(\.\d{1,2})?$/, "El precio debe ser un numero")
    .required("El precio es requerido"),
  stock: yup
    .string()
    .matches(/^\d{1,3}$/, "El stock debe ser un numero")
    .required("El stock es requerido"),
  publisher: yup
    .string()
    .min(3, "La editorial debe tener al menos 3 caracteres")
    .required("La editorial es requerida"),
  file: yup
    .mixed()
    .test(
      "file",
      "Debe seleccionar una imagen",
      (value) => value && value[0] && value[0].type === "image/jpeg"
    )
    .required("Debe seleccionar una imagen"),
  code: yup
    .string()
    .min(3, "El codigo debe tener al menos 3 caracteres")
    .matches(/^[A-Z]{3}-[0-9]{4}$/, "El codigo debe ser de forma AAA-1234")
    .required("El codigo es requerido"),
  details: yup.string(),
});

export default function CrearProducto() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    console.log(data);
    setLoading(true);
    const newFormData = new FormData();

    newFormData.append("name", data.name);
    newFormData.append("description", data.description);
    newFormData.append("ISBN", data.ISBN);
    newFormData.append("author", data.author);
    newFormData.append("price", data.price);
    newFormData.append("stock", data.stock);
    newFormData.append("publisher", data.publisher);
    newFormData.append("code", data.code);
    newFormData.append("details", data.details);
    newFormData.append("file", data.file[0]);

    console.log(newFormData);

    // print newFormData items
    for (var pair of newFormData.entries()) {
      console.log(pair[0] + ": " + pair[1]);
    }

    window
      .fetch("https://kusanagi-api.herokuapp.com/api/books", {
        method: "POST",
        body: newFormData,
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.ok) {
          router.push("/app/books");
        } else {
          setError(res.errors);
        }
        console.log(res);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  };

  console.log(errors);

  return (
    <>
      <header className="flex flex-row items-center justify-between px-4 py-6 bg-gray-100">
        <Image src="/images/crisol.png" width={630 / 4} height={320 / 4} />
        <div className="flex flex-row items-center">
          <h1 className="text-2xl font-bold text-gray-700">Crear producto</h1>
        </div>
        <div>
          <button
            className="px-4 py-2 mr-8 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700"
            onClick={() => {
              router.push("/app/crisol/");
            }}
          >
            Ir a ventas
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
      <main className="flex flex-col items-center justify-center px-4 pb-6 bg-gray-100">
        <form className="w-9/12" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Nombre:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="nombre"
                id="nombre"
                {...register("name")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.name && errors?.name?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Precio:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="price"
                id="price"
                {...register("price")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.price && errors?.price?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Stock:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="stock"
                id="stock"
                {...register("stock")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.stock && errors?.stock?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Descripcion:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="description"
                id="description"
                {...register("description")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.description && errors?.description?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Editorial:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="publisher"
                id="publisher"
                {...register("publisher")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.publisher && errors?.publisher?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Imagen:
              <input
                type="file"
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="file"
                id="file"
                {...register("file")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.file && errors?.file?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              ISBN:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="ISBN"
                id="ISBN"
                {...register("ISBN")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.ISBN && errors?.ISBN?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Autor:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="author"
                id="author"
                {...register("author")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.author && errors?.author?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Código
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="code"
                id="code"
                {...register("code")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.code && errors?.code?.message}
            </span>
          </div>
          <div className="flex flex-col">
            <label className="flex flex-col mx-8 font-semibold text-black">
              Detalles:
              <input
                className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full outline-none focus:ring-2 focus:ring-blue-400 focus:border-transparent"
                name="details"
                id="details"
                {...register("details")}
              />
            </label>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {errors?.details && errors?.details?.message}
            </span>
          </div>
          <div className="flex flex-col items-center justify-center w-full">
            <button
              disabled={loading}
              className="px-4 py-2 mt-4 font-bold text-white bg-blue-600 rounded-md hover:bg-blue-700 disabled:bg-gray-400"
            >
              Crear producto
            </button>
            <span className="flex mt-2 ml-10 text-red-500 font-sm text-md">
              {error.map((err) => (
                <p key={err.message}>{err.message}</p>
              ))}
            </span>
          </div>
        </form>
      </main>
    </>
  );
}
