import { useEffect, useState, useRef } from "react";
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
  const [itemIdFocus, setItemIdFocus] = useState(null);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    return () => {
      onRequest(offset, true);
    };
  }, []);

  const onRequest = (offset, initial = false) => {
    setButtonLoadingLocked(true);
    setShowSpinner(initial);

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

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    if (itemIdFocus !== null) {
      itemRefs.current[itemIdFocus].classList.remove("comics__item_selected");
    }
    setItemIdFocus(id);
    itemRefs.current[id].classList.add("comics__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      return (
        <li
          className="comics__item"
          key={item.id}
          ref={(el) => (itemRefs.current[i] = el)}
          onClick={() => {
            focusOnItem(i);
          }}
        >
          <a href="#" tabIndex="0">
            <img src={item.thumbnail} alt={item.name} className="comics__item-img" />
            <div className="comics__item-name">{item.name}</div>
            <div className="comics__item-price">9.99$</div>
          </a>
        </li>
      );
    });

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
      <button
        className="button button__main button__long"
        disabled={buttonLoadingLocked}
        onClick={() => {
          onRequest(offset);
        }}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
