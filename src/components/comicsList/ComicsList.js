import { useEffect, useState, useRef, createRef } from "react";
import { useNavigate } from "react-router-dom";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import "./comicsList.scss";

import useMarvelService from "../../services/MarvelService";

import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const [offset, setOffset] = useState(476);
  const [showSpinner, setShowSpinner] = useState(false);
  const [buttonLoadingLocked, setButtonLoadingLocked] = useState(true);
  const [itemIdFocus, setItemIdFocus] = useState(null);
  const [pageEnded, setPageEnded] = useState(false);

  const { loading, error, getAllComics } = useMarvelService();

  useEffect(() => {
    window.addEventListener("scroll", checkPageEnded);
    return () => {
      window.removeEventListener("scroll", checkPageEnded);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loading, error]);

  useEffect(() => {
    return () => {
      onRequest(offset, true);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (pageEnded) {
      onRequest(offset);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pageEnded]);

  const onRequest = (offset, initial = false) => {
    setButtonLoadingLocked(true);
    setShowSpinner(initial);

    getAllComics(offset)
      .then(onComicsListLoaded)
      .finally(() => {
        setButtonLoadingLocked(false);
        setPageEnded(false);
        setShowSpinner(false);
      });
  };

  const onComicsListLoaded = (newComicsList) => {
    setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    setOffset((offset) => offset + 8);
  };

  const checkPageEnded = () => {
    const pageEnd = window.scrollY + document.documentElement.clientHeight >= document.documentElement.offsetHeight - 6;
    if (pageEnd && !loading && !error) {
      setButtonLoadingLocked(true);
      setPageEnded(true);
    }
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

  const navigate = useNavigate();

  function renderItems(arr) {
    const items = arr.map((item, i) => {
      const handleClickItem = () => {
        navigate(`/comics/${item.id}`);
      };

      return (
        <CSSTransition key={i} timeout={450} classNames="item" nodeRef={createRef(null)}>
          <li
            className="comics__item"
            ref={(el) => (itemRefs.current[i] = el)}
            onClick={() => {
              focusOnItem(i);
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                focusOnItem(i);
              }
            }}
          >
            <button type="button" onClick={handleClickItem} className="comics__item-button">
              <img src={item.thumbnail} alt={item.title} className="comics__item-img" />
              <div className="comics__item-name">{item.title}</div>
              <div className="comics__item-price">{item.price}</div>
            </button>
          </li>
        </CSSTransition>
      );
    });

    return (
      <ul className="comics__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
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
