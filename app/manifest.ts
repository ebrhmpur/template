import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "",
    short_name: "",
    description: "",
    start_url: "/",
    display: "standalone",
    background_color: "",
    theme_color: "",
    orientation: "portrait",
    icons: [
      {
        src: "",
        sizes: "any",
        type: "image/x-icon",
        purpose: "maskable",
      },
    ],
  };
}
