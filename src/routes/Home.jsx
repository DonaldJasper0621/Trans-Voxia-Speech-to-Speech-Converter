import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import LandingPage2 from "../components/LandingPage2";
import HomeImg from "../assets/metaverse.jpg";
import Trip from "../components/Trip";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";
import { motion } from "framer-motion";
import Particles from "react-tsparticles";


  // const particlesInit = useCallback(async (engine) => {
  //   await loadFull(engine);
  // }, []);

  // const particlesLoaded = useCallback(async (container) => {
  //   await console.log(container);
  // }, []);

function Home() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero"
        heroImg={HomeImg}
        title="Speech to Speech"
        text="Generate realistic audio using our online AI Voice Generator and the best translate bot. Instantly convert text in to natural-sounding speech and download as MP3 and WAV audio files."
        buttonText="Create Free Translated AI voice video"
        url="/"
        btnClass="show"
      />
      <LandingPage />
      <LandingPage2 />
      <div>
        <h1 className="title">Take a quick tour of Trans Voxia</h1>
        <div className="subtitle">
          Watch this video to learn all about our AI voice technology and how to
          use it in your products
        </div>
      </div>
      <VideoPlayer />
      <Trip />
      <Footer />
      {/* <div>
      <Particles
          id="tsparticles"
          init={particlesInit}
          loaded={particlesLoaded}
          options={{
  
            particles: {
              number: { value: 10, density: { enable: true, value_area: 600 } },
              color: { value: "#ffffff" },
              shape: {
                type: "square",
                stroke: { width: 0, color: "#000000" },
                polygon: { nb_sides: 5 },
              },
              opacity: {
                value: 0.25,
                random: true,
                anim: {
                  enable: false,
                  speed: 1,
                  opacity_min: 0.1,
                  sync: false,
                },
              },
              size: {
                value: 29,
                random: true,
                anim: { enable: false, speed: 2, size_min: 0.1, sync: false },
              },
              line_linked: {
                enable: false,
                distance: 300,
                color: "#ffffff",
                opacity: 0,
                width: 0,
              },
              move: {
                enable: true,
                speed: 0.5,
                direction: "top",
                straight: true,
                out_mode: "out",
                bounce: false,
                attract: { enable: false, rotateX: 600, rotateY: 1200 },
              },
            },
            interactivity: {
              detect_on: "canvas",
              events: {
                onhover: { enable: false, mode: "repulse" },
                onclick: { enable: false, mode: "push" },
                resize: true,
              },
              modes: {
                grab: { distance: 800, line_linked: { opacity: 1 } },
                bubble: {
                  distance: 790,
                  size: 79,
                  duration: 2,
                  opacity: 0.8,
                  speed: 3,
                },
                repulse: { distance: 400, duration: 0.4 },
                push: { particles_nb: 4 },
                remove: { particles_nb: 2 },
              },
            },
            retina_detect: true,
          }}
          
        />
        </div> */}
    </>
  );
}

export default Home;
