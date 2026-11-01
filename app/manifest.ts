import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Exergy Solutions",
    short_name: "Exergy",
    description:
      "We map where energy and water quality are truly lost. Utilizing advanced second-law exergy analysis to expose inefficiencies and drive sustainability.",
    start_url: "/",
    display: "standalone",
    background_color: "#061821",
    theme_color: "#061821",
    icons: [
      {
        src: "/favicon-48.png",
        sizes: "48x48",
        type: "image/png",
      },
      {
        src: "/icon-192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon.png",
        sizes: "512x512",
        type: "image/png",
      },
      {
        src: "/apple-touch-icon.png",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}

