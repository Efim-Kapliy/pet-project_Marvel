import { lazy, Suspense } from "react";
import { HelmetProvider } from "react-helmet-async";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";
import Spinner from "../spinner/Spinner";

const Page404 = lazy(() => import("../pages/404"));
const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleCharacterLayout = lazy(() => import("../pages/singleCharacterLayout/SingleCharacterLayout"));
const SingleComicLayout = lazy(() => import("../pages/singleComicLayout/SingleComicLayout"));
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
  return (
    <HelmetProvider>
      <Router>
        <div className="app">
          <AppHeader />
          <main>
            <Suspense fallback={<Spinner />}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route
                  path="/comics/:singlePageId"
                  element={<SinglePage Component={SingleComicLayout} dataType="comic" />}
                />
                <Route
                  path="/characters/:singlePageId"
                  element={<SinglePage Component={SingleCharacterLayout} dataType="character" />}
                />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </HelmetProvider>
  );
};

export default App;
