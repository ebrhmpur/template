import { NextRequest, NextResponse } from "next/server";
import { createController, TCtr } from "@/lib/controller";
import { createReadStream } from "node:fs";
import { access, writeFile } from "node:fs/promises";
import path from "node:path";
import { Readable } from "node:stream";
import mime from "mime";
import { TUpdateUsersSchema } from "@/lib/schemas/schema.users";

const UPLOAD_DIR = path.join(process.cwd(), "uploads");

export const GET = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string }> },
) => {
  // initial response object (use for set cookies)
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController("files");

  //***** get data from request *****
  // get params from props
  const { path: segments } = await params;

  // get searchParam
  const searchParamName = req.nextUrl.searchParams.get("");

  // get cookie
  const tokenName = req.cookies.get("")?.value;

  //***** endpoint statements ******
  //*** get file ***
  const result = (async (): Promise<
    TCtr<{ file?: { fileResponse: Response }[] }>
  > => {
    try {
      // avoid path travel
      const normalizedPath = path.normalize(path.join(...segments));
      const filePath = path.join(UPLOAD_DIR, normalizedPath);

      //- if ********* was / not successful (), merge / add "" error
      if (!filePath.startsWith(UPLOAD_DIR)) {
        controller.addMessage("errors", ["forbidden"]);
      }

      // check file exists
      await access(filePath);

      // get file type
      const contentType = mime.getType(filePath) || "application/octet-stream";

      // stream file
      const stream = createReadStream(filePath);

      // add ******* to controller data
      controller.addData("file", [
        {
          fileResponse: new Response(Readable.toWeb(stream) as ReadableStream, {
            headers: {
              "Content-Type": contentType,
              "Cache-Control": "public, max-age=31536000, immutable",
            },
          }),
        },
      ]);

      // add successful message to controller
      controller.addMessage("successes", ["file was found successfully"]);

      // return controller
      return controller.get();
    } catch (error) {
      //- if ********* was / not successful (), merge / add "" error
      console.log(error);
      controller.addMessage("errors", ["file does not exist"]);
      return controller.get();
    }
  })();

  // set controller as response body
  response.value = NextResponse.json(await result);

  return response.value;
};

export const POST = async (
  req: NextRequest,
  { params }: { params: Promise<{ path: string }> },
) => {
  // initial response object (use for set cookies)
  const response = { value: NextResponse.json({}) };

  // initialize controller object
  const controller = createController("uploadFiles");

  //***** get data from request *****
  // get params from props
  const { path: segments } = await params;

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
  if (!json) {
    controller.addMessage("errors", ["json doesn not exist"]);
    return NextResponse.json(controller.get());
  }

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

  // if JSON does not exist, break
  if (!formData) {
    controller.addMessage("errors", ["there is no formData"]);
    return NextResponse.json(controller.get());
  }

  const formDataObject = Object.fromEntries(
    formData.entries(),
  ) as Partial<TUpdateUsersSchema>;

  //***** endpoint statements ******
  //*** upload files ***
  const uploadFilesResult = await (async () => {
    try {
      // upload file statements
      const files = formData.getAll("file");

      return await Promise.all(
        files.map(async (file) => {
          if (!(file instanceof File)) {
            throw new Error("it's not a file");
          }

          const bytes = await file.arrayBuffer();
          const buffer = Buffer.from(bytes);

          const fileName = `${Date.now()}-${file.name}`;

          await writeFile(path.join(UPLOAD_DIR, fileName), buffer);
          return fileName;
        }),
      );
    } catch (err) {
      console.log(err);
    }
  })();

  // if JSON does not exist, break
  if (!uploadFilesResult) {
    controller.addMessage("errors", ["error for uploading file"]);
    return NextResponse.json(controller.get());
  }

  controller.addData("path", [{ segments }]);
  controller.addMessage("successes", ["test data added successfully"]);

  // set controller as response body
  response.value = NextResponse.json(controller.get());

  return response.value;
};
