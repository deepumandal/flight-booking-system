import { MetadataRoute } from "next";
import { unstable_noStore } from "next/cache";
import { getOrThrowEnv } from "@Components/config";

const baseUrl = getOrThrowEnv("NEXT_PUBLIC_BASE_URL"); // Replace with your domain

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Ensure this route is not cached
  unstable_noStore();

  // Example static pages
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date().toISOString(),
      priority: 0.3, // Lower priority for the splash screen
      changeFrequency: "monthly", // Minimal updates expected
    },
    {
      url: `${baseUrl}/dashboard`,
      lastModified: new Date().toISOString(),
      priority: 1.0, // Highest priority for the main content page
      changeFrequency: "daily", // Assumes frequent updates on the dashboard
    },
    {
      url: `${baseUrl}/dashboard/achievements-and-blogs`,
      lastModified: new Date().toISOString(),
      priority: 0.8, // Important content, but less than the main dashboard
      changeFrequency: "weekly", // Updated periodically with new achievements or blogs
    },
    {
      url: `${baseUrl}/dashboard/contact-information`,
      lastModified: new Date().toISOString(),
      priority: 0.6, // Useful but not as critical as other sections
      changeFrequency: "monthly", // Unlikely to change frequently
    },
    {
      url: `${baseUrl}/dashboard/education`,
      lastModified: new Date().toISOString(),
      priority: 0.5, // Relatively static section
      changeFrequency: "yearly", // Rarely changes unless education info is updated
    },
    {
      url: `${baseUrl}/dashboard/projects-and-experiences`,
      lastModified: new Date().toISOString(),
      priority: 0.9, // High priority for showcasing your work
      changeFrequency: "weekly", // Likely to be updated with new projects
    },
    {
      url: `${baseUrl}/dashboard/skills-and-expertise`,
      lastModified: new Date().toISOString(),
      priority: 0.7, // Important but less critical than projects or dashboard
      changeFrequency: "monthly", // May be updated occasionally
    },
  ];

  // Combine static and dynamic routes
  return [...staticRoutes];
}
