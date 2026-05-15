import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { toast } from "react-toastify"; // ✅ ADD

function Register() {
  const navigate = useNavigate();

  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),

    email: Yup.string().email("Invalid email").required("Email is required"),

    password: Yup.string()
      .min(6, "Minimum 6 characters")
      .required("Password is required"),

    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password")], "Passwords must match")
      .required("Confirm Password is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    },

    validationSchema,

    onSubmit: (values) => {
      const existingUser = JSON.parse(localStorage.getItem("user"));

      // 🔐 Already registered check
      if (existingUser && existingUser.email === values.email) {
        toast.error("User already exists! Please login ❌"); // ✅ FIX
        navigate("/login");
        return;
      }

      const userData = {
        name: values.name,
        email: values.email,
        password: values.password,
      };

      localStorage.setItem("user", JSON.stringify(userData));

      localStorage.setItem(
        "userSession",
        JSON.stringify({
          email: values.email,
          createdAt: Date.now(),
        })
      );

      toast.success("Registration Successful 🎉"); // ✅ FIX

      setTimeout(() => {
        navigate("/login", { replace: true });
      }, 600);
    },
  });

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-md-5">
          <div className="card shadow p-4">
            <h2 className="text-center fw-bold mb-4">Register</h2>

            <form onSubmit={formik.handleSubmit}>
              {/* NAME */}
              <div className="mb-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="name"
                  className="form-control"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.name && formik.errors.name && (
                  <small className="text-danger">{formik.errors.name}</small>
                )}
              </div>

              {/* EMAIL */}
              <div className="mb-3">
                <label className="form-label">Email address</label>
                <input
                  type="email"
                  name="email"
                  className="form-control"
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

              {/* CONFIRM PASSWORD */}
              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  name="confirmPassword"
                  className="form-control"
                  value={formik.values.confirmPassword}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.confirmPassword &&
                  formik.errors.confirmPassword && (
                    <small className="text-danger">
                      {formik.errors.confirmPassword}
                    </small>
                  )}
              </div>

              <button type="submit" className="btn btn-dark w-100">
                Register
              </button>
            </form>

            <p className="text-center mt-3 text-muted">
              Already have an account? <Link to="/login">Login</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
