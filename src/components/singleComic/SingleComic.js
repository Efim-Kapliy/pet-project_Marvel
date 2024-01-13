import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";

import "./singleComic.scss";

const SingleComic = () => {
  const { comicId } = useParams();
  const [comic, setComic] = useState(null);
  const { loading, error, clearError, getComic } = useMarvelService();

  useEffect(() => {
    updateComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateComic();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [comicId]);

  const updateComic = () => {
    clearError();
    getComic(comicId).then(onCharLoaded);
  };

  const onCharLoaded = (comic) => {
    setComic(comic);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

  return (
    <>
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

const View = ({ comic }) => {
  const { title, description, pageCount, thumbnail, language, price } = comic;
  const navigate = useNavigate();

  return (
    <div className="single-comic">
      <img src={thumbnail} alt={title} className="single-comic__img" />
      <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language: {language}</p>
        <div className="single-comic__price">{price}</div>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="single-comic__back"
      >
        Back to all
      </button>
    </div>
  );
};

export default SingleComic;
