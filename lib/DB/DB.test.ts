import { createController } from "@/lib/controller";

export const DBGetTestDatabase = async () => {
  const controller = await createController("test");
  await new Promise((resolve) => setTimeout(resolve, 3000));
  controller.addData("data", [{ id: 1, name: "test1" }]);
  controller.addMessage("successes", ["data was fetched"]);
  return controller.get();
};
