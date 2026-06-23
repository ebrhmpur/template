import { NextRequest, NextResponse } from "next/server";
import { createController } from "@/lib/controller";
import { DBGetTestDatabase } from "@/lib/DB/DB.test";
import { decodeFromBase64 } from "next/dist/build/webpack/loaders/utils";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{}> },
) => {
  // initial response object
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController("test");

  // get params from props
  const paramsObject = await params;

  // get data from req
  //- get searchParam
  const searchParamName = req.nextUrl.searchParams.get("");

  //- get cookie
  const tokenName = req.cookies.get("")?.value;

  //- get data
  const data = await DBGetTestDatabase();

  // endpoint statements
  //- if ********* was / not successful / has error (), merge / add {} error, return / update controller / response
  if (!data.success) {
    controller.merge(data);
    const result = controller.get();
    response.value = NextResponse.json({ ...result });
    return response.value;
  }

  // add ******* to controller
  controller.merge(data);
  const result = controller.get();

  // add successful message to controller

  // set controller success true

  // set controller as response body
  response.value = NextResponse.json({ ...result });

  return response.value;
};
