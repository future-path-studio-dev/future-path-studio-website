// Figma "IMAGE SLOT" placeholders (500:2062, 511:2652). Figma has no real preview
// image yet, so the designed placeholder is reproduced and hidden from assistive tech.
export default function ImageSlot({
  label,
  meta,
  className = "",
}: {
  label: string;
  meta?: string;
  className?: string;
}) {
  return (
    <div
      aria-hidden="true"
      className={`flex flex-col items-center justify-center gap-1.5 rounded-fps-medium border border-dashed border-border bg-[#e4eaf0] text-[#9aa7b4] ${className}`}
    >
      <span className="text-[10px]/[normal] font-semibold tracking-[1px] min-[900px]:text-[11px]/[normal]">
        {label}
      </span>
      {meta && <span className="text-xs/[normal]">{meta}</span>}
    </div>
  );
}
