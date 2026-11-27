"use client";

import { useCallback, useState, type ReactNode } from "react";
import ContactForm from "./ContactForm";
import ContactSuccess from "./ContactSuccess";

// Figma "Contact Main" 403:629. After a confirmed submission the two cards are
// replaced by the full-width success card, as in 405:959.
export default function ContactMain({ details }: { details: ReactNode }) {
  const [sent, setSent] = useState(false);
  const handleSuccess = useCallback(() => setSent(true), []);

  return (
    <div className="fps-container pb-7 min-[600px]:pb-14">
      {sent ? (
        <ContactSuccess />
      ) : (
        <div className="grid items-start gap-4 min-[600px]:gap-10 min-[1024px]:grid-cols-2">
          {details}
          <ContactForm onSuccess={handleSuccess} />
        </div>
      )}
    </div>
  );
}
