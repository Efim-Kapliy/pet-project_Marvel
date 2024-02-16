import { useNavigate } from "react-router-dom";

import "./singleCharacterLayout.scss";

const SingleCharacterLayout = ({ data }) => {
  const navigate = useNavigate();
  const { name, description, thumbnail } = data;

  return (
    <div className="single-character">
      <img src={thumbnail} alt={name} className="single-character__img" />
      <div className="single-character__info">
        <h2 className="single-character__name">{name}</h2>
        <p className="single-character__descr">{description}</p>
      </div>
      <button
        onClick={() => {
          navigate(-1);
        }}
        className="single-character__back"
      >
        Back to all
      </button>
    </div>
  );
};

export default SingleCharacterLayout;
