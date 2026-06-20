"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWithoutDefaults,
  type TUpdateUsersSchema,
} from "@/lib/schemas/schema.users";
import UiFormErrorComp from "@/components/_UI/ui-form-error-comp";
import React from "react";
import { resolveAppleWebApp } from "next/dist/lib/metadata/resolvers/resolve-basics";

const FormTestComp = ({ className }: { className?: string }) => {
  const [files, setFiles] = React.useState<File[] | null>(null);
  const {
    register,
    handleSubmit,
    setError,
    clearErrors,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateUsersSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(createWithoutDefaults),
    defaultValues: {},
  });

  const onSubmit = async (data: TUpdateUsersSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    const formData = new FormData();
    console.log(data);
  };
  const { onChange, ...fileFieldRegister } = register("file");
  const fileInputOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e);
    if (!e.target.files) return;
    setFiles(Object.entries(e.target.files).map(([key, value]) => value));
  };
  const deleteFileHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    index: string,
  ) => {
    e.preventDefault();

    setFiles((prev) => {
      if (!prev) return null;

      return prev.filter((_, i) => i !== Number(index));
    });
  };
  console.log(files);
  return (
    <div className={`${className} w-full`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-10"}
      >
        <input {...register("name")} placeholder={"نام"} />
        {errors.name && <UiFormErrorComp message={errors.name.message!} />}
        <input {...register("email")} placeholder={"ایمیل"} />
        {errors.email && <UiFormErrorComp message={errors.email.message!} />}
        <label
          htmlFor={"file"}
          className={"bg-yellow-50 text-center py-2 rounded-2xl cursor-pointer"}
        >
          انتخاب فایل
        </label>
        {files &&
          Object.entries(files).map(([key, value]) => (
            <div key={key}>
              fafsda
              <span>{value.name}</span>
              <div className="w-1/7 relative">
                <img
                  alt={"selected-file"}
                  src={URL.createObjectURL(value)}
                  width={100}
                  height={100}
                />
                <div
                  onClick={(e) => deleteFileHandler(e, key)}
                  className={
                    "bg-red-200 text-red-700 p-2 rounded-full w-min absolute top-[-15] right-[-10] bold text-xl"
                  }
                >
                  x
                </div>
              </div>
            </div>
          ))}
        {errors.file && <UiFormErrorComp message={errors.file.message!} />}
        <input
          type="file"
          id={"file"}
          multiple
          {...fileFieldRegister}
          onChange={fileInputOnChange}
          className={"hidden"}
        />
        <button disabled={isSubmitting}>
          {isSubmitting ? "در حال ارسال" : "ارسال"}
        </button>
      </form>
      {errors.form && <UiFormErrorComp message={errors.form.message!} />}
    </div>
  );
};

export default FormTestComp;
