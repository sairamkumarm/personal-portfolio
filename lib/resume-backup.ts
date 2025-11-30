import type { ResumeData } from "@/types/resume"

export const resumeData: ResumeData = {
  personal_info: {
    name: "sairamkumar m",
    location: "bengaluru, india",
    role: "backend engineer",
    contact: "sairamkumar.m@outlook.com",
    renderIndex: 1,
  },
  links: {
    items: [
      { label: "linkedin", url: "https://www.linkedin.com/in/sairamkumarm" },
      { label: "github", url: "https://github.com/sairamkumarm" },
    ],
    renderIndex: 2,
  },
  bio: {
    content:
      "designed for failure. optimized for recovery.",
    renderIndex: 3,
  },
  skills: {
    categories: [
      {
        name: "languages",
        skills: ["java", "go","python", "bash"],
      },
      {
        name: "frameworks & libraries",
        skills: [
          "spring boot",
          "spring cloud",
          "spring security",
          "resilience4j",
          "openfeign",
          "eureka",
        ],
      },
      {
        name: "tools & platforms",
        skills: [
          "docker",
          "redis",
          "kafka",
          "postgresql",
          "mongodb",
          "elasticsearch",
          "git",
          "junit",
          "mockito",
          "insomnia",
        ],
      },
      {
        name: "concepts",
        skills: [
          "data structures & algorithms",
          "oop",
          "aop",
          "microservices",
          "event-driven architecture",
          "rest apis",
        ],
      },
    ],
    renderIndex: 4,
  },
  sections: {
    projects: {
      items: [
        {
          name: "accessguard",
          headline: "multi-tenant authentication & authorization platform",
          description: [
            "distributed microservices system with eureka service discovery and kafka-powered communication.",
            "implemented rs256 jwt per-tenant key management and jwks endpoint for key rotation.",
            "streamed login events via kafka with aop-based tracking and alerting.",
            "used resilience4j and redis token buckets for rate limiting and circuit breaking.",
          ],
          stack: [
            "spring boot",
            "kafka",
            "postgresql",
            "redis",
            "docker",
            "resilience4j",
            "elasticsearch",
          ],
          links: [
            {
              label: "github",
              url: "https://github.com/sairamkumarm/accessguard",
            },
          ],
        },
        {
          "name": "gositemonitor",
          "headline": "concurrent site uptime & latency monitor",
          "description": [
            "concurrent goroutine-based worker pool to ping and monitor multiple urls in parallel with global rate limiting.",
            "periodic job scheduling and structured json logging to capture latency metrics, outages, and session data.",
            "centralized results pipeline for aggregation, analysis, and outage pattern detection.",
            "multi-channel alerting via discord and email for real-time notifications."
          ],
          "stack": ["go", "goroutines", "concurrency"],
          "links": [
            {
              "label": "github",
              "url": "https://github.com/sairamkumarm/gositemonitor"
            }
          ]
        },
      ],
      renderIndex: 5,
    },
    experience: {
      items: [
        {
          org: "wibblit (resumetweaker)",
          role: "co-founder & developer",
          duration: "sep 2024 - jun 2025",
          description: [
            "shipped an ai-powered resume and job-matching platform, managing product development end-to-end under early-stage startup constraints.",
            "engineered a microservice integrated with gmail pub/sub to ingest user emails, detect job updates, and update a per-user job tracker in real time.",
            "implemented client-side pdf parsing and json extraction for resume ingestion, enabling consistent, structured data flow from any pdf.",
            "designed prompt flows to tailor resumes to job descriptions through keyword mapping and tone-shifting, while generating dynamic interview questions.",
            "balanced system design with fast iteration on activation, positioning, and feature delivery, shipping a working mvp to early testers."
          ],
        },
      ],
      renderIndex: 6,
    },
    education: {
      items: [
        {
          degree: "b.e. computer science",
          institution: "visvesvaraya technological university",
          duration: "dec 2021 - jun 2025",
          grade: "9.24"
        },
      ],
      renderIndex: 7,
    },
  },
}
