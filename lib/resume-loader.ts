import { resumeData as backupResumeData } from "@/lib/resume-backup";
import { ResumeDataSchema } from "@/lib/resume-schema";
import type { ResumeData } from "@/types/resume";

const jsonLink = process.env.NEXT_PUBLIC_RESUME_JSON_LINK;

async function fetchAndValidate(url: string): Promise<ResumeData | null> {
  try {
    const timestamp = new Date().toLocaleTimeString();
    // This function only runs when Next.js decides to revalidate the data (e.g., after the 1-hour cache expires).
    // It does not run for requests served directly from the cache.
    console.log(`[${timestamp}] fetching resume data from: ${url}`);

    const response = await fetch(url, { next: { revalidate: 1800 } });

    if (!response.ok) {
      console.error(`[${timestamp}] Revalidation fetch failed with status ${response.status}: ${response.statusText}`);
      return null;
    }

    // Next.js handles '304 Not Modified' responses transparently.
    // If we get here with a 200 OK, it means we have fresh, validated data.
    // This could be because the data was genuinely new, or because a '304'
    // check confirmed our cached version is still the latest.
    // console.log(`[${timestamp}] Revalidation successful. Data is fresh.`);

    const data = await response.json();
    const validation = ResumeDataSchema.safeParse(data);

    if (validation.success) {
      console.log(`[${timestamp}] Resume data passed validation.`);
      return validation.data;
    } else {
      console.error(`[${timestamp}] Validation failed for newly fetched data:`, validation.error);
      return null;
    }
  } catch (error) {
    const timestamp = new Date().toLocaleTimeString();
    console.error(`[${timestamp}] An error occurred during the revalidation process:`, error);
    return null;
  }
}

export async function loadResumeData(): Promise<ResumeData> {

  if (!jsonLink) {
    console.error("NEXT_PUBLIC_RESUME_JSON_LINK is not set. Using hardcoded backup.");
    return backupResumeData;
  }

  const primaryData = await fetchAndValidate(`${jsonLink}/resume.json`);
  if (primaryData) {
    return primaryData;
  }

  console.log("Primary source failed, trying backup...");
  const backupData = await fetchAndValidate(`${jsonLink}/resume-backup.json`);
  if (backupData) {
    return backupData;
  }

  console.log("All remote sources failed, using hardcoded backup.");
  return backupResumeData;
}
