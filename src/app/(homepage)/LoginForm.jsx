"use client";

import React from "react";
import InputText from "../../components/input/InputText";
import InputPassword from "../../components/input/InputPassword";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { useForm } from "react-hook-form";

function LoginForm() {
  const form = useForm({ defaultValues: { email: "", password: "" } });
  const { register, handleSubmit, formState } = form;

  const onSubmit = async (data) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="p-3 space-y-2" onSubmit={handleSubmit(onSubmit)}>
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
            <Spinner />
            <span>Login</span>
          </div>
        </Button>
      </div>
    </form>
  );
}

export default LoginForm;
