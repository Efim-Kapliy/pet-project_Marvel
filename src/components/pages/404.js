import { Link } from "react-router-dom";
import usePreviousPage from "../../hooks/usePreviousPage";
import ErrorMessage from "../error/ErrorMessage";

const Page404 = () => {
  usePreviousPage();

  return (
    <div style={{ padding: "9% 0" }}>
      <ErrorMessage />
      <p style={{ textAlign: "center", fontWeight: "bold", fontSize: "15px", marginTop: "24px" }}>Page doesn't exist</p>
      <Link
        style={{
          display: "block",
          margin: "51px auto 0 auto",
          width: "180px",
          fontWeight: "bold",
          fontSize: "24px",
          borderBottom: "1.2px solid black",
        }}
        to="/"
      >
        Back to main page
      </Link>
    </div>
  );
};

export default Page404;
