import { useNavigate } from "react-router-dom";

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="container text-center py-5">
      <h1 className="display-1 fw-bold">404</h1>

      <h3>Page Not Found</h3>

      <p className="text-muted">The page you are looking for does not exist.</p>

      <button className="btn btn-dark mt-3" onClick={() => navigate("/")}>
        Go Home
      </button>
    </div>
  );
}

export default NotFound;
