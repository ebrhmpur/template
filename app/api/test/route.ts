import { NextRequest, NextResponse } from "next/server";
import {
  addDataToCtr,
  addMessageToCtr,
  createController,
  setSuccessCtr,
} from "@/lib/controller";

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{}> },
) => {
  // initial response object
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController();

  // get params from props
  const paramsObject = await params;

  // get data from req
  //- get searchParam
  const searchParamName = req.nextUrl.searchParams.get("");

  //- get cookie
  const tokenName = req.cookies.get("")?.value;

  // endpoint statements
  //- if ********* was / not successful / has error (), merge / add {} error, return / update controller / response

  // add ******* to controller
  addDataToCtr(controller, "", [{}]);

  // add successful message to controller
  addMessageToCtr(controller, "successes", "", [""]);

  // set controller success true
  setSuccessCtr(controller);

  // set controller as response body
  response.value = NextResponse.json({ controller });

  return response.value;
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{}> },
) => {
  // initial response object
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController();

  // get params from props
  const paramsObject = await params;

  // get data from req
  //- get searchParam
  const searchParamName = req.nextUrl.searchParams.get("");

  //- get body JSON
  //- if it's not exist, add message to controller
  const json = await (async () => {
    try {
      return await req.json();
    } catch (error) {
      addMessageToCtr(controller, "errors", "json", ["json does not exist"]);
      console.log(error);
    }
  })();

  if (!json) {
    response.value = NextResponse.json({ controller });
    return response.value;
  }

  //- get cookie
  const tokenName = req.cookies.get("")?.value;

  // endpoint statements
  //- if ********* was / not successful / has error (), merge / add {} error, return / update controller / response

  // add ******* to controller
  addDataToCtr(controller, "", []);

  // add successful message to controller
  addMessageToCtr(controller, "successes", "", [""]);

  // set controller success true
  setSuccessCtr(controller);

  // set controller as response body
  response.value = NextResponse.json({ controller });

  return response.value;
};

export const PUT = async (
  req: NextRequest,
  { params }: { params: Promise<{}> },
) => {
  // initial response object
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController();

  // get params from props
  const paramsObject = await params;

  // get data from req
  //- get searchParam
  const searchParamName = req.nextUrl.searchParams.get("");

  //- get body JSON
  //- if it's not exist, add message to controller
  const json = await (async () => {
    try {
      return await req.json();
    } catch (error) {
      addMessageToCtr(controller, "errors", "json", ["json does not exist"]);
      console.log(error);
    }
  })();

  if (!json) {
    response.value = NextResponse.json({ controller });
    return response.value;
  }

  //- get cookie
  const tokenName = req.cookies.get("")?.value;

  // endpoint statements
  //- if ********* was / not successful / has error (), merge / add {} error, return / update controller / response

  // add ******* to controller
  addDataToCtr(controller, "", []);

  // add successful message to controller
  addMessageToCtr(controller, "successes", "", [""]);

  // set controller success true
  setSuccessCtr(controller);

  // set controller as response body
  response.value = NextResponse.json({ controller });

  return response.value;
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: Promise<{}> },
) => {
  // initial response object
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController();

  // get params from props
  const paramsObject = await params;

  // get data from req
  //- get searchParam
  const searchParamName = req.nextUrl.searchParams.get("");

  //- get body JSON
  //- if it's not exist, add message to controller
  const json = await (async () => {
    try {
      return await req.json();
    } catch (error) {
      addMessageToCtr(controller, "errors", "json", ["json does not exist"]);
      console.log(error);
    }
  })();

  if (!json) {
    response.value = NextResponse.json({ controller });
    return response.value;
  }

  //- get cookie
  const tokenName = req.cookies.get("")?.value;

  // endpoint statements
  //- if ********* was / not successful / has error (), merge / add {} error, return / update controller / response

  // add ******* to controller
  addDataToCtr(controller, "", []);

  // add successful message to controller
  addMessageToCtr(controller, "successes", "", [""]);

  // set controller success true
  setSuccessCtr(controller);

  // set controller as response body
  response.value = NextResponse.json({ controller });

  return response.value;
};
