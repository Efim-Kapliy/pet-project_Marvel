import { useEffect, useState } from "react";
import "./comicsList.scss";

import useMarvelService from "../../services/MarvelService";

import uw from "../../resources/img/UW.png";
import xMen from "../../resources/img/x-men.png";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(123);
  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonLoadingLocked, setButtonLoadingLocked] = useState(true);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    return () => {
      onRequest(offset, true);
    };
  }, []);

  const onRequest = () => {
    setButtonLoadingLocked(true);
    setShowSpinner(true);

    getAllComics(offset)
      .then(onComicsListLoaded)
      .finally(() => {
        setButtonLoadingLocked(false);
        setShowSpinner(false);
      });
  };

  const onComicsListLoaded = (newComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setOffset((offset) => offset + 8);
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => (
      <li className="comics__item" key={item.id}>
        <a href="#" tabIndex="0">
          <img src={item.thumbnail} alt={item.name} className="comics__item-img" />
          <div className="comics__item-name">{item.name}</div>
          <div className="comics__item-price">9.99$</div>
        </a>
      </li>
    ));

    return <ul className="comics__grid">{items}</ul>;
  }

  const items = renderItems(comicsList);

  const spinner = loading && showSpinner ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;

  return (
    <div className="comics__list">
      {spinner}
      {errorMessage}
      {items}
      <button className="button button__main button__long">
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
