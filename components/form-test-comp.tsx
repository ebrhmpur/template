"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWithoutDefaults,
  type TUpdateUsersSchema,
} from "@/lib/schemas/schema.users";
import UiFormErrorComp from "@/components/_UI/ui-form-error-comp";
import React, { useEffect, useState } from "react";
import { actionGetUserDetails } from "@/lib/actions/action.getUserDetails";
import Image from "next/image";

const FormTestComp = ({ className }: { className?: string }) => {
  // init states
  //- previews
  const [previews, setPreviews] = useState<string[]>([]);

  //- loading
  const [loading, setLoading] = useState<boolean>(true);

  // init form
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(createWithoutDefaults),
    defaultValues: {},
  });

  // watch file input
  const files = watch("file");

  // declare generate video thumbnail function
  const generateVideoThumbnail = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const video = document.createElement("video");
      const canvas = document.createElement("canvas");
      const context = canvas.getContext("2d");

      video.src = URL.createObjectURL(file);
      video.crossOrigin = "anonymous";
      video.muted = true;
      video.playsInline = true;

      video.onloadedmetadata = () => {
        video.currentTime = 3;
      };

      video.onseeked = () => {
        canvas.width = video.videoWidth;
        canvas.height = video.videoHeight;

        context?.drawImage(video, 0, 0, canvas.width, canvas.height);

        const thumbnail = canvas.toDataURL("image/png");
        URL.revokeObjectURL(video.src);

        resolve(thumbnail);
      };

      video.onerror = (err) => {
        reject(err);
      };
    });
  };

  // set input default values from database
  useEffect(() => {
    (async () => {
      const result = await actionGetUserDetails(1);
      reset({
        name: result.data.user?.[0].name,
      });
      if (result.data.user?.[0].avatarUrl) {
        // setPreviews(
        //   Array.from(`../storage/pictures/${result.data.user?.[0].avatarUrl}`),
        // );
        console.log(result.data.user?.[0].avatarUrl);
      }
      setLoading(false);
    })();
  }, [reset]);

  // create thumbnail preview for selected files
  // useEffect(() => {
  //
  //   })();
  // }, [files]);

  // declare delete file from selected files input function
  const deleteFileHandler = (
    e: React.MouseEvent<HTMLDivElement>,
    index: string,
  ) => {
    const currentFiles = watch("file") || [];
    const newFiles = currentFiles.filter((_, i) => i !== Number(index));

    setValue("file", newFiles, { shouldValidate: true });
  };

  // declare file input onChange function
  const fileInputOnChange = (
    e: React.ChangeEvent<HTMLInputElement, HTMLInputElement>,
  ) => {
    const selectedFiles = Array.from(e.target.files || []);
    const currentFiles = watch("file") || [];
    if (!files || files.length === 0) {
      setPreviews([]);
      return;
    }

    (async () => {
      const newPreviews: string[] = [];

      for (const file of files) {
        if (file.type.startsWith("image/")) {
          newPreviews.push(URL.createObjectURL(file));
        } else if (file.type.startsWith("video/")) {
          const thumbnail = await generateVideoThumbnail(file);
          newPreviews.push(thumbnail);
        }
      }

      setPreviews(newPreviews);
      console.log(previews);
    })();

    setValue("file", [...currentFiles, ...selectedFiles], {
      shouldValidate: true,
    });
  };

  // declare onSubmit function
  const onSubmit = async (data: TUpdateUsersSchema) => {
    await new Promise((resolve) => setTimeout(resolve, 3000));
    console.log(data);
  };

  return (
    <div className={`${className} w-full`}>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className={"flex flex-col gap-10"}
      >
        <input
          className={`${loading && "animate-pulse"}`}
          {...register("name")}
          placeholder={"نام"}
          disabled={loading}
        />
        {errors.name && <UiFormErrorComp message={errors.name.message!} />}
        <input
          {...register("email")}
          placeholder={"ایمیل"}
          disabled={loading}
        />
        {errors.email && <UiFormErrorComp message={errors.email.message!} />}
        <input
          type="file"
          id={"file"}
          multiple
          className={"hidden"}
          onChange={fileInputOnChange}
        />
        <label
          htmlFor={"file"}
          className={"bg-yellow-50 text-center py-2 rounded-2xl cursor-pointer"}
        >
          انتخاب فایل
        </label>
        {previews &&
          Object.entries(previews).map(([key, value], index) => (
            <div key={key}>
              {/*<span>{value.name}</span>*/}
              <div className="w-1/7 relative">
                <Image
                  alt={"selected-file"}
                  src={previews[index]}
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
        <button disabled={isSubmitting}>
          {isSubmitting ? "در حال ارسال" : "ارسال"}
        </button>
      </form>
      {errors.form && <UiFormErrorComp message={errors.form.message!} />}
    </div>
  );
};

export default FormTestComp;
