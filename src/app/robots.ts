import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/dashboard/", "/api/", "/login", "/register"],
      },
    ],
    sitemap: "https://www.agenciadnegocios.com/sitemap.xml",
    host: "https://www.agenciadnegocios.com",
  };
}
