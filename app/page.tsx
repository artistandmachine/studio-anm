import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Headline from "@/components/Headline";
import WorkGrid from "@/components/WorkGrid";
import About from "@/components/About";
import Footer from "@/components/Footer";
import data from "@/data/projects.json";

export default function Home() {
  const { studio, projects } = data;

  return (
    <main id="main-home" className="relative flex w-full flex-col items-center bg-secondary">
      <div className="flex w-full flex-col items-center px-[40px]">
        <div className="flex w-full max-w-[2000px] flex-col items-center bg-surface">
          <Nav />
          <Hero images={studio.heroImages} />
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
