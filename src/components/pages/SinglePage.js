import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import useMarvelService from "../../services/MarvelService";

import AppBanner from "../appBanner/AppBanner";
import Spinner from "../spinner/Spinner";
import ErrorMessage from "../error/ErrorMessage";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const SinglePage = ({ Component, dataType }) => {
  const { singlePageId } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, clearError, getComic, getCharacter } = useMarvelService();

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    updateData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [singlePageId]);

  const updateData = () => {
    clearError();

    switch (dataType) {
      case "character":
        getCharacter(singlePageId).then(onDataLoaded);
        break;
      case "comic":
        getComic(singlePageId).then(onDataLoaded);
        break;
      default:
        console.error("Invalid address inside the SinglePage. You need either '../character' or '../comic'.");
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !data) ? <Component data={data} /> : null;

  return (
    <>
      <ErrorBoundary>
        <AppBanner />
      </ErrorBoundary>
      <ErrorBoundary>
        {spinner}
        {errorMessage}
        {content}
      </ErrorBoundary>
    </>
  );
};

export default SinglePage;
