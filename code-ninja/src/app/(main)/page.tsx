// code-ninja>src>app>(main)>page.tsx
import Hero from "@/components/hero";
import ProjectGrid from "@/components/project-grid"
import WorkHistory from "@/components/work-history";
import SkillsSection from "@/components/skills-section";

export const dynamic = "force-static";

export default function Homepage() {
  return(
    <main>
      <Hero/>
       <ProjectGrid/>
       <WorkHistory/>
       <SkillsSection/>
       {/* Now playing component */}

    </main>
  )
}
