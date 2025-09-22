import type { ResumeData } from "@/types/resume"
import { OperatorProfile } from "@/components/operator-profile"

const resumeData: ResumeData = {
  personal_info: {
    name: "SAIRAMKUMAR M",
    location: "BENGALURU, INDIA",
    role: "BACKEND ENGINEER",
    contact: "SAIRAMKUMAR.M@OUTLOOK.COM",
    renderIndex: 1,
  },
  links: {
    items: [
      { label: "LINKEDIN", url: "https://www.linkedin.com/in/sairamkumarm" },
      { label: "GITHUB", url: "https://github.com/sairamkumarm" },
    ],
    renderIndex: 2,
  },
  bio: {
    content:
      "Building backends that scale; today and tomorrow.",
    renderIndex: 3,
  },
  skills: {
    categories: [
      {
        name: "LANGUAGES",
        skills: ["JAVA", "GO","PYTHON", "BASH"],
      },
      {
        name: "FRAMEWORKS & LIBRARIES",
        skills: [
          "SPRING BOOT",
          "SPRING CLOUD",
          "SPRING SECURITY",
          "RESILIENCE4J",
          "OPENFEIGN",
          "EUREKA",
        ],
      },
      {
        name: "TOOLS & PLATFORMS",
        skills: [
          "DOCKER",
          "REDIS",
          "KAFKA",
          "POSTGRESQL",
          "MONGODB",
          "ELASTICSEARCH",
          "GIT",
          "JUNIT",
          "MOCKITO",
          "INSOMNIA",
        ],
      },
      {
        name: "CONCEPTS",
        skills: [
          "DATA STRUCTURES & ALGORITHMS",
          "OOP",
          "AOP",
          "MICROSERVICES",
          "EVENT-DRIVEN ARCHITECTURE",
          "REST APIS",
        ],
      },
    ],
    renderIndex: 4,
  },
  sections: {
    projects: {
      items: [
        {
          name: "ACCESSGUARD",
          headline: "MULTI-TENANT AUTHENTICATION & AUTHORIZATION PLATFORM",
          description: [
            "DISTRIBUTED MICROSERVICES SYSTEM WITH EUREKA SERVICE DISCOVERY AND KAFKA-POWERED COMMUNICATION.",
            "IMPLEMENTED RS256 JWT PER-TENANT KEY MANAGEMENT AND JWKS ENDPOINT FOR KEY ROTATION.",
            "STREAMED LOGIN EVENTS VIA KAFKA WITH AOP-BASED TRACKING AND ALERTING.",
            "USED RESILIENCE4J AND REDIS TOKEN BUCKETS FOR RATE LIMITING AND CIRCUIT BREAKING.",
          ],
          role: "DEVELOPER",
          stack: [
            "SPRING BOOT",
            "KAFKA",
            "POSTGRESQL",
            "REDIS",
            "DOCKER",
            "RESILIENCE4J",
            "ELASTICSEARCH",
          ],
          links: [
            {
              label: "GITHUB",
              url: "https://github.com/sairamkumarm/accessguard",
            },
          ],
        },
        {
          "name": "GOSITEMONITOR",
          "headline": "CONCURRENT SITE UPTIME & LATENCY MONITOR",
          "description": [
            "CONCURRENT GOROUTINE-BASED WORKER POOL TO PING AND MONITOR MULTIPLE URLS IN PARALLEL WITH GLOBAL RATE LIMITING.",
            "PERIODIC JOB SCHEDULING AND STRUCTURED JSON LOGGING TO CAPTURE LATENCY METRICS, OUTAGES, AND SESSION DATA.",
            "CENTRALIZED RESULTS PIPELINE FOR AGGREGATION, ANALYSIS, AND OUTAGE PATTERN DETECTION.",
            "MULTI-CHANNEL ALERTING VIA DISCORD AND EMAIL FOR REAL-TIME NOTIFICATIONS."
          ],
          "role": "ENGINEER",
          "stack": ["GO", "GOROUTINES", "CONCURRENCY"],
          "links": [
            {
              "label": "GITHUB",
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
          org: "WIBBLIT (RESUMETWEAKER)",
          role: "CO-FOUNDER & DEVELOPER",
          duration: "SEP 2024 - JUN 2025",
          description: [
            "BUILT A TYPESCRIPT-BASED WEB APP FOR AI-DRIVEN RESUME REPHRASING, JOB MATCHING, AND INTERVIEW PREP.",
            "IMPLEMENTED CLIENT-SIDE PDF PARSING AND STRUCTURED JSON EXTRACTION.",
            "DESIGNED LLM PROMPT FLOWS FOR RESUME TONE SHIFTING, KEYWORD MAPPING, AND CONTEXTUALIZATION.",
            "GAUGED STRATEGIC INSIGHTS FROM MVP SHIPPING AND ITERATION CYCLES.",
          ],
        },
      ],
      renderIndex: 6,
    },
    education: {
      items: [
        {
          degree: "B.E. COMPUTER SCIENCE",
          institution: "VISVESVARAYA TECHNOLOGICAL UNIVERSITY (HKBKCE)",
          duration: "DEC 2021 - JUN 2025",
          grade: "9.24"
        },
      ],
      renderIndex: 7,
    },
  },
}


export default function Home() {
  return <OperatorProfile data={resumeData} />
}
