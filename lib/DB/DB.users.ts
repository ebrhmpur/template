import { db } from "@/lib/DB/_DB.init";
import { users } from "@/lib/DB/_DB.schemas";
import { createController } from "@/lib/controller";
import { TCtr } from "@/lib/controller";
import { validateSchema } from "@/lib/schemas/_schema.validate";
import {
  TUpdateUsersSchema,
  createWithoutDefaults,
} from "@/lib/schemas/schema.users";
import { and, eq } from "drizzle-orm";

// create
export const DBCreateUser = async (name: string, email: string) => {
  const controller = createController("createUser");
  const result = await (async () => {
    try {
      return await db.insert(users).values({
        name,
        email,
      });
    } catch (error) {
      console.log(error);
    }
  })();

  if (!result) {
    controller.addMessage("errors", ["خطا در ساخت کاربر"]);
    return controller.get();
  }

  controller.addMessage("successes", ["کاربر با موفقیت ساخته شد"]);

  return controller.get();
};

// update by id
export const DBUpdateUserById = async (
  id: number,
  values: TUpdateUsersSchema,
): Promise<TCtr<{ user?: typeof result }>> => {
  const controller = createController("updateUser");

  const validatedRes = await validateSchema(createWithoutDefaults, values);

  if (!validatedRes.data.result) {
    controller.merge(validatedRes);
    return controller.get();
  }

  const result = await (async () => {
    try {
      return await db
        .update(users)
        .set(validatedRes.data.result![0])
        .where(eq(users.id, id))
        .returning();
    } catch (error) {
      console.log(error);
    }
  })();

  if (!result || result.length < 1) {
    controller.addMessage("errors", ["خطا در به روزرسانی کاربر"]);
    return controller.get();
  }

  controller.addData("user", result);

  controller.addMessage("successes", ["به روزرسانی کاربر با موفقیت انجام شد"]);

  return controller.get();
};

// read by uniques
export const DBReadUsers = () => {};
export const DBReadUserById = () => {};
export const DBReadUserByUserName = () => {};
export const DBReadUserByUserEmail = () => {};
export const DBReadUserByUserPhone = () => {};

// delete by id
export const DBDeleteUserById = () => {};
