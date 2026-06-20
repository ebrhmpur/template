// export const generateMetadata = async ({
//   params,
//   searchParams,
// }: {
//   params: Promise<Record<string, string>>;
//   searchParams: Promise<Record<string, string>>;
// }): Promise<Metadata> => {
//   return {
//     title: "",
//     description: "",
//     keywords: [""],
//     openGraph: {
//       title: "",
//       description: "",
//       siteName: "",
//       locale: "",
//     },
//     robots: {
//       index: true,
//       follow: true,
//       nocache: false,
//       googleBot: {
//         index: true,
//         follow: true,
//         "max-snippet": -1,
//         "max-image-preview": "large",
//         "max-video-preview": -1,
//       },
//     },
//     twitter: {
//       card: "summary_large_image",
//       title: "",
//       description: "",
//       creator: "",
//       images: [],
//     },
//   };
// };

import UiContainerComp from "@/components/_UI/ui-container-comp";
import { validateSchema } from "@/lib/schemas/_schema.validate";
import { createWithoutDefaults } from "@/lib/schemas/schema.users";
import dynamic from "next/dynamic";

const FormTestComp = dynamic(
  () => {
    return import("@/components/form-test-comp");
  },
  { ssr: !true },
);

const Page = ({
  params,
  searchParams,
}: {
  params: Promise<Record<string, string>>;
  searchParams: Promise<Record<string, string>>;
}) => {
  const result = validateSchema(createWithoutDefaults, { name: "", email: "" });
  return (
    <main>
      <UiContainerComp>
        <FormTestComp />
      </UiContainerComp>
    </main>
  );
};

export default Page;
