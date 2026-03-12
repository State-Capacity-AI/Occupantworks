import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";

interface ContactModalProps {
  open: boolean;
  onClose: () => void;
}

export function ContactModal({ open, onClose }: ContactModalProps) {
  const [name, setName] = useState("");
  const [org, setOrg] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
      setTimeout(() => nameRef.current?.focus(), 300);
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Obfuscated mailto fallback
    const addr = ["hello", "occupant.ee"].join("@");
    const subject = encodeURIComponent(`From ${name} — ${org}`);
    const body = encodeURIComponent(message);
    window.location.href = `mailto:${addr}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setName("");
      setOrg("");
      setMessage("");
      onClose();
    }, 2000);
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 40 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[101] flex items-end md:items-center justify-center p-0 md:p-6"
          >
            <div className="bg-white w-full md:max-w-lg md:rounded-sm overflow-hidden rounded-t-xl md:rounded-t-sm">
              <div className="flex items-center justify-between px-6 md:px-8 pt-6 md:pt-8">
                <p
                  className="text-black/40"
                  style={{
                    fontSize: "0.75rem",
                    fontWeight: 500,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                  }}
                >
                  Start a conversation
                </p>
                <button
                  onClick={onClose}
                  className="text-black/30 hover:text-black transition-colors duration-200 -mr-1"
                >
                  <X size={18} />
                </button>
              </div>

              {submitted ? (
                <div className="px-6 md:px-8 py-16 text-center">
                  <p
                    className="tracking-tight"
                    style={{
                      fontSize: "1.25rem",
                      fontWeight: 300,
                      letterSpacing: "-0.01em",
                    }}
                  >
                    Opening your mail client...
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className="px-6 md:px-8 pt-8 pb-6 md:pb-8"
                >
                  <div className="space-y-5">
                    <div>
                      <label
                        htmlFor="name"
                        className="block text-black/40 mb-2"
                        style={{ fontSize: "0.8125rem", fontWeight: 400 }}
                      >
                        Name
                      </label>
                      <input
                        ref={nameRef}
                        id="name"
                        type="text"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full bg-transparent border-b border-black/15 pb-2 focus:border-black/40 outline-none transition-colors duration-200"
                        style={{ fontSize: "1rem", fontWeight: 400 }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="org"
                        className="block text-black/40 mb-2"
                        style={{ fontSize: "0.8125rem", fontWeight: 400 }}
                      >
                        Agency / Firm
                      </label>
                      <input
                        id="org"
                        type="text"
                        required
                        value={org}
                        onChange={(e) => setOrg(e.target.value)}
                        className="w-full bg-transparent border-b border-black/15 pb-2 focus:border-black/40 outline-none transition-colors duration-200"
                        style={{ fontSize: "1rem", fontWeight: 400 }}
                      />
                    </div>
                    <div>
                      <label
                        htmlFor="message"
                        className="block text-black/40 mb-2"
                        style={{ fontSize: "0.8125rem", fontWeight: 400 }}
                      >
                        Message
                      </label>
                      <textarea
                        id="message"
                        required
                        rows={3}
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="w-full bg-transparent border-b border-black/15 pb-2 focus:border-black/40 outline-none transition-colors duration-200 resize-none"
                        style={{ fontSize: "1rem", fontWeight: 400 }}
                      />
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="mt-8 w-full py-3.5 text-white transition-colors duration-200 cursor-pointer"
                    style={{
                      backgroundColor: "#6C3461",
                      fontSize: "0.875rem",
                      fontWeight: 500,
                      letterSpacing: "0.02em",
                    }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = "#552750")
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = "#6C3461")
                    }
                  >
                    Send
                  </button>
                </form>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}