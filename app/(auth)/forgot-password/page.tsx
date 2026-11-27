import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import ForgotPasswordForm from "@/components/auth/ForgotPasswordForm";
import { loginPanel } from "@/features/auth/content";
import loginIllustration from "@/public/images/auth/login-illustration.png";

export const metadata: Metadata = {
  title: "Forgot Password | The Future Path Studio",
  description: "Request a link to reset your The Future Path Studio account password.",
};

// Figma "Forgot Password" 136:236. It reuses the Login information panel.
export default function ForgotPasswordPage() {
  return (
    <AuthShell
      panel={loginPanel}
      size="login"
      illustration={{ src: loginIllustration, alt: "Illustration of a team working together around a laptop and tablet", height: 300, top: "-53%" }}
    >
      <ForgotPasswordForm />
    </AuthShell>
  );
}
