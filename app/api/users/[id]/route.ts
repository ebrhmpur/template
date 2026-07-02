import { NextRequest, NextResponse } from "next/server";
import { createController } from "@/lib/controller";
import { TUpdateUsersSchema } from "@/lib/schemas/schema.users";
import { DBReadUserById } from "@/lib/DB/DB.users";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) => {
  // initial response object (use for set cookies)
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController("getUserFiles");

  //***** get data from request *****
  // get params from props
  const { id } = await params;

  // get searchParam
  const searchParamName = req.nextUrl.searchParams.get("");

  // get cookie
  const tokenName = req.cookies.get("")?.value;

  // get JSON
  const json = req.headers.get("content-type")?.includes("application/json")
    ? await (async () => {
        try {
          return await req.json();
        } catch (error) {
          console.log(error);
        }
      })()
    : "";

  // if JSON does not exist, break
  // if (!json) {
  //   controller.addMessage("errors", ["json does not exist"]);
  //   return NextResponse.json(controller.get());
  // }

  // get form data
  const formData = req.headers
    .get("content-type")
    ?.includes("multipart/form-data")
    ? await (async () => {
        try {
          return await req.formData();
        } catch (error) {
          console.log(error);
        }
      })()
    : "";

  const formDataObject = formData
    ? (Object.fromEntries(formData.entries()) as Partial<TUpdateUsersSchema>)
    : "";

  // if formDataObject does not exist, break
  // if (!formDataObject) {
  //   controller.addMessage("errors", ["formData does not exist"]);
  //   return NextResponse.json(controller.get());
  // }

  //***** endpoint statements ******
  const result = await DBReadUserById(Number(id));

  // if ******* , break

  // ################
  // merge controller
  controller.merge(result);

  // --------- OR ---------

  // add data to controller

  // add successful message to controller
  // ################

  // set controller as response body
  response.value = NextResponse.json(controller.get());

  return response.value;
};
