import { useEffect, useState } from "react";
import Spinner from "../spinner/Spinner.js";
import ErrorMessage from "../error/ErrorMessage.js";
import useMarvelService from "../../services/MarvelService.js";
import "./randomChar.scss";

import mjolnir from "../../resources/img/mjolnir.png";

const RandomChar = () => {
  const [char, setChar] = useState({});
  const { loading, error, clearError, getCharacter } = useMarvelService();

  useEffect(() => {
    updateChar();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // useEffect(() => {
  //   const timerId = setInterval(updateChar, 9000);

  //   return () => {
  //     clearInterval(timerId);
  //   };
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, []);

  const onCharLoaded = (char) => {
    setChar(char);
  };

  const updateChar = () => {
    clearError();

    const id = Math.floor(Math.random() * (1011400 - 1011020) + 1011020);
    getCharacter(id).then(onCharLoaded);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? <View char={char} /> : null;

  return (
    <div className="randomchar">
      {spinner}
      {errorMessage}
      {content}
      <div className="randomchar__static">
        <p className="randomchar__title">
          Random character for today!
          <br />
          Do you want to get to know him better?
        </p>
        <p className="randomchar__title">Or choose another one</p>
        <button className="button button__main" onClick={updateChar}>
          <div className="inner">try it</div>
        </button>
        <img src={mjolnir} alt="mjolnir" className="randomchar__decoration" />
      </div>
    </div>
  );
};

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki } = char;
  const noImg = {};
  thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
    ? (noImg.objectFit = "fill")
    : (noImg.objectFit = "cover");

  return (
    <div className="randomchar__block">
      <img src={thumbnail} alt="Random character" className="randomchar__img" style={noImg} />
      <div className="randomchar__info">
        <p className="randomchar__name">{name}</p>
        <p className="randomchar__descr">{description}</p>
        <div className="randomchar__btns">
          <a href={homepage} className="button button__main" target="_blank" rel="noreferrer noopener">
            <div className="inner">homepage</div>
          </a>
          <a href={wiki} className="button button__secondary" target="_blank" rel="noreferrer noopener">
            <div className="inner">Wiki</div>
          </a>
        </div>
      </div>
    </div>
  );
};

export default RandomChar;
