import Image from "next/image";
import { platforms } from "@/lib/platforms";

// "Works with": the platforms behind the services, each as its own mark above its name, in one row on a wide
// screen and a grid below that. The marks keep their own colours on both themes; a platform whose logo has dark
// lettering supplies a second file for the dark theme (the site's .logo-dark / .logo-light switch). The name is
// printed beside every mark, so the images are decorative and carry no alt text. Server component, no state.
export default function PlatformStrip() {
  return (
    <div className="mb-10 border-t border-[var(--border-subtle)] pt-6">
      <p className="text-sm text-foreground-muted">Works with</p>
      <ul className="mt-5 grid grid-cols-2 gap-x-6 gap-y-8 sm:grid-cols-4 lg:flex lg:justify-between">
        {platforms.map(({ name, logo }) => (
          <li key={name} className="flex flex-col items-start gap-3">
            <span className="flex h-10 items-center">
              <Image
                src={logo.src}
                alt=""
                width={logo.width}
                height={logo.height}
                className={logo.darkSrc ? "logo-light" : undefined}
              />
              {logo.darkSrc ? (
                <Image src={logo.darkSrc} alt="" width={logo.width} height={logo.height} className="logo-dark" />
              ) : null}
            </span>
            <span className="text-sm font-medium text-foreground">{name}</span>
          </li>
        ))}
      </ul>
      <p className="mt-6 text-xs text-foreground-muted">Product names and logos are trademarks of their respective owners.</p>
    </div>
  );
}
