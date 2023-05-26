import LandingImg1 from "../assets/neonposter.jpg";
import LandingImg2 from "../assets/neonhuman.jpg";
import "../components/LandingPageStyles.css";

const LandingPage2 = () => {
  return (
    <div className="destination2">
      <div className="first-des2">
        <div className="des-text2">
          <h2 className="text-2xl font-semibold">Create Realistic AI Voiceovers For Your Videos</h2>
          <p>
            Choose from a growing library of 907 natural-sounding AI generated
            voices with humanlike intonation in 142 languages and accents
            powered by machine learning technology.
          </p>
        </div>

        <div className="image2">
          <img alt="img" src={LandingImg1} />
          <img alt="img" src={LandingImg2} />
        </div>
      </div>
    </div>
  );
};
export default LandingPage2;
