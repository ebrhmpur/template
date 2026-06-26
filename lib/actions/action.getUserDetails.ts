"use server";

import { createController } from "@/lib/controller";
import { DBReadUserById } from "@/lib/DB/DB.users";

export const actionGetUserDetails = async (
  id: number,
): Promise<typeof result> => {
  const controller = createController("actionGetUserDetails");
  const result = await DBReadUserById(id);
  controller.merge(result);
  return controller.get();
};
