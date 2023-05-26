import LandingImg1 from "../assets/lightbulb.jpg";
import LandingImg2 from "../assets/aihead.jpg";
import "../components/LandingPageStyles.css";

const LandingPage = () => {
  return (
    <div className="destination">
      <h1 className=" text-2xl mt-52 mb-6 body-font font-poppins font-semibold">
        {" "}
        Take a Quick Tour of Makabaka
      </h1>
      <p className=" text-2xl mb-14 ">
        Watch this video to learn all about our AI voice technology and how to
        use it in your products
      </p>
      <div className="first-des">
        <div className="des-text">
          <h2 className="text-2xl font-semibold">
            AI powered speech to speech generator
          </h2>
          <p>
            Generate realistic Text to Speech (TTS) audio using our online AI
            Voice Generator and the best synthetic voices. Instantly convert
            text in to natural-sounding speech and download as MP3 and WAV audio
            files.
          </p>
        </div>

        <div className="image">
          <img alt="img" src={LandingImg1} />
          <img alt="img" src={LandingImg2} />
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
