import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner.js";
import ErrorMessage from "../error/ErrorMessage.js";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [buttonLoadingLocked, setButtonLoadingLocked] = useState(true);
  const [offset, setOffset] = useState(300);
  const [charEnded, setCharEnded] = useState(false);
  const [pageEnded, setPageEnded] = useState(false);

  const marvelService = new MarvelService();

  useEffect(() => {
    window.addEventListener("scroll", checkPageEnded);

    return () => {
      window.removeEventListener("scroll", checkPageEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  useEffect(() => {
    return () => {
      onRequest(offset);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pageEnded) {
      onRequest(offset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageEnded]);

  const onRequest = (offset) => {
    onCharListLoading();

    marvelService
      .getAllCharacters(offset)
      .then(onCharListLoaded)
      .catch(onError)
      .finally(() => {
        setButtonLoadingLocked(false);
        setPageEnded(false);
      });
  };

  const onCharListLoading = () => {
    setButtonLoadingLocked(true);
  };

  const onCharListLoaded = (newCharList) => {
    setCharList((charList) => [...charList, ...newCharList]);
    setLoading(false);
    setError(false);
    setOffset((offset) => offset + 9);
    setCharEnded(newCharList.length < 9 ? true : false);
  };

  const onError = () => {
    setLoading(false);
    setError(true);
  };

  const checkPageEnded = () => {
    const pageEnd = window.scrollY + document.documentElement.clientHeight >= document.documentElement.offsetHeight - 3;
    if (pageEnd && !loading && !error && !buttonLoadingLocked) {
      setButtonLoadingLocked(true);
      setPageEnded(true);
    }
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current.forEach((item) => item.classList.remove("char__item_selected"));
    itemRefs.current[id].classList.add("char__item_selected");
    itemRefs.current[id].focus();
  };

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      const noImg = { pointerEvents: "none" };
      item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? (noImg.objectFit = "fill")
        : (noImg.objectFit = "cover");

      return (
        <li
          className="char__item"
          key={item.id}
          ref={(el) => (itemRefs.current[i] = el)}
          onClick={() => {
            props.onCharSelected(item.id);
            focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              props.onCharSelected(item.id);
              focusOnItem(i);
            }
          }}
          tabIndex="0"
        >
          <img src={item.thumbnail} alt={item.name} style={noImg} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  const items = renderItems(charList);

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error) ? items : null;

  return (
    <div className="char__list">
      {spinner}
      {errorMessage}
      {content}
      <button
        className="button button__main button__long"
        disabled={buttonLoadingLocked}
        style={{ display: charEnded ? "none" : "block" }}
        onClick={() => onRequest(offset)}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
