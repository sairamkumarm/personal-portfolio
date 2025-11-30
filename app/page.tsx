import { OperatorProfile } from "@/components/operator-profile";
import { loadResumeData } from "@/lib/resume-loader";

export default async function Home() {
  const resumeData = await loadResumeData();
  return <OperatorProfile data={resumeData} />;
}
