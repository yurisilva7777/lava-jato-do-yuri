import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import Services from "../components/Services";
import Schedule from "../components/Schedule";
import Footer from "../components/Footer";
export default function Home() {
  return (
    <main>
      <Navbar />
      <Hero />
      <Services />
      <Schedule />
      <Footer />
    </main>
  );
}