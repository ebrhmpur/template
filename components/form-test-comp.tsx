"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  createWithoutDefaults,
  type TUpdateUsersSchema,
} from "@/lib/schemas/schema.users";
import UiFormErrorComp from "@/components/_UI/ui-form-error-comp";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { TCtr } from "@/lib/controller";
import { TDBReadUserByIdResult } from "@/lib/DB/DB.users";

const FormTestComp = ({ className }: { className?: string }) => {
  // init states
  //- loading
  const [loading, setLoading] = useState<boolean>(true);

  //- existing files
  const [existingFiles, setExistingFiles] = useState<
    { id: number; url: string }[]
  >([]);

  //- new files
  const [newFiles, setNewFiles] = useState<File[]>([]);

  //- deleted files
  const [deletedFileIds, setDeletedFileIds] = useState<number[]>([]);

  //- previews
  const [previews, setPreviews] = useState<string[]>([]);

  // init form
  const {
    register,
    handleSubmit,
    setValue,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm({
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    resolver: zodResolver(createWithoutDefaults),
    defaultValues: {},
  });

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
      const result = (await (
        await fetch(`/api/users/${"1"}`)
      ).json()) as TDBReadUserByIdResult;
      console.log(result);
      reset({
        name: result.data.user?.[0].name,
      });

      // set file default value from database
      if (result.data.user?.[0].avatarUrl) {
        setExistingFiles(
          result.data.user[0].avatarUrl.map((fileUrl, index) => ({
            id: index,
            url: `api/files/${fileUrl}`,
          })),
        );
      }
      setLoading(false);
    })();
  }, [reset]);

  // create thumbnail preview for files
  useEffect(() => {
    if (newFiles.length < 0) {
      setPreviews([]);
      return;
    }

    (async () => {
      const newPreviews = await Promise.all(
        Object.entries(newFiles).map(async ([_, file]) => {
          if (file.type.startsWith("image/")) {
            return URL.createObjectURL(file);
          }

          if (file.type.startsWith("video/")) {
            return await generateVideoThumbnail(file);
          }

          return "";
        }),
      );

      setPreviews(newPreviews);
    })();
    return () => {
      previews.forEach((preview) => {
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, [newFiles]);

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
    const newInputFiles = e.target.files
      ? Object.entries(e.target.files).map(([_, file]) => file)
      : [];

    setNewFiles((prev) => [...prev, ...newInputFiles]);

    setValue("file", [...newFiles], {
      shouldValidate: true,
    });
  };

  // declare onSubmit function
  const onSubmit = async (data: TUpdateUsersSchema) => {
    // convert data to formData
    const formData = new FormData();

    Object.entries(data).map(([key, value]) => {
      if (Array.isArray(value)) {
        value.forEach((item) => {
          formData.append(key, item);
        });
      } else if (value != null) {
        formData.append(key, value);
      }
    });

    // send formData to endpoint
    const result: TCtr = await (
      await fetch(`/api/files/test`, {
        method: "POST",
        body: formData,
      })
    ).json();

    console.log(result);
    // if ************, add error to RHF input
    if (!result.success) {
      setError("name", {
        message: "نام تکراری است",
      });
    }
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
        {files &&
          Object.entries(files).map(([key, value], index) => (
            <div key={key}>
              <span>{value.name}</span>
              <div className="w-1/7 relative">
                {previews[index] && (
                  <Image
                    alt={"selected-file"}
                    src={previews[index]}
                    width={100}
                    height={100}
                  />
                )}
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
