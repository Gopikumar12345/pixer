function Login() {
  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          {/* CARD */}
          <div className="card shadow p-4">
            {/* TITLE INSIDE CARD (CENTER TOP) */}
            <h2 className="text-center fw-bold mb-4">Login</h2>

            {/* Email */}
            <div className="mb-3 text-start">
              <label className="form-label">Email address</label>
              <input
                type="email"
                className="form-control"
                placeholder="Enter email"
              />
            </div>

            {/* Password */}
            <div className="mb-3 text-start">
              <label className="form-label">Password</label>
              <input
                type="password"
                className="form-control"
                placeholder="Enter password"
              />
            </div>

            {/* Button */}
            <button className="btn btn-dark w-100">Login</button>

            {/* Footer text */}
            <p className="text-center mt-3 text-muted">
              Don't have an account? Sign up
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
