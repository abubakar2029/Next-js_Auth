"use client";
import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";
import { useState } from "react";

type Inputs = {
  email: string;
  password: string;
};
function page() {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>();

  const [err, setError] = useState<any>();
  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    const email = data.email;
    console.log("Form email", email);
    const password = data.password;
    console.log("Form password", password);
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });
      if (res.status === 400) {
        setError("This Email is already registered");
      } else if (res.status === 200) {
        setError("");
        router.push("/login");
      }
    } catch (err) {
      setError("Error try again");
    }
  };
  console.log(err);

  return (
    <div className="bg-slate-500 flex justify-center flex-col items-center">
      {/* "handleSubmit" will validate your inputs before invoking "onSubmit" */}
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          defaultValue="@gmail.com"
          type="email"
          {...register("email")}
          className="block my-2 pl-1"
        />
        <input
          type="password"
          {...register("password", { required: true })}
          className="block my-2 pl-1"
        />
        {errors.password && <span>This field is required</span>}
        <input
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 rounded"
        />
      </form>
      <div className="text-center mt-4">-OR-</div>
      <div className="block text-center text-blue-500 hover:underline mt-2">
        <Link href="/login">Login with an existing account</Link>
      </div>
    </div>
  );
}

export default page;
// mongodb+srv://abubakar:<password>@cluster0.kwwt0up.mongodb.net/?retryWrites=true&w=majority
