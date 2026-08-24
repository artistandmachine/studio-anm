import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Headline from "@/components/Headline";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";
import ProgressMask from "@/components/ProgressMask";
import data from "@/data/projects.json";

export default function Home() {
  const { studio, projects } = data;

  return (
    <main id="main-home" className="relative flex w-full flex-col items-center bg-surface-variant">
      <div className="flex w-full flex-col items-center px-[2vw]">
        <div className="flex w-full max-w-[2000px] flex-col items-center bg-surface">
          <Nav />
          <Hero images={studio.heroImages} />
          <div className="relative flex w-full flex-col items-center">
            <ProgressMask />
            <Headline
              tagline={studio.tagline}
              intro={studio.intro}
              subIntro={studio.subIntro}
              signoff={studio.signoff}
              designerFirstName={studio.designer.name.split(" ")[0]}
            />
            <WorkGrid projects={projects} />
            <About
              capabilities={studio.capabilities}
              images={studio.capabilityImages}
              designer={studio.designer}
            />
          </div>
          {/* Pure scroll-distance ruler, no progress bar or sticky content
              of its own — sized to exactly the hide distance used in
              About.tsx/Nav.tsx/ProgressMask.tsx (100px) so the About bar,
              its "About" label, the mask, and the nav logo all finish
              sliding off-screen within exactly this much scroll, with the
              footer appearing right behind them and no dead space. */}
          <div id="s-footer-filler" className="h-[100px] w-full" />
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
