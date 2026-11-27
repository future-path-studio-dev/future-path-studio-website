// Copy from Figma: Login 10:2 (information panel 11:2), Register 10:26 (12:2).
// The Forgot Password frame 136:236 reuses the Login information panel.

export const loginPanel = {
  heading: "Welcome back",
  body: "Sign in to access your enquiries, service requests, resources and account information.",
  benefits: [
    "Review enquiries",
    "Access saved resources",
    "View service requests",
    "Continue working with The Future Path Studio",
  ],
} as const;

export const registerPanel = {
  heading: "Create a client account",
  body: "Create an account to manage enquiries, access relevant resources and stay connected with The Future Path Studio.",
  benefits: [
    "Track enquiries",
    "Access saved resources",
    "Review service requests",
    "Receive relevant support updates",
  ],
} as const;

// Not in Figma. Shown after a valid submission while no authentication
// provider is configured, so nobody is told they signed in when they did not.
export const unavailableMessage = {
  title: "Account access is not available yet.",
  body: "Client accounts are still being set up, so you cannot sign in, register or reset a password online yet. For help, email hello@futurepathstudio.com.",
} as const;
