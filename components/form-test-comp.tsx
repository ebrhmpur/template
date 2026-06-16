"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWithoutDefaults,
  type TUpdateUsersSchema,
} from "@/lib/schemas/schema.users";
import "@/lib/schemas/_schema.client.init";
import { useState } from "react";

const FormTestComp = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    resolver: zodResolver(createWithoutDefaults),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const onSubmit = (data: TUpdateUsersSchema) => {
    console.log("done");
  };
  return (
    <div className={`${className} w-full`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-10"}
      >
        <input {...register("name")} placeholder={"نام"} />
        {errors.name && (
          <span className={"text-red-600"}>{errors.name.message}</span>
        )}
        <input {...register("email")} placeholder={"ایمیل"} />
        {errors.email && (
          <span className={"text-red-600"}>{errors.email.message}</span>
        )}
        <input type="file" />
        <button>{isSubmitting ? "در حال ارسال" : "ارسال"}</button>
      </form>
      {errors.form && (
        <span className={"text-2xl bg-red-300 rounded-2xl"}>
          {errors.form.message}
        </span>
      )}
    </div>
  );
};

export default FormTestComp;
