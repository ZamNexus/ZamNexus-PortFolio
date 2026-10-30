import type { ComponentProps } from "react";
import Reveal from "./Reveal";

// A set of peers that appears one after another (--stagger apart). Each direct child is one step.
export default function Stagger(props: Omit<ComponentProps<typeof Reveal>, "variant">) {
  return <Reveal {...props} variant="group" />;
}
