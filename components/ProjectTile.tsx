import Media from "./Media";
import Logo from "./Logo";

export type Project = {
  id: string;
  title: string;
  year: number;
  category: string;
  location?: string;
  capability?: string;
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
    <article className="flex w-full flex-col lg:flex-row items-start justify-end gap-6 lg:gap-14 overflow-clip">
      <div className="order-2 lg:order-1 flex w-full min-w-0 max-w-full lg:max-w-91.25 flex-1 flex-col items-start gap-2 overflow-clip">
        <div className="flex w-full items-end pr-0 lg:pr-6">
          <h3 className="text-project-title min-w-0 flex-1 text-on-surface">
            {project.title}
          </h3>
        </div>
        <div className="h-px w-full bg-on-surface" />
        <div className="flex w-full items-start pr-0 lg:pr-6">
          <p className="text-project-description min-w-0 flex-1 text-on-surface">
            {project.needsDescription ? (
              <span className="italic text-on-surface/60">
                Description pending
              </span>
            ) : (
              project.description
            )}
          </p>
        </div>
        <div className="flex gap-0.5 flex-col items-start">
          {project.capability && (
            <p className="flex items-center gap-2 text-project-meta text-on-surface">
              {/* 6x6px placeholder for a future icon */}
              <span className="h-1.5 w-1.5 shrink-0 bg-on-surface" aria-hidden="true" />
              {project.capability}
            </p>
          )}
          {project.location && (
            <p className="flex items-center gap-2 text-project-meta text-on-surface">
              {/* 6x6px placeholder for a future icon */}
              <span className="h-1.5 w-1.5 shrink-0 bg-on-surface" aria-hidden="true" />
              {project.location}
            </p>
          )}
          {project.clientLabel && project.clientUrl && (
            <div className="flex items-center gap-2">
              {/* 6x6px placeholder for a future icon */}
              <span className="h-1.5 w-1.5 shrink-0 bg-on-surface" aria-hidden="true" />
              <a
                href={project.clientUrl}
                target="_blank"
                rel="noreferrer"
                className="text-project-meta text-accent transition-opacity duration-200 ease-out hover:opacity-60"
              >
                {project.clientLabel}
              </a>
            </div>
          )}
        </div>
      </div>

      {(project.clientLogo || project.partnerLogo) && (
        <div className="order-last lg:order-2 flex w-auto lg:w-20 shrink-0 flex-row lg:flex-col items-center justify-center gap-4 lg:gap-5 overflow-visible">
          {project.clientLogo && <Logo src={project.clientLogo} className="h-auto max-h-8 lg:max-h-none max-w-full" />}
          {project.partnerLogo && <Logo src={project.partnerLogo} className="h-auto max-h-8 lg:max-h-none max-w-full" />}
        </div>
      )}

      <Media
        src={project.image}
        video={project.video}
        alt={project.title}
        sizes="(min-width: 1024px) 500px, 100vw"
        className="order-1 lg:order-3 aspect-5/4 w-full lg:w-125 lg:min-w-100 shrink-0 lg:shrink"
      />
    </article>
  );
}
