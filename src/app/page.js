import Footer from "@/_components/shared/Footer";
import Navbar from "@/_components/shared/Navbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="   bg-zinc-50 font-sans dark:bg-black">
      <Navbar/>
      <section id="home" className=" flex justify-center items-center min-h-screen bg-blue-200">
        <h1 className="text-3xl font-bold py-2 px-5 border border-white">Section 01</h1>
      </section>
      <section id="about" className=" flex justify-center items-center min-h-screen bg-red-200">
        <h1 className="text-3xl font-bold py-2 px-5 border border-white">Section 01</h1>
      </section>
      <section id="work" className=" flex justify-center items-center min-h-screen bg-green-200">
        <h1 className="text-3xl font-bold py-2 px-5 border border-white">Section 01</h1>
      </section>
      <section id="projects" className=" flex justify-center items-center min-h-screen bg-blue-200">
        <h1 className="text-3xl font-bold py-2 px-5 border border-white">Section 01</h1>
      </section>
      <section id="contact" className=" flex justify-center items-center min-h-screen bg-pink-200">
        <h1 className="text-3xl font-bold py-2 px-5 border border-white">Section 01</h1>
      </section>

      <Footer/>
    </main>
  );
}
