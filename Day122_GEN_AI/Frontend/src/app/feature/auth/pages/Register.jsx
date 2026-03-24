import React, { useState } from "react";
import { useNavigate } from "react-router";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Register Data:", formData);
    // Add API call here
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center p-4"
      style={{ backgroundColor: "#1d1d1d" }}
    >
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div
          className="rounded-lg shadow-2xl p-8"
          style={{
            backgroundColor: "#1d1d1d",
            borderColor: "#1db8cc",
            borderWidth: "2px",
          }}
        >
          {/* Header */}
          <div className="text-center mb-8">
            <h1
              className="text-4xl font-bold mb-2"
              style={{ color: "#1db8cc" }}
            >
              Register
            </h1>
            <p style={{ color: "#f0f0f0" }}>
              Create your account to get started
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#f0f0f0" }}
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={formData.username}
                onChange={handleChange}
                placeholder="Enter your username"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 placeholder-gray-500"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#1db8cc",
                  borderWidth: "1px",
                  focusBorderColor: "#1db8cc",
                }}
                required
              />
            </div>

            {/* Email Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#f0f0f0" }}
              >
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 placeholder-gray-500"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#1db8cc",
                  borderWidth: "1px",
                  focusBorderColor: "#1db8cc",
                }}
                required
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                className="block text-sm font-medium mb-2"
                style={{ color: "#f0f0f0" }}
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                className="w-full px-4 py-2 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-opacity-50 placeholder-gray-500"
                style={{
                  backgroundColor: "#2a2a2a",
                  borderColor: "#1db8cc",
                  borderWidth: "1px",
                  focusBorderColor: "#1db8cc",
                }}
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full text-white font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
              style={{ backgroundColor: "#1db8cc" }}
            >
              Register
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div
                className="w-full"
                style={{ borderTopColor: "#1db8cc", borderTopWidth: "1px" }}
              ></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span
                className="px-2"
                style={{ backgroundColor: "#1d1d1d", color: "#f0f0f0" }}
              >
                Already have an account?
              </span>
            </div>
          </div>

          {/* Login Link */}
          <button
            onClick={() => navigate("/login")}
            className="w-full font-semibold py-2 px-4 rounded-lg transition-all duration-200 transform hover:scale-105"
            style={{ backgroundColor: "#1db8cc", color: "#1d1d1d" }}
          >
            Go to Login
          </button>
        </div>

        {/* Footer */}
        <p className="text-center text-sm mt-6" style={{ color: "#f0f0f0" }}>
          Your security is our priority
        </p>
      </div>
    </div>
  );
};

export default Register;
