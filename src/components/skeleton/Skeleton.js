import "./skeleton.scss";

const Skeleton = () => {
  return (
    <>
      <p class="char__select">Please select a character to see information</p>
      <div class="skeleton">
        <div class="pulse skeleton__header">
          <div class="pulse skeleton__circle"></div>
          <div class="pulse skeleton__mini"></div>
        </div>
        <div class="pulse skeleton__block"></div>
        <div class="pulse skeleton__block"></div>
        <div class="pulse skeleton__block"></div>
      </div>
    </>
  );
};

export default Skeleton;
