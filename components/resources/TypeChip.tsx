import { resourceTypes, type ResourceType } from "@/features/resources/resources";

// Figma "Type Chip" 494:2036.
export default function TypeChip({ type }: { type: ResourceType }) {
  const chip = resourceTypes[type];
  return (
    <span
      className={`inline-flex items-center justify-center rounded-fps-small border px-2.5 py-[5px] text-[11px]/[normal] font-semibold tracking-[0.5px] ${chip.className}`}
    >
      {chip.label}
    </span>
  );
}
