import "./appBanner.scss";
import avengers from "../../resources/img/Avengers.png";
import avengersLogo from "../../resources/img/Avengers_logo.png";

const AppBanner = () => {
  return (
    <div class="app__banner">
      <img src={avengers} alt="Avengers" />
      <div class="app__banner-text">
        New comics every week!
        <br />
        Stay tuned!
      </div>
      <img src={avengersLogo} alt="Avengers logo" />
    </div>
  );
};

export default AppBanner;
