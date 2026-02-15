"use client";
import Link from "next/link";
import React, { useState, useEffect, useRef } from "react";
import {
  FaXTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaInstagram,
  FaBars,
  FaX,
} from "react-icons/fa6";
import "./menu.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

const menuLinks = [
  {
    path: "#home",
    label: "Home",
    kicker: "First impression",
    summary: "A strong, cinematic opening that frames your agency voice.",
    tone: "tone-amber",
  },
  {
    path: "#about",
    label: "About",
    kicker: "Team story",
    summary: "Narrative-led profile that proves craft, process, and trust.",
    tone: "tone-coral",
  },
  {
    path: "#work",
    label: "Work",
    kicker: "Selected cases",
    summary: "Visual proof of outcomes through conversion-focused projects.",
    tone: "tone-olive",
  },
  {
    path: "#projects",
    label: "Lab",
    kicker: "Experimental",
    summary: "Concept playground for motion studies and interaction systems.",
    tone: "tone-azure",
  },
  {
    path: "#contact",
    label: "Contact",
    kicker: "Start a brief",
    summary: "Fast onboarding flow for serious brand and digital engagements.",
    tone: "tone-graphite",
  },
];
export default function Menu() {
  const container = useRef(null);
  const tl = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const animateTeaser = (index) => {
    if (!container.current) return;

    const cards = container.current.querySelectorAll(".menu-teaser-card");
    const activeCard = container.current.querySelector(
      `.menu-teaser-card[data-index="${index}"]`,
    );

    gsap.to(cards, {
      autoAlpha: 0,
      y: 24,
      scale: 0.97,
      duration: 0.24,
      overwrite: "auto",
      ease: "power2.out",
    });

    if (activeCard) {
      gsap.to(activeCard, {
        autoAlpha: 1,
        y: 0,
        scale: 1,
        duration: 0.38,
        overwrite: "auto",
        ease: "power3.out",
      });
    }
  };

  const showTeaser = (index) => {
    setActiveIndex(index);
    animateTeaser(index);
  };

  useGSAP(
    () => {
      const q = gsap.utils.selector(container);

      gsap.set(q(".menu-link-item-holder"), { yPercent: 120 });
      gsap.set(q(".menu-info-row"), { y: 18, autoAlpha: 0 });
      gsap.set(q(".menu-teaser-card"), { autoAlpha: 0, y: 24, scale: 0.97 });
      gsap.set(q('.menu-teaser-card[data-index="0"]'), {
        autoAlpha: 1,
        y: 0,
        scale: 1,
      });

      tl.current = gsap
        .timeline({
          paused: true,
          defaults: { ease: "power4.inOut" },
        })
        .to(q(".menu-overlay"), {
          duration: 0.9,
          clipPath: "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)",
        })
        .fromTo(
          q(".menu-overlay-inner"),
          { yPercent: -6, skewY: 4 },
          { yPercent: 0, skewY: 0, duration: 0.82 },
          "<",
        )
        .to(
          q(".menu-link-item-holder"),
          {
            yPercent: 0,
            duration: 0.8,
            stagger: 0.06,
          },
          "<0.2",
        )
        .to(
          q(".menu-info-row"),
          {
            y: 0,
            autoAlpha: 1,
            duration: 0.45,
            stagger: 0.06,
            ease: "power2.out",
          },
          "<0.12",
        );
    },
    { scope: container },
  );

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === "Escape") {
        closeMenu();
      }
    };

    window.addEventListener("keydown", onKeyDown);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  useEffect(() => {
    if (!tl.current) return;

    if (isMenuOpen) {
      tl.current.timeScale(1).play();
    } else {
      tl.current.timeScale(1.2).reverse();
    }
  }, [isMenuOpen]);

  return (
    <nav className="menu-container" ref={container}>
      <div className="menu-bar fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-black/10 bg-zinc-50/80 py-5 px-3 backdrop-blur-md">
        <div className="menu-logo text-sm font-semibold uppercase tracking-[0.12em]">
          <Link href="/">Tit for Tat</Link>
        </div>
        <button
          type="button"
          className="menu-open inline-flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.12em]"
          onClick={toggleMenu}
          aria-expanded={isMenuOpen}
          aria-controls="agency-menu-overlay"
        >
          <span>Menu</span>
          <span className="text-xl">{isMenuOpen ? <FaX /> : <FaBars />}</span>
        </button>
      </div>

      <div
        id="agency-menu-overlay"
        className={`menu-overlay fixed inset-0 z-40 min-h-screen ${
          isMenuOpen ? "pointer-events-auto" : "pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        <div className="menu-overlay-inner grid h-full grid-cols-1 gap-8 px-3 pt-24 pb-6 md:grid-cols-[minmax(0,1fr)_360px] md:px-8">
          <div className="menu-copy flex h-full flex-col justify-between">
            

            <div className="menu-links flex h-full flex-col justify-center gap-2">
              {menuLinks.map((link, index) => {
                return (
                  <div key={link.label} className="menu-link-item">
                    <div className="menu-link-item-holder">
                      <Link
                        href={link.path}
                        className={`menu-link ${activeIndex === index ? "is-active" : ""}`}
                        onMouseEnter={() => showTeaser(index)}
                        onFocus={() => showTeaser(index)}
                        onClick={closeMenu}
                      >
                        {link.label}
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="menu-info flex flex-wrap items-end justify-between gap-6">
              <div className="menu-info-col menu-info-row flex gap-3 text-xl">
                <Link href="#" aria-label="X">
                  <FaXTwitter />
                </Link>
                <Link href="#" aria-label="Facebook">
                  <FaFacebookF />
                </Link>
                <Link href="#" aria-label="LinkedIn">
                  <FaLinkedinIn />
                </Link>
                <Link href="#" aria-label="Instagram">
                  <FaInstagram />
                </Link>
              </div>
              <div className="menu-info-col menu-info-row text-sm leading-relaxed">
                <p>titfortat@gmail.com</p>
                <p>+923 412 349</p>
              </div>
            </div>
          </div>

          <aside className="menu-teaser menu-info-row hidden md:flex">
            <div className="menu-teaser-stage relative h-full w-full overflow-hidden rounded-2xl border border-black/20 bg-black/10 p-5">
              {menuLinks.map((link, index) => (
                <article
                  key={`${link.label}-teaser`}
                  data-index={index}
                  className={`menu-teaser-card ${link.tone} absolute inset-5 rounded-xl p-5`}
                >
                  <p className="menu-teaser-kicker text-xs uppercase tracking-[0.16em]">
                    {link.kicker}
                  </p>
                  <h3 className="menu-teaser-title mt-4 text-3xl font-semibold uppercase">
                    {link.label}
                  </h3>
                  <p className="menu-teaser-summary mt-4 text-sm leading-relaxed">
                    {link.summary}
                  </p>
                </article>
              ))}
            </div>
          </aside>
        </div>
      </div>
    </nav>
  );
}
