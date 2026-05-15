import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // ✅ ADD THIS

function Login() {
  const navigate = useNavigate();

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
        toast.error("Please register first ❌"); // ✅ UPDATED
        return;
      }

      if (
        values.email === storedUser.email &&
        values.password === storedUser.password
      ) {
        localStorage.setItem("isLoggedIn", "true");

        const fakeToken = "pixer_jwt_" + Date.now();
        localStorage.setItem("token", fakeToken);

        localStorage.setItem(
          "userSession",
          JSON.stringify({
            email: storedUser.email,
            loginTime: Date.now(),
          })
        );

        toast.success("Login Successful 🟢"); // ✅ UPDATED

        setTimeout(() => {
          navigate("/dashboard", { replace: true });
        }, 500);
      } else {
        toast.error("Invalid email or password ❌"); // ✅ UPDATED
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
