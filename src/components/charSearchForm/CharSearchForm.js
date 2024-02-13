import { useState } from "react";

import "./charSearchForm.scss";

const CharSearchForm = () => {
  const [toPage, setToPage] = useState();

  return (
    <div className="char__search">
      <h3 className="char__search-name">Or find a character by name:</h3>
      <div className="char__search-flex">
        <input type="text" className="char__field" />
        <button className="button button__main">
          <div className="inner">FIND</div>
        </button>
        <div className="valid valid__text">There is! Visit NAME page?</div>
        <a href={toPage} className="button button__secondary">
          <div className="inner">TO PAGE</div>
        </a>
        <div className="error error__text">The character was not found. Check the name and try again</div>
      </div>
    </div>
  );
};

export default CharSearchForm;
