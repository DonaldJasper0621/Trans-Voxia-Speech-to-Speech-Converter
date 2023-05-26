import Hero from "../components/Hero";
import Navbar from "../components/Navbar";
import LandingPage from "../components/LandingPage";
import LandingPage2 from "../components/LandingPage2";
import HomeImg from "../assets/boom.jpg";
import Trip from "../components/Trip";
import Footer from "../components/Footer";
import VideoPlayer from "../components/VideoPlayer";
import { motion } from "framer-motion";

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
        <h1 className="title">Take a quick tour of Makabaka</h1>
        <div className="subtitle">
          Watch this video to learn all about our AI voice technology and how to
          use it in your products
        </div>
      </div>
      <VideoPlayer />
      <Trip />
      <Footer />
    </>
  );
}

export default Home;
