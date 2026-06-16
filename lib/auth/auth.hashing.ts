// import { hash, compare, genSalt } from "bcrypt";
// import { Tctr } from "@/models/models.controller";
// import { createController } from "@/lib/controller";
//
// export const hashString = async (string: string) => {
//   // initial controller info object
//   const controllerInfo: Tctr<{ hashedString: string[] }> = { success: false };
//
//   // initial holder object
//   const holder: { hashStringController?: string } = {};
//
//   // hash password with salt
//   // if hashing password has error, add {خطا در رمز گذاری} error message and return
//   try {
//     holder.hashStringController = await hash(string, await genSalt());
//   } catch (error) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         bcrypt: ["خطا در رمز گذاری"],
//       },
//     };
//     console.log(error);
//     return controllerInfo;
//   }
//
//   // add hashed string to controller
//   controllerInfo.data = {
//     ...controllerInfo.data,
//     hashedString: [holder.hashStringController],
//   };
//
//   // add successful message to controller
//   controllerInfo.message = {
//     ...controllerInfo.message,
//     successes: {
//       ...controllerInfo.message?.successes,
//       bcrypt: ["داده با موفقیت رمزگذاری شد"],
//     },
//   };
//
//   // set controller success true
//   controllerInfo.success = true;
//
//   return controllerInfo;
// };
//
// export const compareHashed = async (plainText: string, hashed: string) => {
//   // initial controller info object
//   const controller = createController();
//
//   // compare plaintext and hashed
//   //- if comparing has error, add {خطا در مطابقت} error message and return
//   const result = await (async () => {
//     try {
//       return await compare(plainText, hashed);
//     } catch (error) {
//       controller.addMessage("errors", "compare", ["not compare"]);
//     }
//   })();
//   if (!result) {
//   }
//
//   // if comparing was not successful, add {محتوا مطابقت ندارد} error message and return
//   if (!holder.isMatch) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         compareHash: ["محتوا مطابقت ندارد"],
//       },
//     };
//     return controllerInfo;
//   }
//
//   // add successful message to controller
//   controllerInfo.message = {
//     ...controllerInfo.message,
//     successes: {
//       ...controllerInfo.message?.successes,
//       compareHash: ["محتوا مطابقت دارد"],
//     },
//   };
//
//   // set controller success true
//   controllerInfo.success = true;
//
//   return controllerInfo;
// };
