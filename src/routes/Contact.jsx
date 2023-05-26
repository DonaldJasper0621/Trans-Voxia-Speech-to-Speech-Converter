import Navbar from "../components/Navbar";
import Hero from "../components/Hero";
import AboutImg from "../assets/canyon.jpg";
import Footer from "../components/Footer";
import ContactForm from "../components/ContactForm";
import { motion } from "framer-motion";

function Contact(){
    return (
      <>
          <Navbar />
          <Hero
            cName="hero-mid"
            heroImg={AboutImg}
            title="Contact"
            url="/"
            btnClass="hide"
          />
          <ContactForm/>
          <Footer/>
</>
      );
}

export default Contact;