// import { verify, sign, JwtPayload } from "jsonwebtoken";
// import { Tuser } from "@/models/models.users";
// import { cookies } from "next/headers";
// import { Tctr } from "@/models/models.controller";
//
// export const setToken = async (payload: Omit<Tuser, "password">) => {
//   // initialize controller info object
//   const controllerInfo: Tctr<void> = { success: false };
//
//   // initialize holder object
//   const holder: {
//     payload?: Omit<Tuser, "password">;
//     secret?: string;
//     token?: string;
//   } = {};
//
//   // if token cookie already exists, add {توکن از قبل وجود دارد} error message and return
//   if ((await cookies()).get("access-token")) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         JWT: ["توکن از قبل وجود دارد"],
//       },
//     };
//     return controllerInfo;
//   }
//
//   // set token with inputted payload
//   //- create payload object with inputted object
//   holder.payload = payload;
//
//   //- get JWT SECRET
//   holder.secret = process.env.JWT_SECRET;
//
//   //-- if JWT SECRET does not exist, add {متغیر محیطی وجود ندارد} error message and return
//   if (!holder.secret) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         JWT: ["متغیر محیطی وجود ندارد"],
//       },
//     };
//     return controllerInfo;
//   }
//
//   //- sign token using payload
//   holder.token = sign(holder.payload, holder.secret, { expiresIn: "3d" });
//
//   //- set token to cookie
//   //-- if setting token was not successful, add {خطا در ایجاد توکن} error message and return
//   try {
//     (await cookies()).set("access-token", holder.token, {
//       secure: true,
//       sameSite: true,
//       httpOnly: true,
//       maxAge: 3 * 24 * 3600 * 1000,
//     });
//   } catch (error) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         setToken: ["خطا در ایجاد توکن"],
//       },
//     };
//     console.log(error);
//     return controllerInfo;
//   }
//
//   // add successful message to controller
//   controllerInfo.message = {
//     ...controllerInfo.message,
//     successes: { JWT: ["توکن با موفقیت ایجاد شد"] },
//   };
//
//   // set controller success true
//   controllerInfo.success = true;
//
//   return controllerInfo;
// };
//
// export const verifyToken = async () => {
//   // initialize controller info object
//   const controllerInfo: Tctr<{ JWTVerify: JwtPayload[] }> = { success: false };
//
//   // initialize holder object
//   const holder: {
//     accessToken?: string;
//     JWTPayload?: JwtPayload | string;
//     secret?: string;
//   } = {};
//
//   // get access token
//   holder.accessToken = (await cookies()).get("access-token")?.value;
//
//   //- if access token does not exist, add {خطا در احراز توکن} error message and return
//   if (!holder.accessToken) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         JWTVerify: ["خطا در احراز توکن"],
//       },
//     };
//     console.log("access token does not exist");
//     return controllerInfo;
//   }
//
//   // verify token
//   //- get JWT SECRET
//   holder.secret = process.env.JWT_SECRET;
//
//   //-- if JWT SECRET does not exist ,add {متغیر محیطی JWT SECRET وجود ندارد} error message and return
//   if (!holder.secret) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: { JWTVerify: ["متغیر محیطی JWT SECRET وجود ندارد"] },
//     };
//     return controllerInfo;
//   }
//
//   //- if verifying JWT has error ,add {خطا در احراز توکن} error message and return
//   try {
//     holder.JWTPayload = verify(holder.accessToken, holder.secret) as JwtPayload;
//   } catch (error) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         JWTVerify: ["خطا در احراز توکن"],
//       },
//     };
//     console.log(error);
//     return controllerInfo;
//   }
//
//   // add payload data controller
//   controllerInfo.data = {
//     ...controllerInfo.data,
//     JWTVerify: [holder.JWTPayload],
//   };
//
//   // add successful message to controller
//   controllerInfo.message = {
//     ...controllerInfo.message,
//     successes: { JWTVerify: ["احراز توکن با موفقیت انجام شد"] },
//   };
//
//   // set controller success true
//   controllerInfo.success = true;
//
//   return controllerInfo;
// };
//
// export const deleteToken = async () => {
//   // initialize controller info object
//   const controllerInfo: Tctr<void> = { success: false };
//
//   // if access token cookie does not exist, add {token is not exist} error message and return
//   if (!(await cookies()).get("access-token")) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         clearToken: ["توکن وجود ندارد"],
//       },
//     };
//     return controllerInfo;
//   }
//
//   // delete cookie
//   //- if deleting cookie was not successful, add {خطا در خذف توکن} and return
//   try {
//     (await cookies()).delete("access-token");
//   } catch (error) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         deleteToken: ["خطا در خذف توکن"],
//       },
//     };
//     console.log(error);
//     return controllerInfo;
//   }
//
//   // add successful message to controller
//   controllerInfo.message = {
//     ...controllerInfo.message,
//     successes: {
//       ...controllerInfo.message?.successes,
//       clearToken: ["خروج از حساب کاربری با موفقیت انجام شد"],
//     },
//   };
//
//   // set controller success true
//   controllerInfo.success = true;
//
//   return controllerInfo;
// };
