import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Images/Bloggie.png";

function RegisterForm() {
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
            const response = await fetch(
                "https://davidwaga.pythonanywhere.com/api/v1/register",
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
                setSuccessMessage("Registration successful! You can now log in.");
                resetForm();
                setTimeout(() => navigate("/"), 2000); // Redirect after 2 seconds
            } else {
                setErrorMessage(data.message || "Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            setErrorMessage("Something went wrong. Please try again later.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
                <div className="text-center mb-6">
                    <img src={Logo} alt="Bloggie Logo" className="mx-auto h-12 w-auto" />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>

                {errorMessage && <div className="text-red-500 mb-4">{errorMessage}</div>}
                {successMessage && <div className="text-green-500 mb-4">{successMessage}</div>}

                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {() => (
                        <Form className="space-y-4">
                            {/* Email Field */}
                            <div>
                                <label htmlFor="email" className="block text-gray-700 mb-1">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <ErrorMessage name="email" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Password Field */}
                            <div>
                                <label htmlFor="password" className="block text-gray-700 mb-1">
                                    Password
                                </label>
                                <Field
                                    type="password"
                                    id="password"
                                    name="password"
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <ErrorMessage name="password" component="div" className="text-red-500 text-sm" />
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>
                        </Form>
                    )}
                </Formik>

                {/* Login Link */}
                <div className="mt-4 text-center">
                    <p>
                        Already have an account?{" "}
                        <Link to="/" className="text-blue-500 hover:underline">
                            Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}

export default RegisterForm;
