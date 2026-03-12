import { useState, useEffect } from "react";
import { ArrowUpRight } from "lucide-react";
import { ContactModal } from "./components/ContactModal";

const ACCENT = "#6C3461"; // Anaheim Ducks Eggplant — interactive elements only

const services = [
  {
    title: "Program & Delivery Management",
    description:
      "For programs that are behind, at risk, or missing senior operational ownership. We stabilize, align, and move things forward.",
  },
  {
    title: "Service Design & Discovery",
    description:
      "Assessment and research for agencies and primes that need to know what's broken before they build. Findings you can act on, not slide decks.",
  },
  {
    title: "Synthetic UX Research",
    description:
      "Behavioral insight at the speed government actually needs. For agencies and nonprofits that can't staff a research practice but can't keep making decisions without one.",
  },
];

export default function App() {
  const [contactOpen, setContactOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [expandedService, setExpandedService] = useState<number | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      className="min-h-screen text-black selection:text-white"
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#F2F0ED",
      }}
    >
      <style>{`::selection { background: ${ACCENT}; }`}</style>

      {/* Sticky Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? "rgba(242,240,237,0.95)" : "transparent",
          backdropFilter: scrolled ? "blur(12px)" : "none",
        }}
      >
        <div className="flex justify-between items-center px-5 md:px-10 py-5">
          <span
            className="tracking-tight"
            style={{
              fontSize: "clamp(1.125rem, 1.5vw, 1.375rem)",
              fontWeight: 500,
              letterSpacing: "-0.02em",
              color: scrolled ? "#0A0A0A" : "#F2F0ED",
            }}
          >
            Occupant
          </span>
          <button
            onClick={() => setContactOpen(true)}
            className="cursor-pointer transition-colors duration-200"
            style={{
              fontSize: "clamp(0.8125rem, 1vw, 0.875rem)",
              fontWeight: 500,
              color: scrolled ? ACCENT : "rgba(242,240,237,0.6)",
              background: "none",
              border: "none",
              padding: 0,
            }}
          >
            Start a Conversation
          </button>
        </div>
      </nav>

      {/* Hero */}
      <section
        className="min-h-screen flex flex-col justify-end px-5 md:px-10 pb-12 md:pb-20"
        style={{ backgroundColor: "#0A0A0A", color: "#F2F0ED" }}
      >
        <h1
          className="max-w-[18ch] tracking-tight"
          style={{
            fontSize: "clamp(2.25rem, 6.5vw, 6rem)",
            fontWeight: 300,
            lineHeight: 1.05,
            letterSpacing: "-0.035em",
            color: "#F2F0ED",
          }}
        >
          Digital Delivery for Complex Missions.
        </h1>
        <p
          className="mt-6 md:mt-10 max-w-[60ch]"
          style={{
            fontSize: "clamp(1rem, 1.5vw, 1.25rem)",
            fontWeight: 400,
            lineHeight: 1.55,
            color: "rgba(242,240,237,0.5)",
          }}
        >
          Bridging the gap between policy intent and digital reality. Senior
          strategy and delivery leadership for government agencies and civic tech
          primes.
        </p>
      </section>

      {/* Services */}
      <section className="px-5 md:px-10 pt-24 md:pt-40 pb-24 md:pb-40">
        <p
          className="text-black/40 mb-14 md:mb-24"
          style={{
            fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          What we do
        </p>
        <div>
          {services.map((service) => (
            <div
              key={service.title}
              className="border-t border-black/8 last:border-b py-7 md:py-10"
            >
              <h2
                className="tracking-tight"
                style={{
                  fontSize: "clamp(1.375rem, 3vw, 2.5rem)",
                  fontWeight: 300,
                  lineHeight: 1.15,
                  letterSpacing: "-0.02em",
                }}
              >
                {service.title}
              </h2>
              <p
                className="mt-3 md:mt-4 text-black/45 max-w-[58ch]"
                style={{
                  fontSize: "clamp(0.9375rem, 1.3vw, 1.0625rem)",
                  fontWeight: 400,
                  lineHeight: 1.65,
                }}
              >
                {service.description}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* About */}
      <section
        className="px-5 md:px-10 pt-24 md:pt-40 pb-24 md:pb-40"
        style={{ backgroundColor: "#E8E5E0" }}
      >
        <p
          className="text-black/40 mb-14 md:mb-24"
          style={{
            fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
          }}
        >
          About
        </p>
        <p
          className="max-w-[48ch] tracking-tight"
          style={{
            fontSize: "clamp(1.375rem, 3vw, 2.5rem)",
            fontWeight: 300,
            lineHeight: 1.25,
            letterSpacing: "-0.02em",
          }}
        >
          Occupant is a social purpose corporation that helps public-sector
          agencies, nonprofits, and civic tech firms deliver better.
        </p>
        <p
          className="mt-8 md:mt-14 text-black/45 max-w-[58ch]"
          style={{
            fontSize: "clamp(1rem, 1.4vw, 1.125rem)",
            fontWeight: 400,
            lineHeight: 1.65,
          }}
        >
          We work across program and delivery management, service design and
          discovery, and a new category we're building — synthetic UX research
          for organizations that need behavioral insight fast but can't staff a
          research practice. The work is grounded in years of hands-on delivery
          inside federal agencies and the firms that support them.
        </p>
      </section>

      {/* Footer / Contact */}
      <section
        className="px-5 md:px-10 pt-24 md:pt-40 pb-10 md:pb-16 min-h-[55vh] flex flex-col justify-end"
        style={{ backgroundColor: "#0A0A0A", color: "#F2F0ED" }}
      >
        <p
          className="mb-8 md:mb-14"
          style={{
            fontSize: "clamp(0.6875rem, 0.9vw, 0.8125rem)",
            fontWeight: 500,
            letterSpacing: "0.12em",
            textTransform: "uppercase",
            color: "rgba(242,240,237,0.4)",
          }}
        >
          Let's talk
        </p>
        <button
          onClick={() => setContactOpen(true)}
          className="text-left tracking-tight transition-opacity duration-300 hover:opacity-60 cursor-pointer flex items-center gap-3 md:gap-5 group"
          style={{
            fontSize: "clamp(1.5rem, 4.5vw, 4rem)",
            fontWeight: 300,
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
            background: "none",
            border: "none",
            padding: 0,
            color: "#F2F0ED",
          }}
        >
          Start a Conversation
          <ArrowUpRight
            className="transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
            style={{
              width: "clamp(1.25rem, 3vw, 2.5rem)",
              height: "clamp(1.25rem, 3vw, 2.5rem)",
              color: ACCENT,
            }}
          />
        </button>

        <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-10 mt-20 md:mt-28">
          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="transition-colors duration-200"
            style={{
              fontSize: "0.8125rem",
              fontWeight: 400,
              color: "rgba(242,240,237,0.35)",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = ACCENT)}
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "rgba(242,240,237,0.35)")
            }
          >
            LinkedIn
          </a>
          <span
            className="md:ml-auto"
            style={{ fontSize: "0.8125rem", fontWeight: 400, color: "rgba(242,240,237,0.15)" }}
          >
            &copy; Occupant {new Date().getFullYear()}
          </span>
        </div>
      </section>

      {/* Contact Modal */}
      <ContactModal open={contactOpen} onClose={() => setContactOpen(false)} />
    </div>
  );
}