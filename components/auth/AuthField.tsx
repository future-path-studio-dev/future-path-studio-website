import type { ChangeEvent, Ref } from "react";

type AuthFieldProps = {
  id: string;
  name: string;
  label: string;
  value: string;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  type?: "text" | "email" | "password";
  placeholder?: string;
  autoComplete?: string;
  error?: string;
  /** Marks the input invalid without a field message (Login error banner, Figma 136:118). */
  invalid?: boolean;
  describedBy?: string;
  inputRef?: Ref<HTMLInputElement>;
  /** Figma input height: 56px on Login and Forgot Password, 52px on Register. */
  height?: 56 | 52;
  maxLength?: number;
};

// Figma "Input Field" component 132:23: Default (1px #d0d5dd), Focus (2px teal),
// Filled, Error (1.5px #c0392b). The error message sits below the field as a
// sibling in the card column, as in Figma 142:139.
export default function AuthField({
  id,
  name,
  label,
  value,
  onChange,
  type = "text",
  placeholder,
  autoComplete,
  error,
  invalid,
  describedBy,
  inputRef,
  height = 56,
  maxLength,
}: AuthFieldProps) {
  const errorId = `${id}-error`;
  const isInvalid = Boolean(error) || invalid;
  const described = [error ? errorId : null, describedBy ?? null].filter(Boolean).join(" ") || undefined;

  return (
    <>
      {/* Figma field frames are 2px taller than label + input (86px / 82px). */}
      <div className={`flex w-full flex-col gap-2 ${height === 56 ? "min-h-[86px]" : "min-h-[82px]"}`}>
        <label htmlFor={id} className="text-sm/5 font-semibold text-foreground">
          {label}
        </label>
        <input
          ref={inputRef}
          id={id}
          name={name}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          autoComplete={autoComplete}
          maxLength={maxLength}
          aria-required="true"
          aria-invalid={isInvalid ? true : undefined}
          aria-describedby={described}
          className={`w-full rounded-fps-medium border border-border bg-surface px-[15px] text-base text-foreground outline-none placeholder:text-muted focus:border-2 focus:border-brand-secondary focus:px-[14px] aria-invalid:border-[1.5px] aria-invalid:border-[#c0392b] aria-invalid:px-[14.5px] aria-invalid:focus:border-2 aria-invalid:focus:px-[14px] ${
            height === 56 ? "h-14" : "h-[52px]"
          }`}
        />
      </div>
      {error ? (
        <p id={errorId} className="text-[13px]/[normal] text-[#c0392b]">
          {error}
        </p>
      ) : null}
    </>
  );
}
