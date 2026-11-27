import type { ChangeEvent, Ref } from "react";

type AuthCheckboxProps = {
  id: string;
  name: string;
  label: string;
  checked: boolean;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  describedBy?: string;
  invalid?: boolean;
  inputRef?: Ref<HTMLInputElement>;
  className?: string;
};

// Figma "Checkbox" component 132:14: 18px, 1px teal border, 4px radius; Checked
// fills teal with a white tick.
export default function AuthCheckbox({ id, name, label, checked, onChange, describedBy, invalid, inputRef, className = "" }: AuthCheckboxProps) {
  return (
    <div className={`flex items-center gap-2.5 ${className}`}>
      <span className="relative grid size-[18px] shrink-0 place-items-center">
        <input
          ref={inputRef}
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={onChange}
          aria-describedby={describedBy}
          aria-invalid={invalid ? true : undefined}
          className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-[4px] border border-brand-secondary bg-white checked:bg-brand-secondary focus-visible:outline-2 focus-visible:outline-offset-3 focus-visible:outline-brand-primary aria-invalid:border-[#c0392b]"
        />
        <span aria-hidden="true" className="pointer-events-none relative hidden text-xs/none font-bold text-white peer-checked:block">
          ✓
        </span>
      </span>
      <label htmlFor={id} className="cursor-pointer text-sm/[22px] text-foreground">
        {label}
      </label>
    </div>
  );
}
