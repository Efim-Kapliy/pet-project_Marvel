import { Helmet } from "react-helmet";

import AppBanner from "../appBanner/AppBanner";
import ComicsList from "../comicsList/ComicsList";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const ComicsPage = () => {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel comics page" />
        <title>Marvel comics page</title>
      </Helmet>
      <ErrorBoundary>
        <AppBanner />
      </ErrorBoundary>
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  );
};

export default ComicsPage;
