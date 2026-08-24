import Media from "./Media";

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
  brandLogo?: string;
  partnerLogo?: string;
};

export default function ProjectTile({ project }: { project: Project }) {
  return (
    <div className="flex w-full items-start justify-end gap-[56px] overflow-clip">
      <div className="flex min-w-0 max-w-[365px] flex-1 flex-col items-start gap-[8px] overflow-clip">
        <div className="flex w-full items-end pr-[24px]">
          <p className="min-w-0 flex-1 text-sm font-medium leading-4 tracking-normal text-black">
            {project.title}
          </p>
        </div>
        <div className="h-px w-full bg-black" />
        <div className="flex w-full items-start pr-[24px]">
          <p className="min-w-0 flex-1 text-sm font-normal leading-4 tracking-normal text-black">
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

      <div className="flex w-[100px] shrink-0 flex-col items-center gap-[20px] overflow-clip">
        {project.brandLogo && (
          <img src={project.brandLogo} alt="" className="aspect-[100/38] w-full object-contain" />
        )}
        {project.partnerLogo && (
          <img src={project.partnerLogo} alt="" className="h-[32px] w-[53px] object-contain" />
        )}
      </div>

      <Media
        src={project.image}
        video={project.video}
        alt={project.title}
        sizes="366px"
        className="h-[292.4px] w-[365.5px] shrink-0"
      />
    </div>
  );
}
