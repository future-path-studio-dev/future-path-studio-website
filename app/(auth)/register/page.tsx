import type { Metadata } from "next";
import AuthShell from "@/components/auth/AuthShell";
import RegisterForm from "@/components/auth/RegisterForm";
import { registerPanel } from "@/features/auth/content";
import registerIllustration from "@/public/images/auth/register-illustration.png";

export const metadata: Metadata = {
  title: "Register | The Future Path Studio",
  description: "Create a client account to manage enquiries, access relevant resources and stay connected with The Future Path Studio.",
};

// Figma "Register – Desktop 1440" 10:26 and its states 142:8, 142:73, 142:139, 142:206.
export default function RegisterPage() {
  return (
    <AuthShell
      panel={registerPanel}
      size="register"
      illustration={{ src: registerIllustration, alt: "Laptop, notebook and signpost illustration representing guidance for training organisations", height: 340, top: "-52.647%" }}
    >
      <RegisterForm />
    </AuthShell>
  );
}
