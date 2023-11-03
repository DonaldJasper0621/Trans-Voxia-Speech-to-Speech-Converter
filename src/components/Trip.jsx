import "./TripStyles.css";
import TripData from "./TripData";
import Apple from "../assets/Apple.jpg";
import Donald from "../assets/Donald.jpg";
import Vanessa from "../assets/vanessa.jpg";
import Tony from "../assets/tony.jpg";
import Jonaya from "../assets/wootae.jpg";

function Trip() {
  return (
    <div className="trip">
      <h1> Development Teams</h1>
      <p> </p>
      <div className="tripcard">
        <TripData
          image={Donald}
          heading="Donald Jasper"
          text="Front End Engineer"
        />
        <TripData image={Tony} heading="Tony Lin" text="Back End Engineer" />
        <TripData
          image={Vanessa}
          heading="Vanessa Huang"
          text="Database Engineer"
        />
        <TripData
          image={Jonaya}
          heading="Jenaya Lin"
          text="Database Engineer"
        />
        <TripData
          image={Apple}
          heading="Apple Chiang"
          text="Front End Engineer"
        />
      </div>
    </div>
  );
}

export default Trip;
