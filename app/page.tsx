import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Intro from "@/components/Intro";
import WorkProjects from "@/components/WorkProjects";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ProgressMask from "@/components/ProgressMask";
import data from "@/data/projects.json";

export default function Home() {
  const { studio, projects } = data;

  return (
    <main id="main-home" className="relative flex w-full flex-col items-center bg-surface-variant">
      <div id="page-gutter" className="flex w-full flex-col items-center px-[2vw]">
        <div id="page-frame" className="flex w-full max-w-[1800px] flex-col items-center bg-surface">
          <Nav />
          <Hero images={studio.heroImages} />
          <div id="page-content" className="relative flex w-full flex-col items-center">
            <ProgressMask />
            <Intro
              tagline={studio.tagline}
              intro={studio.intro}
              subIntro={studio.subIntro}
              signoff={studio.signoff}
              designerFirstName={studio.designer.name.split(" ")[0]}
            />
            <WorkProjects projects={projects} />
            <About
              capabilities={studio.capabilities}
              images={studio.capabilityImages}
              designer={studio.designer}
            />
          </div>
          {/* 80px of breathing room before the footer band. Its own
              height is otherwise inert now — useFillerProgress measures
              from this element's top all the way to #footer's bottom
              (see lib/useAboutEndProgress.ts), so the About bar, its
              "About" label, the mask, and the nav logo finish sliding
              off-screen exactly as the footer's bottom edge comes into
              view, not abruptly right as this gap begins. */}
          <div id="s-footer-filler" className="h-20 w-full" />
          <Footer
            studioName={studio.name}
            email={studio.designer.email}
            instagram={studio.designer.instagram}
            linkedin={studio.designer.linkedin}
          />
        </div>
      </div>
    </main>
  );
}
