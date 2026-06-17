"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWithoutDefaults,
  type TUpdateUsersSchema,
} from "@/lib/schemas/schema.users";
import UiFormErrorComp from "@/components/_UI/ui-form-error-comp";
import Image from "next/image";

const FormTestComp = ({ className }: { className?: string }) => {
  const {
    register,
    handleSubmit,
    watch,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<TUpdateUsersSchema>({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(createWithoutDefaults),
    defaultValues: {},
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
        {errors.name && <UiFormErrorComp message={errors.name.message!} />}
        <input {...register("email")} placeholder={"ایمیل"} />
        {errors.email && <UiFormErrorComp message={errors.email.message!} />}
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
        {errors.file && <UiFormErrorComp message={errors.file.message!} />}
        <input
          type="file"
          id={"file"}
          {...register("file")}
          className={"hidden"}
        />
        <button>{isSubmitting ? "در حال ارسال" : "ارسال"}</button>
      </form>
      {errors.form && <UiFormErrorComp message={errors.form.message!} />}
    </div>
  );
};

export default FormTestComp;
