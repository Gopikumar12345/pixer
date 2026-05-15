import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";

function Login() {
  const navigate = useNavigate();

  // Validation Schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),

    password: Yup.string()
      .min(6, "Password must be at least 6 characters")
      .required("Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },

    validationSchema,

    onSubmit: (values) => {
      const storedUser = JSON.parse(localStorage.getItem("user"));

      if (!storedUser) {
        alert("Please register first");
        return;
      }

      if (
        values.email === storedUser.email &&
        values.password === storedUser.password
      ) {
        // ✅ OLD FLOW (safe keep)
        localStorage.setItem("isLoggedIn", "true");

        // 🔐 JWT STYLE TOKEN (frontend mock)
        const fakeToken = "pixer_jwt_" + Date.now();
        localStorage.setItem("token", fakeToken);

        // 👤 Session info
        localStorage.setItem(
          "userSession",
          JSON.stringify({
            email: storedUser.email,
            loginTime: Date.now(),
          })
        );

        alert("Login Successful");

        // 🔥 redirect safe
        navigate("/dashboard", { replace: true });
      } else {
        alert("Invalid email or password");
      }
    },
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center fw-bold mb-4">Login</h2>

            <form onSubmit={formik.handleSubmit}>
              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">Email address</label>

                <input
                  type="email"
                  name="email"
                  className="form-control"
                  placeholder="Enter email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.email && formik.errors.email && (
                  <small className="text-danger">{formik.errors.email}</small>
                )}
              </div>

              {/* PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Password</label>

                <input
                  type="password"
                  name="password"
                  className="form-control"
                  placeholder="Enter password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />

                {formik.touched.password && formik.errors.password && (
                  <small className="text-danger">
                    {formik.errors.password}
                  </small>
                )}
              </div>

              {/* SUBMIT */}
              <button type="submit" className="btn btn-dark w-100">
                Login
              </button>
            </form>

            {/* REGISTER LINK */}
            <p className="text-center mt-3 text-muted">
              Don't have an account? <Link to="/register">Sign up</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
