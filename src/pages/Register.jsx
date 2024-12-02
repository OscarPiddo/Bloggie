import React, { useState, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../context/UserContext"; // Import UserContext
import Logo from "../assets/Images/Bloggie.png";
import { register as registerApi } from "../services/api"; // Import API function

function RegisterForm() {
  const { login } = useContext(UserContext); // Access login function from context
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  // Initial form values
  const initialValues = {
    email: "",
    password: "",
  };

  // Validation schema
  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 characters long")
      .required("Password is required"),
  });

  // Submit handler
  const onSubmit = async (values, { resetForm }) => {
    setLoading(true);
    setErrorMessage("");
    setSuccessMessage("");

    try {
      // Call register API
      const data = await registerApi(values);

      // Automatically log in the user after successful registration
      login(data.token);

      setSuccessMessage("Registration successful! Redirecting...");
      resetForm();

      // Redirect to the home page
      setTimeout(() => navigate("/Home"), 2000);
    } catch (error) {
      console.error("Registration error:", error.message);
      setErrorMessage(
        error.message || "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-6">
          <img src={Logo} alt="Bloggie Logo" className="mx-auto h-12 w-auto" />
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded text-center">
            {successMessage}
          </div>
        )}

        {/* Heading */}
        <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
          Register
        </h1>

        {/* Error Message */}
        {errorMessage && (
          <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
        )}

        {/* Form */}
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={onSubmit}
        >
          {(formik) => (
            <Form>
              {/* Email Field */}
              <div className="mb-4">
                <label
                  htmlFor="email"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Email
                </label>
                <Field
                  type="email"
                  id="email"
                  name="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Password Field */}
              <div className="mb-4">
                <label
                  htmlFor="password"
                  className="block text-gray-700 font-medium mb-2"
                >
                  Password
                </label>
                <Field
                  type="password"
                  id="password"
                  name="password"
                  className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <ErrorMessage
                  name="password"
                  component="div"
                  className="text-red-500 text-sm mt-1"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={!formik.isValid || loading}
                className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 ${
                  !formik.isValid || loading
                    ? "opacity-50 cursor-not-allowed"
                    : ""
                }`}
              >
                {loading ? "Registering..." : "Register"}
              </button>

              {/* Redirect to Login */}
              <div className="mt-4 text-center">
                <p className="text-gray-600">
                  Already have an account?{" "}
                  <Link
                    to="/"
                    className="text-blue-500 hover:underline"
                  >
                    Login
                  </Link>
                </p>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}

export default RegisterForm;
