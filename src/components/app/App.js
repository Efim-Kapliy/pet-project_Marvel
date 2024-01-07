import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import AppHeader from "../appHeader/AppHeader";

import MainPage from "../pages/MainPage";
import ComicsPage from "../pages/ComicsPage";

// import SingleComic from "../singleComic/SingleComic";

const App = () => {
  return (
    <Router>
      <div className="app">
        <AppHeader />
        <main>
          <Routes>
            <Route path="/" element={<MainPage />} />
            <Route path="/comics" element={<ComicsPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
