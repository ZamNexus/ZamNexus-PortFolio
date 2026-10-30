// Technologies named in the services (lib/catalog.ts): tools the team builds with, not partner claims.
const stack = [
  "AWS Lambda",
  "Microsoft Azure",
  "Dynamics 365",
  "Power Platform",
  "Salesforce",
  "Node.js",
  "TypeScript",
  "Terraform",
  "Stripe",
  "HL7",
  "Power BI",
  "MuleSoft",
];

// A slow, continuous band of the stack. The list is drawn twice for a seamless loop;
// the copy is hidden from screen readers. Pauses on hover; static under reduced motion.
export default function TechMarquee() {
  return (
    <section aria-labelledby="stack-heading" className="tech-band">
      <h2 id="stack-heading" className="tech-band__label">
        What we build with
      </h2>
      <div className="tech-band__viewport">
        <div className="animate-marquee tech-band__track">
          {[stack, stack].map((list, copy) => (
            <ul key={copy} className="tech-band__list" aria-hidden={copy === 1 ? true : undefined}>
              {list.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
