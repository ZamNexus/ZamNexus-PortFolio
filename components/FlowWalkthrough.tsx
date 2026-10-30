import Walkthrough from "@/components/Walkthrough";
import { flows } from "@/lib/catalog";
import type { ProductSlug } from "@/lib/siteFacts";

interface FlowWalkthroughProps {
  slug: ProductSlug;
}

// One real event followed through every module it touches (lib/catalog.ts flows).
export default function FlowWalkthrough({ slug }: FlowWalkthroughProps) {
  const flow = flows.find((f) => f.slug === slug);
  if (!flow) return null;
  const event = flow.event.charAt(0).toLowerCase() + flow.event.slice(1);
  const headingId = `${slug}-flow-heading`;

  return (
    <section aria-labelledby={headingId} className="max-w-6xl mx-auto px-4 sm:px-6 py-20 sm:py-28 border-t border-zinc-800/60">
      <Walkthrough
        headingId={headingId}
        title={`What happens when ${event}.`}
        intro={`One event, followed through the ${flow.steps.length} modules it touches. Nothing is typed in twice.`}
        steps={flow.steps.map((s) => ({ code: s.code, name: s.name, detail: s.detail }))}
      />
    </section>
  );
}
