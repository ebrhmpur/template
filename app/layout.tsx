import "./globals.css";
import React, { Suspense } from "react";
import { z } from "zod";
import { errorMap } from "@/lib/schemas/_schema.errorMap";
import localFont from "next/font/local";
import type { Metadata } from "next";
import ZodCustomErrorMapComp from "@/components/_Wrappers/zod-custom-errorMap-comp";

z.config({
  customError: errorMap,
});

// export const generateMetadata = (): Metadata => {
//   return {
//     title:{default:"",template:"%s"},
//     applicationName: "",
//     icons:[""],
//     appleWebApp: {
//       title: "",
//       capable: true,
//       startupImage: "",
//       statusBarStyle: "black-translucent",
//     },
//     other:{}
//   };
// };

// const font_name = localFont({
//   variable: "--font-font_Name",
//   src: [
//     {
//       path: "",
//       weight: "200",
//     },
//     {
//       path: "",
//       weight: "400",
//     },
//     {
//       path: "",
//       weight: "600",
//     },
//   ],
// });

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir={`rtl`}>
      <body className={`/*font_name.className*/ font-font_name antialiased`}>
        <ZodCustomErrorMapComp>
        <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </ZodCustomErrorMapComp>
      </body>
    </html>
  );
}
