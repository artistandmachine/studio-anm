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
    <div className="flex items-start justify-end gap-14 overflow-clip">
      <div className="flex min-w-0 max-w-91.25 flex-1 flex-col items-start gap-2 overflow-clip">
        <div className="flex w-full items-end pr-6">
          <p className="text-project-title min-w-0 flex-1 text-on-surface">
            {project.title}
          </p>
        </div>
        <div className="h-px w-full bg-on-surface" />
        <div className="flex w-full items-start pr-6">
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

      <div className="flex w-25 shrink-0 flex-col items-center justify-center gap-5 overflow-clip">
        {project.clientLogo && <Logo src={project.clientLogo} className="h-auto max-w-full" />}
        {project.partnerLogo && <Logo src={project.partnerLogo} className="h-auto max-w-full" />}
      </div>

      <Media
        src={project.image}
        video={project.video}
        alt={project.title}
        sizes="400px"
        className="aspect-5/4  w-full min-w-100 shrink-0"
      />
    </div>
  );
}
