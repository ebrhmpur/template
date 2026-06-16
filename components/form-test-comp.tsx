"use client";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWithoutDefaults,
  type TUpdateUsersSchema,
} from "@/lib/schemas/schema.users";
import "@/lib/schemas/_schema.client.init";
import Image from "next/image";

const FormTestComp = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateUsersSchema>({
    resolver: zodResolver(createWithoutDefaults),
    mode: "onSubmit",
    reValidateMode: "onSubmit",
  });
  const file = watch("file")?.[0];
  const onSubmit = async (data: TUpdateUsersSchema) => {};
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
        <label
          htmlFor={"file"}
          className={"bg-yellow-50 text-center py-2 rounded-2xl cursor-pointer"}
        >
          انتخاب فایل
        </label>
        {file && <span>{file.name}</span>}
        {file && (
          <Image
            alt={"selected-file"}
            src={URL.createObjectURL(file)}
            width={100}
            height={100}
          />
        )}
        {errors.file && (
          <span className={"text-red-600"}>{errors.file.message}</span>
        )}
        <input
          type="file"
          id={"file"}
          {...register("file")}
          className={"hidden"}
        />
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
