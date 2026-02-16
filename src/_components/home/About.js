"use client";
import gsap from "gsap";
import { useState, useEffect, useRef } from "react";
import { useGSAP } from "@gsap/react";
import AboutCard from "../ui/AboutCard";

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

export default function About() {
  const container = useRef();

  useGSAP(
    () => {
      const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (prefersReducedMotion) {
        gsap.set(container.current, { autoAlpha: 1 });
        return;
      }

      const tl = gsap.timeline();
      tl.to(container.current, { autoAlpha: 1, duration: 0.75, ease: "power4.inOut" });
    },
    { scope: container },
  ); // scoping is best practice
  return (
    <section
      ref={container}
      id="about"
      className="about-section w-full rounded-t-3xl lg:rounded-t-4xl opacity-0 px-4 sm:px-6 lg:px-8 bg-[var(--color-1)]"
    >
      <div className="about py-12 sm:py-16 lg:py-20">
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
      {aboutData.map((data, index) => {
        return <AboutCard key={data.id} number={index + 1} {...data} />;
      })}
    </section>
  );
}
