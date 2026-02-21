export default function AboutItem({ index, label, isLast }) {
  return (
    <div
      data-has-border={!isLast}
      className={`about-item py-3 sm:py-4 flex items-baseline gap-3 sm:gap-4 ${
        isLast ? "" : "border-b border-[var(--color-4)]"
      }`}
    >
      <sub className="about-item-index text-xs sm:text-sm lg:text-base text-[var(--color-4)] leading-none">
        {String(index).padStart(2, "0")}
      </sub>
      <p className="about-item-label text-lg sm:text-2xl lg:text-3xl text-[var(--color-5)] font-bold leading-snug">
        {label}
      </p>
    </div>
  );
}
