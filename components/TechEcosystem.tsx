import Stagger from "@/components/motion/Stagger";
import { services } from "@/lib/catalog";

// The tools and platforms behind each engineering service, taken from the service catalogue so the
// homepage and the Services page always name the same technologies.
export default function TechEcosystem() {
  return (
    <Stagger as="ul" className="grid grid-cols-1 md:grid-cols-2 gap-x-12 border-t border-[var(--border-subtle)]">
      {services.map((s) => (
        <li key={s.id} className="border-b border-[var(--border-subtle)] py-6">
          <h3 className="text-lg font-semibold text-foreground-strong">{s.label}</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {s.stack.map((tool) => (
              <li
                key={tool}
                className="rounded-full border border-[var(--border-subtle)] px-3 py-1 text-sm text-foreground-muted"
              >
                {tool}
              </li>
            ))}
          </ul>
        </li>
      ))}
    </Stagger>
  );
}
