// types/case-study.ts
export interface CaseStudy {
  id: string;
  hero: {
    title: string;
    client: string;
    duration: string;
    overview: string;
    heroImage: string;
    technologies: string[];
  };
  challenge: {
    problem: string;
    constraints: string[];
    context: string;
    metrics: string[];
  };
  goals: {
    primary: string[];
    stakeholder: string[];
    success: string[];
  };
  approach: {
    methodology: string;
    phases: Array<{
      name: string;
      duration: string;
      activities: string[];
    }>;
    keyDecisions: Array<{
      decision: string;
      rationale: string;
    }>;
    research: string[];
    wireframes?: string[]; // <-- Make this optional
    collaboration: string;
    iterations: string[];
    userFeedback: string;
  };
  results: {
    beforeAfter: Array<{
      metric: string;
      before: string;
      after: string;
      improvement: string;
    }>;
    metrics: string[];
    testimonials?: Array<{
      name: string;
      role: string;
      quote: string;
    }>;
    deliverables: string[];
    achievements: string[];
  };
}

export interface CaseStudiesData {
  caseStudies: Record<string, CaseStudy>;
}
