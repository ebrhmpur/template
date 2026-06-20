import { z } from "zod";
import { createInsertSchema } from "drizzle-zod";
import { users } from "@/lib/DB/_DB.schemas";
import { $RefinementCtx } from "zod/v4/core";

// global callbacks
//- sanitize string
const sanitizeString = (v: string) =>
  v
    .normalize("NFKC")
    .replace(/[\u0000-\u001F\u007F]/g, "")
    .replace(/[\u202A-\u202E\u2066-\u2069]/g, "")
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .replace(/[\u0080-\u009F]/g, "")
    .trim()
    .replace(/\s+/g, " ");

//- file validations
const validatePicture = (v: File, ctx: $RefinementCtx) => {
  // محل verify کردن کامل فایل
  if (!v) {
    ctx.addIssue({
      code: "custom",
      path: ["file"],
      message: "انتخاب فایل الزامیست",
    });
  }

  console.log(v);
  // if (v && !v[0].type.startsWith("image")) {
  //   ctx.addIssue({
  //     code: "custom",
  //     path: ["file"],
  //     message: "تنها فایل عکس قابل بارگزاریست",
  //   });
  // }
};

// define main schemas
//- insert schema
const userSchema = createInsertSchema(users, {
  name: (s) =>
    s.min(3).max(20).transform(sanitizeString).pipe(z.string().min(3)),
  email: (s) => s.transform(sanitizeString).pipe(z.email().min(3).max(100)),
}).strict();

// define picked schemas
export const createWithoutDefaults = userSchema
  .pick({ name: true, email: true })
  .extend({ file: z.custom<File>().optional() })
  .superRefine((data, ctx) => {
    // add multi-related-field / custom validation errors
    if (data.name == data.email) {
      ctx.addIssue({
        code: "custom",
        path: ["form"],
        message: "نام کاربری و ایمیل دقیقا مشابه یکدیگر هستند",
      });
    }
    if (data.file) {
      validatePicture(data.file, ctx);
    }
  });

// export schema type
export type TUpdateUsersSchema = z.output<typeof createWithoutDefaults>;
