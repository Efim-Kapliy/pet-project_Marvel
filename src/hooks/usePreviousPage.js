import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const usePreviousPage = () => {
  const navigationOnPage = useNavigate();
  useEffect(() => {
    document.addEventListener("keydown", onPreviousPage);

    return () => {
      document.removeEventListener("keydown", onPreviousPage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPreviousPage = (event) => {
    if (event.key === "Backspace") {
      navigationOnPage(-1);
    }
  };
};

export default usePreviousPage;
