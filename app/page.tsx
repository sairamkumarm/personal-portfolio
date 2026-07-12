import { loadResumeData } from "@/lib/resume-loader";
import { PageContent } from "@/components/page-content";

export default async function Home() {
  const resumeData = await loadResumeData();
  return <PageContent data={resumeData} />;
}
