import { loadResumeData } from "@/lib/resume-loader";
import { PageContent } from "@/components/page-content";
import { resolveContentKey } from "@/types/types";

interface HomeProps {
  searchParams: Promise<{
    view?: string;
  }>;
}

export default async function Home({ searchParams }: HomeProps) {
  const resumeData = await loadResumeData();
  const resolvedSearchParams = await searchParams;
  const contentKey = resolveContentKey(resolvedSearchParams?.view);

  return <PageContent data={resumeData} contentKey={contentKey} />;
}
