import { NextRequest, NextResponse } from "next/server";

export const proxy = async (request: NextRequest) => {
  // // get pathname
  // const pathName = request.nextUrl.pathname;
  // console.log(pathName === "/login");
  //
  // // if access token doesn't exist, redirect user
  // //- verify token
  // const verifyTokenApiRes = await verifyToken();
  //
  // //- create url
  // const url = new URL("/bolboli", request.url);
  //
  // //- if token doesn't exist, redirect
  // if (!verifyTokenApiRes.success) {
  //   return NextResponse.redirect(url);
  // }
};

export const config = {
  matcher: ["/admin/:path*"],
};
