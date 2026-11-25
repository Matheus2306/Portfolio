import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import Hero from "./components/sections/Hero";
import About from "./components/sections/About";
import Projects from "./components/sections/Projects";
import Stack from "./components/sections/Stack";
import Process from "./components/sections/Process";
import Contact from "./components/sections/Contact";
import ReadingProgress from "./components/ui/ReadingProgress";

export default function App() {
  return (
    <>
      <a className="skip-link" href="#conteudo">
        Pular para o conteúdo
      </a>
      <ReadingProgress />
      <Header />
      <main id="conteudo">
        <Hero />
        <About />
        <Projects />
        <Stack />
        <Process />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
