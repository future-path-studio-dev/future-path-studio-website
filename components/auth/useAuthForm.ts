"use client";

import { startTransition, useEffect, useRef, useState, type FormEvent } from "react";
import type { AuthResult } from "@/features/auth/types";
import type { FieldErrors } from "@/features/auth/validation";

type Options<V, F extends string> = {
  initial: V;
  fields: readonly F[];
  result: AuthResult<F>;
  /** The useActionState dispatcher for this form's Server Action. */
  action: (formData: FormData) => void;
  validate: (values: V) => FieldErrors<F>;
  validateField: (field: F, values: V) => string | undefined;
  /** Fields whose error depends on another field (e.g. confirm password on password). */
  dependents?: Partial<Record<F, F[]>>;
};

// Shared client state for the auth forms: browser validation on submit, live
// re-validation after the first attempt, server validation results, and focus
// moved to the first invalid field.
export function useAuthForm<V extends Record<string, unknown>, F extends string & keyof V>({
  initial,
  fields,
  result,
  action,
  validate,
  validateField,
  dependents = {},
}: Options<V, F>) {
  const [values, setValues] = useState<V>(initial);
  const [errors, setErrors] = useState<FieldErrors<F>>({});
  const [attempted, setAttempted] = useState(false);
  const [handled, setHandled] = useState(result);
  const [focusRequest, setFocusRequest] = useState(0);
  const refs = useRef<Partial<Record<F, HTMLInputElement | null>>>({});

  if (result !== handled) {
    setHandled(result);
    if (result.status === "invalid") {
      setErrors(result.errors);
      setAttempted(true);
      setFocusRequest((n) => n + 1);
    }
  }

  useEffect(() => {
    if (focusRequest === 0) return;
    const first = fields.find((field) => errors[field]);
    if (first) refs.current[first]?.focus();
    // Run only when a new focus request is made.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [focusRequest]);

  function setValue<K extends keyof V & string>(key: K, value: V[K]) {
    const next = { ...values, [key]: value };
    setValues(next);
    if (!attempted || !(fields as readonly string[]).includes(key)) return;
    const field = key as unknown as F;
    setErrors((current) => {
      const updated: FieldErrors<F> = { ...current, [field]: validateField(field, next) };
      for (const dependent of dependents[field] ?? []) {
        if (current[dependent] !== undefined || next[dependent]) updated[dependent] = validateField(dependent, next);
      }
      return updated;
    });
  }

  // The form keeps action={formAction} so it still works before hydration. With
  // JavaScript, submission is dispatched here instead: React's automatic reset
  // after an action submission would otherwise clear the DOM state of
  // controlled checkboxes (Remember me, Terms) while their React state stays set.
  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const nextErrors = validate(values);
    setAttempted(true);
    setErrors(nextErrors);
    if (Object.values(nextErrors).some(Boolean)) {
      setFocusRequest((n) => n + 1);
      return;
    }
    const formData = new FormData(event.currentTarget);
    startTransition(() => action(formData));
  }

  const register = (field: F) => (element: HTMLInputElement | null) => {
    refs.current[field] = element;
  };

  const errorCount = fields.filter((field) => errors[field]).length;
  return { values, setValue, errors, onSubmit, register, errorCount };
}
