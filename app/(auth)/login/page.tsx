import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import LoginForm from "@/components/auth/LoginForm";
import { loginPanel } from "@/features/auth/content";
import loginIllustration from "@/public/images/auth/login-illustration.png";

export const metadata: Metadata = {
  title: "Login | The Future Path Studio",
  description: "Sign in to access your enquiries, service requests, resources and account information.",
};

// Figma "Login – Desktop 1440" 10:2 and its states 136:61, 136:118, 136:177.
export default function LoginPage() {
  return (
    <AuthShell
      panel={loginPanel}
      size="login"
      illustration={{ src: loginIllustration, alt: "Illustration of a team working together around a laptop and tablet", height: 300, top: "-53%" }}
    >
      <LoginForm />
    </AuthShell>
  );
}
