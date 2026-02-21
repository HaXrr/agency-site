"use client";
import gsap from "gsap";
import { useRef } from "react";
import { useGSAP } from "@gsap/react";
import AboutCard from "../ui/AboutCard";
import { ScrollTrigger } from "gsap/ScrollTrigger";
const aboutData = [
  {
    id: "service-01",
    title: "Custom Web Solutions",
    description:
      "From frontend interactions to backend APIs, I build complete web solutions. I work with modern stacks to deliver apps that are scalable, maintainable, and ready for real-world users.",
    items: [
      { id: 1, label: "React, Node.js, Express.js" },
      { id: 2, label: "MongoDB, PostgreSQL, MySQL" },
      { id: 3, label: "TailwindCSS, Material UI, Styled Components" },
    ],
  },
  {
    id: "service-02",
    title: "E-Commerce Platforms",
    description:
      "I build conversion-focused storefronts with clean product flows, secure checkout experiences, and admin-friendly dashboards that support growth.",
    items: [
      { id: 1, label: "Shopify, WooCommerce, Headless CMS" },
      { id: 2, label: "Stripe, Razorpay, Secure Payment Flows" },
      { id: 3, label: "Catalog, Cart, Orders, Analytics" },
    ],
  },
  {
    id: "service-03",
    title: "Performance & Maintenance",
    description:
      "I optimize loading speed, improve reliability, and maintain production systems so your website stays fast, stable, and easy to scale over time.",
    items: [
      { id: 1, label: "Core Web Vitals, Lighthouse Audits" },
      { id: 2, label: "Bug Fixes, Monitoring, Deployments" },
      { id: 3, label: "SEO, Caching, Ongoing Support" },
    ],
  },
];
// Register plugins once for this module.
gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function About() {
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      const buildCardAnimations = ({ reducedMotion }) => {
        const cards = gsap.utils.toArray(".about-card", sectionRef.current);

        cards.forEach((card) => {
          const shell = card.querySelector(".about-card-shell");
          const number = card.querySelector(".about-card-number");
          const title = card.querySelector(".about-card-title");
          const description = card.querySelector(".about-card-description");
          const items = gsap.utils.toArray(".about-item", card);
          const borderRows = gsap.utils.toArray(
            '.about-item[data-has-border="true"]',
            card,
          );

          if (!number || !title || !description || !shell) return;

          // Reduced-motion branch keeps reveals simple and avoids scrubbed transforms.
          if (reducedMotion) {
            gsap.set(card, { autoAlpha: 1, y: 0 });
            gsap.set(shell, { yPercent: 0, scale: 1 });
            gsap.set(borderRows, { borderColor: "rgba(0, 0, 0, 0)" });

            gsap
              .timeline({
                defaults: { ease: "power2.out" },
                scrollTrigger: {
                  trigger: card,
                  start: "top 88%",
                  end: "top 60%",
                  toggleActions: "play none none reverse",
                  markers: false,
                  invalidateOnRefresh: true,
                },
              })
              .fromTo(
                [number, title, description],
                { autoAlpha: 0, y: 14 },
                { autoAlpha: 1, y: 0, duration: 0.45, stagger: 0.08 },
              )
              .fromTo(
                items,
                { autoAlpha: 0, y: 10 },
                { autoAlpha: 1, y: 0, duration: 0.4, stagger: 0.08 },
                "-=0.12",
              )
              .to(
                borderRows,
                {
                  borderColor: "var(--color-4)",
                  duration: 0.4,
                  stagger: 0.08,
                },
                "<",
              );

            return;
          }

          gsap.set(card, { autoAlpha: 0, y: 40 });
          gsap.set(shell, { scale: 0.985, yPercent: 0, transformOrigin: "50% 50%" });
          gsap.set([number, title, description], { autoAlpha: 0, y: 20 });
          gsap.set(borderRows, { borderColor: "rgba(0, 0, 0, 0)" });

          items.forEach((item, index) => {
            const directionX = index % 2 === 0 ? -24 : 24;
            gsap.set(item, { autoAlpha: 0, x: directionX, y: 10 });
          });

          // Card reveal flow: card shell -> heading text -> item rows.
          gsap
            .timeline({
              defaults: { ease: "power2.out" },
              scrollTrigger: {
                trigger: card,
                start: "top 82%",
                end: "top 45%",
                toggleActions: "play none none reverse",
                markers: false,
                invalidateOnRefresh: true,
              },
            })
            .to(card, { autoAlpha: 1, y: 0, duration: 0.7 })
            .to(number, { autoAlpha: 1, y: 0, duration: 0.45 }, "-=0.4")
            .to(
              [title, description],
              { autoAlpha: 1, y: 0, duration: 0.55, stagger: 0.1 },
              "-=0.2",
            )
            .to(
              items,
              {
                autoAlpha: 1,
                x: 0,
                y: 0,
                duration: 0.5,
                stagger: 0.1,
                ease: "power3.out",
              },
              "-=0.15",
            )
            .to(
              borderRows,
              { borderColor: "var(--color-4)", duration: 0.5, stagger: 0.1 },
              "<",
            );

          // Subtle scrubbed parallax keeps card movement slower than page scroll.
          gsap.fromTo(
            shell,
            { yPercent: 4, scale: 0.992, opacity: 0.92 },
            {
              yPercent: -8,
              scale: 1,
              opacity: 1,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
                markers: false,
                invalidateOnRefresh: true,
              },
            },
          );
        });
      };

      // Title block remains static by only targeting `.about-card` descendants.
      mm.add("(prefers-reduced-motion: reduce)", () => {
        buildCardAnimations({ reducedMotion: true });
      });

      mm.add("(prefers-reduced-motion: no-preference)", () => {
        buildCardAnimations({ reducedMotion: false });
      });

      ScrollTrigger.refresh();

      return () => {
        mm.revert();
      };
    },
    { scope: sectionRef },
  );

  return (
    <section
      ref={sectionRef}
      className="w-full min-h-screen rounded-t-3xl lg:rounded-t-4xl px-4 sm:px-6 lg:px-8 bg-[var(--color-1)] flex flex-col items-center justify-center"
    >
      <div className="about-static py-12 sm:py-16 lg:py-20">
        <h1 className="text-4xl sm:text-6xl lg:text-8xl leading-[0.95] uppercase font-bold text-[var(--color-5)]">
          What we Do /
        </h1>
        <div className="flex justify-end w-full">
          <div className="w-full lg:w-1/2 pt-8 sm:pt-12 lg:pt-20 flex flex-col sm:flex-row gap-3 sm:gap-5 text-base sm:text-lg lg:text-2xl">
            <p className="uppercase text-[var(--color-4)]">{"(services)"}</p>
            <p className="flex text-[var(--color-3)] leading-relaxed">
              We specialize in building fast, reliable, and user-friendly
              full-stack web applications.We help small businesses and startups
              turn ideas into high-quality web sites and products that actually
              work and scale.
            </p>
          </div>
        </div>
      </div>
      <div className="about-cards w-full">
        {aboutData.map((data, index) => {
          return <AboutCard key={data.id} number={index + 1} {...data} />;
        })}
      </div>
    </section>
  );
}
