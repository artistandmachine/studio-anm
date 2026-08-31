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
      className="relative flex min-h-90 w-full flex-col items-center justify-between bg-primary-container px-6 md:px-14 text-on-primary-container py-6 md:py-0"
    >
      {/* Top spacer — balances the icon row's height at the bottom so the
          middle block (logo/wordmark/email) sits vertically centered. */}
      <div className="hidden md:flex h-20 w-full items-start justify-end py-6" />

      {/* Middle block: big logo mark on the left, wordmark/divider/email
          stacked in a column on the right. */}
      <div id="footer-main" className="flex w-full flex-col md:flex-row items-center justify-between gap-8 md:gap-12 my-auto">
        <div id="footer-logo" className="flex shrink-0 flex-col items-start overflow-clip max-w-full">
          <img
            src="/brand/logo-mark-large.svg"
            alt={'Artist & Machine™'}
            className="h-14 sm:h-16 md:h-20 w-auto max-w-full object-contain"
          />
        </div>
        <div id="footer-info" className="flex w-full min-w-0 md:flex-1 flex-row items-center self-stretch">
          <div className="flex h-full w-full min-w-0 flex-1 flex-col items-start pb-3.5">
            {/* Wordmark row */}
            <div className="flex h-8 w-full items-center justify-start md:justify-center overflow-clip pr-0 lg:pr-52.5">
              <Wordmark className="h-3 w-fit" />
            </div>
            {/* Divider between wordmark and email */}
            <div className="h-px w-full bg-on-surface-variant" />
            {/* Email row, right-aligned under the divider */}
            <div className="flex h-8 w-full items-start justify-end overflow-clip pr-2 pt-2">
              <a
                href={`mailto:${email}`}
                aria-label={`Email ${studioName}`}
                className="text-footer-link whitespace-nowrap text-on-primary-container transition-opacity duration-200 ease-out hover:text-accent"
              >
                {email}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom row: social icons, right-aligned */}
      <div id="footer-social" className="flex h-14 md:h-20 w-full items-end justify-end gap-6 overflow-clip py-2 md:py-6">
        <a
          href={instagram}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
          className="transition-opacity duration-100 ease-out hover:text-accent"
        >
          <InstagramIcon className="h-6 w-6" />
        </a>
        <a
          href={linkedin}
          target="_blank"
          rel="noreferrer"
          aria-label="LinkedIn"
          className="transition-opacity duration-100 ease-out hover:text-accent"
        >
          <LinkedInIcon className="h-6 w-6" />
        </a>
      </div>
    </footer>
  );
}
