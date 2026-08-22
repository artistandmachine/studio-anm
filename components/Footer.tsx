export default function Footer({
  studioName,
  email,
  instagram,
  linkedin,
}: {
  studioName: string;
  email: string;
  instagram: string;
  linkedin: string;
}) {
  return (
    <footer
      id="footer"
      className="relative flex h-[360px] w-full flex-col items-center justify-between bg-inverse-surface px-[56px] text-white"
    >
      <div className="flex h-[80px] w-full items-start justify-end py-[24px]" />

      <div className="flex w-full items-center justify-center gap-[48px]">
        <div className="flex shrink-0 flex-col items-start overflow-clip">
          <img src="/brand/logo-mark-large.svg" alt={'Artist & Machine™'} className="h-[80px] w-[404px]" />
        </div>
        <div className="flex flex-1 flex-row items-center self-stretch">
          <div className="flex h-full flex-1 flex-col items-start pb-[14px]">
            <div className="flex h-[32px] w-full items-center overflow-clip py-[8px] pl-[12px] pr-[222px]">
              <img src="/brand/logo-wordmark.svg" alt="" className="h-[12px] w-[156.746px] invert" />
            </div>
            <div className="h-px w-full bg-on-surface-variant" />
            <div className="flex h-[32px] w-full items-start justify-end overflow-clip pr-[8px] pt-[8px]">
              <a
                href={`mailto:${email}`}
                className="whitespace-nowrap text-[14px] leading-[1.2] tracking-[0.14px] text-white transition-opacity duration-200 ease-out hover:opacity-60"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>

      <div className="flex h-[80px] w-full items-end justify-end gap-[24px] overflow-clip py-[24px]">
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="transition-opacity duration-200 ease-out hover:opacity-60"
        >
          <img src="/brand/ic-instagram.svg" alt="" className="h-[24px] w-[24px] invert" />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="transition-opacity duration-200 ease-out hover:opacity-60"
        >
          <img src="/brand/ic-linkedin.svg" alt="" className="h-[24px] w-[24px] invert" />
        </a>
      </div>
    </footer>
  );
}
