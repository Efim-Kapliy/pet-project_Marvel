import "./singleComic.scss";
import xMen from "../../resources/img/x-men.png";

const SingleComic = () => {
  return (
    <div class="single-comic">
      <img src={xMen} alt="x-men" class="single-comic__img" />
      <div class="single-comic__info">
        <h2 class="single-comic__name">X-Men: Days of Future Past</h2>
        <p class="single-comic__descr">
          Re-live the legendary first journey into the dystopian future of 2013 - where Sentinels stalk the Earth, and
          the X-Men are humanity's only hope...until they die! Also featuring the first appearance of Alpha Flight, the
          return of the Wendigo, the history of the X-Men from Cyclops himself...and a demon for Christmas!?
        </p>
        <p class="single-comic__descr">144 pages</p>
        <p class="single-comic__descr">Language: en-us</p>
        <div class="single-comic__price">9.99$</div>
      </div>
      <a href="#" class="single-comic__back">
        Back to all
      </a>
    </div>
  );
};

export default SingleComic;
