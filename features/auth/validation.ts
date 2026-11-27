// Validation shared by the browser forms and the Server Actions, so both apply
// exactly the same rules. Messages marked "Figma" are copied from the design;
// the others fill gaps the design does not show (see docs/AUTH_IMPLEMENTATION.md).

export const PASSWORD_MIN_LENGTH = 8;
const EMAIL_MAX_LENGTH = 254;
const NAME_MAX_LENGTH = 80;
const PASSWORD_MAX_LENGTH = 128;
// Pragmatic check: something@domain.tld with no spaces. Figma 142:139 rejects
// "alex.taylor@email" (no top-level domain).
const EMAIL_PATTERN = /^[^\s@]+@[^\s@.]+(\.[^\s@.]+)+$/;

export const messages = {
  emailRequired: "Please enter your email address.",
  emailInvalid: "Please enter a valid email address.", // Figma 142:204
  passwordRequired: "Please enter your password.",
  firstNameRequired: "Please enter your first name.",
  lastNameRequired: "Please enter your last name.",
  newPasswordRequired: "Please create a password.",
  passwordTooShort: `Password must be at least ${PASSWORD_MIN_LENGTH} characters.`,
  passwordTooLong: `Password must be ${PASSWORD_MAX_LENGTH} characters or fewer.`,
  confirmRequired: "Please re-enter your password.",
  passwordMismatch: "Passwords do not match.", // Figma 142:205
  termsRequired: "Please agree to the Terms and Privacy Policy.",
  nameTooLong: `Please use ${NAME_MAX_LENGTH} characters or fewer.`,
} as const;

export type LoginValues = { email: string; password: string; remember: boolean };
export type RegisterValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: boolean;
};
export type ForgotValues = { email: string };

export type LoginField = "email" | "password";
export type RegisterField = "firstName" | "lastName" | "email" | "password" | "confirmPassword" | "terms";
export type ForgotField = "email";
export type FieldErrors<F extends string> = Partial<Record<F, string>>;

export const loginFields: readonly LoginField[] = ["email", "password"];
export const registerFields: readonly RegisterField[] = [
  "firstName",
  "lastName",
  "email",
  "password",
  "confirmPassword",
  "terms",
];

export function validateEmail(value: string): string | undefined {
  const email = value.trim();
  if (!email) return messages.emailRequired;
  if (email.length > EMAIL_MAX_LENGTH || !EMAIL_PATTERN.test(email)) return messages.emailInvalid;
  return undefined;
}

function validateName(value: string, requiredMessage: string): string | undefined {
  const name = value.trim();
  if (!name) return requiredMessage;
  if (name.length > NAME_MAX_LENGTH) return messages.nameTooLong;
  return undefined;
}

function validateNewPassword(value: string): string | undefined {
  if (!value) return messages.newPasswordRequired;
  if (value.length < PASSWORD_MIN_LENGTH) return messages.passwordTooShort;
  if (value.length > PASSWORD_MAX_LENGTH) return messages.passwordTooLong;
  return undefined;
}

function validateConfirm(password: string, confirm: string): string | undefined {
  if (!confirm) return messages.confirmRequired;
  if (confirm !== password) return messages.passwordMismatch;
  return undefined;
}

export function validateLoginField(field: LoginField, values: LoginValues): string | undefined {
  if (field === "email") return validateEmail(values.email);
  if (!values.password) return messages.passwordRequired;
  if (values.password.length > PASSWORD_MAX_LENGTH) return messages.passwordTooLong;
  return undefined;
}

export function validateLogin(values: LoginValues): FieldErrors<LoginField> {
  return collect(loginFields, (field) => validateLoginField(field, values));
}

export function validateRegisterField(field: RegisterField, values: RegisterValues): string | undefined {
  switch (field) {
    case "firstName":
      return validateName(values.firstName, messages.firstNameRequired);
    case "lastName":
      return validateName(values.lastName, messages.lastNameRequired);
    case "email":
      return validateEmail(values.email);
    case "password":
      return validateNewPassword(values.password);
    case "confirmPassword":
      return validateConfirm(values.password, values.confirmPassword);
    case "terms":
      return values.terms ? undefined : messages.termsRequired;
  }
}

export function validateRegister(values: RegisterValues): FieldErrors<RegisterField> {
  return collect(registerFields, (field) => validateRegisterField(field, values));
}

export function validateForgot(values: ForgotValues): FieldErrors<ForgotField> {
  const email = validateEmail(values.email);
  return email ? { email } : {};
}

function collect<F extends string>(fields: readonly F[], check: (field: F) => string | undefined) {
  const errors: FieldErrors<F> = {};
  for (const field of fields) {
    const error = check(field);
    if (error) errors[field] = error;
  }
  return errors;
}

const text = (formData: FormData, key: string) => {
  const value = formData.get(key);
  return typeof value === "string" ? value : "";
};

export function readLogin(formData: FormData): LoginValues {
  return { email: text(formData, "email"), password: text(formData, "password"), remember: formData.get("remember") === "on" };
}

export function readRegister(formData: FormData): RegisterValues {
  return {
    firstName: text(formData, "firstName"),
    lastName: text(formData, "lastName"),
    email: text(formData, "email"),
    password: text(formData, "password"),
    confirmPassword: text(formData, "confirmPassword"),
    terms: formData.get("terms") === "on",
  };
}

export function readForgot(formData: FormData): ForgotValues {
  return { email: text(formData, "email") };
}
