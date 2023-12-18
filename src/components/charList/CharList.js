import { Component } from "react";
import PropTypes from "prop-types";

import Spinner from "../spinner/Spinner.js";
import ErrorMessage from "../error/ErrorMessage.js";
import MarvelService from "../../services/MarvelService";

import "./charList.scss";

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    newItemLoading: false,
    offset: 300,
    charEnded: false,
    pageEnded: false,
  };

  marvelService = new MarvelService();

  componentDidMount() {
    // this.onRequest();
    window.addEventListener("scroll", this.checkPageEnded);
    window.addEventListener("scroll", this.onUpdateCharListByScroll);
  }

  componentWillUnmount() {
    this.onRequest();
    window.removeEventListener("scroll", this.checkPageEnded);
    window.removeEventListener("scroll", this.onUpdateCharListByScroll);
  }

  onRequest = (offset) => {
    this.onCharListLoading();
    this.marvelService.getAllCharacters(offset).then(this.onCharListLoaded).catch(this.onError);
  };

  onCharListLoading = () => {
    this.setState({
      newItemLoading: true,
    });
  };

  onCharListLoaded = (newCharList) => {
    let ended = false;
    if (newCharList.length < 9) ended = true;

    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
      charEnded: ended,
      pageEnded: false,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  checkPageEnded = () => {
    if (window.scrollY + document.documentElement.clientHeight >= document.documentElement.offsetHeight - 3) {
      this.setState({ pageEnded: true });
    }
  };

  onUpdateCharListByScroll = () => {
    const { newItemLoading, charEnded, pageEnded, offset } = this.state;

    if (pageEnded && !newItemLoading && !charEnded) {
      this.onRequest(offset);
    }
  };

  itemRefs = [];

  setRef = (ref) => {
    this.itemRefs.push(ref);
  };

  focusOnItem = (id) => {
    this.itemRefs.forEach((item) => item.classList.remove("char__item_selected"));
    this.itemRefs[id].classList.add("char__item_selected");
    this.itemRefs[id].focus();
  };

  renderItems(arr) {
    const items = arr.map((item, i) => {
      const noImg = { pointerEvents: "none" };
      item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? (noImg.objectFit = "fill")
        : (noImg.objectFit = "cover");

      return (
        <li
          className="char__item"
          key={item.id}
          ref={this.setRef}
          onClick={() => {
            this.props.onCharSelected(item.id);
            this.focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              this.props.onCharSelected(item.id);
              this.focusOnItem(i);
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

  render() {
    const { charList, loading, error, newItemLoading, offset, charEnded } = this.state;

    const items = this.renderItems(charList);

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
          disabled={newItemLoading}
          style={{ display: charEnded ? "none" : "block" }}
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
