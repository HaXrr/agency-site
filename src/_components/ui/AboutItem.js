export default function AboutItem({ index, label, isLast }) {
  return (
    <div
      className={`py-3 sm:py-4 flex items-baseline gap-3 sm:gap-4 ${
        isLast ? "" : "border-b border-[var(--color-4)]"
      }`}
    >
      <sub className="text-xs sm:text-sm lg:text-base text-[var(--color-4)] leading-none">
        {String(index).padStart(2, "0")}
      </sub>
      <p className="text-lg sm:text-2xl lg:text-3xl text-[var(--color-5)] font-bold leading-snug">
        {label}
      </p>
    </div>
  );
}
