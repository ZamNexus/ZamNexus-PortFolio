// The platforms ZamNexus engineers work on, shown with their logos as the "Works with" row on the homepage. These
// are third-party products named in the service catalogue (lib/catalog.ts), not clients and not partners: a mark
// here says what the engineers build on, nothing about a commercial relationship. Do not add partner wording
// ("Microsoft Partner", "Salesforce Partner") unless ZamNexus holds that status.
//
// The logos are their owners' trademarks, shown unaltered next to the product name. Each entry records where its
// file came from and the copyright licence recorded there, so the set can be re-checked or replaced; if a vendor
// asks for its mark to come down, delete the entry and its file under /public/platforms.
//
// Three files differ from their source, each in one way:
//   dynamics-365.svg  the icon alone, cut from the lockup (its wordmark is black and would vanish on the dark theme)
//   aws-dark.svg      the lettering in white, as AWS's own reversed logo, for the dark theme
//   terraform.svg     the Simple Icons mark with HashiCorp's brand colour applied
//
// MuleSoft is named under Integration in the list below the row but has no mark here: the only copy Wikimedia
// holds is "fair use only", so there is no freely licensed file to use. Add one only from MuleSoft or Salesforce.
//
// `width` and `height` are the display size in pixels. They are balanced by visual weight, not set to one height,
// so a wide wordmark and a square icon read as the same size.
export interface PlatformLogo {
  src: string;
  // Only where the main file has dark lettering: the version shown on the dark theme.
  darkSrc?: string;
  width: number;
  height: number;
}

export interface Platform {
  name: string;
  logo: PlatformLogo;
  source: string;
  licence: string;
}

const COMMONS = "https://commons.wikimedia.org/wiki/File:";

export const platforms: Platform[] = [
  {
    name: "Salesforce",
    logo: { src: "/platforms/salesforce.svg", width: 46, height: 32 },
    source: `${COMMONS}Salesforce.com_logo.svg`,
    licence: "Public domain (trademarked)",
  },
  {
    name: "Microsoft Dynamics 365",
    logo: { src: "/platforms/dynamics-365.svg", width: 30, height: 40 },
    source: `${COMMONS}Microsoft_Dynamics_365_Logo_(2021–present).svg`,
    licence: "Public domain (trademarked)",
  },
  {
    name: "Power Platform",
    logo: { src: "/platforms/power-platform.svg", width: 39, height: 37 },
    source: `${COMMONS}Microsoft_Power_Platform_logo.svg`,
    licence: "Public domain (trademarked)",
  },
  {
    name: "Microsoft Azure",
    logo: { src: "/platforms/azure.svg", width: 38, height: 38 },
    source: `${COMMONS}Microsoft_Azure.svg`,
    licence: "Public domain (trademarked)",
  },
  {
    name: "Amazon Web Services",
    logo: { src: "/platforms/aws.svg", darkSrc: "/platforms/aws-dark.svg", width: 48, height: 29 },
    source: `${COMMONS}Amazon_Web_Services_Logo.svg`,
    licence: "Apache License 2.0 (trademarked)",
  },
  {
    name: "Stripe",
    logo: { src: "/platforms/stripe.svg", width: 60, height: 25 },
    source: `${COMMONS}Stripe_Logo,_revised_2016.svg`,
    licence: "Public domain (trademarked)",
  },
  {
    name: "Terraform",
    logo: { src: "/platforms/terraform.svg", width: 34, height: 34 },
    source: "https://cdn.jsdelivr.net/npm/simple-icons@16.17.0/icons/terraform.svg",
    licence: "CC0 1.0 (Simple Icons)",
  },
];
