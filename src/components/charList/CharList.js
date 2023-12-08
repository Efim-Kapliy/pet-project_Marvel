import { Component } from "react";
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
  };

  marvelService = new MarvelService();

  componentDidMount() {
    this.onRequest();
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
    this.setState(({ charList, offset }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      newItemLoading: false,
      offset: offset + 9,
    }));
  };

  onError = () => {
    this.setState({
      loading: false,
      error: true,
    });
  };

  renderItems(arr) {
    const items = arr.map((item) => {
      const noImg = {};
      item.thumbnail === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg"
        ? (noImg.objectFit = "fill")
        : (noImg.objectFit = "cover");

      return (
        <li className="char__item" key={item.id} onClick={() => this.props.onCharSelected(item.id)}>
          <img src={item.thumbnail} alt={item.name} style={noImg} />
          <div className="char__name">{item.name}</div>
        </li>
      );
    });

    return <ul className="char__grid">{items}</ul>;
  }

  render() {
    const { charList, loading, error, newItemLoading, offset } = this.state;

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
          onClick={() => this.onRequest(offset)}
        >
          <div className="inner">load more</div>
        </button>
      </div>
    );
  }
}

export default CharList;
