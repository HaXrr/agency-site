import Footer from "@/_components/shared/Footer";
import Navbar from "@/_components/shared/Navbar";
import Hero3D from "@/_components/home/Hero3D";

export default function Home() {
  return (
    <main className="bg-[var(--color-5)] font-sans">
      <Navbar />
      <Hero3D />

      <section
        id="about"
        className="flex min-h-screen items-center justify-center bg-[var(--color-4)]"
      >
        <h2 className="border border-black/10 px-5 py-2 text-3xl font-bold uppercase tracking-wide text-[var(--color-1)]">
          About
        </h2>
      </section>

      <section
        id="work"
        className="flex min-h-screen items-center justify-center bg-[var(--color-3)]"
      >
        <h2 className="border border-black/10 px-5 py-2 text-3xl font-bold uppercase tracking-wide text-[var(--color-1)]">
          Work
        </h2>
      </section>

      <section
        id="projects"
        className="flex min-h-screen items-center justify-center bg-[var(--color-2)]"
      >
        <h2 className="border border-black/10 px-5 py-2 text-3xl font-bold uppercase tracking-wide text-[var(--color-5)]">
          Lab
        </h2>
      </section>

      <section
        id="contact"
        className="flex min-h-screen items-center justify-center bg-[var(--color-1)]"
      >
        <h2 className="border border-white/30 px-5 py-2 text-3xl font-bold uppercase tracking-wide text-[var(--color-5)]">
          Contact
        </h2>
      </section>

      <Footer />
    </main>
  );
}