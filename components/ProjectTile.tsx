import Media from "./Media";
import Logo from "./Logo";

export type Project = {
  id: string;
  title: string;
  year: number;
  category: string;
  location?: string;
  clientLabel?: string;
  clientUrl?: string;
  image: string;
  video?: string;
  description: string;
  needsDescription?: boolean;
  clientLogo?: string;
  partnerLogo?: string;
};

export default function ProjectTile({ project }: { project: Project }) {
  return (
    <div className="flex items-start justify-end gap-[56px] overflow-clip">
      <div className="flex min-w-0 max-w-[365px] flex-1 flex-col items-start gap-[8px] overflow-clip">
        <div className="flex w-full items-end pr-[24px]">
          <p className="text-project-title min-w-0 flex-1 text-on-surface">
            {project.title}
          </p>
        </div>
        <div className="h-px w-full bg-on-surface" />
        <div className="flex w-full items-start pr-[24px]">
          <p className="text-project-description min-w-0 flex-1 text-on-surface">
            {project.needsDescription ? (
              <span className="italic text-on-surface/40">
                Description pending — add rawNotes in projects.json.
              </span>
            ) : (
              project.description
            )}
          </p>
        </div>
      </div>

      <div className="flex w-[100px] shrink-0 flex-col items-center justify-center gap-[20px] overflow-clip">
        {project.clientLogo && <Logo src={project.clientLogo} className="h-auto max-w-full" />}
        {project.partnerLogo && <Logo src={project.partnerLogo} className="h-auto max-w-full" />}
      </div>

      <Media
        src={project.image}
        video={project.video}
        alt={project.title}
        sizes="400px"
        className="aspect-[5/4] w-[400px] min-w-[400px] shrink-0"
      />
    </div>
  );
}
