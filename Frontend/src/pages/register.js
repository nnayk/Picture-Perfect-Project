// pages/register.js
import React, { useState } from "react";
import axios from "axios";
// pages/register.js
import "tailwindcss/tailwind.css"; // Import Tailwind CSS
import { useRouter } from "next/router";
import Link from "next/link"; // Import Link from Next.js

const Register = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const [error, setError] = useState("");

  const isPasswordValid = (password) => {
    // Define regular expressions for password rules
    const minLengthRegex = /(?=.{10,})/;
    const uppercaseRegex = /(?=.*[A-Z])/;
    const lowercaseRegex = /(?=.*[a-z])/;
    const numberRegex = /(?=.*\d)/;
    const specialCharRegex = /(?=.*\W)/;

    // Check if the password meets all criteria
    return (
      minLengthRegex.test(password) &&
      uppercaseRegex.test(password) &&
      lowercaseRegex.test(password) &&
      numberRegex.test(password) &&
      specialCharRegex.test(password)
    );
  };
  const isValidEmail = (email) => {
    // You can use a regular expression or a library like validator.js for more comprehensive email validation.
    const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    return emailPattern.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isValidEmail(formData.email)) {
      setError("Please enter a valid email address.");
      return; // Prevent form submission
    }
    // Handle registration logic here
    // console.log(formData);
    const { username, email, password, confirmPassword } = formData;
    const errors = {};
    if (!isPasswordValid(password)) {
      errors.password = "Password does not meet the required criteria.";
      console.log("bad password");
    }
    try {
      console.log("try");
      const response = await axios.post(
        "http://localhost:5000/register",
        formData
      );
      console.log("response", response);
      router.push("/");
      return response;
    } catch (error) {
      console.log(error);
      return false;
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h2 className="text-2xl font-semibold mb-4">Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Username
            </label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
            {/* Error message */}
            {error && <p className="text-red-500 text-sm">{error}</p>}
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Password
            </label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 text-sm font-medium">
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="w-full border rounded p-2"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-500 text-white rounded p-2 hover:bg-blue-600 transition duration-200; mb-4"
            onClick={handleSubmit}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default Register;
