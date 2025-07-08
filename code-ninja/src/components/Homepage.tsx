import Hero from "./hero";
import ProjectGrid from "@/components/project-grid"
import WorkHistory from "./work-history";
import SkillsSection from "./skills-section";
import SpotifyNowPlaying from "@/components/spotify-now-playing";

export default function Homepage() {
  return(
    <main>
      <Hero/>
       <ProjectGrid/>
       <WorkHistory/>
       <SkillsSection/>
       {/* Now playing component */}
        <SpotifyNowPlaying />
    </main>
  )
}