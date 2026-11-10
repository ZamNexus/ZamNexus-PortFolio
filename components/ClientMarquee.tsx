import Image from "next/image";
import { clients, confirmed } from "@/lib/siteFacts";

// A calm, slowly moving row of the organisations ZamNexus works with, in the manner of a customer-logo strip:
// a centred heading, then each organisation in a quiet monochrome cell with what it does beneath. A client with a
// logo file shows it; otherwise its name is set as a wordmark. The list is drawn twice for a seamless loop (the copy
// is hidden from screen readers); it pauses on hover and rests as a wrapped row under reduced motion.
// Renders nothing until a client is approved in lib/siteFacts.ts.
export default function ClientMarquee() {
  const approved = confirmed(clients);
  if (!approved.length) return null;
  // Repeated inside each half so the row is always wider than the screen
  const items = [...approved, ...approved];

  return (
    <section aria-labelledby="clients-heading" className="client-logos">
      <div className="client-logos__head">
        <p className="client-logos__eyebrow">Trusted by</p>
        <h2 id="clients-heading" className="client-logos__title">
          The organisations we have built for.
        </h2>
      </div>

      <div className="client-logos__viewport">
        <div className="animate-marquee client-logos__track">
          {[0, 1].map((copy) => (
            <ul key={copy} className="client-logos__row" aria-hidden={copy === 1 ? true : undefined}>
              {items.map((c, i) => (
                <li key={`${c.name}-${i}`} aria-hidden={i >= approved.length ? true : undefined}>
                  {c.logo ? (
                    <Image src={c.logo} alt={c.name} width={160} height={48} className="client-logos__img" />
                  ) : (
                    <span className="client-logos__mark">{c.name}</span>
                  )}
                  <span className="client-logos__sector">{c.sector}</span>
                </li>
              ))}
            </ul>
          ))}
        </div>
      </div>
    </section>
  );
}
