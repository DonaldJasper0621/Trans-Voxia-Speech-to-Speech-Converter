import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import LayoutCards from "../components/LayoutCards";
import { motion } from "framer-motion";
import CardLien from "../components/CardLien";
import Footer from "../components/Footer";
import Pricing from "../components/Pricing";

function About() {
  return (
    <>
      <Navbar />
      <Hero
        cName="hero-mid"
        heroImg="https://images.unsplash.com/photo-1563089145-599997674d42?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
        title="Pricing"
        url="/"
        btnClass="hide"
      />
      {/* <CardLien/> */}
      <h1 className="mt-20 text-4xl font-semibold text-center items-center mb-4">
      Affordable Plans for All
      </h1>
      <p className="mb-5">
      Trans Voxia's pricing is simple, upfront and hassle-free. Upgrade, downgrade or cancel anytime.
      </p>
      <Pricing/>
      <Footer/>
    </>
  );
}

export default About;


{/* <motion.div
      className="ee"
      initial={{ width: 0 }}
      animate={{ width: "100%" }}
      exit={{ x: window.innerWidth, transition: { duration: 1 } }}
      transition={{ duration: 0.75 }}
    ></motion.div> */}