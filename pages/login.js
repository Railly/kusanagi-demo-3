import Logo from "components/_icons/Logo";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  DNI: yup
    .string()
    .matches(/^\d{8}$/, "El DNI deben ser 8 digitos")
    .required("El DNI es requerido"),
});

export default function Home() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const user = JSON.parse(window.localStorage.getItem("user"));
    if (user) {
      if (user.numero === "71239256") {
        router.push("/app/crisol");
      } else if (user.numero === "74884978") {
        router.push("/app/phantom");
      } else {
        router.push("/app/");
      }
    }
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    console.log(data);
    window
      .fetch(`https://apiperu.dev/api/dni/${data.DNI}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer c8ca985e96201375ab24e3c0f4e2dda4bdefb43e452aa621dfc7482b20ba3f05`,
        },
      })
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          window.localStorage.setItem("user", JSON.stringify(res.data));
          if (res.data.numero === "71239256") {
            router.push("/app/crisol");
          } else if (res.data.numero === "74884978") {
            router.push("/app/phantom");
          } else {
            router.push("/app/");
          }
        } else {
          setError(res.message);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
        setError(err.message);
      });
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen text-black-200 bg-purple-50 ">
      <Logo className="w-1/2 h-20 " />
      <h1 className="h-12 text-xl">Es momento de comprar de manera virtual</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label className="flex flex-col font-semibold text-black">
            DNI:
            <input
              className="px-4 py-2 mt-2 text-black border border-gray-400 rounded-full"
              name="DNI"
              id="DNI"
              {...register("DNI")}
            />
          </label>
          <span className="flex ml-2 text-red-500 font-sm text-md">
            {error && error}
            <br />
            {errors?.DNI && errors?.DNI?.message}
          </span>
        </div>
        <button
          className="px-20 py-2 mt-2 font-bold text-white bg-purple-600 rounded-full hover:bg-purple-700 focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Iniciar Session
        </button>
      </form>
    </div>
  );
}
