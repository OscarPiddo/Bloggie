import React, { useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../assets/Images/Bloggie.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEyeSlash } from "@fortawesome/free-solid-svg-icons";

function RegisterForm() {
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const initialValues = {
        name: "",
        email: "",
        dob: "",
        sex: "",
        password: "",
        confirmPassword: "",
    };

    const validationSchema = Yup.object({
        name: Yup.string()
            .required("Name is required")
            .min(3, "Name must be at least 3 characters long"),
        email: Yup.string()
            .email("Invalid email format")
            .required("Email is required"),
        dob: Yup.date()
            .required("Date of Birth is required")
            .max(new Date(), "Date of Birth cannot be in the future"),
        sex: Yup.string()
            .required("Sex is required")
            .oneOf(["male", "female", "other"], "Invalid selection"),
        password: Yup.string()
            .required("Password is required")
            .min(8, "Password must be at least 8 characters long"),
        confirmPassword: Yup.string()
            .required("Please confirm your password")
            .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });

    const onSubmit = async (values) => {
        setLoading(true);
        setErrorMessage("");

        const { name, email, dob, sex, password } = values;

        try {
            const response = await fetch(
                "https://davidwaga.pythonanywhere.com/api/v1/register",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ name, email, dob, sex, password }),
                }
            );

            const data = await response.json();

            if (response.ok) {
                console.log("Registration successful:", data);
                navigate("/");
            } else {
                setErrorMessage(data.message || "Registration failed");
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
            <div className="bg-white p-8 rounded shadow-md w-full max-w-lg">
                <div className="text-center mb-6">
                    <img
                        src={Logo}
                        alt="Bloggie Logo"
                        className="mx-auto h-12 w-auto"
                    />
                </div>
                <h2 className="text-2xl font-semibold text-center mb-6">Register</h2>
                <Formik
                    initialValues={initialValues}
                    validationSchema={validationSchema}
                    onSubmit={onSubmit}
                >
                    {(formik) => (
                        <Form>
                            {/* Name */}
                            <div className="mb-4">
                                <label htmlFor="name" className="block text-gray-700 mb-1">
                                    Name
                                </label>
                                <Field
                                    type="text"
                                    id="name"
                                    name="name"
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <ErrorMessage
                                    name="name"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Email */}
                            <div className="mb-4">
                                <label htmlFor="email" className="block text-gray-700 mb-1">
                                    Email
                                </label>
                                <Field
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <ErrorMessage
                                    name="email"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Date of Birth */}
                            <div className="mb-4">
                                <label htmlFor="dob" className="block text-gray-700 mb-1">
                                    Date of Birth
                                </label>
                                <Field
                                    type="date"
                                    id="dob"
                                    name="dob"
                                    className="w-full px-4 py-2 border rounded"
                                />
                                <ErrorMessage
                                    name="dob"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Sex */}
                            <div className="mb-4">
                                <label htmlFor="sex" className="block text-gray-700 mb-1">
                                    Gender
                                </label>
                                <Field
                                    as="select"
                                    id="sex"
                                    name="sex"
                                    className="w-full px-4 py-2 border rounded"
                                >
                                    <option value="" disabled>
                                        Select your Gender
                                    </option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                </Field>
                                <ErrorMessage
                                    name="sex"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Password */}
                            <div className="mb-4 relative">
                                <label
                                    htmlFor="password"
                                    className="block text-gray-700 mb-1"
                                >
                                    Password
                                </label>
                                <div className="relative">
                                    <Field
                                        type={showPassword ? "text" : "password"}
                                        id="password"
                                        name="password"
                                        className="w-full px-4 py-2 border rounded pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPassword(!showPassword)
                                        }
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                showPassword
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                        />
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="password"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Confirm Password */}
                            <div className="mb-4 relative">
                                <label
                                    htmlFor="confirmPassword"
                                    className="block text-gray-700 mb-1"
                                >
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <Field
                                        type={showConfirmPassword ? "text" : "password"}
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        className="w-full px-4 py-2 border rounded pr-10"
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowConfirmPassword(
                                                !showConfirmPassword
                                            )
                                        }
                                        className="absolute inset-y-0 right-3 flex items-center text-gray-500"
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                showConfirmPassword
                                                    ? faEyeSlash
                                                    : faEye
                                            }
                                        />
                                    </button>
                                </div>
                                <ErrorMessage
                                    name="confirmPassword"
                                    component="div"
                                    className="text-red-500 text-sm"
                                />
                            </div>

                            {/* Error Message */}
                            {errorMessage && (
                                <div className="text-red-500 text-sm mb-4">
                                    {errorMessage}
                                </div>
                            )}

                            {/* Submit Button */}
                            <button
                                type="submit"
                                disabled={!formik.isValid || loading}
                                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 disabled:opacity-50"
                            >
                                {loading ? "Registering..." : "Register"}
                            </button>

                            {/* Login Link */}
                            <div className="mt-4 text-center">
                                <p>
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
