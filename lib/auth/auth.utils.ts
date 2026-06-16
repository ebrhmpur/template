// import { createUser, getSingleUserViaUserName } from "@/lib/DB/DB.users";
// import { Tctr } from "@/models/models.controller";
// import { compareHashed, hashString } from "@/lib/auth/auth.hashing";
// import { setToken } from "@/lib/auth/auth.tokens";
// import { Tuser } from "@/models/models.users";
//
// export const signIn = async (userName: string, password: string) => {
//   // initialize controller info object
//   const controllerInfo: Tctr<void> = { success: false };
//
//   // initialize holder object
//   const holder: {
//     getUserController?: Tctr<{ user: Tuser[] }>;
//     compareHashedController?: Tctr<void>;
//     setTokenController?: Tctr<void>;
//   } = {};
//
//   // if user with given credits doesn't exist, add {user does not exist} message and return
//   //- get user by credits
//   holder.getUserController = await getSingleUserViaUserName(userName);
//
//   //- if getting user was not successful, merge errors and return
//   if (!holder.getUserController.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         ...holder.getUserController.message?.errors,
//       },
//     };
//     return controllerInfo;
//   }
//
//   // if inputted password doesn't match database user password, add error
//   //- compare inputted password with user's DB password hash
//   holder.compareHashedController = await compareHashed(
//     password,
//     holder.getUserController.data!.user[0].password,
//   );
//
//   //- if comparing wasn't successful, merge errors and return
//   if (!holder.compareHashedController!.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         ...holder.compareHashedController!.message?.errors,
//       },
//     };
//     return controllerInfo;
//   }
//
//   // set cookie with user payload info
//   //- remove password from user object
//   const { password: pass, ...userRestObject } =
//     holder.getUserController.data!.user[0];
//
//   //- set cookie to user's device
//   holder.setTokenController = await setToken(userRestObject);
//
//   //-- if setting token was not successful, merge error messages and return
//   if (!holder.setTokenController.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         ...holder.setTokenController.message?.errors,
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
//       signIn: ["ورود به حساب کاربری با موفقیت انجام شد"],
//     },
//   };
//
//   // set controller success true
//   controllerInfo.success = true;
//
//   return controllerInfo;
// };
//
// export const signUp = async (userName: string, password: string) => {
//   // initialize controller object
//   const controllerInfo: Tctr<void> = { success: false };
//
//   // initialize holder object
//   const holder: {
//     userController?: Tctr<{ user: Tuser[] }>;
//     passwordHashingController?: Tctr<{ hashedString: string[] }>;
//     createUserController?: Tctr<void>;
//     getCreatedUserController?: Tctr<{ user: Tuser[] }>;
//     setTokenController?: Tctr<void>;
//   } = {};
//
//   // if user with inputted userName is already exist, add {user already exists} error message and return
//   //- get user via userName from db
//   holder.userController = await getSingleUserViaUserName(userName);
//
//   //- if getting user was successful (user exists), add error message and return
//   if (holder.userController.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         signUp: ["نام کاربری از قبل وجود دارد"],
//       },
//     };
//     return controllerInfo;
//   }
//
//   // hash password
//   holder.passwordHashingController = await hashString(password);
//
//   //- if hashing password was not successful, merge error messages and return
//   if (!holder.passwordHashingController!.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         ...holder.passwordHashingController?.message?.errors,
//       },
//     };
//     return controllerInfo;
//   }
//
//   // add new user to DB (with hashed password)
//   holder.createUserController = await createUser(
//     userName,
//     holder.passwordHashingController!.data!.hashedString[0],
//   );
//
//   //- if adding user to DB was not successful, merge messages and return
//   if (!holder.createUserController.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         ...holder.createUserController.message?.errors,
//       },
//     };
//     return controllerInfo;
//   }
//
//   // set token with created user info payload
//   //- create payload
//   //-- get created user info
//   holder.getCreatedUserController = await getSingleUserViaUserName(userName);
//
//   //--- if getting user was not successful, merge error messages and return
//   if (!holder.getCreatedUserController.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         ...holder.getCreatedUserController.message?.errors,
//       },
//     };
//     return controllerInfo;
//   }
//
//   //-- delete password from user object
//   const { password: pass, ...rest } =
//     holder.getCreatedUserController.data!.user[0];
//
//   //- set JWT token
//   holder.setTokenController = await setToken(rest);
//
//   //-- if setting JWT was not successful, merge error messages and return
//   if (!holder.setTokenController!.success) {
//     controllerInfo.message = {
//       ...controllerInfo.message,
//       errors: {
//         ...controllerInfo.message?.errors,
//         ...holder.setTokenController!.message?.errors,
//       },
//     };
//     return controllerInfo;
//   }
//
//   // add successful message to controller
//   controllerInfo.message = {
//     ...controllerInfo.message,
//     successes: { signUp: ["ثبت نام با موفقیت انجام شد"] },
//   };
//
//   // set controller success true
//   controllerInfo.success = true;
//
//   return controllerInfo;
// };
