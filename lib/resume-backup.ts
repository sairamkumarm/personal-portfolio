import type { ResumeData } from "@/types/resume"

export const resumeData: ResumeData = {
  "personal_info": {
    "name": "Sairamkumar M",
    "location": "Bengaluru, KA, India",
    "role": "Backend Engineering",
    "contact": "sairamkumar.m@outlook.com",
    "renderIndex": 1
  },
  "links": {
    "items": [
      { "label": "linkedin", "url": "https://www.linkedin.com/in/sairamkumarm" },
      { "label": "github", "url": "https://github.com/sairamkumarm" }
    ],
    "renderIndex": 2
  },
  "bio": {
    "content": "Design for failure, optimize for recovery.",
    "renderIndex": 3
  },
  "skills": {
    "categories": [
      {
        "name": "Languages",
        "skills": ["Java", "Go", "Python", "Bash"]
      },
      {
        "name": "Frameworks, APIs, & Libs",
        "skills": ["Spring Boot", "Gin", "REST", "GraphQL", "Junit", "Mockito"]
      },
      {
        "name": "Databases & Infrastructure",
        "skills": [
          "PostgreSQL",
          "MongoDB",
          "Elasticsearch",
          "Redis",
          "Kafka",
          "Docker",
          "GCP"
        ]
      },
      {
        "name": "concepts",
        "skills": [
          "OOP",
          "Concurrency",
          "Microservices"
        ]
      }
    ],
    "renderIndex": 4
  },
  "sections": {
    "projects": {
      "items": [
        {
          "name": "Accessguard",
          "headline": "Multi-tenant Authentication & Authorization Platform",
          "description": [
            "Distributed microservices with eureka service discovery and kafka pub/sub communication.",
            "Implemented rs256 jwt per-tenant key management and a jwks endpoint for key discovery.",
            "Integrated redis-backed token bucket filter for gateway rate limiting.",
            "Utilized resilience4j for circuit breaking and fallback behaviour."
          ],
          "stack": [
            "Spring Boot",
            "Kafka",
            "PostgreSQL",
            "Redis",
            "Resilience4j",
            "Elasticsearch"
          ],
          "links": [
            {
              "label": "github",
              "url": "https://github.com/sairamkumarm/accessguard"
            }
          ]
        },
        {
          "name": "GoSiteMonitor",
          "headline": "Concurrent Site Uptime & Latency Monitor",
          "description": [
            "Goroutine worker pool to monitor multiple urls concurrently with global token-based rate limiting.",
            "Periodic job scheduling and structured json logging for latency, outage, and session data.",
            "Aggregation pipeline to detect recurring outage patterns and generate insights.",
            "Multi-channel alerting through discord and email for real-time notifications."
          ],
          "stack": ["Go", "Goroutines", "Concurrency", "Docker"],
          "links": [
            {
              "label": "github",
              "url": "https://github.com/sairamkumarm/gositemonitor"
            }
          ]
        },
        {
          "name": "ANSRS",
          "headline": "Command Line Spaced Repetition System",
          "description": [
            "Recall engine based on difficulty, recall count, and spaced repetition intervals.",
            "Implemented caching and embedded h2 database for persistence and archival.",
            "Fully test-driven development workflow using junit and mockito."
          ],
          "stack": ["Java", "Maven", "h2", "Junit", "Mockito"],
          "links": [
            {
              "label": "github",
              "url": "https://github.com/sairamkumarm/ansrs"
            }
          ]
        }
      ],
      "renderIndex": 5
    },
    "experience": {
      "items": [
        {
          "org": "Calix",
          "role": "Graduate Engineering Trainee",
          "duration": "Mar 2026 - Present",
          "description": ["loading..."]
        },
        {
          "org": "Wibblit (resumetweaker)",
          "role": "Co-founder & Developer",
          "duration": "Sep 2024 - Jun 2025",
          "description": [
            "Shipped an ai-powered resume to job-matching platform, managing product development end-to-end.",
            "Built a gmail pub/sub integrated microservice to ingest emails, detect job updates, and update per-user job trackers in real time.",
            "Implemented client-side pdf parsing and json extraction for consistent resume ingestion.",
            "Balanced system design with rapid iteration and delivered a working mvp to early testers."
          ]
        }
      ],
      "renderIndex": 6
    },
    "education": {
      "items": [
        {
          "degree": "B.E. Computer Science",
          "institution": "Visvesvaraya Technological University",
          "duration": "Dec 2021 - Aug 2025",
          "grade": "9.24"
        }
      ],
      "renderIndex": 7
    }
  }
}

