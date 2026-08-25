import { InstagramIcon, LinkedInIcon, Wordmark } from "./BrandMarks";

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
      className="relative flex h-90 w-full flex-col items-center justify-between bg-inverse-surface px-14 text-on-inverse-surface"
    >
      {/* Top spacer — balances the icon row's height at the bottom so the
          middle block (logo/wordmark/email) sits vertically centered. */}
      <div className="flex h-20 w-full items-start justify-end py-6" />

      {/* Middle block: big logo mark on the left, wordmark/divider/email
          stacked in a column on the right. */}
      <div className="flex w-full items-center justify-center gap-12">
        <div className="flex shrink-0 flex-col items-start overflow-clip">
          <img src="/brand/logo-mark-large.svg" alt={'Artist & Machine™'} className="h-20 w-101" />
        </div>
        <div className="flex flex-1 flex-row items-center self-stretch">
          <div className="flex h-full flex-1 flex-col items-start pb-3.5">
            {/* Wordmark row */}
            <div className="flex h-8 w-full items-center justify-center overflow-clip pr-52.5">
              <Wordmark className="h-3 w-fit" />
            </div>
            {/* Divider between wordmark and email */}
            <div className="h-px w-full bg-on-surface-variant" />
            {/* Email row, right-aligned under the divider */}
            <div className="flex h-8 w-full items-start justify-end overflow-clip pr-2 pt-2">
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${studioName}`}
                className="text-footer-link whitespace-nowrap text-on-inverse-surface transition-opacity duration-200 ease-out hover:text-tertiary"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: social icons, right-aligned */}
      <div className="flex h-20 w-full items-end justify-end gap-6 overflow-clip py-6">
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="transition-opacity duration-100 ease-out hover:text-tertiary"
        >
          <InstagramIcon className="h-6 w-6" />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="transition-opacity duration-100 ease-out hover:text-tertiary"
        >
          <LinkedInIcon className="h-6 w-6" />
        </a>
      </div>
    </footer>
  );
}
