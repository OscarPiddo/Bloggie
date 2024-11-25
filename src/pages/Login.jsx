import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom"; // Added useNavigate for redirection
import Logo from "../assets/Images/Bloggie.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function LoginForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const location = useLocation();
    const navigate = useNavigate();
    const successMessage = location.state?.message;

    const initialValues = {
        email: "",
        password: "",
    };

    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        password: Yup.string().required("Password is required"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        setErrorMessage("");

        try {
            const response = await fetch(
                "https://davidwaga.pythonanywhere.com/api/v1/login",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(values),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log("Login successful:", data);

                // Save token to localStorage
                localStorage.setItem("authToken", data.token);

                // Redirect to dashboard or home page
                navigate("/Home", {
                    state: { message: "Login successful!" },
                });
            } else {
                setErrorMessage(data.message || "Login failed. Please try again.");
            }
        } catch (error) {
            console.error("Login error:", error);
            setErrorMessage("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <img
                        src={Logo}
                        alt="Bloggie Logo"
                        className="mx-auto h-12 w-auto"
                    />
                </div>

                {/* Success Message */}
                {successMessage && (
                    <div className="mb-4 p-3 bg-green-100 text-green-700 border border-green-400 rounded text-center">
                        {successMessage}
                    </div>
                )}

                <h2 className="text-2xl font-semibold text-center mb-6">Login</h2>

                {errorMessage && (
                    <div className="mb-4 text-red-500 text-center">
                        {errorMessage}
                    </div>
                )}

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
                            <div className="mb-4 relative">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 font-medium mb-2"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-2 border border-gray-300 rounded pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        <FontAwesomeIcon
                                            icon={showPassword ? faEyeSlash : faEye}
                                        />
                                    </button>
                                </div>
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
                                className={`w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 
                                    ${!formik.isValid || loading ? "opacity-50 cursor-not-allowed" : ""}`}
                            >
                                {loading ? "Logging in..." : "Login"}
                            </button>

                            {/* Redirect to Register */}
                            <div className="mt-4 text-center">
                                <p className="text-gray-600">
                                    Don&apos;t have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="text-blue-500 hover:underline"
                                    >
                                        Register
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

export default LoginForm;
