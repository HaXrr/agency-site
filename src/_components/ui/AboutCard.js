import AboutItem from "./AboutItem";

export default function AboutCard({ number, title, description, items }) {
  return (
    <article className="about-card py-6 sm:py-8 border-t border-[var(--color-4)]">
      <div className="about-card-shell flex flex-col lg:flex-row lg:justify-between gap-4 lg:gap-0">
        <p className="about-card-number text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-5)]">
          ({String(number).padStart(2, "0")})
        </p>

        <div className="w-full lg:w-1/2 flex flex-col gap-2">
          <h1 className="about-card-title pb-4 sm:pb-6 lg:pb-10 text-2xl sm:text-3xl lg:text-4xl font-bold text-[var(--color-5)] leading-tight">
            {title}
          </h1>
          <p className="about-card-description w-full lg:max-w-[70%] text-base sm:text-lg lg:text-xl pb-4 sm:pb-6 text-[var(--color-3)] leading-relaxed">
            {description}
          </p>

          <div className="about-card-items">
            {items.map((item, idx) => (
              <AboutItem
                key={`${item.id}-${item.label}`}
                index={idx + 1}
                label={item.label}
                isLast={idx === items.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}
