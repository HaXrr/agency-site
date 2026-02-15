"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import "./hero3d.css";

const words = ["Creative", "Web", "Systems"];

export default function Hero3D() {
  const rootRef = useRef(null);

  useEffect(() => {
    let mounted = true;
    let ctx;
    let mm;

    (async () => {
      const [{ gsap }, { ScrollTrigger }] = await Promise.all([
        import("gsap"),
        import("gsap/ScrollTrigger"),
      ]);

      if (!mounted || !rootRef.current) return;

      gsap.registerPlugin(ScrollTrigger);

      ctx = gsap.context(() => {
        mm = gsap.matchMedia();

        const buildTimeline = ({ isMobile, isReducedMotion }) => {
          const tl = gsap.timeline({
            defaults: { ease: "power3.out" },
            scrollTrigger: {
              trigger: rootRef.current,
              start: "top top",
              end: isMobile ? "+=120%" : "+=170%",
              scrub: isReducedMotion ? 0.45 : 1.1,
              pin: !isMobile && !isReducedMotion,
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

          tl.to(".hero-camera", {
            rotateY: isMobile ? 6 : 34,
            rotateX: isMobile ? -6 : -11,
            z: isMobile ? 40 : 80,
            duration: 1.2,
          })
            .to(
              ".hero-orbit",
              {
                rotateZ: isMobile ? 95 : 160,
                scale: isMobile ? 1.03 : 1.08,
                duration: 1.1,
              },
              0,
            )
            .to(
              ".hero-plane--front",
              {
                z: isMobile ? 130 : 240,
                yPercent: -18,
                rotateX: -6,
                duration: 1.2,
              },
              0.08,
            )
            .to(
              ".hero-plane--mid",
              {
                z: isMobile ? 70 : 120,
                yPercent: 10,
                rotateY: 9,
                duration: 1.15,
              },
              0.1,
            )
            .to(
              ".hero-plane--back",
              {
                z: isMobile ? -30 : -90,
                yPercent: 22,
                rotateY: -12,
                duration: 1.2,
              },
              0.14,
            )
            .to(
              ".hero-word",
              {
                yPercent: -60,
                opacity: 0.16,
                stagger: 0.06,
                duration: 0.95,
              },
              0.2,
            )
            .to(
              ".hero-subline",
              {
                yPercent: -40,
                opacity: 0,
                duration: 0.7,
              },
              0.25,
            )
            .to(
              ".hero-cta-row",
              {
                yPercent: -30,
                opacity: 0,
                duration: 0.7,
              },
              0.28,
            );

          const floatTween = gsap.to(".hero-core", {
            y: -14,
            duration: 2.6,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
          });

          return () => {
            floatTween.kill();
            tl.scrollTrigger?.kill();
            tl.kill();
          };
        };

        mm.add("(min-width: 981px) and (prefers-reduced-motion: no-preference)", () =>
          buildTimeline({ isMobile: false, isReducedMotion: false }),
        );
        mm.add("(max-width: 980px) and (prefers-reduced-motion: no-preference)", () =>
          buildTimeline({ isMobile: true, isReducedMotion: false }),
        );
        mm.add("(prefers-reduced-motion: reduce)", () =>
          buildTimeline({ isMobile: true, isReducedMotion: true }),
        );

        ScrollTrigger.refresh();
      }, rootRef);
    })();

    return () => {
      mounted = false;
      mm?.revert();
      ctx?.revert();
    };
  }, []);

  return (
    <section id="home" ref={rootRef} className="hero3d-section">
      <div className="hero3d-inner">
        <header className="hero-copy">
          <p className="hero-kicker">Digital Agency / Design + Engineering</p>

          <h1 className="hero-title" aria-label="Creative Web Systems">
            {words.map((word) => (
              <span key={word} className="hero-word-wrap">
                <span className="hero-word">{word}</span>
              </span>
            ))}
          </h1>

          <p className="hero-subline">
            We build immersive brand websites with creative direction, interactive
            motion, and conversion-focused architecture.
          </p>

          <div className="hero-cta-row">
            <Link href="#work" className="hero-btn hero-btn--primary">
              View Work
            </Link>
            <Link href="#contact" className="hero-btn hero-btn--ghost">
              Start Project
            </Link>
          </div>
        </header>

        <div className="hero-stage" aria-hidden="true">
          <div className="hero-camera">
            <div className="hero-core">
              <div className="hero-orbit" />
              <article className="hero-plane hero-plane--front">
                <p className="hero-plane-label">STRATEGY</p>
                <p className="hero-plane-title">Brand Narrative</p>
              </article>
              <article className="hero-plane hero-plane--mid">
                <p className="hero-plane-label">DESIGN</p>
                <p className="hero-plane-title">3D-Led Interfaces</p>
              </article>
              <article className="hero-plane hero-plane--back">
                <p className="hero-plane-label">DELIVERY</p>
                <p className="hero-plane-title">Performance Systems</p>
              </article>
              <div className="hero-glow" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
