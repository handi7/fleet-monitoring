"use client";

import React, { useState } from "react";
import InputText from "../../components/input/InputText";
import InputPassword from "../../components/input/InputPassword";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { useForm } from "react-hook-form";
import { authLogin } from "../../services/auth";
import { IoIosAlert } from "react-icons/io";
import { useRouter } from "next/navigation";

function LoginForm() {
  const router = useRouter();

  const form = useForm({ defaultValues: { email: "", password: "" } });
  const { register, handleSubmit, formState } = form;

  const [errMsg, setErrMsg] = useState("");

  const onSubmit = async (data) => {
    try {
      setErrMsg("");
      await authLogin(data);
      router.push("/fleet-monitoring");
    } catch (error) {
      setErrMsg("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <form className="p-3 space-y-2" onSubmit={handleSubmit(onSubmit)}>
      {!!errMsg && (
        <div className="flex items-center space-x-2 bg-red-200 text-red-700 rounded-lg px-2 py-1">
          <IoIosAlert />
          <span className="text-sm">{errMsg}</span>
        </div>
      )}
      <InputText
        id="email"
        label="Email"
        placeholder="Email"
        {...register("email", { required: true })}
      />
      <InputPassword
        id="password"
        label="Password"
        placeholder="Password"
        {...register("password", { required: true })}
      />
      <div className="flex justify-end">
        <Button type="submit" color="white">
          <div className="flex items-center space-x-2">
            {formState?.isSubmitting && <Spinner />}
            <span>Login</span>
          </div>
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
