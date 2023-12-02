"use client";

import React from "react";
import InputText from "../../components/input/InputText";
import InputPassword from "../../components/input/InputPassword";
import Button from "../../components/Button";
import Spinner from "../../components/Spinner";
import { useForm } from "react-hook-form";
import { authRegister } from "../../services/auth";

const defaultValues = {
  transporter_name: "",
  email: "",
  password: "",
  password_confirmation: "",
};

function RegisterForm() {
  const form = useForm({ defaultValues });
  const { register, handleSubmit, formState } = form;
  const { isSubmitting, errors } = formState;

  const onSubmit = async (data) => {
    try {
      await authRegister(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form className="p-3 space-y-2" onSubmit={handleSubmit(onSubmit)}>
      <InputText
        id="name"
        label="Name"
        placeholder="Name"
        {...register("transporter_name", { required: "Name is required" })}
        error={errors?.transporter_name?.message}
      />
      <InputText
        id="email"
        label="Email"
        placeholder="Email"
        {...register("email", { required: "Email is required" })}
        error={errors?.email?.message}
      />
      <InputPassword
        id="password"
        label="Password"
        placeholder="Password"
        {...register("password", { required: "Password is required" })}
        error={errors?.password?.message}
      />
      <InputPassword
        id="password_confirmation"
        label="Repeat Password"
        placeholder="Repeat Password"
        {...register("password_confirmation", {
          required: "Repeat the password",
          validate: {
            notSame: (val, form) =>
              val === form?.password || "Please repeat the same password",
          },
        })}
        error={errors?.password_confirmation?.message}
      />
      <div className="flex justify-end">
        <Button disabled={isSubmitting} type="submit" color="white">
          <div className="flex items-center space-x-2">
            {isSubmitting && <Spinner />}
            <span>Register</span>
          </div>
        </Button>
      </div>
    </form>
  );
}

export default RegisterForm;
