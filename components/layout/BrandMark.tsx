export default function BrandMark({ className }: { className: string }) {
  return (
    <span
      aria-hidden="true"
      className={`inline-grid shrink-0 place-items-center rounded-[10px] bg-[linear-gradient(120.17deg,#17324d_0%,#16c0a6_73.529%)] text-[17px]/[22px] font-bold text-white ${className}`}
    >
      FP
    </span>
  );
}
